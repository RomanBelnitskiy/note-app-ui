import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/v1/notes";

export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "note/updateNote",
  async (note, thunkAPI) => {
    try {
      const resp = await axios.put(`${url}/${note.id}`, note);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNote = createAsyncThunk(
  "note/createNote",
  async (note, thunkAPI) => {
    try {
      const resp = await axios.post(url, note);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "note/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      const deleteResp = await axios.delete(`${url}/${noteId}`);
      if (deleteResp.status !== 204) {
        throw new Error("Can't delete note");
      }
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [],
  isLoading: false,
  title: "",
  content: "",
  favorite: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNoteTitle: (state, { payload }) => {
      state.title = payload;
    },
    setNoteContent: (state, { payload }) => {
      state.content = payload;
    },
    setNoteFavorite: (state, { payload }) => {
      state.favorite = payload;
    },
    setNoteById: (state, { payload }) => {
      const note = state.notes.filter((note) => note.id == payload)[0];
      if (note) {
        state.title = note.title;
        state.content = note.content;
        state.favorite = note.favorite;
      }
    },
    clearNote: (state) => {
      state.title = "";
      state.content = "";
      state.favorite = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNotes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.notes = action.payload;
        state.isLoading = false;
      })
      .addCase(getNotes.rejected, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(updateNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.notes = state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        );
        state.isLoading = false;
      })
      .addCase(createNote.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
        state.isLoading = false;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.notes = action.payload;
      });
  },
});

export const {
  setNoteTitle,
  setNoteContent,
  setNoteFavorite,
  setNoteById,
  clearNote,
} = noteSlice.actions;

export default noteSlice.reducer;
