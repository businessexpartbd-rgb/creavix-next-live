import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx,js,jsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Cinematic dark premium color system
        'bg-base': '#0B0E14',
        'bg-soft-dark': '#14181F',
        'bg-cream': '#F7F5F0',
        'bg-tinted': '#F0EDE4',
        'bg-accent-glow': '#1A1F2E',
        'accent-primary': '#E4B94C',
        'accent-secondary': '#6E5BFF',
        'text-on-dark': '#F5F3ED',
        'text-on-light': '#14181F',
        muted: '#A0A0A0',
        // Legacy warm colors - deprecated but kept for compatibility during migration
        warm: {
          bg: '#F7F5F0',
          'bg-soft': '#F0EDE4',
          fg: '#F5F3ED',
          muted: '#A0A0A0',
          accent: '#E4B94C',
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
        card: '0 8px 32px rgba(0, 0, 0, 0.24), inset 0 1px 0 rgba(228, 185, 76, 0.1)',
        'gold-glow': '0 0 30px rgba(228, 185, 76, 0.35)',
        'violet-glow': '0 0 30px rgba(110, 91, 255, 0.35)',
        'dark-card': '0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backgroundImage: {
        'radial-gold': 'radial-gradient(60% 60% at 50% 0%, rgba(228, 185, 76, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
        'radial-violet': 'radial-gradient(60% 60% at 50% 0%, rgba(110, 91, 255, 0.12) 0%, rgba(0, 0, 0, 0) 70%)',
        'gradient-gold': 'linear-gradient(135deg, #E4B94C 0%, #D4A236 100%)',
        'gradient-violet': 'linear-gradient(135deg, #6E5BFF 0%, #5644E8 100%)',
        'gradient-dark': 'linear-gradient(135deg, #14181F 0%, #0B0E14 100%)',
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
      spacing: {
        'container-p': '40px',
      },
    },
  },
  plugins: [
    function ({ addComponents, theme }: any) {
      addComponents({
        // Section background utilities
        '.section-dark': {
          '@apply bg-bg-base text-text-on-dark': {},
        },
        '.section-dark-soft': {
          '@apply bg-soft-dark text-text-on-dark': {},
        },
        '.section-cream': {
          '@apply bg-cream text-text-on-light': {},
        },
        '.section-tinted': {
          '@apply bg-tinted text-text-on-light': {},
        },
        '.section-glow': {
          '@apply bg-bg-accent-glow text-text-on-dark': {},
        },
        // Button styles with new colors
        '.btn-gold': {
          '@apply bg-accent-primary text-text-on-light hover:shadow-gold-glow transition-all': {},
        },
        '.btn-violet': {
          '@apply bg-accent-secondary text-white hover:shadow-violet-glow transition-all': {},
        },
        // Card styles
        '.card-modern': {
          '@apply rounded-card border border-accent-primary/15 bg-accent-primary/5': {},
        },
      });
    },
  ],
};
export default config;
