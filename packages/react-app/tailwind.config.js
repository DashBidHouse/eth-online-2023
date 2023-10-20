const withMT = require("@material-tailwind/react/utils/withMT");

//  @type {import('tailwindcss').Config}
module.exports = withMT({
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "../../node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "../../node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** primary */
        prosperity: "#FCFF52",
        forest: "#476520",
        /** dashbid */
        purple1: "#773FD2",
        darkGrey1: "#434343",
        lightGrey1: "#888888",
        specialBlack1: "#0B0014",
        beige1: "#F5E9E2",
        orangeBeige1: "#F6C492",
        blue1: "#0E76FD",
        pastelDarkGreen: "#66CB9F",
        pastelLeightGreen: "#DEFFEE",
        /** base */
        gypsum: "#FCF6F1",
        sand: "#E7E3D4",
        wood: "#655947",
        fig: "#1E002B",
        /** functional */
        snow: "#FFFFFF",
        onyx: "#000000",
        success: "#329F3B",
        error: "#E70532",
        disabled: "#9B9B9B",
        /** accent */
        sky: "#7CC0FF",
        citrus: "#FF9A51",
        lotus: "#FFA3EB",
        lavender: "#B490FF",
      },
    },
  },
  plugins: [],
});
