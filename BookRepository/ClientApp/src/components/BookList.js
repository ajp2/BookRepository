import React from "react";
import Book from "./Book";

function BookList({ books }) {
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
      <ul>
        {sortedBooks.map((book, idx) => (
          <li key={idx}>{<Book bookInfo={book.volumeInfo} />}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
