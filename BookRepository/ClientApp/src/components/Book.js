import React, { useState, useEffect } from "react";
import { getBook, createBook, bookInShelf } from "../util/books_util";

function Book({ match }) {
  const [bookInfo, setBookInfo] = useState(null);
  const [userBook, setUserBook] = useState(null);
  const [inShelf, setInShelf] = useState(false);
  const bookId = match.params.bookId;

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
      {!inShelf ? (
        <button onClick={() => addToBookshelf(bookId, bookInfo, setUserBook)}>
          Add To Bookshelf
        </button>
      ) : null}
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

const addToBookshelf = (bookId, bookInfo, setUserBook) => {
  const book = {
    Id: bookId,
    Read: false,
    Title: bookInfo.title,
    ThumbnailUrl: bookInfo.imageLinks.thumbnail,
    Authors: bookInfo.authors.join(", ")
  };

  createBook(book).then(data => {
    setUserBook(data);
  });
};

export default Book;
