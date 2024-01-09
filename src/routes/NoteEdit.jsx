import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Spinner from "../components/Spinner";
import {
  setNote,
  setNoteContent,
  setNoteFavorite,
  setNoteTitle,
  updateNote,
} from "../features/note/notesSlice";

export const loader =
  (dispatch) =>
  ({ params }) => {
    dispatch(setNote(params.noteId));
    return null;
  };

const NoteEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { note, isLoading } = useSelector((store) => store.notes);

  const titleChangeHandler = (event) => {
    dispatch(setNoteTitle(event.target.value));
  };

  const contentChangeHandler = (event) => {
    dispatch(setNoteContent(event.target.value));
  };

  const favoriteChangeHandler = (event) => {
    dispatch(setNoteFavorite(!note.favorite));
  };

  const sendUpdateRequest = () => {
    dispatch(updateNote(note));
    navigate("..", { relative: "path" });
  };

  const backHandler = () => {
    navigate("..", { relative: "path" });
  };

  if (!note || isLoading) {
    return (
      <div className="loading_spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="note_edit">
      <button className="btn back_btn" onClick={backHandler}>
        &larr; Back to note
      </button>
      <div className="note_edit-title">
        <label htmlFor="title">Title:</label>
        <button
          name="favorite"
          className="favorite_btn"
          value={note.favorite ? "false" : "true"}
          onClick={favoriteChangeHandler}
          aria-label={
            note.favorite ? "Remove from favorites" : "Add to favorites"
          }
        >
          {note.favorite ? "★" : "☆"}
        </button>
      </div>
      <input
        type="text"
        id="title"
        onChange={titleChangeHandler}
        placeholder="Title"
        value={note.title}
      />
      <label htmlFor="content">Text:</label>
      <textarea
        id="content"
        onChange={contentChangeHandler}
        value={note.content}
        rows={4}
      ></textarea>
      <button className="save_btn" onClick={sendUpdateRequest}>
        Save
      </button>
    </div>
  );
};

export default NoteEdit;
