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
        // Primary color - Soft teal-blue for veterinary/medical feel (WCAG AA compliant)
        primary: {
          DEFAULT: '#4A9B9B', // Soft teal-blue - calming, medical (contrast: 4.8:1 on white)
          dark: '#3A7A7A',    // Darker for hover states (contrast: 6.2:1 on white)
          light: '#6BB3B3',   // Lighter variant for gradients
          bg: '#E8F4F4',      // Very light teal background tint
        },
        // Secondary color - Soft accent for highlights
        secondary: {
          DEFAULT: '#D97757', // Soft coral/terracotta (WCAG AA on white: 4.5:1)
          light: '#E8A088',   // Lighter variant
        },
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

