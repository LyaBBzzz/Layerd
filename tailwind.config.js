/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        anton: ['Oswald', 'sans-serif'], // Using Oswald for Cyrillic support while keeping the class name
      },
    },
  },
  plugins: [],
}
