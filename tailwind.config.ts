import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand core (TikTok-YouTube hybrid red)
        brand: {
          DEFAULT: '#E8173A',
          primary: '#E8173A',
          secondary: '#FF4B6E',
          deep: '#9A0F24',
        },
        // Dark surface — deep navy-black, NOT pure black
        ink: {
          950: '#06060A',
          900: '#0A0A0F',
          800: '#111118',
          700: '#18181F',
          600: '#22222B',
        },
        // Text scale
        ash: {
          50: '#F5F5F7',
          200: '#C8C8D8',
          300: '#A0A0B0',
          400: '#7A7A88',
          500: '#5A5A6E',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        bn: ['var(--font-bangla)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.06)',
        glow: '0 0 40px rgba(232,23,58,0.3)',
        'glow-lg': '0 12px 40px -8px rgba(232,23,58,0.55)',
        deep: '0 20px 60px rgba(0,0,0,0.8)',
        '3d': '0 6px 0 0 #9A0F24, 0 12px 30px rgba(232,23,58,0.35)',
      },
      backgroundImage: {
        'radial-brand':
          'radial-gradient(60% 60% at 50% 0%, rgba(232,23,58,0.18) 0%, rgba(0,0,0,0) 70%)',
        'gradient-brand': 'linear-gradient(135deg, #FF4B6E 0%, #E8173A 100%)',
        'gradient-brand-deep': 'linear-gradient(180deg, #FF4B6E 0%, #E8173A 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        // ── আগের speed (40s) ──────────────────────────────────────
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        // ── নতুন 50% slow (80s) — ClientLogosSlider এ ব্যবহার হচ্ছে ─
        'marquee-slow': 'marquee 80s linear infinite',
        'marquee-reverse-slow': 'marquee-reverse 80s linear infinite',
        // ─────────────────────────────────────────────────────────
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        float: 'float 4s ease-in-out infinite',
        'wa-pulse': 'waPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(28px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        'marquee-reverse': {
          from: { transform: 'translateX(-50%)' },
          to: { transform: 'translateX(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 4px 24px rgba(232,23,58,0.3)' },
          '50%': {
            boxShadow:
              '0 4px 50px rgba(232,23,58,0.6), 0 0 0 12px rgba(232,23,58,0.08)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        waPulse: {
          '0%, 100%': { boxShadow: '0 4px 20px rgba(37,211,102,0.4)' },
          '50%': { boxShadow: '0 4px 40px rgba(37,211,102,0.7)' },
        },
      },
      borderRadius: {
        card: '16px',
        pill: '50px',
      },
    },
  },
  plugins: [],
};
export default config;
