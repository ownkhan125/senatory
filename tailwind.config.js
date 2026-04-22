/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary — extracted from logo
        "brand-red": "#dd131a",
        "brand-red-dark": "#b30f15",
        "brand-red-soft": "#fbe5e6",
        "ink": "#232323",
        "ink-soft": "#3a3a3a",

        // Secondary — patriotic accents
        "pk-green": "#01411c",
        "pk-green-soft": "#e6efe9",
        "navy": "#0e2a47",

        // Neutrals
        "paper": "#fafaf7",
        "paper-alt": "#f1f1ef",
        gray: {
          100: "#f1f1ef",
          200: "#e5e5e2",
          300: "#d4d4d0",
          400: "#a3a3a0",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#2a2a2a",
        },

        // Status
        "success": "#10b981",
        "error": "#ef4444",
        "warning": "#f59e0b",
      },

      fontFamily: {
        heading: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
      },

      fontSize: {
        "caption": ["12px", { lineHeight: "1.45", letterSpacing: "0.12em", fontWeight: "500" }],
        "small": ["14px", { lineHeight: "1.55" }],
        "body": ["16px", { lineHeight: "1.65" }],
        "h4": ["24px", { lineHeight: "1.25", fontWeight: "600" }],
        "h3": ["36px", { lineHeight: "1.15", fontWeight: "700" }],
        "h2": ["48px", { lineHeight: "1.10", fontWeight: "700" }],
        "h1": ["64px", { lineHeight: "1.05", fontWeight: "800" }],
      },

      spacing: {
        "space-1": "4px",
        "space-2": "8px",
        "space-4": "16px",
        "space-6": "24px",
        "space-8": "32px",
        "space-12": "48px",
        "space-16": "64px",
      },

      borderRadius: {
        "brand-sm": "4px",
        "brand-md": "8px",
        "brand-lg": "16px",
      },

      boxShadow: {
        "brand-sm": "0 1px 2px rgba(35, 35, 35, 0.06)",
        "brand-md": "0 4px 12px rgba(35, 35, 35, 0.08), 0 2px 4px rgba(35, 35, 35, 0.04)",
        "brand-lg": "0 12px 32px rgba(35, 35, 35, 0.1), 0 4px 8px rgba(35, 35, 35, 0.04)",
        "brand-red-glow": "0 8px 20px rgba(221, 19, 26, 0.3)",
      },

      transitionTimingFunction: {
        brand: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },

      maxWidth: {
        "brand-container": "1280px",
      },
    },
  },
  plugins: [],
};
