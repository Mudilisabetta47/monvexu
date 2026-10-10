import dns from 'node:dns/promises';
import http from 'node:http';
import https from 'node:https';
import net from 'node:net';

export type CheckErrorCode = 'invalid' | 'blocked' | 'unreachable' | 'timeout' | 'not_html';
export class CheckError extends Error {
  constructor(public code: CheckErrorCode, message: string) {
    super(message);
  }
}

const UA = 'MONVEX-Website-Check/1.0 (+https://www.monvex-group.de/website-check)';

function isPrivateV4(ip: string) {
  const [a, b] = ip.split('.').map(Number);
  return (
    a === 0 || a === 10 || a === 127 || a >= 224 ||
    (a === 100 && b >= 64 && b <= 127) ||
    (a === 169 && b === 254) ||
    (a === 172 && b >= 16 && b <= 31) ||
    (a === 192 && b === 168) ||
    (a === 192 && b === 0) ||
    (a === 198 && (b === 18 || b === 19))
  );
}
function isPrivateV6(ip: string) {
  const s = ip.toLowerCase();
  if (s === '::' || s === '::1') return true;
  const dotted = /^::ffff:(\d+\.\d+\.\d+\.\d+)$/.exec(s);
  if (dotted) return isPrivateV4(dotted[1]);
  const hex = /^::ffff:([0-9a-f]{1,4}):([0-9a-f]{1,4})$/.exec(s);
  if (hex) {
    const hi = parseInt(hex[1], 16), lo = parseInt(hex[2], 16);
    return isPrivateV4(`${hi >> 8}.${hi & 255}.${lo >> 8}.${lo & 255}`);
  }
  return /^(fc|fd|fe8|fe9|fea|feb|ff|64:ff9b)/.test(s);
}
const isPrivate = (ip: string) => (net.isIPv4(ip) ? isPrivateV4(ip) : isPrivateV6(ip));

