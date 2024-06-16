/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        spacing: {
          '110':'440px',
          '120':'480px'
        },
        backgroundImage: {
          'login-bg': "url('/src/assets/login-bg.jpg')",
        }
      }
    },
    plugins: [],
  }