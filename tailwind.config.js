/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./assets/**/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      boxShadow: {
        z: "inset 1px 1px 1px rgba(0, 0, 0, 0.3)",
      },
    },
    plugins: [],
  },
};
