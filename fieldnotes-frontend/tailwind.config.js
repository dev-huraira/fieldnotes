/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        notebook: {
          bg: '#FAF8F4',
          text: '#242423',
          accent: '#4A6C5A', // Forest green
          accentHover: '#3B5748',
          coral: '#D98E73', // Dusty coral
          coralHover: '#C67D64',
          border: '#EAE5DB', // Warm soft border
          borderActive: '#D5CDBE',
          muted: '#807A70', // Muted text/meta
          cardBg: '#FAF8F4',
          cardHover: '#F4EFEB', // Soft hover color
          cardActive: '#EDE6DD', // Active background
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'sans-serif'],
        serif: ['Lora', 'Source Serif 4', 'serif'],
      },
      boxShadow: {
        'notebook-hover': '0 4px 12px rgba(36, 36, 35, 0.06)',
      },
      borderRadius: {
        'notebook': '8px',
      }
    },
  },
  plugins: [],
}
