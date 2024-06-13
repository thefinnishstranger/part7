import { createSlice } from "@reduxjs/toolkit";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => {
      state.push(action.payload);
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    handleLike: (state, action) => {
      const { id } = action.payload;
      const blogToUpdate = state.find((b) => b.id === id);
      if (blogToUpdate) {
        blogToUpdate.likes++;
      }
    },
  },
});

export const { setBlogs, addBlog, removeBlog, handleLike } = blogsSlice.actions;
export default blogsSlice.reducer;
