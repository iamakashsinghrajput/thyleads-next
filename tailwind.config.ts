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
        // Brand: text on black is warm paper, never pure white. `white` is
        // remapped so every existing text-white / bg-white follows the brand;
        // `pure` is the one exception — the label on an ember button.
        white: '#F7F3EB',
        pure:  '#FFFFFF',
        // Brand tones (names as in the guidelines).
        paper: {
          DEFAULT: '#F7F3EB', // warm paper: headlines/text on black, light surfaces
          soft:    '#CFC8BA', // body text on black
          rule:    '#D2CBBD', // hairlines on warm paper
        },
        stone: {
          DEFAULT: '#A8A294', // captions, labels, sources on black
          dark:    '#5E584F', // captions on warm paper
        },
        surface: '#171614',   // cards and panels on black
        rule:    '#2E2B27',   // hairlines and borders on black
        grey:    '#6F6A60',   // strike lines / marks for "missed" things — never text
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
          200: '#D2CBBD', // paper rule
          300: '#CFC8BA', // paper soft — body text on black
          400: '#A8A294', // stone — captions on black
          500: '#6E6B63',
          600: '#4A4842',
          700: '#343330',
          800: '#232220',
          950: '#0D0D0C',
        },
      },
      // Brand (Harvin AI brand guidelines, 12 Nov 2026): two typefaces only.
      //   display → Newsreader: headlines, large numbers, quotes (medium 500)
      //   sans    → Instrument Sans: everything else (400–600)
      // Universal Sans, Bricolage Grotesque and JetBrains Mono are retired; the
      // old `mono` / `bricolage` keys now resolve to Instrument Sans so legacy
      // classes can't bring them back (numbers use tabular figures instead).
      fontFamily: {
        sans:      ['var(--font-sans)', 'system-ui', 'sans-serif'],
        display:   ['var(--font-display)', 'Georgia', 'serif'],
        mono:      ['var(--font-sans)', 'system-ui', 'sans-serif'],
        bricolage: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      // Brand: radii follow importance — 8–10 px tags and buttons, 16–20 px
      // cards, 28 px panels.
      borderRadius: {
        btn:   '8px',
        card:  '16px',
        modal: '20px',
        panel: '28px',
      },
      animation: {
        marquee:  'marquee 45s linear infinite',
        scan:     'scan 6s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        // FeatureSection product mocks
        'focus-in':  'focusIn 0.9s cubic-bezier(0.16,1,0.3,1) both',
        progress:    'progress 7s linear forwards',
        wave:        'wave 0.9s ease-in-out infinite',
        // Data Building page: dashed SVG connectors that flow toward the next node.
        flow:        'flow 1.2s linear infinite',
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
        focusIn: {
          '0%':   { opacity: '0', filter: 'blur(14px)', transform: 'scale(1.04)' },
          '100%': { opacity: '1', filter: 'blur(0)',    transform: 'scale(1)'    },
        },
        progress: {
          '0%':   { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
        // Audio-level bar on a live call (FeatureSection calling mock).
        wave: {
          '0%, 100%': { transform: 'scaleY(0.3)' },
          '50%':      { transform: 'scaleY(1)'   },
        },
        flow: {
          '0%':   { strokeDashoffset: '20' },
          '100%': { strokeDashoffset: '0'  },
        },
      },
    },
  },
  plugins: [],
};

export default config;
