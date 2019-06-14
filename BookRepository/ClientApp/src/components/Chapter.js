import React, { useState } from "react";

function Chapter({ chapters }) {
  const [selectedChapter, setSelectedChapter] = useState(chapters[0].id);
  console.log(chapters);
  return (
    <div>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>{chapter.chapterNumber}</li>
        ))}
      </ul>
      <p>{chapters.find(chapter => chapter.id === selectedChapter).content}</p>
    </div>
  );
}

export default Chapter;
