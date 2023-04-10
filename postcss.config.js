module.exports = {
  plugins: [
    {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {}
    },
    require('tailwindcss'),
    require('autoprefixer')
  ]
}
