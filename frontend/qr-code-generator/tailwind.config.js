/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        bg: '#ffffff',
        text: '#111111',
        subtle: '#6e6e6e',
        border: '#e5e5e5',
        card: '#fafafa',
      },
      borderRadius: {
        '2xl': '16px',
      },
      boxShadow: {
        soft: '0 8px 24px rgba(0,0,0,0.06)',
      },
    },
  },
  plugins: [],
};
