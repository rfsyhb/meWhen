/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bekgron: '#141314',
        text: '#E6E1E3',
        card1: '#211F21',
        card2: '#2E2D2E',
        card3: '#282830',
        card4: '#636363',
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
