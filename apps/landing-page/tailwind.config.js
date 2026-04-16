const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        path.join(__dirname, './app/**/*.{js,ts,jsx,tsx,mdx}'),
        path.join(__dirname, './components/**/*.{js,ts,jsx,tsx,mdx}'),
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "#111316",
                foreground: "#E2E2E6",
                primary: {
                    DEFAULT: "#49E774",
                    container: "#1CCA5B",
                    fixed: "#68FF8A",
                },
                secondary: {
                    DEFAULT: "#C6C6C7",
                    container: "#454747",
                },
                tertiary: {
                    DEFAULT: "#FFBAB0",
                    container: "#FF9181",
                },
                surface: {
                    DEFAULT: "#111316",
                    low: "#1A1C1F",
                    high: "#282A2D",
                    bright: "#37393D",
                },
                onyx: "#09090B",
            },
            fontFamily: {
                sans: ['Manrope', 'sans-serif'],
                display: ['Space Grotesk', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            borderRadius: {
                sm: '0.25rem',
                DEFAULT: '0.375rem',
                md: '0.375rem',
                lg: '0.5rem',
                xl: '0.75rem',
                '2xl': '1rem',
                '3xl': '1.5rem',
            },
            backgroundImage: {
                'grid-mint': "linear-gradient(to right, #49E7740D 1px, transparent 1px), linear-gradient(to bottom, #49E7740D 1px, transparent 1px)",
                'dot-mint': "radial-gradient(#49E77426 1px, transparent 1px)",
            },
            animation: {
                'in': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
                'float': 'float 6s ease-in-out infinite',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blur-in': 'blurIn 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(20px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                },
                blurIn: {
                    '0%': { opacity: '0', filter: 'blur(10px)', transform: 'scale(0.95)' },
                    '100%': { opacity: '1', filter: 'blur(0)', transform: 'scale(1)' },
                },
                float: {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-15px)' },
                }
            }
        },
    },
    plugins: [],
};
