import { createSlice } from "@reduxjs/toolkit";

const commentSlice = createSlice({
  name: "comments",
  initialState: [],
  reducers: {
    setComments: (state, action) => action.payload,
    addComment: (state, action) => {
      state.push(action.payload);
    }
  },
});

export const { setComments, addComment } = commentSlice.actions;
export default commentSlice.reducer;
