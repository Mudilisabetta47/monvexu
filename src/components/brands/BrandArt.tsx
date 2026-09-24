import type { Brand } from '@/data/brands';

/**
 * Generative Key-Visuals pro Marke (SVG, kein Stock). Jede Ebene reagiert auf
 * --px/--py (gesetzt von <Tilt>) und verschiebt sich unterschiedlich stark: echte Tiefe.
 */
const layer = (depth: number): React.CSSProperties => ({
  transform: `translate3d(calc(var(--px,0) * ${depth}px), calc(var(--py,0) * ${depth}px), 0)`,
  transition: 'transform .6s cubic-bezier(.16,1,.3,1)',
});

function Route({ t }: { t: Brand['theme'] }) {
  const nodes = [
    [70, 210], [150, 120], [250, 165], [330, 70], [420, 130], [520, 60],
  ];
  return (
    <g>
      <g style={layer(-6)} opacity=".5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 52} y1="0" x2={i * 52} y2="480" stroke={t.fg} strokeOpacity=".07" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 52} x2="640" y2={i * 52} stroke={t.fg} strokeOpacity=".07" />
        ))}
      </g>
      <g transform="translate(0 40)">
      <g style={layer(10)} fill="none" strokeLinecap="round">
        <path id="r1" d="M70 210 C110 210 110 120 150 120 S210 165 250 165 S290 70 330 70 S380 130 420 130 S480 60 520 60" stroke={t.accent} strokeWidth="2.5" strokeDasharray="2 9" className="animate-flow" />
        <path d="M70 210 C150 260 300 250 380 200 S500 150 560 190" stroke={t.fg} strokeOpacity=".22" strokeWidth="1.5" />
        <path d="M150 120 C200 40 280 30 330 70" stroke={t.fg} strokeOpacity=".16" strokeWidth="1.5" />
      </g>
      <g style={layer(18)}>
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="14" fill={t.accent} opacity=".16" className="animate-pulse-ring" style={{ transformOrigin: `${x}px ${y}px`, animationDelay: `${i * 0.4}s` }} />
            <circle cx={x} cy={y} r="5" fill={t.bg} stroke={t.accent} strokeWidth="2" />
          </g>
        ))}
        <circle r="6" fill={t.accent}>
          <animateMotion dur="9s" repeatCount="indefinite" path="M70 210 C110 210 110 120 150 120 S210 165 250 165 S290 70 330 70 S380 130 420 130 S480 60 520 60" />
        </circle>
      </g>
      </g>
    </g>
  );
}

function Bloom({ t }: { t: Brand['theme'] }) {
  const petals = (n: number, rx: number, ry: number, off: number, op: number, fill: string) =>
    Array.from({ length: n }).map((_, i) => (
      <ellipse key={`${n}-${i}`} cx="0" cy={-off} rx={rx} ry={ry} fill={fill} opacity={op} transform={`rotate(${(360 / n) * i})`} />
    ));
  return (
    <g>
      <g style={layer(-8)}>
        <circle cx="470" cy="70" r="150" fill={t.accent} opacity=".07" />
        <circle cx="120" cy="290" r="110" fill={t.accent} opacity=".06" />
      </g>
      <g transform="translate(330 190)"><g style={layer(12)}>
        <g className="animate-spin-slow" style={{ animationDuration: '90s' }}>{petals(12, 22, 66, 84, 0.16, t.accent)}</g>
        <g className="animate-spin-slow" style={{ animationDuration: '70s', animationDirection: 'reverse' }}>{petals(9, 24, 54, 58, 0.26, t.accent)}</g>
        <g>{petals(6, 22, 40, 34, 0.42, t.accent)}</g>
        <circle r="13" fill={t.accent} />
        <circle r="26" fill="none" stroke={t.fg} strokeOpacity=".3" strokeDasharray="2 5" />
      </g></g>
      <g style={layer(22)} fill="none" stroke={t.fg} strokeOpacity=".28" strokeWidth="1.2">
        <circle cx="150" cy="120" r="34" />
        <circle cx="150" cy="120" r="22" />
        <path d="M184 118 c22 -2 22 32 -4 28" />
      </g>
    </g>
  );
}

function Rim({ t }: { t: Brand['theme'] }) {
  return (
    <g>
      <g style={layer(-6)} className="grid-lines" opacity=".6">
        {Array.from({ length: 14 }).map((_, i) => (
          <line key={i} x1={i * 48} y1="0" x2={i * 48} y2="480" stroke={t.fg} strokeOpacity=".06" />
        ))}
        {Array.from({ length: 11 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 48} x2="640" y2={i * 48} stroke={t.fg} strokeOpacity=".06" />
        ))}
      </g>
      <g transform="translate(320 190)"><g style={layer(12)} fill="none">
        <circle r="150" stroke={t.fg} strokeOpacity=".12" />
        <g className="animate-spin-slow" style={{ animationDuration: '60s' }}>
          {Array.from({ length: 72 }).map((_, i) => (
            <line key={i} x1="0" y1="-138" x2="0" y2={i % 6 === 0 ? -122 : -130} stroke={i % 6 === 0 ? t.accent : t.fg} strokeOpacity={i % 6 === 0 ? 1 : 0.35} transform={`rotate(${i * 5})`} />
          ))}
        </g>
        <circle r="98" stroke={t.fg} strokeOpacity=".3" strokeWidth="6" />
        <circle r="98" stroke={t.accent} strokeWidth="2" strokeDasharray="120 500" className="animate-spin-slow" style={{ animationDuration: '8s' }} />
        {Array.from({ length: 5 }).map((_, i) => (
          <path key={i} d="M-9 -20 L-14 -92 L14 -92 L9 -20 Z" fill={t.fg} fillOpacity=".1" stroke={t.fg} strokeOpacity=".35" transform={`rotate(${i * 72})`} />
        ))}
        <circle r="22" fill={t.bg2} stroke={t.accent} strokeWidth="2" />
        {Array.from({ length: 5 }).map((_, i) => (
          <circle key={i} cy="-12" r="2.2" fill={t.accent} transform={`rotate(${i * 72})`} />
        ))}
      </g></g>
    </g>
  );
}

