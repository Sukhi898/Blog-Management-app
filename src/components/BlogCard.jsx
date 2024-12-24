import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getImageURL } from "../utils/IndexedDB";

const BlogCard = ({ blog, onDelete }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (blog.imageId) {
      getImageURL(blog.imageId)
        .then((url) => {
          setImageUrl(url);
        })
        .catch((error) => {
          console.error("Error fetching image URL:", error);
        });
    }
  }, [blog.imageId]);

  const handleDelete = () => {
    onDelete(blog.id);
  };

  const truncateDescription = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-6 mb-6 max-w-sm w-full mx-auto flex flex-col ">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="Cover"
          className="w-full h-36 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-36 bg-gray-300 rounded-md mb-4">No Image</div>
      )}

      <h3 className="text-xl font-semibold text-gray-800">{blog.title}</h3>

      <p className="text-sm text-gray-500 mt-2 flex-grow">
        {truncateDescription(blog.description, 100)}{" "}
      </p>

      <p className="text-xs font-semibold text-gray-400 mt-2">
        {blog.category}
      </p>

      <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
        <Link
          to={`/blog/${blog.id}`}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Read More
        </Link>

        <button
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-200"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
