/** @type {import('tailwindcss').Config} */
  export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        background_color: '#E3F2FD',
        customGray: '#ccc',
        btn_background_color: '#5372f0',
        gray_text: '#6c757d',
        choose_image: '#464646'
        
      },
    },
  },
  plugins: [],
}

