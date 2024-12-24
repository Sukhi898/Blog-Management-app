import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { deleteBlog } from "../store/blogSlice";
import { toast } from "react-toastify";
import DeleteModal from "../components/DeleteModal";
import { getImageURL } from "../utils/IndexedDB";

const BlogDetails = () => {
  const { id } = useParams();
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (blog && blog.imageId) {
      getImageURL(blog.imageId)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    }
  }, [blog]);

  const handleDelete = () => {
    dispatch(deleteBlog(blog.id));
    toast.success("Blog deleted successfully");
    navigate("/");
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="max-w-6xl mx-auto bg-white p-6 rounded shadow-md">
      {imageUrl ? (
        <div className="mt-4">
          <img
            src={imageUrl}
            alt="Cover"
            className="w-full h-64 object-cover rounded-md"
          />
        </div>
      ) : (
        <div className="mt-4 text-gray-500">No image available</div>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mt-4">{blog?.title}</h1>

      <p className="text-gray-600 mt-2">{blog?.description}</p>

      <div className="mt-6 flex flex-wrap gap-4 text-gray-700 text-sm">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Tags:</h3>
          <p>{blog?.tags?.join(", ") || "N/A"}</p>
        </div>

        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Category:</h3>
          <p>{blog?.category || "N/A"}</p>
        </div>

        <div className="flex items-center gap-2">
          <h3 className="font-semibold">Status:</h3>
          <p>{blog?.status || "N/A"}</p>
        </div>

        {blog?.status === "Published" && (
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">Published Date:</h3>
            <p>{blog?.publishedDate || "N/A"}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded hover:bg-gray-300"
        >
          Back to home
        </button>
        <button
          onClick={() => {
            setSelectedBlogId(blog.id);
            setModalOpen(true);
          }}
          className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700"
        >
          Delete Blog
        </button>
      </div>

      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onDelete={handleDelete}
        blogId={selectedBlogId}
      />
    </div>
  );
};

export default BlogDetails;
