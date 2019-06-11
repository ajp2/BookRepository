import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import { getBooks } from "../util/books_util";

function UserBooks() {
  const [bookResults, setBookResults] = useState([]);
  const [fetchedBooks, setFetchedBooks] = useState(false);

  useEffect(() => {
    if (!bookResults.length) {
      getBooks()
        .then(data => {
          data.forEach(book => {
            book.imageLinks = { thumbnail: book.thumbnailUrl };
            book.authors = book.authors.split(", ");
          });
          setBookResults(data);
          setFetchedBooks(true);
        })
        .catch(() => setFetchedBooks(true));
    }
  });

  if (!fetchedBooks) return false;
  return (
    <div>
      <h3>Read Books: </h3>
      <BookList books={bookResults.filter(book => book.read)} />
      <h3>Unread Books: </h3>
      <BookList books={bookResults.filter(book => !book.read)} />
    </div>
  );
}

export default UserBooks;
