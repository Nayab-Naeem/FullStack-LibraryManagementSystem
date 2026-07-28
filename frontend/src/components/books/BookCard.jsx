import { motion } from "framer-motion";
import { FiBook,FiEdit2,FiTrash2,FiUser,FiHash,FiCalendar, } from "react-icons/fi";

function BookCard({ book , onEdit }) {
  const quantity = book.quantity || 0;
  const available = book.available_quantity || 0;

  const percentage =
    quantity > 0 ? (available / quantity) * 100 : 0;

  const getStatus = () => {
    if (available === 0) {
      return {
        text: "Out of Stock",
        bg: "bg-red-100",
        textColor: "text-red-600",
      };
    }

    if (available <= 2) {
      return {
        text: "Low Stock",
        bg: "bg-yellow-100",
        textColor: "text-yellow-700",
      };
    }

    return {
      text: "Available",
      bg: "bg-green-100",
      textColor: "text-green-700",
    };
  };

  const status = getStatus();

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.25 }}
      className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-[#8B5E3C] to-[#C99A6B] p-4 flex justify-between items-center">
        <div className="bg-white/20 p-2 rounded-xl">
          <FiBook className="text-white" size={24} />
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.textColor}`}
        >
          {status.text}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-[#4A2C2A] mb-4 line-clamp-2">
          {book.title}
        </h2>

        <div className="space-y-2 text-gray-600 text-sm">

          <div className="flex items-center gap-2">
            <FiUser className="text-[#8B5E3C]" />
            <span>{book.author}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiHash className="text-[#8B5E3C]" />
            <span>{book.isbn}</span>
          </div>

          <div className="flex items-center gap-2">
            <FiCalendar className="text-[#8B5E3C]" />
            <span>{book.published_year}</span>
          </div>

        </div>

        {/* Category */}
        <div className="mt-4">
          <span className="bg-[#F5E9D9] text-[#8B5E3C] px-3 py-1 rounded-full text-xs font-semibold">
            {book.category}
          </span>
        </div>

        {/* Stock */}
        <div className="mt-5">

          <div className="flex justify-between text-sm mb-2">
            <span className="font-medium">Stock</span>
            <span>{available}/{quantity}</span>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(percentage, 100)}%` }}
              transition={{ duration: 0.8 }}
              className={`h-2 rounded-full ${
                percentage > 60
                  ? "bg-green-500"
                  : percentage > 20
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            />
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-2">

          <button
        onClick={() => onEdit(book)}
        className="flex-1 flex justify-center items-center gap-2 bg-[#D4A373] hover:bg-[#704628] text-white py-2.5 rounded-xl transition">
        <FiEdit2 />
        Edit
            </button>

          <button
            className="flex-1 flex justify-center items-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl transition"
          >
            <FiTrash2 />
            Delete
          </button>

        </div>

      </div>
    </motion.div>
  );
}

export default BookCard;