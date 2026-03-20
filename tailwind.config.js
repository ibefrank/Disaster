/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0f172a",
        foreground: "#f1f5f9",
        primary: "#ef4444",
        secondary: "#f97316",
        accent: "#14b8a6",
        success: "#22c55e",
        warning: "#eab308",
        error: "#ef4444",
        critical: "#dc2626",
        high: "#f97316",
        normal: "#22c55e",
        muted: "#64748b",
      },
      spacing: {
        safe: "max(1rem, env(safe-area-inset-bottom))",
      },
    },
  },
  plugins: [],
}
