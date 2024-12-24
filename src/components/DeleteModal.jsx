import React from "react";
import { useDispatch } from "react-redux";
import { deleteBlog } from "../store/blogSlice";

const DeleteModal = ({ isOpen, onClose, blogId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (blogId) {
      console.log("Deleting blog with ID:", blogId);
      dispatch(deleteBlog(blogId));
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-bold">Are you sure?</h2>
        <p className="text-gray-700">Do you want to delete this blog?</p>
        <div className="mt-4 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-black rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
