/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // The Amine Protocol - Scientific Luxury Theme
        'theme-bg': '#0B1120',
        'theme-text': '#E2E8F0',

        // Primary Palette - Navy Steel Blue
        'brand': {
          DEFAULT: '#2B5797',
          50: '#EEF2F9',
          100: '#D4DFEF',
          200: '#A9BFDF',
          300: '#7E9FCF',
          400: '#3D72B5',
          500: '#2B5797',
          600: '#234A80',
          700: '#1C3D69',
          800: '#153052',
          900: '#0E233B',
        },

        // Accent - Metallic Gold
        'gold': {
          DEFAULT: '#D4AF37',
          50: '#FBF8EC',
          100: '#F5EDD0',
          200: '#EBDBA1',
          300: '#E0C86D',
          400: '#D4AF37',
          500: '#BF9A28',
          600: '#A38221',
          700: '#856A1B',
          800: '#675215',
          900: '#4A3B0F',
        },

        // Secondary & Neutral - Charcoal Navy
        'charcoal': {
          DEFAULT: '#0B1120',
          50: '#F0F2F5',
          100: '#D9DDE3',
          200: '#B3BAC5',
          300: '#8A95A5',
          400: '#617085',
          500: '#3E4F63',
          600: '#2D3B4E',
          700: '#1A2332',
          800: '#111827',
          900: '#0B1120',
        },

        // Backgrounds & Accents
        'cream': '#0F172A',
        'blush-light': '#1E293B',
        'warm-white': '#0F172A',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Playfair Display', 'serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.3), 0 4px 6px -2px rgba(0, 0, 0, 0.15)',
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(43, 87, 151, 0.1)',
        'luxury': '0 8px 30px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(43, 87, 151, 0.15)',
        'glow-blue': '0 0 20px rgba(43, 87, 151, 0.3), 0 0 40px rgba(43, 87, 151, 0.1)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      },
      borderRadius: {
        'none': '0',
        'sm': '0.25rem',
        'DEFAULT': '0.5rem',
        'md': '0.75rem',
        'lg': '1rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        'full': '9999px',
      },
      animation: {
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
        'particle-float': 'particle-float 8s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        'particle-float': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)' },
          '25%': { transform: 'translateY(-20px) translateX(10px)' },
          '50%': { transform: 'translateY(-10px) translateX(-5px)' },
          '75%': { transform: 'translateY(-25px) translateX(15px)' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'border-glow': {
          '0%, 100%': { borderColor: 'rgba(43, 87, 151, 0.3)' },
          '50%': { borderColor: 'rgba(212, 175, 55, 0.5)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
      },
    },
  },
  plugins: [],
}
