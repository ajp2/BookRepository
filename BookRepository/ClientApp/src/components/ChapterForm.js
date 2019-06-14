import React, { useState } from "react";
import { getChaptersByBookId, createChapter } from "../util/chapters_util";

function ChapterForm({ bookId, chapters, setChapters }) {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapterContent, setChapterContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    const chapter = {
      ChapterNumber: chapterNumber,
      Content: chapterContent,
      BookId: bookId
    };
    createChapter(bookId, chapter).then(data => {
      const updatedChapters = [...chapters, data];
      console.log(updatedChapters);
      setChapters(updatedChapters);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={chapterNumber}
        onChange={e => setChapterNumber(e.target.value)}
      />
      <textarea
        value={chapterContent}
        onChange={e => setChapterContent(e.target.value)}
        cols="30"
        rows="10"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default ChapterForm;
