import React, { useContext } from "react";
import { Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./components/Home";
import Auth from "./components/session/Auth";
import Book from "./components/Book";
import UserBooks from "./components/UserBooks";
import { AuthRoute, ProtectedRoute } from "./util/route_util";
import { UserContext } from "./components/UserContext";

function App() {
  const contextValue = useContext(UserContext);
  const loggedIn = contextValue.session.isAuthenticated;

  return (
    <Layout>
      <Route exact path="/" component={Home} />
      <AuthRoute
        path="/login"
        loggedIn={loggedIn}
        component={Auth}
        session="login"
      />
      <AuthRoute
        path="/signup"
        loggedIn={loggedIn}
        component={Auth}
        session="signup"
      />
      <Route path="/books/:bookId" component={Book} />
      <ProtectedRoute path="/books" component={UserBooks} loggedIn={loggedIn} />
    </Layout>
  );
}

export default App;
