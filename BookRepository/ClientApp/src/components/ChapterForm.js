import React, { useState } from "react";
import { getChaptersByBookId, createChapter } from "../util/chapters_util";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  chapterFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "0.6rem 0"
  },
  button: {
    marginTop: "0.6rem",
    height: "2.5rem"
  }
}));

function ChapterForm({ bookId, chapters, setChapters, setAddChapter }) {
  const classes = useStyles();
  const lastChapter = chapters.length
    ? chapters[chapters.length - 1].chapterNumber + 1
    : 1;

  const [chapterNumber, setChapterNumber] = useState(lastChapter);
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
      setChapters(updatedChapters);
      if (setAddChapter) setAddChapter();
    });
  };

  return (
    <form onSubmit={handleSubmit} className={classes.chapterFormContainer}>
      <TextField
        label="Chapter Number"
        value={chapterNumber}
        onChange={e => setChapterNumber(e.target.value)}
        type="number"
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
        variant="outlined"
      />
      <TextField
        id="outlined-multiline-static"
        label="Edit Chapter"
        multiline
        rows="10"
        value={chapterContent}
        onChange={e => setChapterContent(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button
        variant="contained"
        size="small"
        color="primary"
        onClick={handleSubmit}
        className={classes.button}
      >
        Submit
      </Button>
    </form>
  );
}

export default ChapterForm;
