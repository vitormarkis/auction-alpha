/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mdx: "853px",
        // => @media (min-width: 853px) { ... }
        slg: "938px",
        // => @media (min-width: 938px) { ... }
      },
    },
  },
  plugins: [],
}
