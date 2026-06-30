export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: '#1E3A8A',
        secondary: '#3B82F6',
        accent: '#DC2626',
        background: '#F3F4F6',
        surface: '#FFFFFF',
        textMain: '#1F2937',
        textMuted: '#6B7280',
        //success: '#10B981',
        success: '#16A34A',
        warning: '#F59E0B',
        danger: '#EF4444',
        info: '#3B82F6',
        industrial: {
          bg: '#fcfcfc',
          sidebar: '#171717',
          carmine: '#800020',
          'carmine-dark': '#650019',
          border: '#e2e8f0',
          neutral: '#718096',
          success: '#16a34a',
          'success-bg': '#dcfce7',
          'text-primary': '#1a202c',
          'text-secondary': '#4a5568',
        },
      },
      boxShadow: {
        soft: '0 4px 6px -1px rgba(0,0,0,0.05)',
        card: '0 10px 15px -3px rgba(0,0,0,0.05)',
      },
    },
  },
  plugins: [],
}
