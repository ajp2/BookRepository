import React from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Auth from "./components/session/Auth";

function App() {
  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <Route
        path="/login"
        render={props => <Auth {...props} session="login" />}
      />
      <Route
        path="/signup"
        render={props => <Auth {...props} session="signup" />}
      />
    </Layout>
  );
}

export default App;
