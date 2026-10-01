/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        earth: {
          900: '#2C1F14', // Deep espresso bark
          800: '#3D2B1D',
          700: '#4A3525', // Rich wood brown
          600: '#6B4E38',
          500: '#8C6D58', // Muted clay brown
          400: '#B09480',
        },
        beige: {
          50: '#FAF6F0',  // Warm cream background
          100: '#F5EFEB',
          200: '#F2EAE1', // Card background
          300: '#E6D7C3',
          400: '#D9C3B0',
          500: '#C7AE97',
        },
        moss: {
          900: '#1D261B',
          800: '#2E3A2B', // Deep forest canopy
          700: '#3C4D38',
          600: '#4A5D43', // Rich forest moss
          500: '#5B6E52', // Sage green accent
          100: '#E8EFE5', // Soft moss tint
        },
        sunlight: {
          500: '#E09F53', // Golden hour amber
          400: '#F4B968',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'wood-texture': 'linear-gradient(to right bottom, #FAF6F0, #F2EAE1)',
      },
      boxShadow: {
        'earth': '0 20px 40px -15px rgba(44, 31, 20, 0.08)',
        'moss': '0 20px 40px -15px rgba(46, 58, 43, 0.2)',
        'glass': '0 8px 32px 0 rgba(44, 31, 20, 0.05)',
      }
    },
  },
  plugins: [],
}
