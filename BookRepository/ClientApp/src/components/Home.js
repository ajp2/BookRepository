import React, { useState } from "react";
import BookList from "./BookList";
import { searchBooks } from "../util/books_util";

function Home() {
  const [bookQuery, setBookQuery] = useState("");
  const [bookResults, setBookResults] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    searchBooks(bookQuery).then(data => setBookResults(data.items));
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
      {bookResults.length ? <BookList books={bookResults} /> : null}
    </div>
  );
}

export default Home;
