import React, { useState, useEffect } from "react";
import BookList from "./BookList";
import { getBooks } from "../util/books_util";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  bookListContainer: {
    maxWidth: "70rem",
    margin: "4rem auto"
  },
  heading: {
    paddingBottom: "0.5rem",
    borderBottom: "1px solid #ccc",
    fontSize: "24px"
  }
}));

function UserBooks() {
  const classes = useStyles();
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
    <div className={classes.bookListContainer}>
      <h3 className={classes.heading}>Read Books</h3>
      <BookList books={bookResults.filter(book => book.read)} />
      <h3 className={classes.heading}>Unread Books</h3>
      <BookList books={bookResults.filter(book => !book.read)} />
    </div>
  );
}

export default UserBooks;
