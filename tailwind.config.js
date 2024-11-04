/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-grey': '#fbfbfc',
        'main-color': '#c6783e',
        'main-light': '#dcae8b',
        'main-dark': '#8a542b',
        'border-color': '#E9EAED',
        'dark-grey': '#cacacb',
        'main-text': '#1e293b',
        // 'navy-text': '#1e2c3e',


      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),

  ],
}