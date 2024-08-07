/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],  theme: {
    extend: {
      boxShadow: {
        'custom-white': '0px 0px 30px rgba(255, 255, 255)', // Custom shadow
      }
    },
  },
  plugins: [],
}

