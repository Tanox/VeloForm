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
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Text', 'SF Pro Display', 'Segoe UI', 'system-ui', 'sans-serif'],
        display: ['-apple-system', 'BlinkMacSystemFont', 'SF Pro Display', 'SF Pro Text', 'Segoe UI', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: {
          DEFAULT: '#ffffff',
          dark: '#000000',
          light: '#ffffff',
        },
        foreground: {
          DEFAULT: '#1d1d1f',
          dark: '#ffffff',
          light: '#1d1d1f',
        },
        primary: {
          50: '#f0f7ff',
          100: '#e0ebff',
          500: '#0071e3',
          600: '#0077ed',
          DEFAULT: '#0071e3',
        },
        surface: {
          DEFAULT: '#f5f5f7',
          dark: '#1d1d1f',
          light: '#f5f5f7',
          secondary: '#ffffff',
          tertiary: '#e5e5ea',
        },
        border: {
          DEFAULT: '#d2d2d7',
          dark: '#3a3a3c',
          light: '#d2d2d7',
        },
        muted: {
          DEFAULT: '#6e6e73',
          dark: '#6e6e73',
          light: '#6e6e73',
        },
        accent: {
          DEFAULT: '#34c759',
          dark: '#30d158',
          light: '#34c759',
        },
        secondary: {
          DEFAULT: '#86868b',
          dark: '#86868b',
          light: '#86868b',
        },
        success: '#34c759',
        warning: '#ff9500',
        error: '#ff3b30',
        info: '#0071e3',
      },
      borderRadius: {
        '3xl': '1.75rem',
      },
      animation: {
        "fade-in": "fadeIn 0.4s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        pulse: "pulse 2s ease-in-out infinite",
        float: "float 8s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(40px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(40px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
      },
      spacing: {
        '88': '22rem',
      },
    },
  },
  plugins: [],
};

export default config;