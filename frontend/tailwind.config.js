/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html}", "./index.html"],
  theme: {
    screens: {
      'xs': '480px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        // Persian Green - Your main primary color
        50: 'hsl(171, 100%, 95%, 1)',   // Very light persian-green
        100: 'hsl(171, 100%, 85%, 1)',  // Light persian-green
        200: 'hsl(171, 100%, 75%, 1)',  // Lighter persian-green
        300: 'hsl(171, 100%, 65%, 1)',  // Light-medium persian-green
        400: 'hsl(171, 100%, 48%, 1)',  // Medium persian-green
        500: 'hsl(171, 100%, 32%, 1)',  // Persian Green (your main primary)
        600: 'hsl(171, 100%, 28%, 1)',  // Darker persian-green
        700: 'hsl(171, 100%, 22%, 1)',  // Much darker persian-green
        800: 'hsl(171, 100%, 18%, 1)',  // Very dark persian-green
        900: 'hsl(171, 100%, 12%, 1)',  // Darkest persian-green
      },
      // Secondary Brand Colors
      secondary: {
        50: 'hsla(182, 98%, 90%, 1)',    // Very light verdigris
        100: 'hsla(182, 98%, 80%, 1)',   // Light verdigris
        200: 'hsla(182, 98%, 70%, 1)',   // Lighter verdigris
        300: 'hsla(182, 98%, 60%, 1)',   // Light-medium verdigris
        400: 'hsla(182, 98%, 47%, 1)',   // Medium verdigris
        500: 'hsla(182, 98%, 34%, 1)',   // Verdigris (your secondary)
        600: 'hsla(182, 98%, 28%, 1)',   // Darker verdigris
        700: 'hsla(182, 98%, 22%, 1)',   // Much darker verdigris
        800: 'hsla(182, 98%, 18%, 1)',   // Very dark verdigris
        900: 'hsla(182, 98%, 12%, 1)',   // Darkest verdigris
      },
       
      accent: {
        // Sunglow - Perfect for highlights, CTAs, and positive actions
        yellow: {
          50: 'hsla(45, 94%, 95%, 1)',   // Very light sunglow
          100: 'hsla(45, 94%, 85%, 1)',  // Light sunglow
          200: 'hsla(45, 94%, 75%, 1)',  // Lighter sunglow
          300: 'hsla(45, 94%, 70%, 1)',  // Light-medium sunglow
          400: 'hsla(45, 94%, 65%, 1)',  // Medium sunglow
          500: 'hsla(45, 94%, 61%, 1)',  // Sunglow (your accent)
          600: 'hsla(45, 94%, 55%, 1)',  // Darker sunglow
          700: 'hsla(45, 94%, 45%, 1)',  // Much darker sunglow
          800: 'hsla(45, 94%, 35%, 1)',  // Very dark sunglow
          900: 'hsla(45, 94%, 25%, 1)',  // Darkest sunglow
        },
        // Bittersweet - Great for warnings, errors, or secondary CTAs
        red: {
          50: 'hsla(7, 82%, 95%, 1)',    // Very light bittersweet
          100: 'hsla(7, 82%, 85%, 1)',   // Light bittersweet
          200: 'hsla(7, 82%, 75%, 1)',   // Lighter bittersweet
          300: 'hsla(7, 82%, 70%, 1)',   // Light-medium bittersweet
          400: 'hsla(7, 82%, 67%, 1)',   // Medium bittersweet
          500: 'hsla(7, 82%, 63%, 1)',   // Bittersweet (your accent)
          600: 'hsla(7, 82%, 55%, 1)',   // Darker bittersweet
          700: 'hsla(7, 82%, 45%, 1)',   // Much darker bittersweet
          800: 'hsla(7, 82%, 35%, 1)',   // Very dark bittersweet
          900: 'hsla(7, 82%, 25%, 1)',   // Darkest bittersweet
        }
      },
       // Neutral/Base Colors
       neutral: {
        50: 'hsla(211, 48%, 95%, 1)',    // Very light prussian-blue
        100: 'hsla(211, 48%, 85%, 1)',   // Light prussian-blue
        200: 'hsla(211, 48%, 75%, 1)',   // Lighter prussian-blue
        300: 'hsla(211, 48%, 65%, 1)',   // Light-medium prussian-blue
        400: 'hsla(211, 48%, 45%, 1)',   // Medium prussian-blue
        500: 'hsla(211, 48%, 35%, 1)',   // Lighter than original
        600: 'hsla(211, 48%, 22%, 1)',   // Prussian Blue (your base)
        700: 'hsla(211, 48%, 18%, 1)',   // Darker prussian-blue
        800: 'hsla(211, 48%, 14%, 1)',   // Much darker prussian-blue
        900: 'hsla(211, 48%, 10%, 1)',   // Darkest prussian-blue
      },
       // Semantic Colors (using your palette)
       success: 'hsla(171, 100%, 32%, 1)',    // Persian Green
       warning: 'hsla(45, 94%, 61%, 1)',      // Sunglow
       error: 'hsla(7, 82%, 63%, 1)',         // Bittersweet
       info: 'hsla(182, 98%, 34%, 1)',        // Verdigris
      extend: {},
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem', // 2px
      DEFAULT: '0.25rem', // 4px
      'md': '0.375rem', // 6px
      'lg': '0.5rem', // 8px
      'xl': '0.75rem', // 12px
      '2xl': '1rem', // 16px
      '3xl': '1.5rem', // 24px
      full: '9999px',
    },
    opacity: {
      '0': '0',
      '20': '0.2',
      '40': '0.4',
      '60': '0.6',
      '80': '0.8',
      '100': '1',
    },
    
  },
    plugins: [
    ],
  }
