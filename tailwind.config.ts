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
        sans: ["SF Pro Text", "system-ui", "sans-serif"],
        display: ["SF Pro Display", "system-ui", "sans-serif"],
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
          DEFAULT: '#fafafa',
          dark: '#1d1d1f',
          light: '#fafafa',
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
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-in-right": "slideInRight 0.4s ease-out",
        "scale-in": "scaleIn 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        "bounce-in": "bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)",
        "shimmer": "shimmer 2s linear infinite",
        "gradient-move": "gradientMove 3s linear infinite",
        pulse: "pulse 1s ease-in-out infinite",
        "pulse-slow": "pulseSlow 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
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
        bounceIn: {
          "0%": { opacity: "0", transform: "scale(0.3)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientMove: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.5" },
        },
        pulseSlow: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
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