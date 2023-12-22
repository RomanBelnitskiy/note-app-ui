import React, { useEffect } from "react";
import { Link, NavLink, Outlet, Form } from "react-router-dom";
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
        <div>
          <Form id="search-form" role="search">
            <input
              type="text"
              id="filter"
              name="filter"
              placeholder="Search"
              aria-label="Search notes"
            />
            <div id="search-spinner" aria-hidden hidden={true} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Link className="btn" to="/notes/add">
            New
          </Link>
        </div>
        <nav>
          {notes.length ? (
            <ul className="notes__list">
              {notes.map((note) => (
                <li key={note.id}>
                  <NavLink
                    to={`notes/${note.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    <i>{note.title}</i> {note.favorite && <span>★</span>}
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
        <h1>Note App</h1>
      </div>
      <div id="detail">
        <div id="user_panel">
          <span>User name</span>
          <img src="/src/assets/images/user_default.png" alt="username" />
          <button>Logout</button>
        </div>
        <div className="note_container">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Root;
