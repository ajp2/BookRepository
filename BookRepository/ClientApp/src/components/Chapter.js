import React, { useState } from "react";
import { deleteChapter, updateChapter } from "../util/chapters_util";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(() => ({
  chapterContainer: {
    display: "flex",
    margin: "2rem 0"
  },
  chapterList: {
    listStyleType: "none",
    padding: "0",
    width: "20%",
    borderRight: "1px solid #ccc"
  },
  chapterListItem: {
    padding: "0.4rem 0.2rem",
    textAlign: "center",
    borderRadius: "5px",
    "&:hover": {
      cursor: "pointer",
      background: "#eee"
    }
  },
  chapterContent: {
    width: "80%",
    paddingLeft: "5rem"
  },
  chapterText: {
    marginBottom: "3.5rem"
  },
  button: {
    marginRight: "5rem",
    marginTop: "1.5rem"
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "1.5rem"
  }
}));

function Chapter({ chapters, bookId, setChapters }) {
  const classes = useStyles();
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

  const updateSelectedChapter = chapter => {
    setSelectedChapter(chapter.id);
    setEditChapterText(chapter.content);
  };

  return (
    <div className={classes.chapterContainer}>
      <ul className={classes.chapterList}>
        {chapters.map(chapter => (
          <li
            key={chapter.id}
            className={classes.chapterListItem}
            onClick={() => updateSelectedChapter(chapter)}
          >
            Chapter {chapter.chapterNumber}
          </li>
        ))}
      </ul>
      {Object.keys(currentChapter).length ? (
        <div className={classes.chapterContent}>
          {editChapter ? (
            <form onSubmit={handleSubmit} className={classes.editForm}>
              <TextField
                id="outlined-multiline-static"
                label="Edit Chapter"
                multiline
                rows="10"
                value={editChapterText}
                className={classes.textField}
                onChange={e => setEditChapterText(e.target.value)}
                margin="normal"
                variant="outlined"
              />
              <Button
                variant="contained"
                size="small"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
                style={{ marginRight: "0" }}
              >
                Submit
              </Button>
            </form>
          ) : (
            <p className={classes.chapterText}>{currentChapter.content}</p>
          )}
          <Button
            onClick={() => setEditChapter(!editChapter)}
            color="primary"
            className={classes.button}
          >
            Edit Chapter
          </Button>
          <Button
            onClick={() => removeChapter(currentChapter.id)}
            color="secondary"
            className={classes.button}
          >
            Delete Chapter
          </Button>
        </div>
      ) : null}
    </div>
  );
}

export default Chapter;
