const { createGlobPatternsForDependencies } = require('@nx/angular/tailwind');
// const plugin = require('tailwindcss/plugin');

const { join } = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [join(__dirname, 'src/**/!(*.stories|*.spec).{ts,html}'), ...createGlobPatternsForDependencies(__dirname)],
  theme: {
    extend: {
      // colors: {
      //   red: {
      //     600: '#32a852'
      //   }
      // }
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
