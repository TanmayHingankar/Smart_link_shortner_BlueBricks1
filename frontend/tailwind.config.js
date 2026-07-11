/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B1220',
        card: '#111827',
        secondaryCard: '#1F2937',
        primary: '#6366F1',
        hover: '#4F46E5',
        success: '#10B981',
        danger: '#EF4444',
        warning: '#F59E0B',
        info: '#06B6D4',
        text: '#F9FAFB',
        mutedText: '#9CA3AF'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.35)'
      },
      borderColor: {
        premium: 'rgba(255,255,255,0.08)'
      }
    }
  },
  plugins: []
}

