/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#113F67', // Warna utama
          light: '#6cb2eb', // Versi warna lebih terang
          dark: '#226597', // Versi warna lebih gelap
          custom: '#F3F9FB', //warna latar
          textDark: '#26282B',
          textLight: '#7d7d7d',
          bgprimary: '#F2F4F7',
        },
        secondary: {
          DEFAULT: '#227DCD', // Warna utama
          light: '#fff382', // Versi warna lebih terang
          dark: '#f9c846', // Versi warna lebih gelap
        },
        white: '#F3F9FB', // Warna putih
        default: '#FFFFFF', // Warna default
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1rem',
          lg: '1rem',
          xl: '1rem',
          xl: '6rem',
          '2xl': '6rem',
        },
      },
      fontFamily: {
        poppins: ['Poppins'], // Font untuk poppins
        main: ['Poppins'], // Font utama
      },
    },
  },
  plugins: [],
};
