// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,html}"],
  theme: {
    extend: {
      colors: {
        background: 'hsl(var(--colour-background))',
        foreground: 'hsl(var(--colour-foreground))',
        primary: 'hsl(var(--colour-primary))',
        'primary-foreground': 'hsl(var(--colour-primary-foreground))',
        secondary: 'hsl(var(--colour-secondary))',
        'secondary-foreground': 'hsl(var(--colour-secondary-foreground))',
        muted: 'hsl(var(--colour-muted))',
        'muted-foreground': 'hsl(var(--colour-muted-foreground))',
        accent: 'hsl(var(--colour-accent))',
        'accent-foreground': 'hsl(var(--colour-accent-foreground))',
        destructive: 'hsl(var(--colour-destructive))',
        'destructive-foreground': 'hsl(var(--colour-destructive-foreground))',
        input: 'hsl(var(--colour-input))',
        ring: 'hsl(var(--colour-ring))',
        border: 'hsl(var(--colour-border))'
      },
      borderRadius: {
        none: '0',
        sm: '0.125rem',
        DEFAULT: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        full: '9999px'
      },
      opacity: {
        0: '0',
        20: '0.2',
        40: '0.4',
        60: '0.6',
        80: '0.8',
        100: '1'
      }
    }
  },
  plugins: []
};
