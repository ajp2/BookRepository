import axios from "axios";

export const searchBooks = query =>
  axios
    .get(`/api/books/search?query=${encodeURI(query)}`)
    .then(res => res.data);

export const getBooks = () => axios.get("/api/books").then(res => res.data);
