import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearNote,
  setNoteTitle,
  setNoteContent,
  setNoteFavorite,
  createNote,
} from "../features/note/notesSlice";

export const loader = (dispatch) => () => {
  dispatch(clearNote());
  return null;
};

const NewNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { note } = useSelector((store) => store.notes);

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
    dispatch(createNote(note));
    navigate("/");
  };

  const backHandler = () => {
    navigate("/");
  };

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

export default NewNote;
