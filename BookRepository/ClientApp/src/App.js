import React, { useContext } from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Auth from "./components/session/Auth";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import { UserContext } from "./components/UserContext";

function App() {
  const contextValue = useContext(UserContext);
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <AuthRoute
        path="/login"
        loggedIn={contextValue.session.isAuthenticated}
        component={Auth}
        session="login"
      />
      <AuthRoute
        path="/signup"
        loggedIn={contextValue.session.isAuthenticated}
        component={Auth}
        session="signup"
      />
    </Layout>
  );
}

export default App;
