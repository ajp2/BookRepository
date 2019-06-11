import React, { useState, useEffect } from "react";
import { getBooks } from "../util/books_util";

function UserBooks() {
  const [bookResults, setBookResults] = useState([]);

  useEffect(() => {
    if (!bookResults.length) {
      getBooks().then(data => setBookResults(data));
    }
    console.log(bookResults);
  });

  return (
    <div>
      <h1>my books</h1>
    </div>
  );
}

export default UserBooks;
