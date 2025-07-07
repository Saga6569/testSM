/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat'],
      },
      colors: {
        'def': '#ffffff', // по умолчанию белый
        'def-dark': '#000000', // для тёмной темы
      },
    },
  },
  plugins: [],
  darkMode: 'class', // или 'media'
};
