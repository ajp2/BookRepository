import React, { useState } from "react";
import { deleteChapter, updateChapter } from "../util/chapters_util";

function Chapter({ chapters, bookId, setChapters }) {
  chapters = chapters.slice();
  let initialChapter = chapters[0] ? chapters[0].id : false;

  const getCurrentChapter = () => {
    const chapter = chapters.find(chapter => chapter.id === selectedChapter);
    return chapter ? chapter : {};
  };

  const [selectedChapter, setSelectedChapter] = useState(initialChapter);
  const [editChapter, setEditChapter] = useState(false);
  const [editChapterText, setEditChapterText] = useState(
    getCurrentChapter().content
  );

  const removeChapter = chapterId => {
    deleteChapter(chapterId).then(data => {
      const chapterIdx = chapters.findIndex(
        chapter => chapter.id === chapterId
      );
      chapters.splice(chapterIdx, 1);
      setChapters(chapters);
    });
  };

  const currentChapter = getCurrentChapter();

  const handleSubmit = e => {
    e.preventDefault();
    const chapter = {
      id: currentChapter.id,
      chapterNumber: currentChapter.chapterNumber,
      content: editChapterText,
      bookId: currentChapter.bookId
    };
    updateChapter(currentChapter.id, chapter).then(data => {
      const chapterIdx = chapters.findIndex(chap => chap.id === chapter.id);
      chapters[chapterIdx].content = editChapterText;
      setChapters(chapters);
      setEditChapter(false);
    });
  };

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
          <button onClick={() => setEditChapter(!editChapter)}>
            Edit Chapter
          </button>
          <button onClick={() => removeChapter(currentChapter.id)}>
            Delete Chapter
          </button>
          {editChapter ? (
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={editChapterText}
                onChange={e => setEditChapterText(e.target.value)}
              />
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
