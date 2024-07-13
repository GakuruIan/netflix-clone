/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
  "./components/**/*.{js,jsx,ts,tsx}", 
  "./screens/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        // primary:"#191B1E",
        primary:"#000",
        primaryBtn:"#DF0912",
        light:'#24272D'
      },
      fontFamily:{
        'title':['Poppins','sans-serif'],
        'text-light':['SairaCondensed-Light','sans-serif'],
        'text-thin':['SairaCondensed-Thin','sans-serif']
      }
    },
  },
  plugins: [],
}

