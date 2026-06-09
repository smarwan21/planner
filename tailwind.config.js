/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        bg: {
          DEFAULT: '#faf8f5',
          elevated: '#f0ede8',
          card: '#ffffff',
        },
        text: {
          primary: '#1a1a2e',
          secondary: '#6b6580',
          muted: '#a09db0',
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
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#6b6580',
            '--tw-prose-headings': '#1a1a2e',
            '--tw-prose-links': '#e76f51',
            '--tw-prose-bold': '#1a1a2e',
            '--tw-prose-counters': '#a09db0',
            '--tw-prose-bullets': '#a09db0',
            '--tw-prose-hr': 'rgba(0,0,0,0.06)',
            '--tw-prose-quotes': '#1a1a2e',
            '--tw-prose-quote-borders': '#e76f51',
            '--tw-prose-captions': '#a09db0',
            '--tw-prose-code': '#e76f51',
            '--tw-prose-pre-code': '#6b6580',
            '--tw-prose-pre-bg': '#f0ede8',
            '--tw-prose-th-borders': 'rgba(0,0,0,0.1)',
            '--tw-prose-td-borders': 'rgba(0,0,0,0.06)',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
