import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        // Site max content width is 1280px.
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        background: "#F8FAFC",
        primary: {
          DEFAULT: "#1E3A5F",
          light: "#2C5282",
          dark: "#15293F",
        },
        accent: {
          DEFAULT: "#F5B400",
          light: "#FFC829",
          dark: "#D99A00",
        },
        ink: "#2C2C2C",
        muted: "#6B7280",
      },
      fontFamily: {
        sans: ["var(--font-vazir)", "Tahoma", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      boxShadow: {
        soft: "0 10px 30px -12px rgba(30, 58, 95, 0.18)",
        card: "0 18px 40px -20px rgba(30, 58, 95, 0.25)",
        glow: "0 0 0 1px rgba(245, 180, 0, 0.35), 0 18px 50px -18px rgba(245, 180, 0, 0.45)",
      },
      borderRadius: {
        xl: "1rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      backgroundImage: {
        "solar-gradient": "linear-gradient(120deg, #1E3A5F 0%, #2C5282 45%, #F5B400 130%)",
        "hero-fade": "linear-gradient(to bottom, rgba(15,25,40,0.15) 0%, rgba(15,25,40,0.35) 45%, rgba(15,25,40,0.85) 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.55" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        float: "float 5s ease-in-out infinite",
        "pulse-soft": "pulse-soft 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
