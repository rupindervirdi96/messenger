import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { Grid, Box, Button, TextField, Typography } from "@material-ui/core";

import { login } from "./store/utils/thunkCreators";
import { commonStyles, textFieldStyles } from "./common/styles.js";

const LoginForm = (props) => {
  const classes = commonStyles({ bgcolor: "#3A8DFF", color: "#fff" });

  const { user, login } = props;

  const handleLogin = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;

    await login({ username, password });
  };

  if (user.id) {
    return <Redirect to="/home" />;
  }

  return (
    <Grid
      container
      style={{
        flexGrow: "1",
        padding: "80px",
        maxWidth: "850px",
        margin: "auto",
      }}
      direction={"column"}
    >
      <Typography
        variant={"h3"}
        component={"h1"}
        style={{
          fontFamily: "Open Sans",
          fontWeight: "bold",
          fontSize: "42px",
        }}
      >
        {props.title}
      </Typography>
      <form onSubmit={handleLogin}>
        <Box container>
          <Grid container direction="column" alignItems="flex-start">
            <TextField
              style={{ marginTop: "15px" }}
              className={classes.text_field}
              label="E-mail address"
              variant="standard"
              name="username"
              {...textFieldStyles}
              required
            />
            <TextField
              className={classes.text_field}
              label="Password"
              variant="standard"
              type="Password"
              name="password"
              {...textFieldStyles}
              InputProps={{
                endAdornment: (
                  <span
                    style={{ color: "#3A8DFF", textDecoration: "underline" }}
                  >
                    Forgot?
                  </span>
                ),
              }}
              required
            />
            <Button
              className={classes.button_style}
              type="submit"
              variant="contained"
              size="large"
              style={{ margin: "20px auto" }}
            >
              Login
            </Button>
          </Grid>
        </Box>
      </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
