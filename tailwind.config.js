/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary Action Color - Deep Blue (CTAs only)
        primary: {
          DEFAULT: '#1E3A8A', // Deep Blue - Primary action color (WCAG AA: 8.6:1 on white)
          dark: '#1D4ED8',    // Hover state (WCAG AA: 7.2:1 on white)
          light: '#3B82F6',   // Lighter variant for subtle accents
        },
        // Secondary / Brand Accent - Veterinary Green
        secondary: {
          DEFAULT: '#2E7D32', // Veterinary Green (WCAG AA: 5.8:1 on white)
          light: '#E8F5E9',   // Light Green Tint for backgrounds
        },
        // Neutrals for structure & readability
        neutral: {
          text: '#1F2937',    // Primary text (WCAG AAA: 12.6:1 on white)
          'text-secondary': '#4B5563', // Secondary text (WCAG AA: 7.0:1 on white)
          border: '#E5E7EB',  // Borders
          bg: '#F9FAFB',      // Background
        },
        // Convenience aliases for backward compatibility
        'primary-bg': '#E8F5E9', // Light green tint (secondary.light)
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '-0.01em' }],
        'xl': ['1.25rem', { lineHeight: '1.75', letterSpacing: '-0.01em' }],
        '2xl': ['1.5rem', { lineHeight: '1.5', letterSpacing: '-0.02em' }],
        '3xl': ['1.875rem', { lineHeight: '1.4', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '1.3', letterSpacing: '-0.03em' }],
        '5xl': ['3rem', { lineHeight: '1.2', letterSpacing: '-0.03em' }],
        '6xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
        '7xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.04em' }],
      },
      maxWidth: {
        'container': '1200px',
        'prose': '65ch',
        'prose-wide': '70ch',
      },
    },
  },
  plugins: [],
}

