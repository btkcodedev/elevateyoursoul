/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F9FF',
          500: '#0EA5E9',
          600: '#0284C7',
        },
      },
    },
  },
  plugins: [],
};