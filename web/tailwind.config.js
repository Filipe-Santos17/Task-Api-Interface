/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/*.{tsx,ts}",
    "./src/**/*.{tsx,ts}",
    "./src/**/**/*.{tsx,ts}",
    "./index.html"
  ],
  theme: {
    extend: {
      colors:{
        bgBody: "#202124",
        purpleLigth: "#A8A4FF",
        black: "#232324",
        red: "#EA5555",
        gray10: "#20212C",
        gray20: "#2B2C37",
        gray30: "#3E3F4E",
        gray40: "#828FA3",
        gray45: "#50626f",
        gray50: "#E4EBFA",
        gray60: "#F4F7FD",
      }
    },
  },
  plugins: [],
}

