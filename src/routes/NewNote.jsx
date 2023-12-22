import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  clearNote,
  createNote,
  setNoteContent,
  setNoteFavorite,
  setNoteTitle,
  updateNote,
} from "../features/note/noteSlice";

const NewNote = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { title, content, favorite } = useSelector((store) => store.note);

  useEffect(() => {
    dispatch(clearNote());
  }, []);

  const titleChangeHandler = (event) => {
    dispatch(setNoteTitle(event.target.value));
  };

  const contentChangeHandler = (event) => {
    dispatch(setNoteContent(event.target.value));
  };

  const favoriteChangeHandler = (event) => {
    dispatch(setNoteFavorite(!favorite));
  };

  const sendUpdateRequest = () => {
    dispatch(createNote({ title, content, favorite }));
    dispatch(clearNote());
    navigate("/");
  };

  const backHandler = () => {
    dispatch(clearNote());
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
          value={favorite ? "false" : "true"}
          onClick={favoriteChangeHandler}
          aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
        >
          {favorite ? "★" : "☆"}
        </button>
      </div>
      <input
        type="text"
        id="title"
        onChange={titleChangeHandler}
        placeholder="Title"
        value={title}
      />
      <label htmlFor="content">Text:</label>
      <textarea
        id="content"
        onChange={contentChangeHandler}
        value={content}
        rows={4}
      ></textarea>
      <button className="save_btn" onClick={sendUpdateRequest}>
        Save
      </button>
    </div>
  );
};

export default NewNote;
