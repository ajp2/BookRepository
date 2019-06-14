import React, { useState, useEffect } from "react";
import ChapterForm from "./ChapterForm";
import { getChaptersByBookId } from "../util/chapters_util";

function Chapters({ bookId }) {
  const [chapters, setChapters] = useState([]);
  useEffect(() => {
    getChaptersByBookId(bookId).then(data => setChapters(data));
  });

  return (
    <div>{chapters.length ? <h1>list chapters</h1> : <ChapterForm />}</div>
  );
}

export default Chapters;
