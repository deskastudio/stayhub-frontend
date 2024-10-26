/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#113F67', // Warna utama
          light: '#6cb2eb',   // Versi warna lebih terang
          dark: '#226597',    // Versi warna lebih gelap
        },
        secondary: {
          DEFAULT: '#ffed4a', // Warna utama
          light: '#fff382',   // Versi warna lebih terang
          dark: '#f9c846',    // Versi warna lebih gelap
        },
      },
    },
  },
  plugins: [],
}
