import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToast } from "../store/toastSlice";
import { saveImage } from "../utils/IndexedDB";
import FormInput from "../components/FormInput";
import FormSelect from "../components/FormSelect";
import FormFileInput from "../components/FormFileInput";
import FormRadio from "../components/FormRadio";

const CreateBlog = ({ onCreate }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: [],
    coverImage: null,
    status: "Draft",
    publishedDate: "",
    imageId: "",
  });
  const [tagInput, setTagInput] = useState("");
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  const categories = [
    "Tech",
    "Lifestyle",
    "Health",
    "Travel",
    "Food & Drink",
    "Fitness",
    "Education",
    "Finance",
    "Fashion",
    "Parenting",
  ];

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      const file = files[0];

      const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validImageTypes.includes(file.type)) {
        dispatch(
          setToast({
            message:
              "Invalid image format. Only JPG, JPEG, and PNG are allowed.",
            type: "error",
          })
        );
        return;
      }

      const imageId = new Date().toISOString();
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageBlob = reader.result;
        saveImage(imageBlob, imageId)
          .then(() => {
            setFormData({ ...formData, coverImage: file, imageId });
          })
          .catch((error) => {
            dispatch(
              setToast({ message: "Failed to upload image.", type: "error" })
            );
          });
      };

      reader.readAsArrayBuffer(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!formData.tags.includes(tagInput.trim())) {
        setFormData({ ...formData, tags: [...formData.tags, tagInput.trim()] });
        setTagInput("");
      }
    }
  };

  const handleTagRemove = (tag) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tag),
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title || formData.title.length < 5) {
      newErrors.title = "Title must be at least 5 characters long.";
    }
    if (!formData.description || formData.description.length < 10) {
      newErrors.description =
        "Description must be at least 10 characters long.";
    }
    if (!formData.category) {
      newErrors.category = "Category is required.";
    }
    if (formData.status === "Published" && !formData.publishedDate) {
      newErrors.publishedDate = "Published date is required.";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      dispatch(
        setToast({ message: "Please fix the form errors.", type: "error" })
      );
      return;
    }

    const newBlog = {
      ...formData,
      id: new Date().toISOString(),
    };

    onCreate(newBlog);

    dispatch(
      setToast({
        message: "Blog created successfully!",
        type: "success",
        animation: "animate-fadeIn",
      })
    );

    setFormData({
      title: "",
      description: "",
      category: "",
      tags: [],
      coverImage: null,
      status: "Draft",
      publishedDate: "",
      imageId: "",
    });
    setErrors({});
  };

  useEffect(() => {
    if (formData.coverImage) {
      const objectUrl = URL.createObjectURL(formData.coverImage);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [formData.coverImage]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          error={errors.title}
          required
        />
        <FormInput
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={errors.description}
          type="textarea"
          required
        />
        <FormSelect
          label="Category"
          name="category"
          value={formData.category}
          options={categories}
          onChange={handleChange}
          error={errors.category}
          required
        />
        <div>
          <label htmlFor="tags" className="block text-gray-800 font-medium">
            Tags
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            className="w-full mt-1 p-2 border rounded focus:ring-2 focus:ring-blue-400 text-black"
            placeholder="Press Enter to add tags"
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {formData.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-200 px-3 py-1 rounded-full text-blue-700"
              >
                {tag}
                <button
                  type="button"
                  onClick={() => handleTagRemove(tag)}
                  className="ml-2 text-red-600"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
        </div>
        <FormFileInput
          label="Cover Image (JPG, JPEG, PNG)"
          name="coverImage"
          onChange={handleChange}
          error={errors.coverImage}
        />

        <FormRadio
          label="Status"
          name="status"
          options={[
            { value: "Draft", label: "Draft" },
            { value: "Published", label: "Published" },
          ]}
          value={formData.status}
          onChange={handleChange}
        />
        {formData.status === "Published" && (
          <FormInput
            label="Published Date"
            name="publishedDate"
            value={formData.publishedDate}
            onChange={handleChange}
            error={errors.publishedDate}
            type="date"
          />
        )}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Create Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;
