/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'julee': ['Julee', 'cursive'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      screens: {
        'xs': '510px',
      }
    },
  },
  plugins: [],
}