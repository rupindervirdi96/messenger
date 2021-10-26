import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  MuiThemeProvider,
} from "@material-ui/core";

import { ReactComponent as BubbleIcon } from "./assets/bubble.svg";
import { login } from "./store/utils/thunkCreators";
import { commonStyles } from "./common/styles";
import { newTheme, theme } from "./themes/theme";

const useStyles = makeStyles((theme) => ({
  main_container: {
    maxWidth: "1920px",
    margin: "auto",
    height: "100vh",
  },

  main_grid_left: {
    background:
      'url("https://res.cloudinary.com/dinspdp3w/image/upload/v1634753482/bg-img_hp1hks.png") no-repeat ',
    backgroundSize: "cover",
    height: "100%",
  },

  text_overlay: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "0 60px",
    backgroundImage:
      "linear-gradient(to top, rgb(58 141 255 / 85%) , rgb(134 185 255 / 85%))",
    textAlign: "center",
  },

  rightHeader: {
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 30px",
  },

  renderButton: {
    color: "rgba(0,0,0,0.5)",
    fontSize: "16px",
    margin: "0px 15px",
    fontWeight: "normal",
  },
}));

const RenderButton = () => {
  const classes = {
    ...commonStyles({ bgcolor: "#fff", color: "#3A8DFF" }),
    ...useStyles(theme),
  };
  const location = useLocation().pathname;
  const history = useHistory();

  return (
    <>
      <div className={classes.renderButton}>
        {location === "/login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </div>
      <Button
        className={classes.button_style}
        type="submit"
        variant="contained"
        size="large"
        onClick={() =>
          history.push(location === "/login" ? "/register" : "/login")
        }
      >
        {location === "/login" ? "Create account" : "Login"}
      </Button>
    </>
  );
};

const FormContainer = (props) => {
  const classes = useStyles();
  const { user } = props;
  if (user.id) return <Redirect to="/home" />;

  return (
    <Grid container direction="row" className={classes.main_container}>
      <Grid className={classes.main_grid_left} md={5} sm={12} item>
        <div className={classes.text_overlay}>
          <BubbleIcon />
          <MuiThemeProvider theme={newTheme}>
            <Typography color="primary">
              Converse with anyone with any language
            </Typography>
          </MuiThemeProvider>
        </div>
      </Grid>
      <Grid
        className={classes.main_grid_right}
        md={7}
        sm={12}
        direction={"column"}
        container
      >
        <Grid container className={classes.rightHeader}>
          {<RenderButton />}
        </Grid>

        {props.children}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps)(FormContainer);
