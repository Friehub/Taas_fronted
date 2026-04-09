/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mint: {
          DEFAULT: '#1CCA5B',
          dark: '#16a34a',
          light: '#bbf7d0',
        },
        background: '#FFFFFF',
        foreground: '#09090B',
        institutional: {
          black: '#09090B',
          gray: '#F4F4F5',
          border: '#E4E4E7',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderWidth: {
        DEFAULT: '1px',
      },
    },
  },
  plugins: [],
}
