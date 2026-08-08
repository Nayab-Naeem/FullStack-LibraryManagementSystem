import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/API";

function AddAuthorModal({
  isOpen,
  onClose,
  onSuccess,
  mode = "add",
  author = null,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && author) {
      setFormData({
        name: author.name || "",
        email: author.email || "",
        country: author.country || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        country: "",
      });
    }
  }, [mode, author, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.country.trim()
    ) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);

      if (mode === "add") {
        await API.post("/authors", formData);
      } else {
        await API.put(`/authors/${author.id}`, formData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-2xl font-bold text-[#6B4423] mb-6 text-center">
              {mode === "add" ? "Add New Author" : "Edit Author"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">

              {/* Name */}
              <div>
                <label className="block mb-2 font-medium text-[#6B4423]">
                  Author Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter author name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 font-medium text-[#6B4423]">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Country */}
              <div>
                <label className="block mb-2 font-medium text-[#6B4423]">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#D4A373]"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">

                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#6B4423] text-white px-5 py-2 rounded-lg hover:bg-[#5a381d] transition disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : mode === "add"
                    ? "Add Author"
                    : "Update Author"}
                </button>

              </div>

            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default AddAuthorModal;