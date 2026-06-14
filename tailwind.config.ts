import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand core — New light theme with red accent
        brand: {
          DEFAULT: '#E11D2A',
          primary: '#E11D2A',
          secondary: '#E11D2A',
          deep: '#0F0F12',
        },
        // Light surface — NEW: Light background instead of dark
        ink: {
          950: '#FAFAFA',
          900: '#FAFAFA',
          800: '#FFFFFF',
          700: '#F5F5F3',
          600: '#E8E8E6',
        },
        // Text scale — NEW: Dark text for light backgrounds
        ash: {
          50: '#1A1A1A',
          200: '#4A4A4A',
          300: '#666666',
          400: '#888888',
          500: '#B0B0B0',
        },
      },
      fontFamily: {
        display: ['var(--font-bebas)', 'Impact', 'sans-serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        bn: ['var(--font-noto-bn)', 'var(--font-bangla)', 'system-ui', 'sans-serif'],
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
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        // ── Premium slow (100s) for ClientLogosSlider ─
        'marquee-slow': 'marquee 100s linear infinite',
        'marquee-reverse-slow': 'marquee-reverse 100s linear infinite',
        // ─────────────────────────────────────────────
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
