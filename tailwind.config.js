/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          blue:     "#1B4FD8",
          blueDark: "#1440B3",
          blueLight:"#EEF2FF",
          accent:   "#16A34A",
          slate:    "#1E293B",
          gray:     "#64748B",
          border:   "#E2E8F0",
          bg:       "#F8FAFC",
          white:    "#FFFFFF",
        },
      },
      fontFamily: {
        sans:    ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
      },
      boxShadow: {
        card:    "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 40px rgba(27,79,216,0.12)",
        btn:     "0 1px 2px rgba(0,0,0,0.08)",
        nav:     "0 1px 0 #E2E8F0",
      },
    },
  },
  plugins: [],
};
