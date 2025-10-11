/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./{blog,bundle,free,guides,products,store,toolkit}/**/*.html",
    "./**/*.md",
    "./**/*.js",
    "!./node_modules/**"
  ],
  theme: {
    extend: {
      colors: { "mg-blue": "#2563eb", "mg-green": "#22c55e" },
      fontFamily: {
        inter: ["Inter", "ui-sans-serif", "system-ui"],
        poppins: ["Poppins", "Inter", "ui-sans-serif", "system-ui"]
      }
    }
  },
  plugins: []
};
