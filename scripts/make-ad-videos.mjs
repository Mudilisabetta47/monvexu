import { chromium } from 'playwright-core';
import { execFileSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const SRC = '/Users/mudilisa/Downloads/gemini_generated_video_d4be3fb0.mp4';
const OUT = '/Users/mudilisa/monvex-website/marketing/videos';
const TMP = process.argv[2];
const FONT = 'file:///Users/mudilisa/monvex-website/src/app/fonts/Archivo-latin-wdth.woff2';
mkdirSync(OUT, { recursive: true });

const variants = [
  { id: 'website-allgemein', h: 'Website <em>erstellen</em> lassen.', s: 'Modern. Mobil. Aus Bremen.' },
  { id: 'website-fahrschule', h: 'Fahrschul-Website <em>erstellen</em> lassen.', s: 'Modern. Mobil. Mit Anmeldeformular.' },
];
// Formate: w,h; Video-Ausschnitt (Quelle 1280x720)
const formats = [
  { id: '9x16', w: 1080, h: 1920 },
  { id: '1x1', w: 1080, h: 1080 },
  { id: '16x9', w: 1920, h: 1080 },
];

const html = (v, f) => `<!doctype html><meta charset=utf-8><style>
@font-face{font-family:A;src:url('${FONT}');font-weight:100 900;font-stretch:62% 125%}
*{margin:0;box-sizing:border-box}html,body{width:${f.w}px;height:${f.h}px;background:transparent;font-family:A,sans-serif;color:#fff}
.top{position:absolute;left:0;right:0;top:${f.id === '9x16' ? 150 : f.id === '1x1' ? 70 : 90}px;padding:0 ${f.id === '16x9' ? 110 : 80}px}
h1{font-weight:800;letter-spacing:-.045em;line-height:1;font-size:${f.id === '9x16' ? 112 : f.id === '1x1' ? 84 : 100}px;max-width:${f.id === '16x9' ? 1100 : 940}px;text-shadow:0 4px 40px rgba(0,0,0,.55)}
h1 em{font-style:normal;color:#ff4a1c}
p{margin-top:26px;font-size:${f.id === '9x16' ? 46 : 40}px;color:rgba(255,255,255,.85);font-weight:500;text-shadow:0 2px 20px rgba(0,0,0,.6)}
.bot{position:absolute;left:0;right:0;bottom:${f.id === '9x16' ? 150 : f.id === '1x1' ? 60 : 70}px;padding:0 ${f.id === '16x9' ? 110 : 80}px;display:flex;align-items:center;gap:28px;flex-wrap:wrap}
.btn{background:#ff4a1c;color:#fff;font-weight:700;font-size:${f.id === '9x16' ? 52 : 44}px;padding:26px 54px;border-radius:999px}
.url{font-size:${f.id === '9x16' ? 44 : 38}px;font-weight:600;color:#fff;text-shadow:0 2px 20px rgba(0,0,0,.7)}
.logo{position:absolute;right:${f.id === '16x9' ? 110 : 80}px;top:${f.id === '9x16' ? 150 : f.id === '1x1' ? 70 : 90}px;font-weight:800;letter-spacing:-.03em;font-size:${f.id === '9x16' ? 60 : 48}px;display:${f.id === '9x16' ? 'none' : 'block'}}
</style><div class=top><h1>${v.h}</h1><p>${v.s}</p></div>
<div class=bot><span class=btn>Jetzt anfragen</span><span class=url>monvex-group.de</span></div>`;

const b = await chromium.launch({ executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', headless: true });
for (const v of variants) for (const f of formats) {
  if (v.id === 'website-fahrschule' && f.id !== '9x16') continue;
  const p = await b.newPage({ viewport: { width: f.w, height: f.h } });
  await p.setContent(html(v, f)); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
  const png = `${TMP}/${v.id}_${f.id}.png`;
  await p.screenshot({ path: png, omitBackground: true }); await p.close();
  // Hintergrund: 9:16 = unscharfer Füller + 4:5-Ausschnitt; 1:1 = quadratischer Ausschnitt; 16:9 = ganzes Bild. Dunkler Verlauf für Lesbarkeit.
  let fc;
  if (f.id === '9x16') fc = `[0:v]split[a][b];[a]scale=-2:1920,crop=1080:1920,gblur=sigma=40,eq=brightness=-0.25[bg];[b]crop=576:720:432:0,scale=1080:1350[fg];[bg][fg]overlay=0:285[base]`;
  else if (f.id === '1x1') fc = `[0:v]crop=720:720:360:0,scale=1080:1080[base]`;
  else fc = `[0:v]scale=1920:1080[base]`;
  fc += `;[base]drawbox=x=0:y=0:w=iw:h=ih:color=black@0.28:t=fill[dk];[1:v]format=rgba,fade=t=in:st=0.6:d=0.7:alpha=1[ov];[dk][ov]overlay=0:0:format=auto,format=yuv420p[out]`;
  execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', SRC, '-loop', '1', '-i', png, '-filter_complex', fc, '-map', '[out]', '-t', '10', '-r', '30', '-c:v', 'libx264', '-preset', 'slow', '-crf', '21', '-profile:v', 'high', '-movflags', '+faststart', '-an', `${OUT}/monvex_${v.id}_${f.id}.mp4`]);
  console.log('ok', v.id, f.id);
}
await b.close();
