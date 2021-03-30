module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"],
      },
      padding: {
        vh: "8vh",
        "1/18": "5.555555555%",
      },
      width: {
        "1/18": "5.555555555%",
        "17/18": "94.444444444%",
      },
      height: {
        "7v": "7vh",
        "8v": "8vh",
        "9v": "9vh",
        "20v": "20vh",
        "30v": "30vh",
        "40v": "40vh",
        "50v": "50vh",
        "60v": "60vh",
        "70v": "70vh",
        "80v": "80vh",
        "90v": "90vh",
        "92v": "92vh",
        "93v": "93vh",
        "100v": "100vh",
      },
    },
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#3490dc",
      secondary: "#E8F1F2",
      green: "#5B9279",
    }),
    textColor: (theme) => ({
      ...theme("colors"),
      primary: "#5B9279",
      secondary: "#001A23",
      minimal: "#C2C2C2",
      green: "#5B9279",
    }),

    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#E8F1F2",
      green: "#5B9279",
      danger: "#e3342f",
    }),
    borderWidth: {
      DEFAULT: "1px",
      0: "0",
      2: "2px",
      3: "3px",
      4: "4px",
      6: "6px",
      8: "8px",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
