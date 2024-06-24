/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        cabin: ['"Cabin Sketch"', "cursive"],
      },
      animation: {
        "slide-in-top": "1s ease 0s 1 normal none running slide-in",
        "slide-in-left": "",
        "menu-hover": "1s infinite",
        "arrow-stretch": "1s ease-in-out",
      },
      keyframes: {
        "marquee-move": {
          "0%": {
            transform: "translateX(0%)",
          },
          "100%": {
            transform: "translateX(-50%)",
          },
        },
        "marquee-bg-move": {
          "0%": {
            transform: "translate3d(-70%, 0px, 0px)",
          },
          "100%": {
            transform: "translate3d(0%, 0px, 0px)",
          },
        },
        "arrow-stretch": {
          "0%": { height: "0px" },
          "100%": { height: "708px" },
        },
        "slide-in-top": {
          "0%": { top: "-100%" },
          "100%": { top: "0px" },
        },
        "slide-in-left": {
          "0%": {
            opacity: 0,
            transform: "translate3d(-100%, 0, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "menu-hover": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.2)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
