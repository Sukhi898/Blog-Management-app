import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BlogCard from "./components/BlogCard";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import ToastManager from "./components/ToastManager";
import DeleteModal from "./components/DeleteModal";
import { createBlog, deleteBlog } from "./store/blogSlice";
import { setToast } from "../src/store/toastSlice";
import { motion } from "framer-motion";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);

  const openDeleteModal = (blogId) => {
    setSelectedBlogId(blogId);
    setModalOpen(true);
  };

  const closeDeleteModal = () => {
    setModalOpen(false);
    setSelectedBlogId(null);
  };

  const handleCreateBlog = (newBlog) => {
    dispatch(createBlog(newBlog));
    dispatch(
      setToast({
        message: "Blog created successfullyy!",
        type: "success",
      })
    );
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-[#6d4be8] to-[#8e2de2] text-white">
        <nav className="bg-gradient-to-r from-[#8e2de2] to-[#6d4be8] p-4 shadow-lg">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link to="/" className="font-bold text-3xl tracking-tight">
              Blogs App
            </Link>
            <Link
              to="/create"
              className="bg-slate-300 text-[#6d4be8] px-6 py-3 rounded-lg shadow-md hover:bg-[#6d4be8] hover:text-white transition-all duration-300 ease-in-out"
            >
              Create New Post
            </Link>
          </div>
        </nav>

        <main className="flex-1 p-8 bg-[#6d4be8] rounded-t-3xl shadow-xl mt-4">
          <Routes>
            <Route
              path="/"
              element={
                <motion.div
                  key="home"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  {blogs.map((blog) => (
                    <BlogCard
                      key={blog.id}
                      blog={blog}
                      onDelete={openDeleteModal}
                    />
                  ))}
                </motion.div>
              }
            />
            <Route
              path="/create"
              element={
                <motion.div
                  key="create"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white shadow-xl p-8 rounded-lg"
                >
                  <CreateBlog onCreate={handleCreateBlog} />
                </motion.div>
              }
            />
            <Route
              path="/blog/:id"
              element={
                <motion.div
                  key="details"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <BlogDetails />
                </motion.div>
              }
            />
          </Routes>
        </main>

        <ToastManager />
        <DeleteModal
          isOpen={isModalOpen}
          onClose={closeDeleteModal}
          blogId={selectedBlogId}
        />
      </div>
    </Router>
  );
};

export default App;
