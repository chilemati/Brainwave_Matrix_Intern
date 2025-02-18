/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mblue: "#4a6da7",
        mblue2: "#0a224b",
        mblue3: "#9fb9e3",
        mblack: "#292929",
        mblack1: "#121212",
        mblack2: "#272727",
        mgray: "#a7a7a7",
        mgray2: "#292929",
        mgray3: "#3c3c3c",
        mgray4: "#343434",
      },
      fontFamily: {
        "Lato":"Lato",
        "Grypen":"Qwitcher Grypen",
        "Montserrat":"Montserrat",
        "NotoSans": "Noto Sans",
      }
    },
  },
  plugins: [],
}