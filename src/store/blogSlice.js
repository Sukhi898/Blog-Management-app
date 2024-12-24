import { createSlice } from "@reduxjs/toolkit";

const savedBlogs = JSON.parse(localStorage.getItem("blogs")) || [];

const blogSlice = createSlice({
  name: "blogs",
  initialState: savedBlogs,
  reducers: {
    createBlog: (state, action) => {
      state.push(action.payload);
      localStorage.setItem("blogs", JSON.stringify(state));
    },

    deleteBlog: (state, action) => {
      const updatedState = state.filter((blog) => blog.id !== action.payload);
      localStorage.setItem("blogs", JSON.stringify(updatedState));
      return updatedState;
    },

    setCoverImage: (state, action) => {
      const { blogId, coverImageUrl } = action.payload;
      const blog = state.find((blog) => blog.id === blogId);
      if (blog) {
        blog.coverImageUrl = coverImageUrl;
      }
      localStorage.setItem("blogs", JSON.stringify(state));
    },

    setImageId: (state, action) => {
      const { blogId, imageId } = action.payload;
      const blog = state.find((blog) => blog.id === blogId);
      if (blog) {
        blog.imageId = imageId;
      }
      localStorage.setItem("blogs", JSON.stringify(state));
    },
  },
});

export const { createBlog, deleteBlog, setCoverImage, setImageId } =
  blogSlice.actions;
export default blogSlice.reducer;
