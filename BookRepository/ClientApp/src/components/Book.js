import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  bookTile: {
    width: "15rem",
    height: "20rem",
    padding: "1.2rem 0.8rem",
    overflow: "hidden"
  },
  bookImage: {
    display: "block",
    margin: "0 auto"
  }
}));

function Book({ bookInfo }) {
  const classes = useStyles();
  console.log(bookInfo);

  return (
    <div className={classes.bookTile}>
      {bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? (
        <img
          src={bookInfo.imageLinks.thumbnail}
          alt={bookInfo.title}
          className={classes.bookImage}
        />
      ) : null}
      <strong>{bookInfo.title}</strong>
      <p>{bookInfo.subtitle}</p>
      <p>{bookInfo.authors ? bookInfo.authors.join(", ") : null}</p>
    </div>
  );
}

export default Book;
