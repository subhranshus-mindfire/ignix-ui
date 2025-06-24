module.exports = {
  darkMode: ["class", "[data-theme=\"dark\"]"],
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
        colors: {
          border: 'hsl(var(--border))',
          input: 'hsl(var(--input))',
          ring: 'hsl(var(--ring))',
          background: 'hsl(var(--background))',
          foreground: 'hsl(var(--foreground))',
          primary: {
              DEFAULT: 'hsl(var(--primary))',
              foreground: 'hsl(var(--primary-foreground))',
          },
          secondary: {
              DEFAULT: 'hsl(var(--secondary))',
              foreground: 'hsl(var(--secondary-foreground))',
          },
          destructive: {
              DEFAULT: 'hsl(var(--destructive))',
              foreground: 'hsl(var(--destructive-foreground))',
          },
          muted: {
              DEFAULT: 'hsl(var(--muted))',
              foreground: 'hsl(var(--muted-foreground))',
          },
          accent: {
              DEFAULT: 'hsl(var(--accent))',
              foreground: 'hsl(var(--accent-foreground))',
          },
          popover: {
              DEFAULT: 'hsl(var(--popover))',
              foreground: 'hsl(var(--popover-foreground))',
          },
          card: {
              DEFAULT: 'hsl(var(--card))',
              foreground: 'hsl(var(--card-foreground))',
          },
        },
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
        keyframes: {
          'fade-up': {
              '0%': { opacity: '0', transform: 'translateY(20px)' },
              '100%': { opacity: '1', transform: 'translateY(0)' },
          },
          'pulse-slow': {
              '50%': { opacity: '.5' },
          },
          'rotate-slow': {
              '100%': { transform: 'rotate(360deg)' },
          },
          'float': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-20px)' },
          },
          'bounce-slow': {
            '0%, 100%': {
                transform: 'translateY(-10%)',
                animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
            },
            '50%': {
                transform: 'translateY(0)',
                animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            },
          },
          'scale-pulse': {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
          }
        },
        animation: {
            'fade-up': 'fade-up 0.8s ease-out forwards',
            'pulse-slow': 'pulse-slow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            'rotate-slow': 'rotate-slow 15s linear infinite',
            'float': 'float 6s ease-in-out infinite',
            'bounce-slow': 'bounce-slow 3s infinite',
            'scale-pulse': 'scale-pulse 2s ease-in-out infinite'
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