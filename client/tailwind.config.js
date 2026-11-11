/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4F46E5', // Indigo StudyFlow
          hover: '#4338CA',
        },
        secondary: '#10B981', // Emerald Success
        warning: '#F59E0B',   // Amber
        danger: '#EF4444',    // Rose Red
        neutral: {
          dark: '#0F172A',    // Text Main
          medium: '#64748B',  // Text Muted
          light: '#F8FAFC',   // Background
        },
        surface: '#FFFFFF',   // Surface Card
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}