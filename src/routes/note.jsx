import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteNote } from "../features/note/noteSlice";

const Note = () => {
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { notes } = useSelector((store) => store.note);
  const selectedNote = notes.filter((note) => note.id == noteId)[0];

  if (!selectedNote) {
    return (
      <div className="note">
        <h1>Note not found</h1>
      </div>
    );
  }

  const deleteHandler = () => {
    dispatch(deleteNote(noteId));
    navigate("/");
  };

  return (
    <>
      <h2>{selectedNote.title}</h2>
      <p>{selectedNote.content}</p>
      <div className="note_actions">
        <Link to="edit" className="btn">
          Edit
        </Link>
        <button className="delete_btn" onClick={deleteHandler}>
          Delete
        </button>
      </div>
    </>
  );
};

export default Note;
