import React, { useEffect } from "react";

function Book({ match }) {
  const bookId = match.params.bookId;

  useEffect(() => {});

  return <h2>book info</h2>;
}

export default Book;
