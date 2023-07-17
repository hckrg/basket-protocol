/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...defaultTheme.colors,
        green: {
          200: '#BFFFE3',
          400: '#94FFD1',
          600: '#6AFFBE',
          800: '#3FFFAC',
          900: '#16FF99',
        },
        red: {
          300: '#FF707E',
          600: '#D10014',
          800: '#70000B',
        },
        gray: {
          50: '#F4F4F4',
          100: '#E8E8E8',
          200: '#D6D6D6',
          300: '#B8B8B8',
          400: '#9E9E9E',
          600: '#696969',
          800: '#383838',
          900: '#212121',
        },
        black: {
          50: '#0000000F',
          100: '#000000',
        },
        indigo: {
          300: '#8583EC',
          400: '#5957E5',
        },
        yellow: {
          500: '#FFCE0A',
          600: '#D1A700',
          900: '#423500',
        },
        teal: {
          800: '#005070',
          900: '#002F42',
        },
        white: {
          0: '#00000000',
          30: '#FFFFFF1E',
          100: '#FFFFFF',
        },
        custom: {
          100: '#29a87400',
          200: '#29a87452',
          300: '#f4f4f9',
          400: '#f5f5ff',
          500: '#3F3EE8',
          600: '#2d2ce5'
        },
      }
    },
  },
  plugins: [],
}