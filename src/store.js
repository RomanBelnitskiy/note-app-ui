import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "./features/note/notesSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
  },
});
