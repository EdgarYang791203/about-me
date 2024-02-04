/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ["Cabin Sketch", "cursive"],
      },
      animation: {
        "slide-in": "1s ease 0s 1 normal none running slide-in",
      },
      keyframes: {
        "slide-in": {
          "0%": { top: "-100%" },
          "100%": { top: "0px" },
        },
      },
    },
  },
  plugins: [],
};
