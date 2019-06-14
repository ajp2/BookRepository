import axios from "axios";

export const getChaptersByBookId = bookId =>
  axios.get(`/api/chapters/${bookId}`).then(res => res.data);

export const createChapter = (bookId, chapter) =>
  axios.post(`/api/chapters/${bookId}`, chapter).then(res => res.data);
