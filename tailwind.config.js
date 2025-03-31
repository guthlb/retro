/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scans all JS, JSX, TS, and TSX files in src/
    "./public/index.html",         // Scans the main HTML file
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
