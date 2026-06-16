import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Warm premium light color system
        warm: {
          bg: '#FEFAE0',
          'bg-soft': '#FFE6A7',
          fg: '#03071E',
          muted: '#656D4A',
          accent: '#EB5E28',
        },
      },
      fontFamily: {
        display: ['Righteous', 'sans-serif'],
        serif: ['DM Serif Text', 'serif'],
        'serif-alt': ['Lobster', 'cursive'],
        sans: ['Dosis', 'system-ui', 'sans-serif'],
        bn: ['Hind Siliguri', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 8px 32px rgba(0, 0, 0, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.5)',
        warm: '0 6px 20px rgba(235, 94, 40, 0.35)',
        'warm-glow': '0 0 30px rgba(235, 94, 40, 0.35)',
      },
      backgroundImage: {
        'radial-warm':
          'radial-gradient(60% 60% at 50% 0%, rgba(235, 94, 40, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        'gradient-orange': 'linear-gradient(135deg, #FFB347 0%, #EB5E28 100%)',
        'gradient-warm': 'linear-gradient(135deg, #FFEEEE 0%, #DDEFBB 51%, #FFEEEE 100%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        'fade-in': 'fadeIn 0.6s ease-out both',
        marquee: 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
        'marquee-slow': 'marquee 80s linear infinite',
        'marquee-reverse-slow': 'marquee-reverse 80s linear infinite',
        'pulse-orange': 'pulseOrange 3s ease-in-out infinite',
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
        pulseOrange: {
          '0%, 100%': { boxShadow: '0 4px 24px rgba(235, 94, 40, 0.25)' },
          '50%': {
            boxShadow: '0 4px 50px rgba(235, 94, 40, 0.5), 0 0 0 12px rgba(235, 94, 40, 0.08)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        waPulse: {
          '0%, 100%': { boxShadow: '0 4px 20px rgba(37, 211, 102, 0.4)' },
          '50%': { boxShadow: '0 4px 40px rgba(37, 211, 102, 0.7)' },
        },
      },
      borderRadius: {
        card: '16px',
        pill: '9999px',
      },
    },
  },
  plugins: [],
};
export default config;
