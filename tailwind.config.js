/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx,jsx,js}"],
  theme: {
    extend: {
      colors: {
        "theme-black": "#0D1321",
        "theme-dark-blue": "#1D2D44",
        "theme-med-blue": "#3E5C76",
        "theme-gray-blue": "#748CAB",
        "theme-beige": "#F0EBD8",
      },
    },
  },
  plugins: [],
};
