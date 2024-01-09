import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root, { loader as rootLoader } from "./routes/root";
import { store } from "./store";
import { Provider } from "react-redux";
import ErrorPage from "./error-page";
import Note, { loader as noteLoader } from "./routes/Note";
import NoteEdit, { loader as noteEditLoader } from "./routes/NoteEdit";
import NewNote, { loader as newNoteLoader } from "./routes/NewNote";

const getRouter = (dispatch) =>
  createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      loader: rootLoader(dispatch),
      errorElement: <ErrorPage />,
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: "notes/:noteId",
              loader: noteLoader(dispatch),
              element: <Note />,
            },
            {
              path: "notes/:noteId/edit",
              loader: noteEditLoader(dispatch),
              element: <NoteEdit />,
            },
            {
              path: "notes/add",
              loader: newNoteLoader(dispatch),
              element: <NewNote />,
            },
          ],
        },
      ],
    },
  ]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={getRouter(store.dispatch)} />
    </Provider>
  </React.StrictMode>
);
