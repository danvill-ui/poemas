/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        h1: ["2.5rem", { lineHeight: "3rem", fontWeight: "700" }], // ~40px
        h2: ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }], // ~32px
        h3: ["1.75rem", { lineHeight: "2.25rem", fontWeight: "500" }], // ~28px
        h4: ["1.5rem", { lineHeight: "2rem", fontWeight: "500" }], // ~24px
        h5: ["1.25rem", { lineHeight: "1.75rem", fontWeight: "400" }], // ~20px
        h6: ["1rem", { lineHeight: "1.5rem", fontWeight: "400" }], // ~16px
      },
      lineHeight: {
        'half': '0.5',   // equivale a 50%
      },
      colors: {

        marble: '#F2EFE9',
        onyx: '#1C1C1C',
        gold: '#B89D66',
        terracotta: '#9E6746',
        aegean: '#5E7E8E',
        orfeo: {
            transgresion: '#C41E3A', // Contraste fuerte con 'onyx' y 'marble'
            eco: '#40E0D0',          // Armoniza con 'aegean'
            katarsis: '#FFD700',     // Complementario elegante para 'gold'
          },
      },
      container: {
      center: true,       // centra automáticamente
      padding: '2rem',    // padding interno por defecto
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
    },
      fontFamily: {
        'serif':['Cinzel','EB Garamond', 'serif'],
        'sans':['Roboto','sans-serif'],
        'title': ['"Dorsa"', 'sans-serif'],
         'arvo': ['Arvo', 'serif'],
         'icons': ['icomoon', 'sans-serif'],
      },
    },
  },
  plugins: [  
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),],
};
