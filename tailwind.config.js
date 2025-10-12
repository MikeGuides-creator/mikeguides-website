/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './{products,guides,blog,bundle,free,store,toolkit}/**/*.html',
    './**/*.md',
    './**/*.js'
  ],
  theme: {
    extend: {
      fontFamily: { poppins: ['Poppins','ui-sans-serif','system-ui'] },
      colors: { 'mg-blue': '#2563eb' }
    }
  },
  plugins: []
}
