/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#4a90e2',
          yellow: '#ffd93d',
        },
        background: {
          light: '#f2faff',
          lighter: '#f7fcff',
        },
        text: {
          primary: '#1a1a1a',
          secondary: '#333333',
          muted: '#4d4d4d',
        },
        medal: {
          gold: '#ffd700',
          silver: '#bfbfbf',
          bronze: '#cd7f32',
        },
        timer: {
          red: '#f24d4d',
        }
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      screens: {
        'mobile': '375px',
      }
    },
  },
  plugins: [],
}
