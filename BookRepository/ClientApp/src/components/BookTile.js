import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  bookTile: {
    width: "15rem",
    height: "20rem",
    padding: "1.2rem 0.8rem",
    margin: "1rem 0.5rem",
    color: "black",
    textAlign: "center",
    overflow: "hidden",
    "&:hover": {
      background: "#eee"
    }
  },
  bookImage: {
    display: "block",
    width: "130px",
    height: "180px",
    margin: "0 auto",
    marginBottom: "1rem"
  },
  p: {
    margin: "0.2rem"
  },
  pSmall: {
    margin: "0.1rem",
    fontSize: "12px"
  }
}));

function BookTile({ bookInfo }) {
  const classes = useStyles();

  return (
    <Link to={`books/${bookInfo.id}`} style={{ textDecoration: "none" }}>
      <div className={classes.bookTile}>
        {bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? (
          <img
            src={bookInfo.imageLinks.thumbnail}
            alt={bookInfo.title}
            className={classes.bookImage}
          />
        ) : null}
        <p className={classes.p}>{bookInfo.title}</p>
        <p className={classes.pSmall}>
          {bookInfo.authors ? bookInfo.authors.join(", ") : null}
        </p>
      </div>
    </Link>
  );
}

export default BookTile;
