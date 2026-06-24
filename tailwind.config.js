/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          50: '#F4F8FC',  // Ice Blue Light
          100: '#E2EEF9', // Soft Blue-Gray
          200: '#C5DCF4', // Accent Border
          300: '#D4AF37', // Gold
          400: '#C5A880', // Muted Gold/Brass
          500: '#60A5FA', // Bright Sky Blue
          600: '#3B82F6', // Royal Blue
          700: '#2563EB',
          800: '#1D4E89', // Mid Bright Blue
          900: '#13305C', // Brighter Navy
          950: '#0B2545', // Rich Brighter Deep Navy
        },
        cream: '#F4F8FC',
        sand: '#E2EEF9',
        gold: '#D4AF37', // Luxurious Metallic Gold
        brass: '#C5A880', // Champagne Gold
        darkText: '#0B2545',
        lightGray: '#60A5FA',
        warmBorder: '#C5DCF4',
        kaideeNavy: '#13305C',
        kaideeRed: '#E03B30',
        kaideeOrange: '#D4AF37', // Make orange gold to automatically transition orange buttons to gold
        kaideeBg: '#F4F8FC',
        kaideeBorder: '#C5DCF4',
      },
      fontFamily: {
        sans: ['Inter', 'Kanit', 'sans-serif'],
        display: ['Inter', 'Kanit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
