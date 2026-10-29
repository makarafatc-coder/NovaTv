/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#09090b',
          raised: '#121216',
          overlay: '#1a1a1f',
        },
        brand: {
          DEFAULT: '#6366f1',
          soft: '#818cf8',
          deep: '#4f46e5',
        },
        accent: '#a855f7',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#f59e0b',
        muted: '#71717a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        card: '1rem',
        pill: '9999px',
      },
      boxShadow: {
        premium: '0 8px 32px rgba(0,0,0,0.45)',
        glow: '0 0 40px rgba(99,102,241,0.15)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse at 20% 0%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(168,85,247,0.12) 0%, transparent 50%), linear-gradient(180deg, #09090b 0%, #0e0e12 100%)',
      },
    },
  },
  plugins: [],
};