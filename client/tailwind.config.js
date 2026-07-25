/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0066cc",
        "primary-focus": "#0071e3",
        "primary-on-dark": "#2997ff",
        ink: "#1d1d1f",
        "body-muted": "#cccccc",
        "ink-muted-80": "#333333",
        "ink-muted-48": "#7a7a7a",
        "divider-soft": "rgba(0, 0, 0, 0.04)",
        hairline: "#e0e0e0",
        canvas: "#ffffff",
        "canvas-parchment": "#f5f5f7",
        "surface-pearl": "#fafafc",
        "surface-tile-1": "#272729",
        "surface-tile-2": "#2a2a2c",
        "surface-tile-3": "#252527",
        "surface-black": "#000000",
        "surface-chip-translucent": "rgba(210, 210, 215, 0.64)",
        "on-primary": "#ffffff",
        "on-dark": "#ffffff",
      },
      fontFamily: {
        display: ["SF Pro Display", "system-ui", "-apple-system", "sans-serif"],
        text: ["SF Pro Text", "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        none: "0px",
        xs: "5px",
        sm: "8px",
        md: "11px",
        lg: "18px",
        pill: "9999px",
        full: "9999px",
      },
      spacing: {
        xxs: "4px",
        xs: "8px",
        sm: "12px",
        md: "17px",
        lg: "24px",
        xl: "32px",
        xxl: "48px",
        section: "80px",
      },
      boxShadow: {
        product: "rgba(0, 0, 0, 0.22) 3px 5px 30px 0px",
      },
      letterSpacing: {
        "tight-display": "-0.022em", // approx -0.374px at 17px
        "tight-hero": "-0.005em",   // approx -0.28px at 56px
      }
    },
  },
  plugins: [],
}
