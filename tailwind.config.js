/* eslint-disable @typescript-eslint/no-var-requires */
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  corePlugins: {
    container: false
  },
  theme: {
    extend: {
      colors: {
        orange: '#ee4d2d'
      }
    }
  },
  plugins: [
    plugin(function ({ addComponents, theme }) {
      addComponents({
        '.container': {
          maxWidth: theme('spacing.7xl'),
          marginRight: 'auto',
          paddingLeft: theme('spacing.20'),
          paddingRight: theme('spacing.20')
        }
      })
    }),
    require('@tailwindcss/line-clamp')
  ]
}
