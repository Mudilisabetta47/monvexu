import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#F6F5F1',
        snow: '#FFFFFF',
        mist: '#ECEBE6',
        ink: { DEFAULT: '#0B0B0D', 900: '#0B0B0D', 800: '#131316', 700: '#1B1C20', 600: '#2A2B31' },
        graphite: '#55575D',
        mute: '#8B8D93',
        line: { DEFAULT: 'rgba(11,11,13,.10)', soft: 'rgba(11,11,13,.06)', dark: 'rgba(255,255,255,.12)' },
        ember: { DEFAULT: '#FF4A1C', deep: '#C8340C', soft: 'rgba(255,74,28,.10)' },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'Helvetica Neue', 'Arial', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'Menlo', 'monospace'],
      },
      fontSize: {
        eyebrow: ['.72rem', { letterSpacing: '.2em', lineHeight: '1' }],
        lead: ['clamp(1.05rem,.98rem + .5vw,1.35rem)', { lineHeight: '1.55' }],
        h3: ['clamp(1.3rem,1.1rem + .9vw,1.9rem)', { lineHeight: '1.12', letterSpacing: '-.025em' }],
        h2: ['clamp(2.4rem,1.3rem + 5vw,6.25rem)', { lineHeight: '.92', letterSpacing: '-.045em' }],
        h1: ['clamp(3.4rem,1.2rem + 11vw,12rem)', { lineHeight: '.86', letterSpacing: '-.06em' }],
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
        cube: 'cube 26s linear infinite',
        'spin-slow': 'spinSlow 40s linear infinite',
        'scroll-hint': 'scrollHint 2.2s cubic-bezier(.65,0,.35,1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
