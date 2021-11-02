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
import { commonStyles, textFieldStyles } from "./common/styles.js";
import { register, login } from "./store/utils/thunkCreators";

function Form(props) {
  const { user, login, register, type } = props;
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
    <Grid container className={classes.mainFormContainer} direction={"column"}>
      <Typography
        variant={"h3"}
        component={"h1"}
        className={classes.typoGraphy}
      >
        {type === "login" ? "Welcome back." : "Create an account."}
      </Typography>
      <form
        className={classes.formStyles}
        onSubmit={type === "register" ? handleRegister : handleLogin}
      >
        <Grid>
          {type === "register" ? (
            <>
              <Grid container>
                <FormControl className={classes.formControl}>
                  <TextField
                    className={classes.textField}
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
                <FormControl className={classes.formControl}>
                  <TextField
                    className={classes.textField}
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
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    aria-label="password"
                    label="Password"
                    className={classes.textField}
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="password"
                    required
                    {...textFieldStyles}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
              <Grid container>
                <FormControl
                  className={classes.formControl}
                  error={!!formErrorMessage.confirmPassword}
                >
                  <TextField
                    label="Confirm Password"
                    aria-label="confirm password"
                    type="password"
                    inputProps={{ minLength: 6 }}
                    name="confirmPassword"
                    required
                    className={classes.textField}
                    {...textFieldStyles}
                  />
                  <FormHelperText className={classes.formHelperText}>
                    {formErrorMessage.confirmPassword}
                  </FormHelperText>
                </FormControl>
              </Grid>
            </>
          ) : (
            <Grid container>
              <FormControl className={classes.formControl}>
                <TextField
                  className={classes.textField}
                  aria-label="username"
                  label="Username"
                  name="username"
                  type="text"
                  required
                  {...textFieldStyles}
                />
              </FormControl>
              <TextField
                className={classes.textField}
                label="Password"
                variant="standard"
                type="Password"
                name="password"
                {...textFieldStyles}
                InputProps={{
                  endAdornment: (
                    <span className={classes.forgotPasswordStyle}>Forgot?</span>
                  ),
                }}
                required
              />
            </Grid>
          )}

          <Button
            type="submit"
            variant="contained"
            size="large"
            className={classes.buttonStyle}
          >
            {type === "register" ? "Create" : "Login"}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

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
    register: (credentials) => {
      dispatch(register(credentials));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
