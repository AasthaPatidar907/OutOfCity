/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
       brand: {
  50: "#FAF7F2",
  100: "#EFE5DB",
  200: "#E3D0C0",
  300: "#D6B29A",
  400: "#CB9477",
  500: "#BE7959",
  600: "#B96545",
  700: "#9E5036",
  800: "#80412F",
  900: "#633528",
},
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(30,58,138,0.06)',
        'card-hover': '0 8px 30px rgba(30,58,138,0.14)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
