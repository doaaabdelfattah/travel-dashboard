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
      },
      // screens: {
      //   'xl': { 'max': '1200px' },
      //   // => @media (max-width: 1200px) { ... }
      //   'lg': { 'max': '1080px' },
      //   // => @media (max-width: 1080px) { ... }
      //   'md-lg': { 'max': '991px' },
      //   // => @media (max-width: 991px) { ... }
      //   'md': { 'max': '767px' },
      //   // => @media (max-width: 767px) { ... }
      //   'sm': { 'max': '639px' },
      //   // => @media (max-width: 639px) { ... }
      // }
    },
  },
  plugins: [],
}