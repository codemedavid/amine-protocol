/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // UI Design System (primary light theme)
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#1B2A4A",
          dark: "#0F1A30",
          light: "#243656",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#0B8CB8",
          dark: "#097A9F",
          light: "#0DA3D4",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D4F1F9",
          light: "#E8F7FC",
          foreground: "#1B2A4A",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },

        // Legacy colors (kept for admin dashboard compatibility)
        'theme-bg': '#0B1120',
        'theme-text': '#E2E8F0',
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
        'cream': '#0F172A',
        'blush-light': '#1E293B',
        'warm-white': '#0F172A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
        card: "0 4px 24px rgba(27, 42, 74, 0.08)",
        "card-hover": "0 8px 32px rgba(27, 42, 74, 0.12)",
        // Legacy
        'soft': '0 4px 20px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(43, 87, 151, 0.1)',
        'luxury': '0 8px 30px rgba(0, 0, 0, 0.4), 0 4px 10px rgba(43, 87, 151, 0.15)',
        'glow-blue': '0 0 20px rgba(43, 87, 151, 0.3), 0 0 40px rgba(43, 87, 151, 0.1)',
        'glow-gold': '0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255,255,255,0.05)',
      },
      keyframes: {
        // UI design keyframes
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(11, 140, 184, 0.4)" },
          "50%": { boxShadow: "0 0 20px 5px rgba(11, 140, 184, 0.2)" },
        },
        // Legacy keyframes
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'glow-pulse': {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
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
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        marquee: "marquee 30s linear infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        // Legacy
        'fadeIn': 'fadeIn 0.6s ease-out',
        'slideUp': 'slideUp 0.5s ease-out',
        'shimmer': 'shimmer 2.5s linear infinite',
        'glow-pulse-legacy': 'glow-pulse 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'spin-slow': 'spin 12s linear infinite',
        'border-glow': 'border-glow 3s ease-in-out infinite',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
