/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Mengunci warna utama sesuai Design System
        primary: {
          DEFAULT: '#0F52BA', // Sapphire Blue
          dark: '#0B3D8A',
        },
        secondary: {
          DEFAULT: '#00A86B', // Jade Green
          dark: '#008754',
        },
        slate: {
          50: '#F8FAFC',
          200: '#E2E8F0',
          600: '#475569',
          800: '#1E293B',
          900: '#0F172A',
        }
      },
      fontFamily: {
        // Menggunakan font utama platform
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        // Skala radius sesuai panduan UI
        'sm': '4px',
        'md': '8px',
        'lg': '16px',
      },
      boxShadow: {
        // Skala bayangan sesuai panduan UI
        'elevated-low': '0px 2px 8px rgba(15, 23, 42, 0.04)',
        'elevated-medium': '0px 8px 20px rgba(15, 23, 42, 0.08)',
        'elevated-high': '0px 16px 36px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}

