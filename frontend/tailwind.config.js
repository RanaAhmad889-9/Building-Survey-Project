/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slidein:{
          from:{
            opacity:"0",
            transform: "translateY(-10px)",
          },
          to:{
            opacity:"1",
            transform: "translateY(0)",
          },
        }
      },
      animation:{
        slide100:"slidein 1s ease 1s forwards",
         slide200:"slidein 1s ease 2s forwards",
          slide300:"slidein 1s ease 3s forwards",
          slide400:"slidein 1s ease 4s forwards",
         slide500:"slidein 1s ease 5s forwards",
         slide600:"slidein 1s ease 6s forwards",
          slide700:"slidein 1s ease 7s forwards",
          slide800:"slidein 1s ease 8s forwards"
      }
    },
  },
  plugins: [],
}

