/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'hajj-alabaster': '#F9F6F0',
        'hajj-green': '#0A3622',
        'hajj-gold': '#D4AF37',
        'hajj-navy': '#1B263B',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
