import React, { createContext, useState } from "react";
import { withRouter } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { logout } from "../util/auth_util";
import { setAuthToken } from "../util/auth_util";

export const UserContext = createContext();

function Provider({ children, history }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  if (localStorage["jwtToken"]) {
    const decoded = jwt_decode(localStorage["jwtToken"]);
    if (Date.now() / 1000 > decoded) {
      logout();
      history.push("/");
    } else {
      setAuthToken(localStorage["jwtToken"]);
      if (!isAuthenticated) {
        setIsAuthenticated(true);
        setUser(decoded);
      }
    }
  }

  const providerValue = {
    session: { isAuthenticated, user },
    logoutSession: () => {
      setIsAuthenticated(false);
      setUser(null);
    },
    loginSession: decoded => {
      setIsAuthenticated(true);
      setUser(decoded);
    }
  };

  return (
    <UserContext.Provider value={providerValue}>
      {children}
    </UserContext.Provider>
  );
}

export default withRouter(Provider);
