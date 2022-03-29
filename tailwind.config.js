module.exports = {
   purge: ['./public/**/*.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
   darkMode: false, // or 'media' or 'class'
   theme: {
      extend: {
         colors: {
            'primary' : '#1d1d26',
            'secondary' : '#ef3a71'
         },
         spacing: {
         '90%' : '90%'
         }
      },
   },
   variants: {
      extend: {},
   },
   plugins: [],
}
