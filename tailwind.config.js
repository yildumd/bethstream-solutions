/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        purple: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#8b5cf6",
          600: "#7c3aed",
          700: "#6d28d9",
          800: "#5b21b6",
          900: "#4c1d95",
          950: "#2e1065",
        },
        lemon: {
          50: "#f7fee7",
          100: "#ecfccb",
          200: "#d9f99d",
          300: "#bef264",
          400: "#a3e635",
          500: "#84cc16",
          600: "#65a30d",
          700: "#4d7c0f",
          800: "#3f6212",
          900: "#365314",
        },
        sky: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        navy: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d7fe",
          300: "#a5b8fc",
          400: "#8193f8",
          500: "#6271f1",
          600: "#4d52e6",
          700: "#3f41cb",
          800: "#3437a4",
          900: "#2f3482",
          950: "#1c1e52",
        },
        brand: {
          purple: "#7C3AED",
          lemon: "#84cc16",
          sky: "#0ea5e9",
          dark: "#0f0f1a",
          navy: "#0d1b3e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans'", "Inter", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "gradient-brand":
          "linear-gradient(135deg, #7C3AED 0%, #0ea5e9 50%, #84cc16 100%)",
        "gradient-dark":
          "linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0d1b3e 100%)",
        "gradient-card":
          "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
        "gradient-hero":
          "linear-gradient(135deg, #0f0f1a 0%, #1a0a2e 40%, #0d1b3e 100%)",
        "gradient-purple-sky":
          "linear-gradient(135deg, #7C3AED 0%, #0ea5e9 100%)",
        "gradient-lemon-sky":
          "linear-gradient(135deg, #84cc16 0%, #0ea5e9 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(124, 58, 237, 0.15)",
        "glass-lg": "0 25px 50px rgba(124, 58, 237, 0.2)",
        glow: "0 0 30px rgba(124, 58, 237, 0.4)",
        "glow-lemon": "0 0 30px rgba(132, 204, 22, 0.4)",
        "glow-sky": "0 0 30px rgba(14, 165, 233, 0.4)",
        card: "0 4px 24px rgba(0,0,0,0.12)",
        "card-hover": "0 12px 40px rgba(124, 58, 237, 0.25)",
        premium: "0 20px 60px rgba(0,0,0,0.3)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        pulse_slow: "pulse 4s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        gradient: "gradient 8s ease infinite",
        scan: "scan 3s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(400%)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
