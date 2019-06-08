import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Book from "./Book";

const useStyles = makeStyles(() => ({
  bookList: {
    listStyleType: "none",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    padding: "1rem 0"
  }
}));

function BookList({ books }) {
  const classes = useStyles();

  // sort by ratingsCount in reverse order
  const sortedBooks = books.sort((a, b) => {
    if (a.volumeInfo.ratingsCount > b.volumeInfo.ratingsCount) {
      return -1;
    } else if (a.volumeInfo.ratingsCount < b.volumeInfo.ratingsCount) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <div>
      <ul className={classes.bookList}>
        {sortedBooks.map((book, idx) => (
          <li key={idx}>{<Book bookInfo={book.volumeInfo} />}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
