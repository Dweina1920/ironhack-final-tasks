/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    screens : {

    },
    extend: {
     colors : {
      'marron' : '#B4A6AB',
      'verde' : '#DDF8E8 ',
      'marronfuerte' : '#615055',
      'marronmedio' : '#615055',
      'verdeoscuro' : '#CDD5D1',
      'turquesa' : '#0f766e',
      'azul-login' : '#388bb3'
     }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}