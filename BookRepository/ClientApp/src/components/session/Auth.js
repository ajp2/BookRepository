import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button/";
import { makeStyles } from "@material-ui/core/styles";
import { auth, test } from "../../util/auth_util";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxWidth: 400
  },
  dense: {
    marginTop: 19
  },
  button: {
    margin: theme.spacing(1),
    marginTop: 20
  },
  form: {
    maxWidth: "25rem",
    margin: "6rem auto",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    flexDirection: "column",
    textAlign: "center"
  }
}));

function Auth({ session }) {
  // test();
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log([username, password]);
    auth(session, username, password)
      .then(() => {
        setUsername("");
        setPassword("");
        setErrors([]);
        test();
      })
      .catch(err => setErrors(err.response.data.errors));
  };

  const login = () => (
    <form className={`auth-form ${classes.form}`} onSubmit={handleSubmit}>
      <h1>Login</h1>
      {errors.length ? (
        <ul>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      ) : null}
      <TextField
        id="standard-name"
        label="Username"
        className={classes.textField}
        value={username}
        onChange={e => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Login
      </Button>
    </form>
  );

  const signup = () => (
    <form className={`auth-form ${classes.form}`} onSubmit={handleSubmit}>
      <h1>Sign up</h1>
      {errors.length ? (
        <ul>
          {errors.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      ) : null}
      <TextField
        id="standard-name"
        label="Username"
        className={classes.textField}
        value={username}
        onChange={e => setUsername(e.target.value)}
        margin="normal"
      />
      <TextField
        id="standard-password-input"
        label="Password"
        className={classes.textField}
        type="password"
        autoComplete="current-password"
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </form>
  );

  return session === "login" ? login() : signup();
}

export default Auth;
