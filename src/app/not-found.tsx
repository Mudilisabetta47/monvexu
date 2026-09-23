import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div className="shell">
        <p className="eyebrow">Fehler 404</p>
        <h1 className="mt-6 text-h1 font-semibold">
          Nicht <span className="serif-i text-ember">gefunden.</span>
        </h1>
        <p className="mt-6 max-w-md text-lead text-graphite">Diese Seite existiert nicht – oder nicht mehr.</p>
        <div className="mt-10">
          <Button href="/">Zur Startseite</Button>
        </div>
      </div>
    </section>
  );
}
