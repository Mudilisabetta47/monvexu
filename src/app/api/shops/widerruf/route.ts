import { NextResponse } from 'next/server';
import { field, longField, sendMailTo, sendOrderMail } from '@/lib/shops-pay';

export const runtime = 'nodejs';

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

/** Online-Widerruf (Widerrufsfunktion): wir melden den Eingang mit Zeitpunkt an uns und per E-Mail an den Kunden (dauerhafter Datenträger). */
export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return NextResponse.json({ error: 'rate_limited', message: 'Zu viele Versuche. Bitte warte ein paar Minuten.' }, { status: 429 });

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Ungültige Anfrage.' }, { status: 400 });
  }
  const receivedAt = new Intl.DateTimeFormat('de-DE', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Europe/Berlin' }).format(new Date());
  if (field(body.website, 200)) return NextResponse.json({ ok: true, receivedAt }); // Honeypot

  const name = field(body.name, 120);
  const email = field(body.email, 200);
  const order = field(body.order, 80);
  const date = field(body.date, 60);
  const note = longField(body.note, 2000);
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ error: 'invalid', message: 'Bitte prüfe Name und E-Mail.' }, { status: 400 });

  const details = [`Eingang: ${receivedAt}`, `Name: ${name}`, `E-Mail: ${email}`, `Bestellnummer: ${order || '–'}`, `Bestellt am: ${date || '–'}`, '', note || '(keine Anmerkung)'].join('\n');
  const sent = await sendOrderMail(`WIDERRUF Shop-Start: ${name}`, `Ein Kunde hat über die Website widerrufen.\n\n${details}`, email);
  if (!sent) return NextResponse.json({ error: 'not_configured', message: 'Das Formular ist derzeit nicht verfügbar. Bitte schreib uns per E-Mail.' }, { status: 503 });

  await sendMailTo(email, 'Eingangsbestätigung: Dein Widerruf bei MONVEX Shop-Start', `Hallo ${name},\n\ndein Widerruf ist am ${receivedAt} bei uns eingegangen. Wir melden uns zur weiteren Abwicklung.\n\nDeine Angaben:\n${details}\n\nMONVEX UG (haftungsbeschränkt)`);
  return NextResponse.json({ ok: true, receivedAt });
}
