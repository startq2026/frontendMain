/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Sri Siri Publishers Brand Colors
        primary: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#de0f0f',  // Main brand color
          600: '#c50d0d',
          700: '#a30b0b',
          800: '#850909',
          900: '#6b0707',
          950: '#450404',
        },
        // Golden/Yellow accent (from logo)
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        // Brown accent (from logo palette)
        brown: {
          500: '#8B4513',
          600: '#704012',
          700: '#5C3310',
        },
      },
    },
  },
  plugins: [],
}
