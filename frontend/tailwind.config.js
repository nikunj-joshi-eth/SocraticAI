/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          dark: '#050507',
          card: '#0A0A0F',
          elevated: '#0F0F17',
          glass: 'rgba(10, 10, 15, 0.75)',
        },
        brand: {
          violet: '#8B5CF6',
          purple: '#A855F7',
          cyan: '#22D3EE',
          emerald: '#10B981',
          amber: '#F59E0B',
          rose: '#F43F5E',
        },
        border: {
          glass: 'rgba(255, 255, 255, 0.08)',
          glow: 'rgba(139, 92, 246, 0.3)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        handwritten: ['Caveat', 'Kalam', 'cursive'],
      },
      boxShadow: {
        'glow-violet': '0 0 40px -10px rgba(139, 92, 246, 0.4)',
        'glow-cyan': '0 0 40px -10px rgba(34, 211, 238, 0.4)',
        'glow-emerald': '0 0 40px -10px rgba(16, 185, 129, 0.4)',
        'glass-card': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      animation: {
        'gradient-x': 'gradient-x 8s ease infinite',
        'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s cubic-bezier(0.4, 0, 0.2, 1) infinite',
        'orbit': 'orbit 20s linear infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'pulse-glow': {
          '0%, 100%': { opacity: 0.4, transform: 'scale(1)' },
          '50%': { opacity: 0.8, transform: 'scale(1.05)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        'scan': {
          '0%': { top: '0%' },
          '50%': { top: '100%' },
          '100%': { top: '0%' }
        },
        'orbit': {
          '0%': { transform: 'rotate(0deg) translateX(120px) rotate(0deg)' },
          '100%': { transform: 'rotate(360deg) translateX(120px) rotate(-360deg)' }
        }
      }
    },
  },
  plugins: [],
}
