import axios from "axios";

export const getBooks = () => axios.get("/api/books").then(res => res.data);
