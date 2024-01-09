import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { deleteNote } from "../features/note/notesSlice";
import { getNote } from "../features/note/notesSlice";
import Spinner from "../components/Spinner";

export const loader =
  (dispatch) =>
  ({ params }) => {
    if (params.noteId) {
      dispatch(getNote(params.noteId));
      return true;
    }
    return false;
  };

const Note = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNoteSelected = useLoaderData();
  const { note, isLoading } = useSelector((store) => store.notes);

  const deleteHandler = () => {
    dispatch(deleteNote(note.id));
    navigate("/");
  };

  if (!isNoteSelected) {
    return (
      <div className="loading_spinner">
        <h2>No selected note.</h2>
      </div>
    );
  }

  if (!note || isLoading) {
    return (
      <div className="loading_spinner">
        <Spinner />
      </div>
    );
  }

  return (
    <>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
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
