/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      Keyframes: {
        slideIn: {
          from: {
            transform: "translateY(100%)",
          },
          to: {
            transform: "translateY(0)",
          },
        },
        fadeOut: {
          to: {
            opacity: 0,
            transform: "translateX(-10px)",
          },
        },
      },
      animation: {
        slideIn: "slideIn 3s ease-out",
        fadeOut: "fadeOut 0.3s ease-in 2.7s forwards",
      },
    },
  },
  plugins: [],
};
