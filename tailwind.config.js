import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class'], // FORCE: Disable auto dark mode
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // DESIGN SYSTEM TOKENS - 10/10
      // These are locked. No improvising.

      fontFamily: {
        sans: [
          'var(--font-inter)',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'sans-serif',
        ],
      },

      // Typography Scale (CANONICAL - DO NOT MODIFY)
      fontSize: {
        // Readable system-wide scale
        'xs': ['13px', { lineHeight: '1.5' }],
        'sm': ['14px', { lineHeight: '1.5' }],
        'base': ['16px', { lineHeight: '1.6' }],
        'lg': ['18px', { lineHeight: '1.75' }],
        'xl': ['20px', { lineHeight: '1.5' }],
        '2xl': ['24px', { lineHeight: '1.4' }],
        '3xl': ['30px', { lineHeight: '1.3' }],
        '4xl': ['36px', { lineHeight: '1.2' }],
        '5xl': ['48px', { lineHeight: '1.15' }],

        // Display (Hero headlines) - kept for compatibility
        'display-lg': ['48px', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-md': ['36px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-sm': ['30px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],

        // Headings - kept for compatibility
        h1: ['32px', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
        h2: ['24px', { lineHeight: '1.4', fontWeight: '700' }],
        h3: ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        h4: ['18px', { lineHeight: '1.4', fontWeight: '600' }],

        // Body - kept for compatibility
        'body-lg': ['18px', { lineHeight: '1.75' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-sm': ['14px', { lineHeight: '1.5' }],

        // Meta/Small
        'meta': ['13px', { lineHeight: '1.5', fontWeight: '500' }],
      },

      // Spacing Scale (LOCKED)
      spacing: {
        // Section padding
        'section-y': '4rem', // py-16 (64px)
        'section-y-sm': '2.5rem', // py-10 (40px) mobile

        // Container padding
        'container-x': '1rem', // px-4 (16px)
        'container-x-md': '1.5rem', // px-6 (24px) tablet
        'container-x-lg': '2rem', // px-8 (32px) desktop

        // Component spacing
        'card-p': '1.5rem', // p-6 (24px)
        'card-p-sm': '1rem', // p-4 (16px) mobile

        // Stack spacing
        stack: '1.5rem', // gap-6 (24px)
        'stack-sm': '1rem', // gap-4 (16px) mobile
      },

      // Border Radius (LOCKED)
      borderRadius: {
        card: '1rem', // 16px
        button: '0.5rem', // 8px
        input: '0.5rem', // 8px
        xl: '1rem',
        '2xl': '1.25rem',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Shadows (LOCKED)
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'card-hover':
          '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        button: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        soft: '0 10px 30px rgba(0,0,0,0.08)',
      },
      // Mitchy-style animations
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
        'fade-in-left': 'fade-in-left 0.6s ease-out forwards',
        'fade-in-right': 'fade-in-right 0.6s ease-out forwards',
      },
      colors: {
        // Canonical text colors (fixes washed-out gray)
        'text-primary': '#111827',
        'text-secondary': '#374151',
        'text-muted': '#6B7280',
        'text-disabled': '#9CA3AF',

        // Primary Brand Colors - Red, Blue, White, Black
        brand: {
          red: {
            50: '#fef2f2',
            100: '#fee2e2',
            200: '#fecaca',
            300: '#fca5a5',
            400: '#f87171',
            500: '#ef4444', // Main red
            600: '#dc2626', // Primary red (nav)
            700: '#b91c1c',
            800: '#991b1b',
            900: '#7f1d1d',
          },
          blue: {
            50: '#eff6ff',
            100: '#dbeafe',
            200: '#bfdbfe',
            300: '#93c5fd',
            400: '#60a5fa',
            500: '#3b82f6', // Main blue
            600: '#2563eb', // Primary blue
            700: '#1d4ed8',
            800: '#1e40af',
            900: '#1e3a8a',
          },
        },
        // Legacy brand colors (updated to red/blue)
        brandPrimary: '#dc2626', // Red
        brandSecondary: '#2563eb', // Blue
        brandSuccess: '#16a34a', // Green (keep for success states)
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
    },
  },
  plugins: [forms, typography],
};
