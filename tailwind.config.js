/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F0F0F0",
        primary: "#00B0FF",
        primaryLight: "#69E2FF",
        primaryDark: "#0081CB",
        secondary: "#01579B",
      },
      borderWidth: {
        3: "3px",
      },
      spacing: {
        66: "270px",
      },
      animation: {
        fade: "fade .3s ease-in 1",
      },
      keyframes: {
        fade: {
          from: { transform: "scale(0.5)" },
          to: { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
