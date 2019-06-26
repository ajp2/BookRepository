import React, { useState, useEffect, useContext } from "react";
import {
  getBook,
  createBook,
  getBookFromShelf,
  removeBook,
  updateBook
} from "../util/books_util";
import { UserContext } from "./UserContext";
import Chapters from "./Chapters";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  infoSection: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
      alignItems: "center"
    }
  },
  leftSection: {
    width: "25%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      marginBottom: "2rem"
    }
  },
  rightSection: {
    width: "75%",
    marginLeft: "3.5rem",
    [theme.breakpoints.down("sm")]: {
      margin: "0 auto",
      width: "90%"
    }
  },
  bookImg: {
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "0 auto"
    }
  },
  bookContainer: {
    maxWidth: "70rem",
    margin: "4rem auto"
  },
  chapterSection: {
    margin: "2.5rem 0 1rem 0",
    [theme.breakpoints.down("sm")]: {
      width: "90%",
      margin: "2rem auto"
    }
  },
  button: {
    margin: "4rem 5rem 2rem 5rem",
    [theme.breakpoints.down("sm")]: {
      display: "block",
      margin: "1.5rem auto"
    }
  }
}));

function Book({ match }) {
  const classes = useStyles();
  const contextValue = useContext(UserContext);

  const [bookInfo, setBookInfo] = useState(null);
  const [userBook, setUserBook] = useState(null);
  const [inShelf, setInShelf] = useState(false);

  const bookId = match.params.bookId;
  const loggedIn = contextValue.session.isAuthenticated;
  const stateObj = {
    bookId,
    bookInfo,
    userBook,
    setUserBook,
    inShelf,
    setInShelf,
    classes
  };

  useEffect(() => {
    if (!bookInfo) {
      const getAndUpdateUserBook = bookId => {
        getBookFromShelf(bookId).then(book => {
          if (book) {
            setUserBook(book);
            setInShelf(true);
          }
        });
      };

      getBook(bookId).then(data => {
        setBookInfo(data.volumeInfo);
        getAndUpdateUserBook(bookId);
      });
    }
  });

  if (!bookInfo) return "Loading";

  return (
    <div className={classes.bookContainer}>
      <div className={classes.infoSection}>
        <div className={classes.leftSection}>
          <img
            src={findImages(bookInfo.imageLinks)}
            className={classes.bookImg}
            alt={bookInfo.title}
          />
        </div>
        <div className={classes.rightSection}>
          <h2>{bookInfo.title}</h2>
          <p>{bookInfo.authors ? bookInfo.authors.join(", ") : null}</p>
          <p>
            {bookInfo.description
              ? bookInfo.description.replace(/<[^>]*>?/gm, "")
              : null}
          </p>
          <p>Page Count: {bookInfo.pageCount}</p>
        </div>
      </div>

      {!inShelf && loggedIn ? (
        <Button
          variant="outlined"
          onClick={() => addToBookshelf(stateObj)}
          className={classes.button}
        >
          Add To Bookshelf
        </Button>
      ) : null}
      {inShelf && loggedIn ? bookInShelfContent(stateObj) : null}
    </div>
  );
}

const findImages = imageLinks => {
  const imageSizes = ["small", "thumbnail", "smallThumbnail"];
  let imageUrl;
  for (let i = 0; i < imageSizes.length; i++) {
    const size = imageSizes[i];
    if (imageLinks[size]) {
      imageUrl = imageLinks[size];
      break;
    }
  }

  return imageUrl;
};

const addToBookshelf = ({ bookId, bookInfo, setInShelf, setUserBook }) => {
  const book = {
    Id: bookId,
    Read: false,
    Title: bookInfo.title,
    ThumbnailUrl: bookInfo.imageLinks.thumbnail,
    Authors: bookInfo.authors.join(", ")
  };

  createBook(book).then(data => {
    setUserBook(data);
    setInShelf(true);
  });
};

const bookInShelfContent = stateObj => (
  <div>
    <Button
      variant="outlined"
      onClick={() => removeFromBookshelf(stateObj)}
      className={stateObj.classes.button}
    >
      Remove From Bookshelf
    </Button>
    {stateObj.userBook.read ? (
      <Button
        variant="outlined"
        onClick={() => updateReadStatus(stateObj)}
        className={stateObj.classes.button}
      >
        Mark as Unread
      </Button>
    ) : (
      <Button
        variant="outlined"
        onClick={() => updateReadStatus(stateObj)}
        className={stateObj.classes.button}
      >
        Mark as Read
      </Button>
    )}

    <h3 className={stateObj.classes.chapterSection}>Chapter Summaries</h3>
    <Chapters bookId={stateObj.bookId} />
  </div>
);

const removeFromBookshelf = ({ bookId, setInShelf, setUserBook }) => {
  removeBook(bookId).then(() => {
    setInShelf(false);
    setUserBook(null);
  });
};

const updateReadStatus = ({ bookId, userBook, setUserBook }) => {
  userBook.read = !userBook.read;
  updateBook(userBook).then(data => setUserBook(data));
};

export default Book;
