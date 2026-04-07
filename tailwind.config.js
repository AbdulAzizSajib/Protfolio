/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 10s linear infinite",
        "spin-fast": "spin 0.75s linear infinite",
      },
    },
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
    },
  },
  plugins: [require("daisyui")],
};
