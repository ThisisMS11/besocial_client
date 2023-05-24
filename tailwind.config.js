/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: theme => ({
        ...theme('colors'),
        'AuthBackground': '#1e1f23',
        'AuthForm': '#151515',
        'AuthButton': '#273c75',
        'AuthSignup': '#495b94',
        'AuthInput': '#1e1e1e'
      })
    },
  },
  plugins: [],
}