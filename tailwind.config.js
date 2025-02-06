import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        sm: "576px",
        md: "768px",
        lg: "1024px",
        xl: "1200px",
        huge: "1920px",
      },
      fontFamily: {
        cabin: ['"Cabin Sketch"', "cursive"],
      },
      animation: {
        "slide-in-top": "1s ease 0s 1 normal none running slide-in",
        "slide-in-left": "",
        "slide-in-right": "",
        "slide-in-bottom": "",
        "slide-out": "",
        "menu-hover": "1s infinite",
        "arrow-stretch": "1s ease-in-out",
        "fade-in": "",
        "slide-left-fade":
          "slide-in-left 700ms ease, fade-out 300ms ease 700ms",
        "slide-right-fade":
          "slide-in-right 700ms ease, fade-out 300ms ease 700ms",
        wobble: "700ms",
      },
      keyframes: {
        wobble: {
          "0%": {
            transform: "scale(0) rotate(-54deg) translatey(40px)",
          },
          "45%": {
            transform: "scale(1.1) rotate(20deg) translatey(0px)",
          },
          "60%": {
            transform: "scale(1) rotate(-15deg) translatey(0px)",
          },
          "77%": {
            transform: "scale(1) rotate(10deg) translatey(0px)",
          },
          "100% ": {
            transform: "translatey(0)",
          },
        },
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
        "fade-in": {
          "0%": { opacity: "0", display: "none" },
          "100%": { opacity: "1", display: "block" },
        },
        "fade-out": {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        "slide-in-top": {
          "0%": { top: "-100%" },
          "100%": { top: "0px" },
        },
        "slide-in-bottom": {
          "0%": { opacity: 0, transform: "translateY(100%)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
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
        "slide-in-right": {
          "0%": {
            opacity: 0,
            transform: "translate3d(50%, 0, 0)",
          },
          "100%": {
            opacity: 1,
            transform: "translate3d(0, 0, 0)",
          },
        },
        "slide-out-right": {
          "0%": {
            opacity: 1,
            transform: "translateX(0)",
          },
          "100%": {
            opacity: 0,
            transform: "translateX(100%)",
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
        shake: {
          "0%, 100%": {
            transform: "translateZ(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translate3d(-10px, 0, 0)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translate3d(10px, 0, 0)",
          },
        },
      },
    },
  },
  plugins: [],
};
