/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#E4F0EF",
        },
        secondary: {
          DEFAULT: "#F7F7F7",
        },
        tertiary: {
          DEFAULT: "#97F0E5",
        },
        quaternary: {
          DEFAULT: "#C684F6",
        },
      },
      scrollBehavior: ["smooth"],
    },
  },
  plugins: [],
};
