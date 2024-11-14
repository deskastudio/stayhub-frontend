/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#113F67",
        secondary: "#226597",
        white: "#F3F9FB",
        default: "#FFFFFF",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          lg: "1rem",
          xl: "6rem",
          "2xl": "6rem",
        },
      },
      fontFamily: { 
        main: ["Poppins"] 
      },
    },
  },
  plugins: [],
};
