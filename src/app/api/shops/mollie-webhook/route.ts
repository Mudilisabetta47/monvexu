import { NextResponse } from 'next/server';
import { findPackage, mollieBase, paymentConfig, sendMailTo, sendOrderMail } from '@/lib/shops-pay';

export const runtime = 'nodejs';

/** Bereits gemeldete Zahlungen (best effort, pro Serverinstanz), damit doppelte Aufrufe keine doppelten Mails erzeugen. */
const done = new Set<string>();

/**
 * Mollie ruft diese Adresse mit `id=tr_…` (form-encoded) auf. Es gibt keine Signatur: wir vertrauen NIE dem Aufruf, sondern fragen den
 * Zahlungsstatus selbst bei Mollie mit unserem Schlüssel ab. Nur bei „paid“ geht eine Mail raus. Antwort immer 200 (sonst wiederholt Mollie).
 */
export async function POST(req: Request) {
  const cfg = paymentConfig();
  if (cfg.provider !== 'mollie' || !cfg.key) return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  const raw = await req.text();
  const id = new URLSearchParams(raw).get('id') ?? '';
  if (!/^tr_[A-Za-z0-9]{4,40}$/.test(id)) return NextResponse.json({ ok: true });

  let p: { status?: string; amount?: { value?: string; currency?: string }; metadata?: Record<string, string> | null };
  try {
    const res = await fetch(`${mollieBase()}/v2/payments/${id}`, { headers: { Authorization: `Bearer ${cfg.key}` }, cache: 'no-store' });
    if (!res.ok) return NextResponse.json({ ok: true });
    p = (await res.json()) as typeof p;
  } catch (e) {
    console.error('[shops] Mollie-Abfrage fehlgeschlagen', e);
    return NextResponse.json({ error: 'upstream' }, { status: 502 }); // Mollie versucht es erneut
  }
  if (p.status !== 'paid' || done.has(id)) return NextResponse.json({ ok: true });
  done.add(id);
  if (done.size > 2000) done.clear();

  const m = p.metadata ?? {};
  const pkg = findPackage(m.paket);
  const paid = Number(p.amount?.value);
  const mismatch = pkg?.price != null && Math.abs(paid - pkg.price) > 0.001;
  const amount = Number.isFinite(paid) ? `${paid.toFixed(2).replace('.', ',')} €` : '–';
  const text = [
    'ZAHLUNG ERHALTEN – Shop-Start (Mollie)',
    ...(mismatch ? ['', `ACHTUNG: Der bezahlte Betrag (${amount}) weicht vom Paketpreis (${pkg?.price} €) ab. Bitte prüfen.`, ''] : ['']),
    `Bestellnummer: ${m.order_id ?? '–'}`,
    `Betrag: ${amount}`,
    `Mollie-Zahlung: ${id}`,
    `Paket: ${m.paket ?? '–'} · Branche: ${m.nische ?? '–'}`,
    `Shopname: ${m.shopname ?? '–'}`,
    `Name: ${m.name ?? '–'} · Unternehmen: ${m.company || '–'}`,
    `E-Mail: ${m.email ?? '–'} · Telefon: ${m.phone || '–'}`,
    `Produkte als Tabelle: ${m.products || '–'} · Website/Social: ${m.existing || '–'}`,
    `AGB/Widerruf bestätigt: ${m.legal_accepted ?? '–'} · Beginn vor Ablauf der Widerrufsfrist verlangt: ${m.startnow_accepted ?? '–'}`,
    '',
    m.message || '(keine weitere Nachricht)',
    '',
    'Nächste Schritte: Rechnung an den Kunden senden (Mollie erstellt keine Rechnung), Aufbau starten, Übergabe mit Anleitung.',
  ].join('\n');
  await sendOrderMail(`Shop-Start BEZAHLT: ${m.paket ?? ''} · ${m.shopname ?? ''} (${amount})`, text, m.email);

  // Bestätigung des Vertragsinhalts an den Kunden (dauerhafter Datenträger)
  if (m.email) {
    await sendMailTo(
      m.email,
      `Deine Bestellung bei MONVEX Shop-Start (${m.order_id ?? ''})`,
      [
        `Hallo ${m.name ?? ''},`,
        '',
        `danke für deine Bestellung. Deine Zahlung über ${amount} ist bei uns eingegangen.`,
        '',
        `Bestellnummer: ${m.order_id ?? '–'}`,
        `Leistung: MONVEX Shop-Start, Paket ${pkg?.name ?? m.paket ?? '–'}, Aufbau deines Shopify-Shops nach Branchenvorlage (${m.nische ?? '–'}), Übergabe auf deinen Namen. Der Shopify-Tarif ist nicht enthalten.`,
        `Shopname: ${m.shopname ?? '–'}`,
        '',
        'Du hast ausdrücklich verlangt, dass wir vor Ablauf der Widerrufsfrist mit der Ausführung beginnen, und bestätigt, dass dein Widerrufsrecht bei vollständiger Vertragserfüllung erlischt. Die AGB und die Widerrufsbelehrung findest du hier: https://www.monvex-group.de/shops/agb und https://www.monvex-group.de/shops/widerruf',
        '',
        'Wir melden uns mit offenen Fragen und mit der Rechnung. Richtwert für den Aufbau sind 3 bis 5 Werktage nach vollständigen Angaben.',
        '',
        'MONVEX UG (haftungsbeschränkt)',
      ].join('\n'),
    );
  }
  return NextResponse.json({ ok: true });
}
