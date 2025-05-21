const { h1 } = require('framer-motion/client');

module.exports = {
    darkMode: ["class"], // Docusaurus uses a "theme-dark" class by default
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./docs/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./index.html",
      "./docs/**/*.{md,mdx}", 
    ],
    html: {
      transition: 'background-color 0.3s, color 0.3s',
    },
    theme: {
        extend: {
          fontSize: {
            h1: '2.25rem',    // 36px
            h2: '1.875rem',   // 30px
            h3: '1.5rem',     // 24px
            h4: '1.25rem',    // 20px
            h5: '1.125rem',   // 18px
            h6: '1rem',       // 16px
          },
          lineHeight: {
            h1: '2.5rem',     // 40px
            h2: '2.25rem',    // 36px
            h3: '2rem',       // 32px
            h4: '1.75rem',    // 28px
            h5: '1.5rem',     // 24px
            h6: '1.5rem',     // 24px
          },
          fontWeight: {
            h1: '700',
            h2: '700',
            h3: '700',
            h4: '700',
            h5: '700',
            h6: '700',
          },
        }
      },
      plugins: [
        function ({ addBase, theme }) {
          addBase({
            h1: {
              fontSize: theme('fontSize.h1'),
              lineHeight: theme('lineHeight.h1'),
              fontWeight: theme('fontWeight.h1'),
            },
            h2: {
              fontSize: theme('fontSize.h2'),
              lineHeight: theme('lineHeight.h2'),
              fontWeight: theme('fontWeight.h2'),
            },
            h3: {
              fontSize: theme('fontSize.h3'),
              lineHeight: theme('lineHeight.h3'),
              fontWeight: theme('fontWeight.h3'),
            },
            h4: {
              fontSize: theme('fontSize.h4'),
              lineHeight: theme('lineHeight.h4'),
              fontWeight: theme('fontWeight.h4'),
            },
            h5: {
              fontSize: theme('fontSize.h5'),
              lineHeight: theme('lineHeight.h5'),
              fontWeight: theme('fontWeight.h5'),
            },
            h6: {
              fontSize: theme('fontSize.h6'),
              lineHeight: theme('lineHeight.h6'),
              fontWeight: theme('fontWeight.h6'),
            },
          });
        },
      ],
};