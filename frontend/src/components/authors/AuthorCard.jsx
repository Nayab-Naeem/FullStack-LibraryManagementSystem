import { BookOpen, Pencil, Trash2 } from "lucide-react";

function AuthorCard({
  author,
  onViewBooks,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl border border-[#E8D8C3] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6">

      {/* Avatar + Name */}
      <div className="flex flex-col items-center">

        <div className="w-20 h-20 rounded-full bg-[#6B4423] text-white flex items-center justify-center text-4xl font-bold shadow-md">
          {author.name.charAt(0).toUpperCase()}
        </div>

        <h2 className="mt-4 text-xl font-bold text-[#6B4423] text-center">
          {author.name}
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {author.email}
        </p>

        <span className="mt-2 inline-flex items-center rounded-full bg-[#FAF3E7] px-3 py-1 text-sm font-medium text-[#6B4423]">
          📍 {author.country}
        </span>
      </div>

      {/* Books Count */}
      <div className="mt-6 rounded-xl bg-[#FAF3E7] border border-[#E8D8C3] p-4 text-center">

        <p className="text-gray-500 text-sm">
          Books Written
        </p>

        <p className="mt-1 text-3xl font-bold text-[#6B4423]">
          {author.total_books}
        </p>

      </div>

      {/* View Books */}
      <button
        onClick={() => onViewBooks(author)}
        className="w-full mt-5 flex items-center justify-center gap-2 rounded-xl border border-[#D4A373] py-3 text-[#6B4423] font-semibold hover:bg-[#FAF3E7] transition"
      >
        <BookOpen size={20} />
        View Books
      </button>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3 mt-4">

        <button
          className="flex items-center justify-center gap-2 rounded-xl border border-[#D4A373] py-3 text-[#6B4423] font-medium hover:bg-[#FAF3E7] transition"
          onClick={() => onEdit(author) }
        >
          <Pencil size={18} />
          Edit
        </button>

        <button
          onClick={() => onDelete(author)}
          className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-3 text-red-600 font-medium hover:bg-red-50 transition"
        >
          <Trash2 size={18} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default AuthorCard;