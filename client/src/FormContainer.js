import React from "react";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Typography, Button, makeStyles } from "@material-ui/core";

import { ReactComponent as BubbleIcon } from "./assets/bubble.svg";
import { login } from "./store/utils/thunkCreators";
import { commonStyles } from "./common/styles";

const useStyles = makeStyles(() => ({
  main_container: {
    maxWidth: "1920px",
    margin: "auto",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.4)",
  },

  main_grid_left: {
    height: "100vh",
    background:
      'url("https://res.cloudinary.com/dinspdp3w/image/upload/v1634753482/bg-img_hp1hks.png") no-repeat ',
    backgroundSize: "cover",
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
  },

  tagline: {
    color: "white",
    textAlign: "center",
    marginTop: "40px",
    maxWidth:'425px'
  },
}));

const RenderButton = () => {
  const classes = commonStyles({ bgcolor: "#fff", color: "#3A8DFF" });

  const location = useLocation().pathname;
  const history = useHistory();

  return (
    <>
      <div
        style={{
          color: "rgba(0,0,0,0.5)",
          fontSize: "16px",
          margin: "0px 15px",
          fontWeight: "normal",
        }}
      >
        Don't have an account?
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
          <Typography
            className={classes.tagline}
            variant={"h4"}
            component={"h1"}
          >
            Converse with anyone with any language
          </Typography>
        </div>
      </Grid>
      <Grid
        className={classes.main_grid_right}
        md={7}
        sm={12}
        direction={"column"}
        container
      >
        <Grid
          container
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 30px",
          }}
        >
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials) => {
      dispatch(login(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);
