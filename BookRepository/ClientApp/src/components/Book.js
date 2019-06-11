import React, { useState, useEffect } from "react";
import { getBook, createBook } from "../util/books_util";

function Book({ match }) {
  const [bookInfo, setBookInfo] = useState(null);
  const [userBook, setUserBook] = useState(null);
  const bookId = match.params.bookId;

  useEffect(() => {
    if (!bookInfo) {
      getBook(bookId).then(data => setBookInfo(data.volumeInfo));
    }
  });

  if (!bookInfo) return "Loading";
  console.log(bookInfo);
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
      <button onClick={() => addToBookshelf(bookId, bookInfo, setUserBook)}>
        Add To Bookshelf
      </button>
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
  console.log(book);

  createBook(book).then(data => {
    console.log("creating...");
    setUserBook(data);
  });
};

export default Book;
