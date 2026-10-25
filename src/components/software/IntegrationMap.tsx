import { SwIcon } from './icons';

/** Konzept-Diagramm: Produkt in der Mitte, geplante Anbindungen im Kreis. Keine Aussage, dass Anbindungen existieren. */
export function IntegrationMap({ name, icon, accent, items }: { name: string; icon: string; accent: string; items: string[] }) {
  const n = Math.min(items.length, 8);
  const W = 560;
  const H = 360;
  const cx = W / 2;
  const cy = H / 2;
  const rx = 220;
  const ry = 128;
  const nodes = items.slice(0, n).map((label, i) => {
    const a = (-90 + (360 / n) * i) * (Math.PI / 180);
    return { label, x: cx + Math.cos(a) * rx, y: cy + Math.sin(a) * ry };
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${name}: geplante Anbindungen: ${items.join(', ')}`}>
      <defs>
        <radialGradient id="imap-glow" cx=".5" cy=".5" r=".5">
          <stop offset="0" stopColor={accent} stopOpacity=".22" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={cx} cy={cy} rx={rx + 30} ry={ry + 24} fill="url(#imap-glow)" />
      <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(12,16,36,.08)" strokeDasharray="2 6" />
      {nodes.map((nd) => (
        <line key={nd.label} x1={cx} y1={cy} x2={nd.x} y2={nd.y} stroke={accent} strokeWidth="1.4" className="sw-flowline" opacity=".55" />
      ))}
      {nodes.map((nd) => (
        <g key={nd.label}>
          <rect x={nd.x - 66} y={nd.y - 15} width="132" height="30" rx="15" fill="#fff" stroke="rgba(12,16,36,.12)" />
          <text x={nd.x} y={nd.y + 4} textAnchor="middle" fontSize="11" fontWeight="600" fill="#2b3150">
            {nd.label.length > 22 ? `${nd.label.slice(0, 21)}…` : nd.label}
          </text>
        </g>
      ))}
      <g>
        <circle cx={cx} cy={cy} r="46" fill="#fff" stroke={accent} strokeWidth="2" />
        <circle cx={cx} cy={cy} r="46" fill="none" stroke={accent} strokeWidth="1" opacity=".3">
          <animate attributeName="r" values="46;62;46" dur="3.2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values=".35;0;.35" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <SwIcon name={icon} size={26} x={cx - 13} y={cy - 34} color={accent} />
        <text x={cx} y={cy + 24} textAnchor="middle" fontSize="10" fontWeight="700" fill="#0c1024">
          {name.replace('MONVEX ', '')}
        </text>
      </g>
    </svg>
  );
}