function Horizon({ t }: { t: Brand['theme'] }) {
  return (
    <g>
      <g style={layer(-6)} opacity=".5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 56} y1="0" x2={i * 56} y2="210" stroke={t.fg} strokeOpacity=".06" />
        ))}
      </g>
      <g style={layer(8)}>
        <clipPath id="sky"><rect x="0" y="0" width="640" height="210" /></clipPath>
        <g clipPath="url(#sky)">
          {[150, 112, 78].map((r, i) => (
            <circle key={r} cx="320" cy="210" r={r} fill={i === 2 ? t.accent : 'none'} stroke={t.accent} strokeOpacity={i === 2 ? 1 : 0.35 - i * 0.05} className={i === 0 ? 'animate-pulse-ring' : ''} style={{ transformOrigin: '320px 210px' }} />
          ))}
        </g>
        <line x1="0" y1="210" x2="640" y2="210" stroke={t.fg} strokeOpacity=".35" />
      </g>
      <g style={layer(16)} fill="none" stroke={t.fg} strokeOpacity=".28">
        <path d="M-40 480 L320 210 M140 480 L320 210 M500 480 L320 210 M680 480 L320 210" />
        <path d="M320 480 L320 210" stroke={t.accent} strokeOpacity=".9" strokeWidth="2" strokeDasharray="10 14" className="animate-flow" />
      </g>
      <g style={layer(24)}>
        <line x1="470" y1="250" x2="470" y2="345" stroke={t.fg} strokeOpacity=".6" strokeWidth="3" />
        <rect x="440" y="222" width="60" height="38" rx="8" fill={t.accent} />
        <path d="M456 241h26m-9-9l9 9-9 9" stroke={t.bg} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      </g>
    </g>
  );
}

function Pulse({ t }: { t: Brand['theme'] }) {
  return (
    <g>
      <g style={layer(-6)} opacity=".5">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 56} y1="0" x2={i * 56} y2="480" stroke={t.fg} strokeOpacity=".06" />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 52} x2="640" y2={i * 52} stroke={t.fg} strokeOpacity=".06" />
        ))}
      </g>
      <g transform="translate(320 190)">
        <g style={layer(12)}>
          {[120, 90].map((r, i) => (
            <circle key={r} r={r} fill="none" stroke={t.accent} strokeOpacity={0.3 - i * 0.1} className="animate-pulse-ring" style={{ animationDelay: `${i * 0.9}s` }} />
          ))}
          <rect x="-16" y="-52" width="32" height="104" rx="10" fill={t.accent} />
          <rect x="-52" y="-16" width="104" height="32" rx="10" fill={t.accent} />
          <rect x="-16" y="-16" width="32" height="32" fill={t.accent} />
        </g>
      </g>
      <g style={layer(22)} fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 262 H210 l16 -40 l24 84 l22 -60 l14 20 H640" stroke={t.fg} strokeOpacity=".3" strokeWidth="2" />
        <path d="M0 262 H210 l16 -40 l24 84 l22 -60 l14 20 H640" stroke={t.accent} strokeWidth="2.5" strokeDasharray="4 24" className="animate-flow" />
      </g>
    </g>
  );
}

function Monogram({ b }: { b: Brand }) {
  const t = b.theme;
  const initials = b.name.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <g>
      <g style={layer(-6)} opacity=".6">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={i} x1={i * 56} y1="0" x2={i * 56} y2="480" stroke={t.fg} strokeOpacity=".07" />
        ))}
      </g>
      <g style={layer(14)}>
        <circle cx="320" cy="190" r="120" fill="none" stroke={t.accent} strokeOpacity=".5" />
        <circle cx="320" cy="190" r="80" fill={t.accent} fillOpacity=".12" />
        <text x="320" y="218" textAnchor="middle" fontSize="88" fontWeight="600" fill={t.fg} letterSpacing="-4">{initials}</text>
      </g>
    </g>
  );
}

export function BrandArt({ brand, className }: { brand: Brand; className?: string }) {
  const t = brand.theme;
  const id = `bg-${brand.slug}`;
  return (
    <svg viewBox="0 0 640 480" preserveAspectRatio="xMidYMid slice" className={className} aria-hidden role="presentation">
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={t.bg} />
          <stop offset="1" stopColor={t.bg2} />
        </linearGradient>
      </defs>
      <rect width="640" height="480" fill={`url(#${id})`} />
      {brand.art === 'route' && <Route t={t} />}
      {brand.art === 'bloom' && <Bloom t={t} />}
      {brand.art === 'rim' && <Rim t={t} />}
      {brand.art === 'horizon' && <Horizon t={t} />}
      {brand.art === 'pulse' && <Pulse t={t} />}
      {brand.art === 'monogram' && <Monogram b={brand} />}
    </svg>
  );
}
