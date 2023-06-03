import { createSlice } from '@reduxjs/toolkit';

export const searchSlice = createSlice({
  name: 'search',
  initialState: {
    pageResult: 0,
  },
  reducers: {
    set: (state, action) => {
      state.pageResult = action.payload.pageResult;
      return state;
    },
    reset: (state) => {
      state.pageResult = 0;
      return state;
    },
  },
});

export const { set, reset } = searchSlice.actions;

export default searchSlice.reducer;
