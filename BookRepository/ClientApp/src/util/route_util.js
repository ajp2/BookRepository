import React from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

export const Auth = ({
  component: Component,
  path,
  exact,
  loggedIn,
  session
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? (
        <Redirect to="/" />
      ) : (
        <Component {...props} session={session} />
      )
    }
  />
);

export const Protected = ({
  component: Component,
  path,
  exact,
  loggedIn,
  session
}) => (
  <Route
    path={path}
    exact={exact}
    render={props =>
      loggedIn ? (
        <Component {...props} session={session} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);

export const AuthRoute = withRouter(Auth);
export const ProtectedRoute = withRouter(Protected);
