import React, { useState, useContext } from "react";
import BookList from "./BookList";
import { searchBooks } from "../util/books_util";
import { UserContext } from "./UserContext";
import { auth } from "../util/auth_util";

function Home() {
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
      <h1>BookRepository home page.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Books"
          onChange={e => setBookQuery(e.target.value)}
          value={bookQuery}
        />
        <input type="submit" hidden={true} />
      </form>
      {!loggedIn ? (
        <button onClick={handleLogin}>Login as a Guest</button>
      ) : null}
      {bookResults && bookResults.length ? (
        <BookList books={bookResults} />
      ) : null}
    </div>
  );
}

export default Home;
