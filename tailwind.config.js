/** @type {import(tailwindcss).Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'deep-sky-50': '#F6FBEF',
        'deep-sky-100': '#DDEEFD',
        'deep-sky-200': '#B7DAFB',
        'deep-sky-400': '#1B5E9D',
        'deep-sky-500': '#0E7DE8',
        'hadopelagic': '#04041F',
        'long-haul': '#052176',
        'galactic-200': '#9586BF',
        'galactic-500': '#3E238B',
        'galactic-600': '#5C238B',
        'mars-red': '#BB252D',
        'aircraft-white': '#EFF2F9',
        'asl-black': '#1A1A1E',
        'dark-grey-200': '#27272A',
        'dark-grey-300': '#3F3F45',
        'dark-grey-400': '#52525B',
        'dark-grey-500': '#71717A',
      },
    },
  },
  plugins: [require("daisyui")],
}


