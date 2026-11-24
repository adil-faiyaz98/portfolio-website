import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Professional blue/white design inspired by AWS SDK and MDA Space
        background: "#FAFAFA",
        surface: "#FFFFFF",
        "surface-elevated": "#F1F5F9",
        "accent-primary": "#0066CC",
        "accent-primary-hover": "#0052A3",
        "accent-secondary": "#10B981",
        "accent-tertiary": "#0066CC",
        "accent-success": "#10B981",
        "text-primary": "#1A1A2E",
        "text-secondary": "#4A5568",
        "text-muted": "#718096",
        border: "rgba(26, 26, 46, 0.10)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      fontSize: {
        // Modern fluid typography scale
        "display-xl": [
          "clamp(3rem, 8vw, 5rem)",
          { lineHeight: "1.1", fontWeight: "800", letterSpacing: "-0.02em" },
        ],
        display: [
          "clamp(2.5rem, 6vw, 4rem)",
          { lineHeight: "1.15", fontWeight: "700", letterSpacing: "-0.02em" },
        ],
        h1: [
          "clamp(2rem, 5vw, 3.5rem)",
          { lineHeight: "1.2", fontWeight: "700", letterSpacing: "-0.01em" },
        ],
        h2: [
          "clamp(1.75rem, 4vw, 2.5rem)",
          { lineHeight: "1.25", fontWeight: "600", letterSpacing: "-0.01em" },
        ],
        h3: [
          "clamp(1.25rem, 2.5vw, 1.75rem)",
          { lineHeight: "1.3", fontWeight: "600" },
        ],
        h4: ["1.25rem", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "body-lg": ["1.125rem", { lineHeight: "1.7", fontWeight: "400" }],
        caption: ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "caption-sm": [
          "0.75rem",
          { lineHeight: "1.4", fontWeight: "500", letterSpacing: "0.02em" },
        ],
      },
      spacing: {
        "grid-1": "8px",
        "grid-2": "16px",
        "grid-3": "24px",
        "grid-4": "32px",
        "grid-5": "40px",
        "grid-6": "48px",
        "grid-7": "56px",
        "grid-8": "64px",
        "grid-9": "72px",
        "grid-10": "80px",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        // Soft, professional elevation for cards and components
        soft: "0 1px 2px rgba(26, 26, 46, 0.04), 0 8px 24px rgba(26, 26, 46, 0.06)",
        lift: "0 2px 4px rgba(26, 26, 46, 0.05), 0 16px 40px rgba(26, 26, 46, 0.10)",
        "glow-sm": "0 1px 2px rgba(26, 26, 46, 0.06)",
        "glow-md":
          "0 2px 4px rgba(26, 26, 46, 0.05), 0 8px 24px rgba(26, 26, 46, 0.08)",
        "glow-lg":
          "0 2px 4px rgba(26, 26, 46, 0.05), 0 16px 40px rgba(26, 26, 46, 0.10)",
        "glow-cyan":
          "0 2px 4px rgba(0, 102, 204, 0.05), 0 8px 24px rgba(0, 102, 204, 0.15)",
        "glow-pink":
          "0 2px 4px rgba(16, 185, 129, 0.05), 0 8px 24px rgba(16, 185, 129, 0.15)",
        "inner-glow": "inset 0 0 0 1px rgba(26, 26, 46, 0.06)",
      },
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(ellipse at center, var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-shine":
          "linear-gradient(135deg, rgba(255,255,255,0.1), transparent, rgba(255,255,255,0.05))",
      },
      keyframes: {
        "dropdown-in": {
          "0%": { opacity: "0", transform: "translateY(-8px) scale(0.96)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 102, 204, 0.25)" },
          "50%": { boxShadow: "0 0 0 8px rgba(0, 102, 204, 0)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "dropdown-in": "dropdown-in 0.2s ease-out",
        "gradient-shift": "gradient-shift 8s ease infinite",
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out",
      },
      transitionDuration: {
        "400": "400ms",
      },
      transitionTimingFunction: {
        "bounce-in": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
