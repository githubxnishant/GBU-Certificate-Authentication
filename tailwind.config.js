/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      height: {
        'body-fit': 'calc(100vh - 10rem)',
      },
    },
  },
  plugins: [],
}