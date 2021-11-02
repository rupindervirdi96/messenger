import { makeStyles } from "@material-ui/core";

export const commonStyles = makeStyles(() => ({
  textField: {
    padding: "20px 0px 0px 0px",
    margin: "20px 0px",
    width: "100%",
    fontSize: "20px",
  },

  mainFormContainer: {
    padding: "0px 80px",
    maxWidth: "80%",
    margin: "auto",
  },
  buttonStyle: {
    width: "180px",
    color: ({ color }) => color,
    backgroundColor: ({ bgcolor }) => bgcolor,
    fontSize: "16px",
    padding: "20px",
    boxShadow: "0px 0px 15px 2px rgba(0,0,0,0.2)",
    margin: "50px 0",
  },

  formStyles: {
    textAlign: "center",
    width: "100%",
    margin: "20px auto",
  },
  formControl: {
    flexGrow: 1,
  },
  formHelperText: {
    fontWeight: "bold",
    fontSize: "14px",
  },

  forgotPasswordStyle: {
    color: "#3A8DFF",
    fontWeight: "bold",
    fontSize: "20px",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export const textFieldStyles = {
  inputProps: { style: { fontSize: 20 } },
  InputLabelProps: { style: { fontSize: 25, color: "gray" } },
};
