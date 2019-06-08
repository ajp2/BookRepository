import axios from "axios";

export const searchBooks = query =>
  axios
    .get(`/api/books/search?query=${encodeURI(query)}`)
    .then(res => res.data);

export const getBooks = () => axios.get("/api/books").then(res => res.data);

export const getBook = bookId =>
  axios
    .get(`https://www.googleapis.com/books/v1/volumes/${bookId}`)
    .then(res => res.data);
