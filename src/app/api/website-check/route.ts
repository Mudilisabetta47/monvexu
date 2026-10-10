import { NextResponse } from 'next/server';
import { analyze } from '@/lib/site-check/analyze';
import { aiConfigured, aiEvaluate } from '@/lib/site-check/ai';
import { CheckError, fetchPage, normalizeUrl, probe } from '@/lib/site-check/fetch';
import type { CheckResponse } from '@/lib/site-check/types';

export const runtime = 'nodejs';
export const maxDuration = 45;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 6;
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: CheckResponse, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';
  if (limited(ip)) return json({ ok: false, error: 'rate_limited', message: 'Zu viele Prüfungen in kurzer Zeit. Bitte versuchen Sie es in einigen Minuten erneut.' }, 429);

  let input = '';
  try {
    const body = (await req.json()) as { url?: unknown };
    input = typeof body.url === 'string' ? body.url : '';
  } catch {
    return json({ ok: false, error: 'invalid', message: 'Ungültige Anfrage.' }, 400);
  }

  try {
    const start = normalizeUrl(input);
    const page = await fetchPage(start);
    const origin = new URL(page.finalUrl).origin;
    const [robots, sitemap] = await Promise.all([probe(origin, '/robots.txt'), probe(origin, '/sitemap.xml')]);
    const report = analyze(page, robots, sitemap, start.toString());
    const configured = aiConfigured();
    const ai = configured ? await aiEvaluate(report) : null;
    return json({ ok: true, report, ai, aiConfigured: configured });
  } catch (e) {
    if (e instanceof CheckError) {
      const status = e.code === 'invalid' || e.code === 'blocked' ? 400 : 422;
      return json({ ok: false, error: e.code, message: e.message }, status);
    }
    console.error('[website-check]', e);
    return json({ ok: false, error: 'server', message: 'Die Prüfung ist fehlgeschlagen. Bitte versuchen Sie es später erneut.' }, 500);
  }
}
