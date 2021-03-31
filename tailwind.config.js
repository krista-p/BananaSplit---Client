// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');
const scrollbar = require('tailwind-scrollbar');

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Baloo 2"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#FDD62F',
        primary_hover: '#F5C72B',
        primary_light: '#FCCE7C',
        secondary: '#261E1B',
      },
      backgroundImage: {
        'hero-pattern': "url('/AWbanana.png')",
      },
      height: {
        '100': '32rem',
      },
      width: {
        '100': '32rem',
      },
    },
  },
  plugins: [
    scrollbar,
  ],
  variants: {
    scrollbar: ['rounded'],
  },
};
