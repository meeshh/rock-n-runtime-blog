/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      animation: {
        blink: 'blink 1.5s step-start infinite',
      },
      colors: {
        background: {
          [200]: 'var(--background-200)',
          DEFAULT: 'var(--color-background)',
        },
        backgroundDrop: {
          DEFAULT: 'var(--color-background-drop)',
          [200]: 'var(--color-background-drop-200)',
        },
        foreground: 'var(--color-foreground)',
        primary: '#3D4D55',
        secondary: '#10232A',
        light: '#A79E9C',
        white: '#D3C3B9',
        brass: {
          DEFAULT: '#D1B77A',
          dark: '#8B6F4E',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
      },
    },
  },
  plugins: [],
} 