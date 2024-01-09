import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/v1/notes";

export const getNotes = createAsyncThunk(
  "notes/getNotes",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getNote = createAsyncThunk(
  "notes/getNote",
  async (noteId, thunkAPI) => {
    try {
      const resp = await axios(`${url}/${noteId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteNote = createAsyncThunk(
  "notes/deleteNote",
  async (noteId, thunkAPI) => {
    try {
      const deleteResp = await axios.delete(`${url}/${noteId}`);
      if (deleteResp.status !== 204) {
        throw new Error("Can't delete note");
      }
      thunkAPI.dispatch(getNotes());
      return null;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateNote = createAsyncThunk(
  "notes/updateNote",
  async (note, thunkAPI) => {
    try {
      const resp = await axios.put(`${url}/${note.id}`, note);
      if (resp.status === 202) {
        thunkAPI.dispatch(getNotes());
      }
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const createNote = createAsyncThunk(
  "notes/createNote",
  async (note, thunkAPI) => {
    try {
      const resp = await axios.post(url, note);
      if (resp.status === 201) {
        thunkAPI.dispatch(getNotes());
      }
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const emptyNote = {
  id: 0,
  title: "",
  content: "",
  favorite: false,
};

const initialState = {
  notes: [],
  note: {},
  isLoading: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setNoteTitle: (state, { payload }) => {
      state.note.title = payload;
    },
    setNoteContent: (state, { payload }) => {
      state.note.content = payload;
    },
    setNoteFavorite: (state, { payload }) => {
      state.note.favorite = payload;
    },
    setNote: (state, { payload }) => {
      if (state?.notes?.length > 0) {
        state.note = state.notes.find((item) => item.id == payload);
      }
    },
    clearNote: (state) => {
      state.note = emptyNote;
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
      .addCase(getNote.fulfilled, (state, action) => {
        state.note = action.payload;
      })
      .addCase(getNote.rejected, (state, action) => {
        state.note = emptyNote;
      })
      .addCase(updateNote.fulfilled, (state, { payload }) => {
        state.note = payload;
      });
  },
});

export const {
  clearNote,
  setNote,
  setNoteTitle,
  setNoteContent,
  setNoteFavorite,
} = notesSlice.actions;

export default notesSlice.reducer;
