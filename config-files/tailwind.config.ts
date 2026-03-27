import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#F86213',
          secondary: '#E5580F',
          accent: '#FF8C42',
          light: '#FFF4EE',
          dark: '#1A1A1A',
          white: '#FFFFFF',
        },
        text: {
          primary: '#222222',
          secondary: '#666666',
        },
      },
      fontFamily: {
        display: ['Outfit', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
};

export default config;
