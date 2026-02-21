/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          brown: "rgb(var(--brand-brown) / <alpha-value>)",
          lightBrown: "rgb(var(--brand-lightBrown) / <alpha-value>)",
          cream: "rgb(var(--brand-cream) / <alpha-value>)",
          border: "rgb(var(--brand-border) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
