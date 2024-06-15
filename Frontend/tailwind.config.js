/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        antiquewhite: '#F7E7FB',
      },
    },
  },
  darkMode: 'class', // Enable class-based dark mode
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'light', // default light theme
      'dark', // default dark theme
    ],
  },
}
