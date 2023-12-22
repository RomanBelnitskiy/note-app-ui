import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Root from "./routes/root";
import { store } from "./store";
import { Provider } from "react-redux";
import ErrorPage from "./error-page";
import Note from "./routes/note";
import NoteEdit from "./routes/NoteEdit";
import NewNote from "./routes/NewNote";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: "notes/:noteId",
            element: <Note />,
          },
          {
            path: "notes/:noteId/edit",
            element: <NoteEdit />,
          },
          {
            path: "notes/add",
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
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
