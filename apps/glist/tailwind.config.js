const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
// const plugin = require('tailwindcss/plugin');

const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      colors: {
        container: {
          'fill-primary': '#FFFFFF',
          'fill-secondary': '#F7F7F7',
          'fill-tertiary': '#F2F2F2',
          'border-primary': '#E0E0E0'
        },
        text: {
          'header-1': '#212121',
          primary: '#333333',
          subtext: '#828282',
          icons: '#4F4F4F',
          disabled: '#BDBDBD',
          inverse: '#FFFFFF'
        }
      },
      scale: {
        200: '2'
      }
    },
    borderRadius: {
      avatar: '50px'
    },
    scale: {
      200: '2'
    }
  },
  plugins: []
};
