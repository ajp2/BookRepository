import React, { useState, useEffect, useContext } from "react";
import {
  getBook,
  createBook,
  bookInShelf,
  removeBook
} from "../util/books_util";
import { UserContext } from "./UserContext";

function Book({ match }) {
  const contextValue = useContext(UserContext);

  const [bookInfo, setBookInfo] = useState(null);
  const [userBook, setUserBook] = useState(null);
  const [inShelf, setInShelf] = useState(false);

  const bookId = match.params.bookId;
  const loggedIn = contextValue.session.isAuthenticated;

  useEffect(() => {
    if (!bookInfo) {
      bookInShelf(bookId).then(inShelf => setInShelf(inShelf));
      getBook(bookId).then(data => setBookInfo(data.volumeInfo));
    }
  });

  if (!bookInfo) return "Loading";

  return (
    <div>
      <h2>{bookInfo.title}</h2>
      <img src={findImages(bookInfo.imageLinks)} alt={bookInfo.title} />
      <p>{bookInfo.authors ? bookInfo.authors.join(", ") : null}</p>
      <p>
        {bookInfo.description
          ? bookInfo.description.replace(/<[^>]*>?/gm, "")
          : null}
      </p>
      <p>Pages: {bookInfo.pageCount}</p>
      {!inShelf && loggedIn ? (
        <button
          onClick={() =>
            addToBookshelf(bookId, bookInfo, setInShelf, setUserBook)
          }
        >
          Add To Bookshelf
        </button>
      ) : null}
      {inShelf && loggedIn
        ? bookInShelfContent(bookId, setInShelf, setUserBook)
        : null}
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

const addToBookshelf = (bookId, bookInfo, setInShelf, setUserBook) => {
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

const bookInShelfContent = (bookId, setInShelf, setUserBook) => (
  <div>
    <button
      onClick={() => removeFromBookshelf(bookId, setInShelf, setUserBook)}
    >
      Remove From Bookshelf
    </button>
    <button>Mark as Read</button>
    <h3>Add a chapter summary</h3>
  </div>
);

const removeFromBookshelf = (bookId, setInShelf, setUserBook) => {
  removeBook(bookId).then(() => {
    setInShelf(false);
    setUserBook(null);
  });
};

export default Book;
