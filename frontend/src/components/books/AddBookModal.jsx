// for Add Book button in books page , we r using this component

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import API from "../../api/api";
import toast from "react-hot-toast";

function AddBookModal({ onClose, onBookAdded }) {
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    isbn: "",
    published_year: "",
    author_id: "",
    category_id: "",
    quantity: 1,
  });

  useEffect(() => {
    fetchDropdowns();
  }, []);

  async function fetchDropdowns() {          //getting data through database
    try {
      const [authorsRes, categoriesRes] = await Promise.all([
        API.get("/authors"),
        API.get("/categories"),
      ]);

      setAuthors(authorsRes.data.data);
      setCategories(categoriesRes.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load authors and categories");
    }
  }

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if ( !formData.title || !formData.isbn || !formData.published_year || !formData.author_id || !formData.category_id ) 
    {
      return toast.error("Please fill all required fields.");
    }

    try {
      setLoading(true);

      await API.post("/books", {
        ...formData,
        published_year: Number(formData.published_year),
        author_id: Number(formData.author_id),
        category_id: Number(formData.category_id),
        quantity: Number(formData.quantity),
      });

      toast.success("Book added successfully!");

      onBookAdded();
      onClose();
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Failed to add book."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-xl"
      >
        {/* Header */}
        <div className="border-b px-8 py-5">
          <h2 className="text-2xl font-bold text-[#4A2C2A]">
            📚 Add New Book
          </h2>

          <p className="text-gray-500 mt-1">
            Enter the details of the new book.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-8 space-y-5"
        >
          <div>
            <label className="block mb-2 font-medium">
              Book Title
            </label>

            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder=" for example : Clean Architecture"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              ISBN
            </label>

            <input
              type="text"
              name="isbn"
              value={formData.isbn}
              onChange={handleChange}
              placeholder="for example : 9780134494166"
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 font-medium">
                Published Year
              </label>

              <input
                    type="number"
                    name="published_year"
                    value={formData.published_year}
                    onChange={handleChange}
                    min="1000"
                    max={new Date().getFullYear()}
                    placeholder={new Date().getFullYear()}
                    className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
             />

            </div>

            <div>
              <label className="block mb-2 font-medium">
                Quantity
              </label>

              <input
                type="number"
                min="1"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Author
            </label>

            <select
              name="author_id"
              value={formData.author_id}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
            >
              <option value="">Select Author</option>

              {authors.map((author) => (
                <option
                  key={author.id}
                  value={author.id}
>
                  {author.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 focus:ring-2 focus:ring-[#8B5E3C] outline-none"
            >
              <option value="">Select Category</option>

              {categories.map((category) => (
                <option
                  key={category.id}
                  value={category.id}
                >
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-xl bg-gray-200 hover:bg-gray-300 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-xl bg-[#8B5E3C] hover:bg-[#704628] text-white transition disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Book"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default AddBookModal;