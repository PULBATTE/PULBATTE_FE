import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: null,
};

export const postSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default postSlice.reducer;
