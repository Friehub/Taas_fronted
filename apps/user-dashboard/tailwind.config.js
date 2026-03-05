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
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: "hsl(var(--primary))",
                secondary: "hsl(var(--secondary))",
                accent: "hsl(var(--accent))",
                card: "hsl(var(--card))",
                border: "hsl(var(--border))",
                onyx: "#09090B",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                display: ['Outfit', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
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
