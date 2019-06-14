import React, { useState } from "react";

function ChapterForm() {
  const [chapterNumber, setChapterNumber] = useState(1);
  const [chapterContent, setChapterContent] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    console.log("submitting");
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
