import React, { useState, useEffect } from "react";
import ChapterForm from "./ChapterForm";
import { deleteChapter } from "../util/chapters_util";

function Chapter({ chapters, bookId, setChapters }) {
  chapters = chapters.slice();
  let initialChapter = chapters[0] ? chapters[0].id : false;

  const [selectedChapter, setSelectedChapter] = useState(initialChapter);
  const [editChapter, setEditChapter] = useState(false);

  const getCurrentChapter = () => {
    const chapter = chapters.find(chapter => chapter.id === selectedChapter);
    return chapter ? chapter : {};
  };

  const removeChapter = chapterId => {
    deleteChapter(chapterId).then(data => {
      const chapterIdx = chapters.findIndex(
        chapter => chapter.id === chapterId
      );
      chapters.splice(chapterIdx, 1);
      setChapters(chapters);
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submitting");
  };

  const editChapterClick = () => {
    setEditChapter(!editChapter);
  };

  const currentChapter = getCurrentChapter();

  return (
    <div>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id} onClick={() => setSelectedChapter(chapter.id)}>
            {chapter.chapterNumber}
          </li>
        ))}
      </ul>
      {Object.keys(currentChapter).length ? (
        <div>
          <button onClick={editChapterClick}>Edit Chapter</button>
          <button onClick={() => removeChapter(currentChapter.id)}>
            Delete Chapter
          </button>
          {editChapter ? (
            <form onSubmit={handleSubmit}>
              <input type="text" value={currentChapter.content} />
            </form>
          ) : (
            <p className="chapter-content">{currentChapter.content}</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default Chapter;
