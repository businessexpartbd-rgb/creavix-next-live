/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#050505',
          900: '#0a0a0a',
          800: '#111111',
          700: '#1a1a1a',
        },
        gold: {
          400: '#f4b94c',
          500: '#e0a838',
          600: '#c08a1f',
        },
        cream: '#f0ebe1',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        bn: ['var(--font-hind-siliguri)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 30px 80px -30px rgba(244, 185, 76, 0.35)',
        card: '0 20px 60px -20px rgba(0, 0, 0, 0.55)',
      },
      backgroundImage: {
        'radial-gold':
          'radial-gradient(60% 60% at 50% 0%, rgba(244,185,76,0.18) 0%, rgba(0,0,0,0) 70%)',
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease-out both',
        marquee: 'marquee 40s linear infinite',
        glow: 'glow 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
