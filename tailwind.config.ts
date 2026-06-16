import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Brand core — Luxury dark violet/purple system
        brand: {
          DEFAULT: '#A855F7',
          primary: '#A855F7',
          secondary: '#D8B4FE',
          deep: '#7C3AED',
          light: '#E9D5FF',
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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        bn: ['var(--font-bangla)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(0,0,0,0.6), inset 0 1px 0 rgba(168,85,247,0.06)',
        glow: '0 0 40px rgba(168,85,247,0.25)',
        'glow-lg': '0 12px 40px -8px rgba(168,85,247,0.4)',
        deep: '0 20px 60px rgba(0,0,0,0.8)',
        '3d': '0 6px 0 0 #7C3AED, 0 12px 30px rgba(168,85,247,0.3)',
      },
      backgroundImage: {
        'radial-brand':
          'radial-gradient(60% 60% at 50% 0%, rgba(168,85,247,0.15) 0%, rgba(0,0,0,0) 70%)',
        'gradient-brand': 'linear-gradient(135deg, #D8B4FE 0%, #A855F7 100%)',
        'gradient-brand-deep': 'linear-gradient(180deg, #D8B4FE 0%, #A855F7 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'marquee-reverse-slow': 'marquee-reverse 80s linear infinite',
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
          '0%, 100%': { boxShadow: '0 4px 24px rgba(168,85,247,0.25)' },
          '50%': {
            boxShadow:
              '0 4px 50px rgba(168,85,247,0.5), 0 0 0 12px rgba(168,85,247,0.08)',
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
