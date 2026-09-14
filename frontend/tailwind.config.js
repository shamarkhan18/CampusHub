/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1E1B2E',
        surface: '#F7F7FB',
        card: '#FFFFFF',
        primary: {
          DEFAULT: '#5B5FEF',
          light: '#EEF0FE',
          dark: '#4547C4',
        },
        coral: '#FF6B6B',
        mint: '#22C55E',
        amber: '#FBBF24',
        muted: '#8A8797',
        line: '#ECEAF4',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      boxShadow: {
        soft: '0 8px 24px -8px rgba(30, 27, 46, 0.12)',
        card: '0 2px 12px -2px rgba(30, 27, 46, 0.08)',
      },
    },
  },
  plugins: [],
};