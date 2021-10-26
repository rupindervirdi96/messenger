import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {
  Grid,
  Button,
  TextField,
  FormHelperText,
  FormControl,
  Typography,
} from "@material-ui/core";

import { register } from "./store/utils/thunkCreators";
import { commonStyles, textFieldStyles } from "./common/styles.js";

const RegisterForm = (props) => {
  const { user, register } = props;
  const [formErrorMessage, setFormErrorMessage] = useState({});
  const classes = commonStyles({ bgcolor: "#3A8DFF", color: "#fff" });

  const handleRegister = async (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const email = event.target.email.value;
    const password = event.target.password.value;
    const confirmPassword = event.target.confirmPassword.value;

    if (password !== confirmPassword) {
      setFormErrorMessage({ confirmPassword: "Passwords must match" });
      return;
    }
    await register({ username, email, password });
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
      <form onSubmit={handleRegister}>
        <Grid>
          <Grid container>
            <FormControl style={{ flexGrow: 1 }}>
              <TextField
                className={classes.text_field}
                aria-label="username"
                label="Username"
                name="username"
                type="text"
                required
                {...textFieldStyles}
              />
            </FormControl>
          </Grid>
          <Grid container>
            <FormControl style={{ flexGrow: 1 }}>
              <TextField
                className={classes.text_field}
                label="E-mail address"
                aria-label="e-mail address"
                type="email"
                name="email"
                required
                {...textFieldStyles}
              />
            </FormControl>
          </Grid>
          <Grid container>
            <FormControl
              style={{ flexGrow: 1 }}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                aria-label="password"
                label="Password"
                className={classes.text_field}
                type="password"
                inputProps={{ minLength: 6 }}
                name="password"
                required
                {...textFieldStyles}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Grid container>
            <FormControl
              style={{ flexGrow: 1 }}
              error={!!formErrorMessage.confirmPassword}
            >
              <TextField
                label="Confirm Password"
                aria-label="confirm password"
                type="password"
                inputProps={{ minLength: 6 }}
                name="confirmPassword"
                required
                className={classes.text_field}
                {...textFieldStyles}
              />
              <FormHelperText>
                {formErrorMessage.confirmPassword}
              </FormHelperText>
            </FormControl>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.button_style}
          >
            Create
          </Button>
        </Grid>
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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
