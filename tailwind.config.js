/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        //Roboto
        Roboto_black: ["Roboto-Black"],
        Roboto_bold: ["Roboto-Bold"],
        Roboto_light: ["Roboto-Light"],
        Roboto_medium: ["Roboto-Medium"],

        //Inter
        Inter_black: ["Inter-Black"],
        Inter_bold: ["Inter-Bold"],
        Inter_light: ["Inter-Light"],
        Inter_medium: ["Inter-Medium"],
      },
      colors: {
        navy: {
          primary: "#3f72af",
          secondary: "#dbe2ef",
          accent: "#112d4e",
          background: "#f9f7f7",
        },
      },
    },
  },
  plugins: [],
};
