/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          950: '#10041f',
          900: '#1a0831',
          800: '#2a0f4f',
          700: '#541f8f',
          600: '#7e22ce',
          500: '#a855f7',
          400: '#c084fc'
        }
      }
    }
  },
  plugins: []
};
