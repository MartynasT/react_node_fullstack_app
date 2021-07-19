module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
        'h-85': '85vh',
      },
      colors: {
        blue: {
          50: '#edf2f9',
          100: '#c8d7ee',
          200: '#b5cae9',
          300: '#90afdd',
          400: '#6b95d2',
          500: '#467ac7',
          600: '#3f6eb3',
          700: '#31558b',
          800: '#233d64',
          900: '#15253c'
        },
        black: {
          DEFAULT: '#202020'
        }
      }
    },
    fontFamily: {
      'sans': ['Lato','sans-serif'],
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
