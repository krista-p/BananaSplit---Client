// eslint-disable-next-line import/no-extraneous-dependencies
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}'],
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
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
