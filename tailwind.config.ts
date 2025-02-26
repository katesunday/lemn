import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neutral: '#ddd6cb',
        beige: '#cfa69b',
        dark_beige: '#6e6464',
        light_beige: '#b3aea5',
        orange: '#f99f2a',
        dark: '#1f252d',
        blue: '#98b4da',
        darkBlue: '#4e7ddc',

        grey: {
          30: '#b3b9c6',
          50: '#a4abb9',
          100: '#454952',
        },
      },
      fontFamily: {
        primary: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
    }: {
      addUtilities: (utilities: {
        '.bg-gradient': {
          backgroundAttachment: string;
          background: string;
          backgroundSize: string;
        };
      }) => void;
    }) {
      addUtilities({
        '.bg-gradient': {
          background: 'linear-gradient(180deg, #b3b9c6, #98b4da)',
          backgroundSize: 'cover',
          backgroundAttachment: 'fixed',
        },
      });
    },
  ],
} satisfies Config;
