/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        bg: '#050505',
        surface: '#111111',
        card: 'rgba(255,255,255,0.04)',
        accent: '#22C55E',
        'accent-dim': '#16A34A',
        muted: '#A1A1AA',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Bebas Neue"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #22C55E, 0 0 10px #22C55E' },
          '100%': { boxShadow: '0 0 20px #22C55E, 0 0 40px #22C55E, 0 0 60px #22C55E' },
        },
      },
    },
  },
  plugins: [],
}
