import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        charcoal: {
          DEFAULT: '#1a1a1a',
          light: '#242424',
          dark: '#0f0f0f',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E0C878',
          dark: '#A88A38',
        },
        ivory: {
          DEFAULT: '#FAF7F2',
          dark: '#EFE9DF',
        },
        rose: {
          DEFAULT: '#C4896F',
          light: '#D9A48C',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        script: ['var(--font-script)', 'cursive'],
      },
      backgroundImage: {
        'gold-shimmer':
          'linear-gradient(110deg, #A88A38 0%, #C9A84C 30%, #F5E6B8 50%, #C9A84C 70%, #A88A38 100%)',
      },
      backgroundSize: {
        shimmer: '200% auto',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '200% center' },
          '100%': { backgroundPosition: '-200% center' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        shimmer: 'shimmer 6s linear infinite',
        'fade-up': 'fade-up 0.8s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
