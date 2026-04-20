import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F9F5EE',
        gold: '#C69A6C',
        sand: '#E9D9C4',
        ash: '#6B7280',
        charcoal: '#1F2937'
      },
      boxShadow: {
        soft: '0 20px 50px rgba(15, 23, 42, 0.08)'
      }
    }
  },
  plugins: []
}

export default config