/** Nutzereingabe -> geprüfte http(s)-URL (kein localhost, keine Zugangsdaten, nur Standardports). */
export function normalizeUrl(input: string): URL {
  let raw = input.trim();
  if (!raw || raw.length > 300) throw new CheckError('invalid', 'Bitte geben Sie eine gültige Website-Adresse ein.');
  if (!/^[a-z][a-z0-9+.-]*:\/\//i.test(raw)) raw = `https://${raw}`;
  let u: URL;
  try {
    u = new URL(raw);
  } catch {
    throw new CheckError('invalid', 'Bitte geben Sie eine gültige Website-Adresse ein.');
  }
  if (u.protocol !== 'http:' && u.protocol !== 'https:') throw new CheckError('invalid', 'Es werden nur http- und https-Adressen unterstützt.');
  if (u.username || u.password) throw new CheckError('invalid', 'Adressen mit Zugangsdaten werden nicht unterstützt.');
  if (u.port && u.port !== '80' && u.port !== '443') throw new CheckError('blocked', 'Diese Adresse kann nicht geprüft werden.');
  const host = u.hostname.replace(/^\[|\]$/g, '').toLowerCase();
  const isIp = net.isIP(host) > 0;
  if (!isIp && (!host.includes('.') || host === 'localhost' || /\.(local|localhost|internal|lan|home|corp)$/.test(host))) {
    throw new CheckError('blocked', 'Diese Adresse kann nicht geprüft werden.');
  }
  return u;
}

/** Löst den Host auf und verweigert interne Ziele. Die geprüfte IP wird für die Verbindung fest verwendet (kein DNS-Rebinding). */
async function resolveSafe(u: URL): Promise<{ ip: string; family: 4 | 6 }> {
  const host = u.hostname.replace(/^\[|\]$/g, '');
  const ipFamily = net.isIP(host);
  if (ipFamily) {
    if (isPrivate(host)) throw new CheckError('blocked', 'Diese Adresse kann nicht geprüft werden.');
    return { ip: host, family: ipFamily as 4 | 6 };
  }
  let addrs: { address: string; family: number }[];
  try {
    addrs = await dns.lookup(host, { all: true });
  } catch {
    throw new CheckError('unreachable', 'Die Website konnte nicht gefunden werden. Bitte prüfen Sie die Adresse.');
  }
  if (!addrs.length || addrs.some((a) => isPrivate(a.address))) throw new CheckError('blocked', 'Diese Adresse kann nicht geprüft werden.');
  return { ip: addrs[0].address, family: addrs[0].family as 4 | 6 };
}

type Raw = { status: number; headers: http.IncomingHttpHeaders; body: Buffer; ms: number; truncated: boolean };

function request(u: URL, ip: string, family: 4 | 6, maxBytes: number, timeoutMs: number): Promise<Raw> {
  return new Promise((resolve, reject) => {
    const start = Date.now();
    const lib = u.protocol === 'https:' ? https : http;
    const host = u.hostname.replace(/^\[|\]$/g, '');
    const req = lib.request(
      {
        hostname: host,
        port: u.port || undefined,
        path: `${u.pathname}${u.search}`,
        method: 'GET',
        headers: { 'user-agent': UA, accept: 'text/html,application/xhtml+xml;q=0.9,*/*;q=0.5', 'accept-language': 'de,en;q=0.5', 'accept-encoding': 'identity' },
        lookup: ((_h: string, o: { all?: boolean }, cb: (...a: unknown[]) => void) => (o?.all ? cb(null, [{ address: ip, family }]) : cb(null, ip, family))) as never,
      },
      (res) => {
        const chunks: Buffer[] = [];
        let total = 0;
        let done = false;
        const finish = (truncated: boolean) => {
          if (done) return;
          done = true;
          clearTimeout(timer);
          resolve({ status: res.statusCode ?? 0, headers: res.headers, body: Buffer.concat(chunks), ms: Date.now() - start, truncated });
        };
        res.on('data', (c: Buffer) => {
          total += c.length;
          chunks.push(c);
          if (total > maxBytes) {
            finish(true);
            res.destroy();
          }
        });
        res.on('end', () => finish(false));
        res.on('error', () => finish(true));
      },
    );
    const timer = setTimeout(() => req.destroy(new CheckError('timeout', 'Die Website hat zu lange nicht geantwortet.')), timeoutMs);
    req.on('error', (e) => {
      clearTimeout(timer);
      reject(e instanceof CheckError ? e : new CheckError('unreachable', 'Die Website ist nicht erreichbar.'));
    });
    req.end();
  });
}

function decode(body: Buffer, contentType: string) {
  const head = body.subarray(0, 4096).toString('latin1');
  const cs = (/charset=([\w-]+)/i.exec(contentType)?.[1] ?? /<meta[^>]+charset=["']?([\w-]+)/i.exec(head)?.[1] ?? 'utf-8').toLowerCase();
  try {
    return new TextDecoder(/^(utf-?8)$/.test(cs) ? 'utf-8' : cs).decode(body);
  } catch {
    return body.toString('utf8');
  }
}

export type Page = { finalUrl: string; status: number; headers: http.IncomingHttpHeaders; html: string; ms: number; redirects: number; truncated: boolean };

/** Lädt eine Seite mit manueller Weiterleitungsverfolgung; jede Station wird erneut geprüft. */
export async function fetchPage(start: URL, opts: { maxBytes?: number; timeoutMs?: number; html?: boolean } = {}): Promise<Page> {
  const maxBytes = opts.maxBytes ?? 1_500_000;
  const timeoutMs = opts.timeoutMs ?? 9000;
  let u = start;
  for (let hop = 0; hop <= 5; hop++) {
    const { ip, family } = await resolveSafe(u);
    const r = await request(u, ip, family, maxBytes, timeoutMs);
    if (r.status >= 300 && r.status < 400 && r.headers.location) {
      u = normalizeUrl(new URL(String(r.headers.location), u).toString());
      continue;
    }
    const ct = String(r.headers['content-type'] ?? '');
    if (opts.html !== false && r.status < 400 && ct && !/html|xml/i.test(ct)) throw new CheckError('not_html', 'Unter dieser Adresse liegt keine Webseite.');
    return { finalUrl: u.toString(), status: r.status, headers: r.headers, html: decode(r.body, ct), ms: r.ms, redirects: hop, truncated: r.truncated };
  }
  throw new CheckError('unreachable', 'Zu viele Weiterleitungen.');
}

/** Kleine Zusatzabfrage (robots.txt, sitemap.xml): nur der Statuscode, nie ein Fehler. */
export async function probe(origin: string, path: string): Promise<number | null> {
  try {
    const p = await fetchPage(normalizeUrl(origin + path), { maxBytes: 120_000, timeoutMs: 5000, html: false });
    return p.status;
  } catch {
    return null;
  }
}
