import React, { useState, useEffect } from "react";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";
import { getChaptersByBookId } from "../util/chapters_util";

function Chapters({ bookId }) {
  const [chapters, setChapters] = useState([]);
  const [fetchedInfo, setFetchedInfo] = useState(false);
  useEffect(() => {
    if (!fetchedInfo) {
      getChaptersByBookId(bookId)
        .then(data => {
          setChapters(data);
          setFetchedInfo(true);
        })
        .catch(() => setFetchedInfo(true));
    }
  });

  if (!fetchedInfo) return false;
  return (
    <div>
      {chapters.length ? (
        <Chapter chapters={chapters} />
      ) : (
        <ChapterForm
          bookId={bookId}
          chapters={chapters}
          setChapters={setChapters}
        />
      )}
    </div>
  );
}

export default Chapters;
