/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/**/*.ejs",
    "./node_modules/flowbite/**/*.js"
  ],
  
  theme: {
    
    
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'tahiti': {
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        },
        // ...
      },
      height: {
        '112': '28rem',
        '128':  '32rem'
      }
    },

  },
  plugins: [
    require('flowbite/plugin')
  ],
}


