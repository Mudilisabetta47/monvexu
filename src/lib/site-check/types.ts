export type Status = 'ok' | 'warn' | 'bad';
export type CategoryId = 'technik' | 'mobil' | 'seo' | 'vertrauen';

export type Finding = { id: string; category: CategoryId; label: string; status: Status; detail: string; tip?: string };

export type Report = {
  url: string;
  finalUrl: string;
  host: string;
  score: number;
  categories: { id: CategoryId; label: string; score: number }[];
  findings: Finding[];
  facts: { title: string; description: string; h1: string[]; h2: string[]; words: number; responseMs: number; lang: string; excerpt: string };
  checkedAt: string;
};

export type AiResult = {
  firstImpression: string;
  summary: string;
  improvements: { title: string; why: string; how: string }[];
};

export type CheckResponse =
  | { ok: true; report: Report; ai: AiResult | null; aiConfigured: boolean }
  | { ok: false; error: 'invalid' | 'blocked' | 'unreachable' | 'timeout' | 'not_html' | 'rate_limited' | 'server'; message: string };
