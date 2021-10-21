import { makeStyles } from "@material-ui/core";

export const commonStyles = makeStyles(() => ({
  text_field: {
    padding: "20px 0px 0px 0px",
    margin: "20px 0px",
    width: "100%",
    fontSize: "20px",
  },

  button_style: {
    width: "180px",
    color: ({ color }) => color,
    backgroundColor: ({ bgcolor }) => bgcolor,
    fontSize: "16px",
    padding: "20px",
    boxShadow: "0px 0px 15px 2px rgba(0,0,0,0.2)",
    margin: "30px 0",
  },
}));

export const textFieldStyles = {
  inputProps: { style: { fontSize: 20 } },
  InputLabelProps: { style: { fontSize: 25, color: "gray" } },
};
