/** @type {import('tailwindcss').Config} */

const colors =require("tailwindcss/colors")
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    // screens : {
    //   'sm': '576px',
    //   // => @media (min-width: 576px) { ... }
    
    //   'md': '768px',
    //   // => @media (min-width: 768px) { ... }
    
    //   'lg': '992px',
    //   // => @media (min-width: 992px) { ... }
    
    //   // 'xl': '1200px',
    //   // => @media (min-width: 1200px) { ... }

    // },
    extend: {
     colors : {
      'marron' : '#B4A6AB',
      'verde' : '#DDF8E8 ',
      'marronfuerte' : '#615055',
      'marronmedio' : '#615055',
      'verdeoscuro' : '#CDD5D1',
      'turquesa' : '#0f766e',
      'azul-login' : '#388bb3',
      //colores de tailwind
      black: colors.black,
      blue: colors.blue,
      red: colors.red,
      indigo: colors.indigo,
      purple: colors.purple,
      white: colors.white,
      green: colors.green,
      slate: colors.slate,
      teal: colors.teal,
      sky: colors.sky,
      gray: colors.gray,
      rose: colors.rose,
      yellow: colors.yellow,
      amber: colors.amber,
      orange: colors.orange,
      emerald: colors.emerald,
      teal: colors.teal,
     }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}