import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#845cf5',
          50:  '#f3efff',
          100: '#e9e1fe',
          200: '#d4c5fd',
          300: '#b89afb',
          400: '#9d75f8',
          500: '#845cf5',
          600: '#7040e8',
          700: '#5e30d0',
          800: '#4e28ab',
          900: '#41238b',
        },
        ember: {
          50:  '#FEF3EE',
          100: '#FDDECB',
          200: '#FBBA93',
          300: '#F48E56',
          400: '#E56B2C',
          500: '#C94C1E',
          600: '#A93D18',
          700: '#832F13',
          800: '#5E220E',
          900: '#3D160A',
        },
        // Warm neutral used for light-mode page + card surfaces below the hero,
        // in place of pure white. Sits alongside slate rather than replacing it
        // — slate stays the token for text and borders.
        //
        // 100 is the beige from the thyleads-project marketing site (#f7f3eb),
        // carried over verbatim so the two properties match. The rest of the
        // ramp is derived from it: 50 lifts cards off the section, 200/300 sink
        // below it for fills and muted marks.
        sand: {
          50:  '#FDFBF6', // card / raised surfaces (was bg-white)
          100: '#F7F3EB', // section background — thyleads-project beige
          200: '#EEE8DB', // subtle fills
          300: '#E0D7C5', // borders, muted marks on sand
        },
        slate: {
          50:  '#F8F8F7',
          100: '#EFEFED',
          200: '#DDDCD8',
          300: '#C2C0BA',
          400: '#9A978F',
          500: '#6E6B63',
          600: '#4A4842',
          700: '#343330',
          800: '#232220',
          950: '#0D0D0C',
        },
      },
      fontFamily: {
        sans:      ['var(--font-sans)', 'system-ui', 'sans-serif'],
        mono:      ['var(--font-mono)', 'monospace'],
        bricolage: ['var(--font-bricolage)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        btn:   '8px',
        card:  '12px',
        modal: '16px',
      },
      animation: {
        marquee:  'marquee 45s linear infinite',
        scan:     'scan 6s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%':   { top: '-4px'  },
          '100%': { top: '100%' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)'    },
        },
      },
    },
  },
  plugins: [],
};

export default config;
