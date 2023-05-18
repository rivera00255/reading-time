/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        // wave: "url('/public/images/wave_background.svg')",
      },
      width: {
        480: '30rem',
        560: '35rem',
        720: '45rem',
        '80.0': '80%',
        '90.0': '90%',
        '96.0': '96%',
      },
      minWidth: {
        50: '50%',
      },
      maxWidth: {
        80: '80%',
      },
      height: {
        '90.0': '90%',
        '96.0': '96%',
      },
      minHeight: {
        50: '50%',
        '50vh': '50vh',
      },
      maxHeight: {
        80: '80%',
      },
    },
  },
  plugins: [],
};
