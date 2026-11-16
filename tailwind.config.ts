import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F2F5F9',
        snow: '#FFFFFF',
        mist: '#E4EAF1',
        ink: { DEFAULT: '#0A1F3C', 900: '#0A1F3C', 800: '#0E2A4F', 700: '#143560', 600: '#1E4678' },
        graphite: '#45536A',
        mute: '#6F7C91',
        line: { DEFAULT: 'rgba(10,31,60,.14)', soft: 'rgba(10,31,60,.07)', dark: 'rgba(255,255,255,.14)' },
        // Akzent: ruhiges Blau (vorher Orange). Der Name „ember“ bleibt, damit alle Bauteile ohne Umbau mitziehen.
        ember: { DEFAULT: '#1D5AA6', deep: '#154482', soft: 'rgba(29,90,166,.10)' },
        // Softwarebereich (/software): eigene Farbwelt, MONVEX-Ember bleibt als Markenakzent
        sw: {
          bg: '#FAFBFF',
          soft: '#F1F3FB',
          card: '#FFFFFF',
          ink: '#0C1024',
          text: '#2B3150',
          mute: '#5B6178',
          line: 'rgba(12,16,36,.09)',
          indigo: '#4F46FF',
          violet: '#8B5CF6',
          cyan: '#22D3EE',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        eyebrow: ['.72rem', { letterSpacing: '.2em', lineHeight: '1' }],
        lead: ['clamp(1.05rem,.98rem + .5vw,1.35rem)', { lineHeight: '1.55' }],
        h3: ['clamp(1.2rem,1.05rem + .7vw,1.6rem)', { lineHeight: '1.2', letterSpacing: '-.015em' }],
        h2: ['clamp(1.9rem,1.2rem + 2.6vw,3.4rem)', { lineHeight: '1.06', letterSpacing: '-.028em' }],
        h1: ['clamp(2.3rem,1.3rem + 4.4vw,5rem)', { lineHeight: '1.02', letterSpacing: '-.035em' }],
      },
      maxWidth: { shell: '1440px' },
      transitionTimingFunction: {
        out: 'cubic-bezier(.16,1,.3,1)',
        inout: 'cubic-bezier(.65,0,.35,1)',
      },
      boxShadow: {
        card: '0 1px 0 rgba(255,255,255,.9) inset, 0 1px 2px rgba(11,11,13,.04), 0 12px 32px -12px rgba(11,11,13,.12)',
        lift: '0 1px 0 rgba(255,255,255,.9) inset, 0 2px 4px rgba(11,11,13,.05), 0 40px 80px -24px rgba(11,11,13,.28)',
      },
      keyframes: {
        ticker: { to: { transform: 'translateX(-50%)' } },
        flow: { to: { strokeDashoffset: '-24' } },
        float: {
          '0%,100%': { transform: 'translate3d(0,0,0)' },
          '50%': { transform: 'translate3d(0,-10px,0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(1)', opacity: '.55' },
          '80%,100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        blink: { '50%': { opacity: '0' } },
        rise: { from: { opacity: '0', transform: 'translate3d(0,18px,0)' }, to: { opacity: '1', transform: 'none' } },
        cube: { from: { transform: 'rotateX(-22deg) rotateY(0deg)' }, to: { transform: 'rotateX(-22deg) rotateY(360deg)' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        scrollHint: {
          '0%,100%': { transform: 'scaleY(.3)', transformOrigin: 'top' },
          '50%': { transform: 'scaleY(1)', transformOrigin: 'top' },
        },
      },
      animation: {
        ticker: 'ticker 42s linear infinite',
        flow: 'flow 1.4s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-ring': 'pulseRing 2.8s cubic-bezier(.16,1,.3,1) infinite',
        blink: 'blink 1.1s steps(1) infinite',
        rise: 'rise .9s cubic-bezier(.16,1,.3,1) both',
        cube: 'cube 26s linear infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        'scroll-hint': 'scrollHint 2.2s cubic-bezier(.65,0,.35,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
