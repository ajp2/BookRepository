import React, { useState } from "react";
import { getBooks } from "../util/books_util";

function Home() {
  const [searchBooks, setSearchBooks] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log(searchBooks);
    getBooks().then(data => console.log(data));
  };

  return (
    <div>
      <h1>BookRepository home page.</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search Books"
          onChange={e => setSearchBooks(e.target.value)}
          value={searchBooks}
        />
        <input type="submit" hidden={true} />
      </form>
    </div>
  );
}

export default Home;
