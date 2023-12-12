import React, { useEffect } from "react";
import { NavLink, Outlet, Form } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getNotes } from "../features/note/noteSlice";

const Root = () => {
  const dispatch = useDispatch();
  const { notes } = useSelector((store) => store.note);

  useEffect(() => {
    dispatch(getNotes());
  }, []);

  return (
    <>
      <div id="sidebar">
        <h1>Notes</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              name="q"
              aria-label="Search notes"
              placeholder="Search"
              type="search"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {notes.length ? (
            <ul>
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink to={`notes/${note.id}`}>
                    <i>{note.title}</i>
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No notes</i>
            </p>
          )}
        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
};

export default Root;
