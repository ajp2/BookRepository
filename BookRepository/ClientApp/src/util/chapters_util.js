import axios from "axios";

export const getChaptersByBookId = bookId =>
  axios.get(`/api/chapters/${bookId}`).then(res => res.data);
