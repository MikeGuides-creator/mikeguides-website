module.exports = {
  content: [
    './*.html',
    './{products,guides,blog,bundle,free,store,toolkit}/**/*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: { 'mg-blue': '#2563eb' },
      fontFamily: { poppins: ['Poppins','ui-sans-serif','system-ui'] },
    }
  },
  plugins: []
};
