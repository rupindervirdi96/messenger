import { createTheme } from "@material-ui/core";

export const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
    fontSize: 14,
    h1: {
      fontFamily: "Open Sans",
      fontSize: 42,
    },
  },
  overrides: {
    MuiInput: {
      input: {
        fontWeight: "bold",
      },
    },
  },
  palette: {
    primary: { main: "#3A8DFF" },
    secondary: { main: "#FFFFFF" },
  },
  spacing: [0, 2, 6, 15, 20, 48],
});
