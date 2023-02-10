/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'shadows': ['Shadows Into Light', 'cursive'],
        'raleway': ['Raleway', 'sans-serif'],
      },
      screens: {
        'xs': '510px',
      }
    },
  },
  plugins: [],
}