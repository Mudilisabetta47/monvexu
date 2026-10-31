'use client';

import { useId, useState, type CSSProperties } from 'react';
import { SwIcon } from './icons';
import type { MockSpec, Panel } from '@/data/software';
import { cn } from '@/lib/cn';

/**
 * Vorschau: ein gestaltetes Oberflächenbild mit BEISPIELDATEN – keine funktionierende Software.
 * Jedes Fenster trägt sichtbar den Hinweis „Vorschau · Beispieldaten“.
 */

const palette = (a: string, a2: string) => [a, a2, '#c7cce4', '#0c1024'];

function smooth(pts: number[], w: number, h: number, pad = 6) {
  const max = Math.max(...pts, 1) * 1.08;
  const step = (w - pad * 2) / (pts.length - 1);
  const xy = pts.map((v, i) => [pad + i * step, h - pad - (v / max) * (h - pad * 2)] as const);
  let d = `M${xy[0][0]},${xy[0][1]}`;
  for (let i = 1; i < xy.length; i++) {
    const [x0, y0] = xy[i - 1];
    const [x1, y1] = xy[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx},${y0} ${cx},${y1} ${x1},${y1}`;
  }
  return { d, last: xy[xy.length - 1], first: xy[0] };
}

function Line({ p, a }: { p: Extract<Panel, { k: 'line' }>; a: string }) {
  const id = useId().replace(/:/g, '');
  const W = 300;
  const H = 120;
  const s1 = smooth(p.pts, W, H);
  const s2 = p.pts2 ? smooth(p.pts2, W, H) : null;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[120px] w-full" role="img" aria-label={p.title}>
      <defs>
        <linearGradient id={`g${id}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={a} stopOpacity=".28" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0.25, 0.5, 0.75].map((t) => (
        <line key={t} x1="0" x2={W} y1={H * t} y2={H * t} stroke="rgba(12,16,36,.06)" />
      ))}
      <path className="sw-area" d={`${s1.d} L${s1.last[0]},${H} L${s1.first[0]},${H} Z`} fill={`url(#g${id})`} />
      {s2 && <path className="sw-draw" pathLength={1} d={s2.d} fill="none" stroke="#b6bcd6" strokeWidth="1.6" strokeDasharray="1" />}
      <path className="sw-draw" pathLength={1} d={s1.d} fill="none" stroke={a} strokeWidth="2.4" strokeLinecap="round" />
      <circle className="sw-in" style={{ animationDelay: '1.2s' }} cx={s1.last[0]} cy={s1.last[1]} r="4.5" fill="#fff" stroke={a} strokeWidth="2.2" />
    </svg>
  );
}

