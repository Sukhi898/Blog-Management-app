import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./blogSlice";
import toastReducer from "./toastSlice";

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["blogs/createBlog"],
      },
    }),
});
