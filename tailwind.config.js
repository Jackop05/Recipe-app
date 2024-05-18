/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textShadow: {
        'white': '0 0 50px white, 0 0 10px white, 0 0 10px white',
      }
    },
  },
  plugins: [],
}