import React, { useState } from "react";
import ChapterForm from "./ChapterForm";

function Chapter({ chapters, bookId, setChapters }) {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0].id);
  const [addChapter, setAddChapter] = useState(false);

  return (
    <div>
      <button onClick={() => setAddChapter(!addChapter)}>
        Add New Chapter Summary
      </button>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>{chapter.chapterNumber}</li>
        ))}
      </ul>
      {addChapter ? (
        <ChapterForm
          bookId={bookId}
          chapters={chapters}
          setChapters={setChapters}
          setAddChapter={() => setAddChapter(!addChapter)}
        />
      ) : (
        <p>
          {chapters.find(chapter => chapter.id === selectedChapter).content}
        </p>
      )}
    </div>
  );
}

export default Chapter;
