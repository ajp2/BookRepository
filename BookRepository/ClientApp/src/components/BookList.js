import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BookTile from "./BookTile";

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
  console.log(books);
  const classes = useStyles();

  // sort by ratingsCount in reverse order
  let sortedBooks;
  try {
    sortedBooks = books.sort((a, b) => {
      if (a.volumeInfo.ratingsCount > b.volumeInfo.ratingsCount) {
        return -1;
      } else if (a.volumeInfo.ratingsCount < b.volumeInfo.ratingsCount) {
        return 1;
      } else {
        return 0;
      }
    });
  } catch (err) {
    sortedBooks = books;
  }

  return (
    <div>
      <ul className={classes.bookList}>
        {sortedBooks.map((book, idx) => (
          <li key={idx}>{<BookTile bookInfo={returnBookInfo(book)} />}</li>
        ))}
      </ul>
    </div>
  );
}

const returnBookInfo = book => {
  if (book.volumeInfo) {
    return { ...book.volumeInfo, id: book.id };
  } else {
    return book;
  }
};

export default BookList;