function Bars({ p, a }: { p: Extract<Panel, { k: 'bars' }>; a: string }) {
  const max = Math.max(...p.vals);
  return (
    <div>
      <div className="flex h-[104px] items-end gap-1.5">
        {p.vals.map((v, i) => (
          <div key={i} className="flex h-full flex-1 items-end rounded-md bg-[#f1f3fb]">
            <div
              className="sw-bar w-full rounded-md"
              style={{ height: `${(v / max) * 100}%`, background: i === p.vals.length - 1 ? a : `color-mix(in srgb, ${a} 38%, #fff)`, animationDelay: `${i * 70}ms` }}
            />
          </div>
        ))}
      </div>
      {p.labels && (
        <div className="mt-1.5 flex gap-1.5 text-[.58rem] text-[#646b86]">
          {p.labels.map((l) => (
            <span key={l} className="flex-1 truncate text-center">
              {l}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function Donut({ p, a, a2 }: { p: Extract<Panel, { k: 'donut' }>; a: string; a2: string }) {
  const total = p.segs.reduce((s, x) => s + x.v, 0);
  const R = 34;
  const C = 2 * Math.PI * R;
  const cols = palette(a, a2);
  let acc = 0;
  return (
    <div className="flex items-center gap-3">
      <svg viewBox="0 0 100 100" className="h-[92px] w-[92px] shrink-0 -rotate-90" role="img" aria-label={p.title}>
        <circle cx="50" cy="50" r={R} fill="none" stroke="#f1f3fb" strokeWidth="13" />
        {p.segs.map((s, i) => {
          const len = (s.v / total) * C;
          const el = (
            <circle
              key={s.l}
              cx="50"
              cy="50"
              r={R}
              fill="none"
              stroke={cols[i % cols.length]}
              strokeWidth="13"
              strokeDasharray={`${Math.max(len - 1.5, 0)} ${C}`}
              strokeDashoffset={-acc}
              className="sw-in"
              style={{ animationDelay: `${i * 120}ms` }}
            />
          );
          acc += len;
          return el;
        })}
      </svg>
      <ul className="min-w-0 flex-1 space-y-1">
        {p.segs.map((s, i) => (
          <li key={s.l} className="flex items-center gap-1.5 text-[.64rem] text-[#4a506b]">
            <i className="h-2 w-2 shrink-0 rounded-full" style={{ background: cols[i % cols.length] }} />
            <span className="truncate">{s.l}</span>
            <b className="ml-auto font-semibold text-[#0c1024]">{s.v}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Kanban({ p, a }: { p: Extract<Panel, { k: 'kanban' }>; a: string }) {
  return (
    <div className="grid gap-1.5" style={{ gridTemplateColumns: `repeat(${p.cols.length}, minmax(0,1fr))` }}>
      {p.cols.map((c, ci) => (
        <div key={c.t} className="min-w-0 rounded-lg bg-[#f6f7fc] p-1.5">
          <p className="mb-1.5 truncate px-1 text-[.58rem] font-semibold uppercase tracking-wider text-[#646b86]">{c.t}</p>
          <div className="space-y-1.5">
            {c.cards.map((card, i) => (
              <div
                key={card}
                className="sw-in rounded-md border border-[#e8eaf5] bg-white px-2 py-1.5 text-[.62rem] font-medium text-[#1b2140] shadow-[0_1px_2px_rgba(12,16,36,.05)]"
                style={{ animationDelay: `${ci * 90 + i * 70}ms`, borderLeft: `2px solid ${ci === p.cols.length - 1 ? a : '#c7cce4'}` }}
              >
                <span className="block truncate">{card}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function Chat({ p, a }: { p: Extract<Panel, { k: 'chat' }>; a: string }) {
  return (
    <div className="space-y-1.5">
      {p.msgs.map((m, i) => (
        <div key={i} className={cn('sw-in flex', m.who === 'u' ? 'justify-end' : 'justify-start')} style={{ animationDelay: `${i * 260}ms` }}>
          <p
            className={cn('max-w-[88%] rounded-xl px-2.5 py-1.5 text-[.64rem] leading-snug', m.who === 'u' ? 'rounded-br-sm text-white' : 'rounded-bl-sm bg-[#f1f3fb] text-[#1b2140]')}
            style={m.who === 'u' ? { background: a } : undefined}
          >
            {m.t}
          </p>
        </div>
      ))}
      <div className="sw-typing sw-in px-1 pt-0.5" style={{ animationDelay: `${p.msgs.length * 260}ms` }} aria-hidden>
        <i />
        <i />
        <i />
      </div>
    </div>
  );
}

function Flow({ p, a }: { p: Extract<Panel, { k: 'flow' }>; a: string }) {
  return (
    <div className="flex items-center gap-0 py-3">
      {p.nodes.map((n, i) => (
        <div key={n} className="flex min-w-0 flex-1 items-center">
          <div
            className="sw-in min-w-0 flex-1 rounded-lg border bg-white px-1.5 py-2 text-center text-[.6rem] font-semibold leading-tight text-[#1b2140] shadow-[0_2px_8px_-4px_rgba(12,16,36,.25)]"
            style={{ borderColor: i === 0 ? a : '#e3e6f2', animationDelay: `${i * 140}ms` }}
          >
            <span className="mx-auto mb-1 grid h-4 w-4 place-items-center rounded-full text-[.5rem] text-white" style={{ background: a }}>
              {i + 1}
            </span>
            <span className="line-clamp-2">{n}</span>
          </div>
          {i < p.nodes.length - 1 && (
            <svg viewBox="0 0 24 8" className="h-2 w-4 shrink-0 sm:w-6" aria-hidden>
              <line x1="0" y1="4" x2="24" y2="4" stroke={a} strokeWidth="1.6" className="sw-flowline" />
            </svg>
          )}
        </div>
      ))}
    </div>
  );
}

const tagTone = (t?: string) => {
  if (!t) return 'bg-[#f1f3fb] text-[#5b6178]';
  if (/überfällig|fehler|verzug|warn|bald|!/i.test(t)) return 'bg-amber-50 text-amber-700';
  if (/ok|bezahlt|erledigt|bestätigt|gewonnen/i.test(t)) return 'bg-emerald-50 text-emerald-700';
  return 'bg-[#f1f3fb] text-[#5b6178]';
};

function List({ p }: { p: Extract<Panel, { k: 'list' }> }) {
  return (
    <ul className="divide-y divide-[#eef0f8]">
      {p.rows.map((r, i) => (
        <li key={r.t} className="sw-in flex items-center gap-2 py-1.5" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[.64rem] font-semibold text-[#1b2140]">{r.t}</p>
            <p className="truncate text-[.58rem] text-[#646b86]">{r.s}</p>
          </div>
          {r.tag && <span className={cn('shrink-0 rounded-full px-1.5 py-0.5 text-[.56rem] font-semibold', tagTone(r.tag))}>{r.tag}</span>}
        </li>
      ))}
    </ul>
  );
}

function Cal({ p, a }: { p: Extract<Panel, { k: 'cal' }>; a: string }) {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr'];
  return (
    <div className="grid grid-cols-5 gap-1">
      {days.map((d) => (
        <p key={d} className="text-center text-[.56rem] font-semibold uppercase tracking-wider text-[#646b86]">
          {d}
        </p>
      ))}
      <div className="col-span-5 grid h-[92px] grid-cols-5 grid-rows-3 gap-1">
        {Array.from({ length: 15 }).map((_, i) => (
          <i key={i} className="rounded bg-[#f6f7fc]" style={{ gridColumn: (i % 5) + 1, gridRow: Math.floor(i / 5) + 1 }} />
        ))}
        {p.events.map((e, i) => (
          <b
            key={i}
            className="sw-in z-[1] flex items-center truncate rounded px-1 text-[.56rem] font-semibold text-white"
            style={{ gridColumn: e.d + 1, gridRow: `${e.r + 1} / span ${e.h ?? 1}`, background: a, opacity: 0.92 - (i % 3) * 0.14, animationDelay: `${i * 110}ms` }}
          >
            <span className="truncate">{e.t}</span>
          </b>
        ))}
      </div>
    </div>
  );
}

function Route({ p, a }: { p: Extract<Panel, { k: 'route' }>; a: string }) {
  const id = useId().replace(/:/g, '');
  const W = 300;
  const H = 110;
  const n = p.stops.length;
  const pts = p.stops.map((_, i) => [18 + (i * (W - 36)) / (n - 1), i % 2 === 0 ? 76 : 32] as const);
  let d = `M${pts[0][0]},${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const cx = (pts[i - 1][0] + pts[i][0]) / 2;
    d += ` C${cx},${pts[i - 1][1]} ${cx},${pts[i][1]} ${pts[i][0]},${pts[i][1]}`;
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-[110px] w-full" role="img" aria-label={p.title}>
      <path id={`r${id}`} d={d} fill="none" stroke="#dfe3f3" strokeWidth="5" strokeLinecap="round" />
      <path d={d} fill="none" stroke={a} strokeWidth="2" className="sw-flowline" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#fff" stroke={a} strokeWidth="2" />
          <text x={x} y={y + (i % 2 === 0 ? 17 : -10)} textAnchor="middle" fontSize="8" fill="#5b6178">
            {p.stops[i]}
          </text>
        </g>
      ))}
      <circle r="4.5" fill={a}>
        <animateMotion dur="6s" repeatCount="indefinite">
          <mpath href={`#r${id}`} />
        </animateMotion>
      </circle>
    </svg>
  );
}

function Heat({ p, a }: { p: Extract<Panel, { k: 'heat' }>; a: string }) {
  const cells = Array.from({ length: 35 }).map((_, i) => {
    const v = Math.abs(Math.sin((i + 1) * (p.seed + 3) * 12.9898) * 43758.5453) % 1;
    return 0.12 + v * 0.88;
  });
  return (
    <div className="grid grid-cols-7 gap-1">
      {cells.map((v, i) => (
        <i key={i} className="sw-in block aspect-[1.5] rounded" style={{ background: `color-mix(in srgb, ${a} ${Math.round(v * 100)}%, #f3f4fb)`, animationDelay: `${(i % 7) * 40 + Math.floor(i / 7) * 30}ms` }} />
      ))}
    </div>
  );
}

function Gauge({ p, a }: { p: Extract<Panel, { k: 'gauge' }>; a: string }) {
  const len = 126; // Halbkreis r=40 → π·40
  const off = len - (p.v / 100) * len;
  return (
    <div className="relative mx-auto w-[150px]">
      <svg viewBox="0 0 100 56" className="w-full" role="img" aria-label={`${p.title}: ${p.v} %`}>
        <path d="M10,50 A40,40 0 0 1 90,50" fill="none" stroke="#eef0f8" strokeWidth="9" strokeLinecap="round" />
        <path d="M10,50 A40,40 0 0 1 90,50" fill="none" stroke={a} strokeWidth="9" strokeLinecap="round" className="sw-gauge" style={{ '--len': len, '--off': off } as CSSProperties} />
      </svg>
      <p className="absolute inset-x-0 bottom-0 text-center text-lg font-semibold tracking-tight text-[#0c1024]">{p.v} %</p>
      <p className="mt-1 text-center text-[.6rem] text-[#646b86]">{p.sub}</p>
    </div>
  );
}

export function PanelView({ p, a, a2 }: { p: Panel; a: string; a2: string }) {
  switch (p.k) {
    case 'line':
      return <Line p={p} a={a} />;
    case 'bars':
      return <Bars p={p} a={a} />;
    case 'donut':
      return <Donut p={p} a={a} a2={a2} />;
    case 'kanban':
      return <Kanban p={p} a={a} />;
    case 'chat':
      return <Chat p={p} a={a} />;
    case 'flow':
      return <Flow p={p} a={a} />;
    case 'list':
      return <List p={p} />;
    case 'cal':
      return <Cal p={p} a={a} />;
    case 'route':
      return <Route p={p} a={a} />;
    case 'heat':
      return <Heat p={p} a={a} />;
    case 'gauge':
      return <Gauge p={p} a={a} />;
  }
}

type Props = {
  spec: MockSpec;
  name: string;
  accent: string;
  accent2: string;
  className?: string;
  /** Kleinere Darstellung (Karten): ohne Seitenleiste und Tabs. */
  mini?: boolean;
};

export function SoftwareMock({ spec, name, accent, accent2, className, mini }: Props) {
  const [i, setI] = useState(0);
  const view = spec.views[Math.min(i, spec.views.length - 1)];
  const uid = useId().replace(/:/g, '');
  return (
    <div className={cn('sw-win', className)} style={{ '--a': accent, '--a2': accent2 } as CSSProperties} role="group" aria-label={`Vorschau von ${name}, Beispieldaten`}>
      <div className="sw-win-bar">
        <span className="sw-win-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="min-w-0 flex-1 truncate text-[.68rem] font-semibold text-[#2b3150]">
          {name} <span className="font-normal text-[#646b86]">· {spec.screen}</span>
        </span>
        <span className="sw-badge">Vorschau · Beispieldaten</span>
      </div>
      <div className="sw-win-body">
        <div className="sw-side" aria-hidden>
          {spec.nav.map((n, k) => (
            <b key={n.l} className={k === 0 ? 'on' : ''} title={n.l}>
              <SwIcon name={n.icon} size={16} />
            </b>
          ))}
        </div>
        <div className="sw-main">
          <div className="flex items-center gap-2">
            <p className="min-w-0 flex-1 truncate text-[.9rem] font-semibold tracking-tight text-sw-ink">{spec.screen}</p>
            {!mini && spec.views.length > 1 && (
              <div role="tablist" aria-label="Ansicht wechseln" className="flex shrink-0 gap-1 rounded-full bg-[#f1f3fb] p-0.5">
                {spec.views.map((v, k) => (
                  <button key={v.label} role="tab" id={`${uid}-t${k}`} aria-selected={k === i} className="sw-tab" onClick={() => setI(k)}>
                    {v.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div key={i} role={mini ? undefined : 'tabpanel'} aria-labelledby={mini ? undefined : `${uid}-t${i}`}>
            <div className="sw-kpis">
              {view.kpis.map((k) => (
                <div key={k.l} className="sw-kpi">
                  <small>{k.l}</small>
                  <strong>
                    {k.v}
                    {k.d && <em className={k.d === '!' ? 'warn' : ''}>{k.d}</em>}
                  </strong>
                </div>
              ))}
            </div>
            <div className={cn('sw-panels', (!view.b || mini) && 'single')}>
              <div className="sw-panel">
                <p className="sw-panel-title">{view.a.title}</p>
                <PanelView p={view.a} a={accent} a2={accent2} />
              </div>
              {view.b && !mini && (
                <div className="sw-panel">
                  <p className="sw-panel-title">{view.b.title}</p>
                  <PanelView p={view.b} a={accent} a2={accent2} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
