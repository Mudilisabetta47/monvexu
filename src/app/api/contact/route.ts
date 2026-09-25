import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

type Payload = Record<string, unknown>;

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

const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '');
const oneLine = (s: string) => s.replace(/[\r\n]+/g, ' ');

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) {
    return NextResponse.json({ error: 'rate_limited', message: 'Zu viele Anfragen. Bitte versuchen Sie es in einigen Minuten erneut.' }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ error: 'bad_request', message: 'Ungültige Anfrage.' }, { status: 400 });
  }

  // Honeypot: Bots fuellen das versteckte Feld. Wir tun so, als waere alles gut.
  if (str(body.website, 200)) return NextResponse.json({ ok: true });

  const name = oneLine(str(body.name, 120));
  const company = oneLine(str(body.company, 160));
  const email = oneLine(str(body.email, 200));
  const phone = oneLine(str(body.phone, 60));
  const message = str(body.message, 5000);
  const topic = oneLine(str(body.topic, 200));

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10 || body.consent !== 'yes') {
    return NextResponse.json({ error: 'invalid', message: 'Bitte prüfen Sie Ihre Angaben.' }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error('[contact] RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL nicht gesetzt – Anfrage nicht zugestellt.');
    return NextResponse.json(
      { error: 'not_configured', message: 'Das Formular ist derzeit nicht verfügbar. Bitte versuchen Sie es später erneut.' },
      { status: 503 },
    );
  }

  const text = [
    `Neue Anfrage über monvex-group.de`,
    ``,
    `Name:        ${name}`,
    `Unternehmen: ${company || '–'}`,
    `E-Mail:      ${email}`,
    `Telefon:     ${phone || '–'}`,
    ...(topic ? [`Thema:       ${topic}`] : []),
    ``,
    message,
  ].join('\n');

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `MONVEX Anfrage${topic ? ` [${topic}]` : ''}: ${name}${company ? ` (${company})` : ''}`, text }),
    });
    if (!res.ok) {
      console.error('[contact] Resend-Fehler', res.status, await res.text().catch(() => ''));
      return NextResponse.json({ error: 'send_failed', message: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' }, { status: 502 });
    }
  } catch (err) {
    console.error('[contact] Versand fehlgeschlagen', err);
    return NextResponse.json({ error: 'send_failed', message: 'Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut.' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
