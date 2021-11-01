import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Typography,
  Button,
  makeStyles,
  Box,
} from "@material-ui/core";

import { ReactComponent as BubbleIcon } from "./assets/bubble.svg";
import { commonStyles } from "./common/styles";
import { theme } from "./themes/theme";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    maxWidth: "1920px",
    margin: "auto",
    height: "100vh",
  },

  mainGridLeft: {
    background:
      'url("https://res.cloudinary.com/dinspdp3w/image/upload/v1634753482/bg-img_hp1hks.png") no-repeat ',
    backgroundSize: "cover",
    height: "100%",
  },

  textOverlay: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "40px",
    alignItems: "center",
    padding: "0 100px",
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
      <Typography className={classes.renderButton}>
        {location === "/login"
          ? "Don't have an account?"
          : "Already have an account?"}
      </Typography>
      <Button
        className={classes.buttonStyle}
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
    <Grid container direction="row" className={classes.mainContainer}>
      <Grid className={classes.mainGridLeft} md={5} sm={12} item>
        <Box className={classes.textOverlay}>
          <BubbleIcon />
          <Typography
            variant="h1"
            className={classes.tagline}
            color="secondary"
          >
            Converse with anyone with any language
          </Typography>
        </Box>
      </Grid>
      <Grid
        className={classes.mainGridRight}
        md={7}
        sm={12}
        direction={"column"}
        container
      >
        <Grid container className={classes.rightHeader}>
          <RenderButton />
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
