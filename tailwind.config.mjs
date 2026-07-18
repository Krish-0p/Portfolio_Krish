/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        root: '#08080C',
        raised: '#0E0E14',
        surface: '#14141C',
        accent: {
          DEFAULT: '#E8A838',   // Warm amber primary
          soft: '#F0C060',      // Light amber
          dim: 'rgba(232, 168, 56, 0.15)',
          glow: 'rgba(232, 168, 56, 0.25)',
        },
        secondary: {
          DEFAULT: '#8B9CF7',   // Cool indigo
          soft: '#A8B4F8',
          dim: 'rgba(139, 156, 247, 0.12)',
        },
      },
      fontFamily: {
        display: ['"Fjalla One"', '"Space Grotesk"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'SF Mono', 'Cascadia Code', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.04em', fontWeight: '500' }],
        'heading': ['clamp(1.75rem, 3vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.03em', fontWeight: '400' }],
        'subhead': ['clamp(1.125rem, 1.5vw, 1.25rem)', { lineHeight: '1.4', fontWeight: '400' }],
        'mono-label': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.1em', fontWeight: '400' }],
        'mono-xs': ['0.6875rem', { lineHeight: '1.5', letterSpacing: '0.12em', fontWeight: '400' }],
      },
      boxShadow: {
        'glow-sm': '0 0 12px rgba(232, 168, 56, 0.12), 0 0 4px rgba(232, 168, 56, 0.06)',
        'glow-md': '0 0 24px rgba(232, 168, 56, 0.15), 0 0 8px rgba(232, 168, 56, 0.08)',
        'glow-lg': '0 0 40px rgba(232, 168, 56, 0.18), 0 0 16px rgba(232, 168, 56, 0.10)',
        'panel': '0 1px 3px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)',
      },
      borderRadius: {
        'subtle': '2px',
        'card': '4px',
      },
      backdropBlur: {
        'glass': '20px',
      },
      animation: {
        'ticker-left': 'ticker-left 60s linear infinite',
        'ticker-right': 'ticker-right 60s linear infinite',
      },
      keyframes: {
        'ticker-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'ticker-right': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
}
