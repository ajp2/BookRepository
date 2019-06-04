import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";

function Signup() {
  return (
    <div>
      <MuiThemeProvider>
        <div>
          <TextField hintText="Username" floatingLabelText="Username" />
          <br />
          <TextField
            hintText="Password"
            floatingLabelText="Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <TextField
            hintText="Confirm Password"
            floatingLabelText="Confirm Password"
            type="password"
            autoComplete="current-password"
            margin="normal"
          />
          <br />
          <br />
          <RaisedButton label="Signup" primary={true} />
        </div>
      </MuiThemeProvider>
    </div>
  );
}

export default Signup;
