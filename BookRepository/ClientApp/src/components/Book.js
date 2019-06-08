import React, { useState, useEffect } from "react";
import { getBook } from "../util/books_util";

function Book({ match }) {
  const [bookInfo, setBookInfo] = useState(null);
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

export default Book;
