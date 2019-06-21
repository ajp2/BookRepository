import React, { useState, useContext } from "react";
import BookList from "./BookList";
import { searchBooks } from "../util/books_util";
import { UserContext } from "./UserContext";
import { auth } from "../util/auth_util";

import { makeStyles, useTheme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  main: {
    width: "100vw",
    height: "32rem",
    marginTop: "-16px",
    background: "#74ebd5",
    background: "-webkit-linear-gradient(to right, #ACB6E5, #74ebd5)",
    background: "linear-gradient(to right, #ACB6E5, #74ebd5)",
    [theme.breakpoints.down("sm")]: {
      height: "calc(100vh - 45px)"
    }
  },
  textField: {
    width: "20rem",
    fontSize: "2rem",
    margin: "1rem 0 5rem 0"
  },
  button: {
    padding: "1rem",
    fontSize: "0.9rem"
  },
  hero: {
    textAlign: "center",
    paddingTop: "6rem"
  }
}));

function Home() {
  const theme = useTheme();
  const classes = useStyles();
  const contextValue = useContext(UserContext);
  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);

  const loggedIn = contextValue.session.isAuthenticated;

  const handleSubmit = e => {
    e.preventDefault();
    searchBooks(bookQuery).then(data => setBookResults(data.items));
  };

  const handleLogin = () => {
    auth("login", "guest").then(decoded => {
      contextValue.loginSession(decoded);
    });
  };

  return (
    <div>
      <div className={classes.main}>
        <div className={classes.hero}>
          <h1>Search For a Book</h1>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Search Books"
              placeholder="Search Books"
              className={classes.textField}
              value={bookQuery}
              onChange={e => setBookQuery(e.target.value)}
              margin="normal"
            />
            <input type="submit" hidden={true} />
          </form>

          {!loggedIn ? (
            <Button
              variant="outlined"
              onClick={handleLogin}
              color="primary"
              className={classes.button}
            >
              Login as a Guest
            </Button>
          ) : null}
        </div>
      </div>

      {bookResults && bookResults.length ? (
        <BookList books={bookResults} />
      ) : null}
    </div>
  );
}

export default Home;
