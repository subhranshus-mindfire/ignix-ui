module.exports = {
    darkMode: ["class"], // Docusaurus uses a "theme-dark" class by default
    content: [
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
      "./docs/**/*.{js,ts,jsx,tsx,mdx}",
      "./components/**/*.{js,ts,jsx,tsx,mdx}",
      "./index.html",
      "./docs/**/*.{md,mdx}", 
      "./node_modules/@docusaurus/theme-classic/**/*.{js,ts,jsx,tsx}",
    ],
    html: {
      transition: 'background-color 0.3s, color 0.3s',
    },
  theme: {
  },
  plugins: [require('@tailwindcss/typography')],
};