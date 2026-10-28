/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#0F0E0D',
        surface: '#1C1A17',
        ink: '#F5F1EA',
        muted: '#A39B8F',
        gold: '#C2A374',
        deep: '#0F0E0D',
        ondeep: '#F5F1EA',
        background: '#0F0E0D',
        card: '#1C1A17',
        text: '#F5F1EA',
      },
      fontFamily: {
        serif: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        widest: '0.08em',
      }
    },
  },
  plugins: [],
}