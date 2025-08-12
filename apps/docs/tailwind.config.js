module.exports = {
  darkMode: ["class", "[data-theme=\"dark\"]"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./docs/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./index.html",
    "./docs/**/*.{md,mdx}",
  ],
  corePlugins: {
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        //Custom Colors
      },
      keyframes: {
        shine: {
          '0%': { 'background-position': '100%' },
          '100%': { 'background-position': '-100%' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        shine: 'shine 5s linear infinite',
        gradient: 'gradient 8s linear infinite',
      },
    },
  },
};