/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue:       "#1CB0F6",
          "blue-dark":"#0E9FE0",
          yellow:     "#FFD900",
          "yellow-dark": "#F0C800",
          green:      "#58CC02",
          red:        "#FF4B4B",
          purple:     "#CE82FF",
          orange:     "#FF9600",
        },
      },
      fontFamily: {
        nunito: ["Nunito", "sans-serif"],
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
    },
  },
  plugins: [],
};
