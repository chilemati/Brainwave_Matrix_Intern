/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mblack: "#000000f9"
      },
      fontFamily: {
        "Lato":"Lato",
        "Grypen":"Qwitcher Grypen",
        "Montserrat":"Montserrat",
      }
    },
  },
  plugins: [],
}