import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        iosevka: ['IosevkaTerm', 'monospace'],
      },
      textShadow: {
        'textShadow-green': '0px 0px 50px #00BD95',
        'textShadow-white': '0px 0px 5px #FFFEFE',
      },
      boxShadow: {
        btnShadow: '0px 0px 30px #00BD95',
        borderShadow: '0px 4px 5px #00BD95',
      },
    },
  },
  plugins: [require('tailwindcss-textshadow')],
};

export default config;
