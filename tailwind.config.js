/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#18181B',
        secondary: '#3F3F46',
        accent: '#2563EB',
        background: '#FAFAFA',
        foreground: '#09090B',
        muted: '#E8ECF0',
        border: '#E4E4E7',
        destructive: '#DC2626'
      },
      dark: {
        background: '#09090B',
        foreground: '#FAFAFA',
        muted: '#27272A',
        border: '#27272A',
        accent: '#3B82F6'
      },
      fontFamily: {
        display: ['Archivo', 'sans-serif'],
        body: ['Space Grotesk', 'sans-serif']
      },
      spacing: {
        '3': '12px',
        '13': '52px',
        '15': '60px'
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '8px',
        'sm': '4px'
      },
      transitionTimingFunction: {
        'ease-out-cubic': 'cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  },
  plugins: []
}
