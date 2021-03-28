module.exports = {
  purge: ["./src/**/*.tsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        body: ["Roboto"],
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
    }),
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
      "93v": "93vh",
      "100v": "100vh",
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      DEFAULT: theme("colors.gray.300", "currentColor"),
      primary: "#E8F1F2",
      secondary: "#ffed4a",
      danger: "#e3342f",
    }),
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
