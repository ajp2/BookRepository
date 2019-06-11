import axios from "axios";

export const searchBooks = query =>
  fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURI(
      query
    )}&maxResults=20`
  ).then(res => res.json());

export const getBook = bookId =>
  fetch(`https://www.googleapis.com/books/v1/volumes/${bookId}`).then(res =>
    res.json()
  );

export const getBooks = () => axios.get("/api/books").then(res => res.data);

export const createBook = book =>
  axios
    .post("/api/books", book)
    .then(res => res.data)
    .catch(err => console.log(err.response.data));

export const bookInShelf = bookId => {
  return axios
    .get(`api/books/${bookId}`)
    .then(res => true)
    .catch(err => false);
};

export const removeBook = bookId =>
  axios.delete(`api/books/${bookId}`).then(res => res.data);
