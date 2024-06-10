/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        darkslategray: "#31394d",
        aliceblue: {
          "100": "#ebedf4",
          "200": "#e5e9f2",
        },
        darkorchid: "#b558f6",
        lightslategray: "#758aa1",
        royalblue: "#4072ee",
        mediumseagreen: "#29cb97",
        gray: "rgba(255, 255, 255, 0.5)",
        ghostwhite: "#f5f6fa",
        gold: "#fec400",
      },
      spacing: {},
      fontFamily: {
        roboto: "Roboto",
      },
      borderRadius: {
        "8xs": "5px",
        "10xs": "3px",
        "12xs-5": "0.5px",
        xl: "20px",
        "3xs": "10px",
      },
    },
    fontSize: {
      sm: "14px",
      xs: "12px",
      xl: "20px",
      base: "16px",
      "17xl": "36px",
      "3xl": "22px",
      "10xl": "29px",
      inherit: "inherit",
    },
    screens: {
      mq750: {
        raw: "screen and (max-width: 750px)",
      },
      mq675: {
        raw: "screen and (max-width: 675px)",
      },
      mq450: {
        raw: "screen and (max-width: 450px)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
};
