import React, { useState, useEffect } from "react";
import ChapterForm from "./ChapterForm";
import Chapter from "./Chapter";
import { getChaptersByBookId } from "../util/chapters_util";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  chaptersSection: {
    [theme.breakpoints.down("sm")]: {
      textAlign: "center"
    }
  }
}));

function Chapters({ bookId }) {
  const classes = useStyles();
  const [chapters, setChapters] = useState([]);
  const [addChapter, setAddChapter] = useState(false);
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
    <div className={classes.chaptersSection}>
      <Button
        variant="outlined"
        color="primary"
        onClick={() => setAddChapter(!addChapter)}
      >
        Add New Chapter Summary
      </Button>
      {!addChapter ? (
        <Chapter
          chapters={chapters}
          setChapters={setChapters}
          bookId={bookId}
        />
      ) : (
        <ChapterForm
          bookId={bookId}
          chapters={chapters}
          setAddChapter={() => setAddChapter(false)}
          setChapters={newChapters => setChapters(newChapters)}
        />
      )}
    </div>
  );
}

export default Chapters;
