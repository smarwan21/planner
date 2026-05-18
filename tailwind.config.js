/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#1a1b2e',
          elevated: '#222438',
          card: '#2a2c42',
        },
        text: {
          primary: '#e8e6e3',
          secondary: '#9d9bb0',
          muted: '#6b6980',
        },
        accent: {
          DEFAULT: '#e76f51',
          hover: '#d65a3a',
        },
        secondary: {
          DEFAULT: '#d4a373',
          hover: '#c49263',
        },
        success: '#6b8f71',
      },
      backgroundImage: {
        'grid-dots': 'radial-gradient(circle, #2a2c42 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
    },
  },
  plugins: [],
}
