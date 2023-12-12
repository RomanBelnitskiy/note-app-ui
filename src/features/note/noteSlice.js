import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const url = "http://localhost:8080/api/v1/notes";

export const getNotes = createAsyncThunk(
  "note/getNotes",
  async (name, thunkAPI) => {
    try {
      const resp = await axios(url);
      console.log(resp.data);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const initialState = {
  notes: [],
  isLoading: false,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {},
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
      });
  },
});

export const {} = noteSlice.actions;

export default noteSlice.reducer;
