import { LEGAL_REVIEWED } from '@/data/shops';

/** Sichtbarer Hinweis, solange die Rechtstexte nicht freigegeben sind. */
export function LegalDraftNote() {
  if (LEGAL_REVIEWED) return null;
  return (
    <p role="note" className="rounded-xl border border-ember/40 bg-ember/10 p-4 text-[.92rem] text-ink">
      <strong>Entwurf.</strong> Dieser Text ist noch nicht anwaltlich geprüft und nicht verbindlich. Er wird erst mit der Freigabe durch die Geschäftsführung gültig.
    </p>
  );
}
