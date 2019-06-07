import React from "react";

function Book({ bookInfo }) {
  console.log(bookInfo);
  return (
    <div>
      <h4>{bookInfo.title}</h4>
      <p>{bookInfo.subtitle}</p>
      <p>{bookInfo.authors ? bookInfo.authors.join(", ") : null}</p>
      {bookInfo.imageLinks && bookInfo.imageLinks.thumbnail ? (
        <img src={bookInfo.imageLinks.thumbnail} alt={bookInfo.title} />
      ) : null}
      <br />
    </div>
  );
}

export default Book;
