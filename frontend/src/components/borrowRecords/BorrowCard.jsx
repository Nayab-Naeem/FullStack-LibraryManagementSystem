import { motion } from "framer-motion";
import {
  BookOpen,
  User,
  CalendarDays,
  RotateCcw,
  Trash2
} from "lucide-react";

function BorrowCard({
  record,
  onReturn,
  onDelete,
}) {

  const borrowDate = new Date(record.borrow_date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const returnDate = record.return_date
    ? new Date(record.return_date).toLocaleDateString(
        "en-GB",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      )
    : "Not Returned";

  return (

    <motion.div

      whileHover={{
        y: -4,
        scale: 1.01,
      }}

      transition={{
        duration: 0.25,
      }}

      className="
      bg-white
      rounded-2xl
      shadow-md
      p-5
      border
      border-[#f0e5d8]
      "

    >

      {/* Book */}

      <div className="flex items-center gap-3 mb-5">

        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#6B4423] to-[#D4A373] flex items-center justify-center text-white">

          <BookOpen size={22} />

        </div>

        <h2 className="text-xl font-bold text-[#6B4423]">
          {record.title}
        </h2>

      </div>


      {/* Member */}

      <div className="flex items-center gap-2 mb-3 text-gray-700">

        <User size={18} />

        <span>{record.member}</span>

      </div>


      {/* Borrow Date */}

      <div className="flex items-center gap-2 mb-3 text-gray-700">

        <CalendarDays size={18} />

        <span>Borrowed: {borrowDate}</span>

      </div>


      {/* Return Date */}

      <div className="flex items-center gap-2 mb-4 text-gray-700">

        <RotateCcw size={18} />

        <span>Returned: {returnDate}</span>

      </div>


      {/* Status */}

      <div className="mb-5">

        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            record.status === "Borrowed"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {record.status}
        </span>

      </div>


      {/* Buttons */}

      <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-3">

        <button
          onClick={() => onReturn(record)}
          disabled={record.status === "Returned"}
          className={`flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium transition text-sm ${
            record.status === "Returned"
              ? "bg-gray-200 text-gray-500 cursor-not-allowed"
              : "border border-[#D4A373] text-[#6B4423] hover:bg-[#FAF3E7]"
          }`}
        >
          <RotateCcw size={18} />
          Return
        </button>

        <button
          onClick={() => onDelete(record)}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-red-600 font-medium hover:bg-red-50 transition text-sm"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </motion.div>

  );

}

export default BorrowCard;