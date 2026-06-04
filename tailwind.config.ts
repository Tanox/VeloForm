import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          dark: '#09090b',
          light: '#fafafa',
        },
        foreground: {
          DEFAULT: 'var(--foreground)',
          dark: '#fafafa',
          light: '#09090b',
        },
        primary: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
          DEFAULT: "#3b82f6",
          dark: "#3b82f6",
          light: "#2563eb",
        },
        secondary: {
          DEFAULT: "#18181b",
          dark: "#18181b",
          light: "#f4f4f5",
        },
        surface: {
          DEFAULT: 'var(--surface)',
          dark: '#18181b',
          light: '#ffffff',
        },
        border: {
          DEFAULT: 'var(--border)',
          dark: '#27272a',
          light: '#e4e4e7',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          dark: '#71717a',
          light: '#a1a1aa',
        },
        accent: {
          DEFAULT: "#f59e0b",
          dark: "#f59e0b",
          light: "#d97706",
        },
        success: "#22c55e",
        warning: "#eab308",
        error: "#ef4444",
        info: "#3b82f6",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        pulse: "pulse 1s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
