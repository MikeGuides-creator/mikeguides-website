/** @type {import('tailwindcss').Config} */
module.exports = {
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./{blog,bundle,free,guides,products,store,toolkit}/**/*.html",
    "./**/*.md",
    "./**/*.js",
    "!./node_modules/**"
  ],
  safelist: [
    // Layout & spacing
    { pattern: /^(container|mx-|my-|mt-|mr-|mb-|ml-|px-|py-|pt-|pr-|pb-|pl-|p-|m-|gap-|grid|col-|row-)/ },
    // Flex/grid helpers
    { pattern: /^(flex|inline-flex|items-|justify-|content-|self-)/ },
    // Sizing & radius & shadow
    { pattern: /^(w-|h-|max-w-|min-h-|rounded(-[a-z0-9-]+)?|shadow(-[a-z]+)?)/ },
    // Typography & alignment
    { pattern: /^(text-|leading-|tracking-|font-(inter|poppins|bold|semibold)|prose)/ },
    // Colors (bg, text, border, gradient stops)
    { pattern: /^(bg|text|border|from|via|to)-(slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|white|black)-?(50|100|200|300|400|500|600|700|800|900)?/ },
    // Opacity & hover states
    { pattern: /^(hover:)?(bg|text|border)-[a-z]+-(50|100|200|300|400|500|600|700|800|900)/ },
    // MikeGuides brand classes if you’ve used them
    { pattern: /^(bg-mg-blue|text-mg-blue|bg-mg-green|text-mg-green)/ }
  ],
  theme: {
    extend: {
      colors: { 'mg-blue': '#2563eb', 'mg-green': '#22c55e' },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'), // optional, great if you use prose content
    // require('@tailwindcss/forms'),    // uncomment if you have forms
    // require('@tailwindcss/aspect-ratio') // uncomment if you embed videos/images with ratios
  ]
};

  theme: {
    extend: {
      colors: { 'mg-blue': '#2563eb', 'mg-green': '#22c55e' },
      fontFamily: {
        inter: ['Inter', 'ui-sans-serif', 'system-ui'],
        poppins: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui'],
      }
    },
  },
  plugins: [],
};
