/** @type {import('tailwindcss').Config} */
module.exports = { 
  darkMode: ['class'],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ['Unbounded', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: { DEFAULT: 'hsl(var(--card))', foreground: 'hsl(var(--card-foreground))' },
        popover: { DEFAULT: 'hsl(var(--popover))', foreground: 'hsl(var(--popover-foreground))' },
        primary: { DEFAULT: 'hsl(var(--primary))', foreground: 'hsl(var(--primary-foreground))' },
        secondary: { DEFAULT: 'hsl(var(--secondary))', foreground: 'hsl(var(--secondary-foreground))' },
        muted: { DEFAULT: 'hsl(var(--muted))', foreground: 'hsl(var(--muted-foreground))' },
        accent: { DEFAULT: 'hsl(var(--accent))', foreground: 'hsl(var(--accent-foreground))' },
        destructive: { DEFAULT: 'hsl(var(--destructive))', foreground: 'hsl(var(--destructive-foreground))' },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        amber: {
          neon: '#FFB000',
          hover: '#E69F00',
        },
        cyan: {
          neon: '#00F0FF',
          hover: '#00D6E6',
        },
        danger: '#FF3366',
        success: '#00FF66',
        base: {
          0: '#050505',
          1: '#0a0a0a',
          2: '#111111',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': { from: { height: '0' }, to: { height: 'var(--radix-accordion-content-height)' } },
        'accordion-up': { from: { height: 'var(--radix-accordion-content-height)' }, to: { height: '0' } },
        'flicker': {
          '0%,19%,21%,23%,25%,54%,56%,100%': { opacity: '1', textShadow: '0 0 6px currentColor, 0 0 14px currentColor' },
          '20%,24%,55%': { opacity: '0.6', textShadow: 'none' },
        },
        'glitch': {
          '0%,100%': { transform: 'translate(0,0)' },
          '20%': { transform: 'translate(-2px, 1px)' },
          '40%': { transform: 'translate(2px, -1px)' },
          '60%': { transform: 'translate(-1px, -2px)' },
          '80%': { transform: 'translate(1px, 2px)' },
        },
        'scan': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'blink': {
          '50%': { opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'flicker': 'flicker 3s infinite',
        'glitch': 'glitch 0.35s ease-in-out',
        'scan': 'scan 6s linear infinite',
        'fade-up': 'fade-up 0.45s ease-out both',
        'blink': 'blink 1s step-end infinite',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
