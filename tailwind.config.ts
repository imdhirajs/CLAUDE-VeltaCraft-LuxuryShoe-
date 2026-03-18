import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        cormorant: ['var(--font-cormorant)', 'serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        'bg-deep':       '#0A0805',
        'bg-section':    '#130E08',
        'leather':       '#8B4513',
        'leather-light': '#A0522D',
        'gold':          '#CFB53B',
        'gold-light':    '#E8D48A',
        'cream':         '#FAF0E6',
        'cream-muted':   '#C8B89A',
      },
    },
  },
  plugins: [],
}
export default config
