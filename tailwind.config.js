/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
      },
      colors: {
        "purple-600": "#5457b6",
        "pink-400": "#ed6468",
        "purple-200": "#c3c4ef",
        "pink-200": "#ffb8bb",
        "grey-800": "#324152",
        "grey-500": "#67727e",
        "grey-100": "#eaecf1",
        "grey-50": "#f5f6fa",
        "white": "#ffffff",
      },
    },
  },
  plugins: [],
};
