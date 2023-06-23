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
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'cardhome': 'linear-gradient(154.99deg, #E3EAED 5.97%, rgba(227, 234, 237, 0) 138.07%)',
        'buttonmoreinfo': 'linear-gradient(143.04deg, #33B888 -36.32%, #145E43 63.35%, #25A375 112.02%)',
        'detailcards': ' linear-gradient(180deg, #C9C9C9 -83.58%, rgba(249, 249, 249, 0) 119.4%)',
        'detailcardssvg':'linear-gradient(179.53deg, #FCFCFC 0.41%, rgba(252, 252, 252, 0) 99.6%)',
        'priceoffercard': 'linear-gradient(171.01deg, #EDF0EF 16.41%, rgba(255, 255, 255, 0.79) 124.42%)'
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-roboto-mono)'],
        sohogothicpro: ['var(--font-sohogothicpro)'],
      },
    },
  },
  plugins: [],
}
