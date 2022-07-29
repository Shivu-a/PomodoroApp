const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/renderer/**/*.tsx',
    './src/renderer/**/*.jsx',
    './src/components/**/*.jsx',
  ],
  mode: 'jit',
  theme: {
    colors: {
      // add other colors in here

      // import all colors for a wide range of pick
      ...colors,
    },
    extend: {},
  },
  plugins: [],
};
