/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-bg': 'hsla(0, 0%, 100%, 0.05)',
        'active-bg':'hsla(0, 0%, 100%, 0.1)',
        'border-player':'hsla(0,0%,100%,0.1)',
      },
      borderColor:{
        'border-color-left-custom':'#9b4de0',
        'custom-border-top': 'hsla(0, 0%, 100%, 0.1)',
      },
      colors:{
        'color-custom':'hsla(0,0%,100%,0.5)'
      }
    },
  },
  plugins: [],
}

