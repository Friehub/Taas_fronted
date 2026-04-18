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
        background: {
          DEFAULT: 'var(--background)',
          darker: 'var(--background-darker)',
        },
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          muted: 'var(--primary-muted)',
          container: '#1CCA5B',
        },
        surface: {
          low: 'var(--surface-low)',
          base: 'var(--surface-base)',
          elevated: 'var(--surface-elevated)',
          border: 'var(--surface-border)',
        },
        blueprint: {
          grid: 'var(--blueprint-grid)',
          'grid-accent': 'var(--blueprint-grid-accent)',
          line: 'var(--blueprint-line)',
        }
      },
      fontFamily: {
        sans: ['var(--font-manrope)', 'Menlo', 'monospace'],
        display: ['var(--font-urbanist)', 'system-ui'],
        mono: ['var(--font-space-mono)', 'monospace'],
      },
      spacing: {
        'blueprint-unit': '20px',
        'blueprint-large': '100px',
      },
      borderWidth: {
        'blueprint': '0.5px',
      },
      boxShadow: {
        'blueprint-glow': '0 0 10px rgba(73, 231, 116, 0.05)',
        'blueprint-inner': 'inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
        'neon-mint': '0 0 20px rgba(73, 231, 116, 0.1)',
        'neon-white': '0 0 20px rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'scanline': 'scanline 8s linear infinite',
        'flicker': 'flicker 0.15s infinite',
        'pulse-grid': 'pulseGrid 4s ease-in-out infinite',
      },
      keyframes: {
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        flicker: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.97' },
        },
        pulseGrid: {
          '0%, 100%': { opacity: '0.05' },
          '50%': { opacity: '0.1' },
        }
      },
      transitionTimingFunction: {
        'mechanical': 'cubic-bezier(0.16, 1, 0.3, 1)',
      }
    },
  },
  plugins: [],
};
