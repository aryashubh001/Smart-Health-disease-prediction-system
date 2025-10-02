/** @type {import('tailwindcss').Config} */
import { createPlugin } from 'tailwindcss-v4';

export default createPlugin(({ theme, addUtilities, config }) => {
  return {
    darkMode: ['class', '.dark'],
    content: [
      './index.html',
      './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
      container: {
        center: true,
        padding: '2rem',
        screens: {
          '2xl': '1400px',
        },
      },
      extend: {
        colors: {
          // Mapping custom CSS variables to Tailwind
          border: 'var(--color-border)',
          input: 'var(--color-input)',
          ring: 'var(--color-ring)',
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          primary: {
            DEFAULT: 'var(--color-primary)',
            foreground: 'var(--color-primary-foreground)',
          },
          secondary: {
            DEFAULT: 'var(--color-secondary)',
            foreground: 'var(--color-secondary-foreground)',
          },
          destructive: {
            DEFAULT: 'var(--color-destructive)',
            foreground: 'var(--color-destructive-foreground)',
          },
          muted: {
            DEFAULT: 'var(--color-muted)',
            foreground: 'var(--color-muted-foreground)',
          },
          accent: {
            DEFAULT: 'var(--color-accent)',
            foreground: 'var(--color-accent-foreground)',
          },
          card: {
            DEFAULT: 'var(--color-card)',
            foreground: 'var(--color-card-foreground)',
          },
        },
        borderRadius: {
          lg: 'var(--radius)',
          md: 'calc(var(--radius) - 2px)',
          sm: 'calc(var(--radius) - 4px)',
        },
      },
    },
    plugins: [],
  };
});