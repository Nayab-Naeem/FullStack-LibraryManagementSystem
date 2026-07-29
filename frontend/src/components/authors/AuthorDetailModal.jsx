// for displaying books of the author
import { X, BookOpen } from "lucide-react";

function AuthorDetailModal({
  isOpen,
  onClose,
  author,
  books,
}) {
  if (!isOpen || !author) return null;

  const authorBooks = books.filter(
    (book) => Number(book.author_id) === Number(author.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-6 py-5 border-b">

          <div>
            <h2 className="text-2xl font-bold text-[#6B4423]">
              {author.name}'s Books
            </h2>

            <p className="text-gray-500 mt-1">
              Total Books: {authorBooks.length}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">

          {authorBooks.length === 0 ? (

            <div className="text-center py-10 text-gray-500">
              No books found for this author.
            </div>

          ) : (

            <div className="space-y-4">

              {authorBooks.map((book) => (

                <div
                  key={book.id}
                  className="bg-[#FAF3E7] border border-[#E8D8C3] rounded-xl p-5"
                >

                  <div className="flex items-center gap-2">

                    <BookOpen
                      size={22}
                      className="text-[#6B4423]"
                    />

                    <h3 className="text-xl font-semibold text-[#6B4423]">
                      {book.title}
                    </h3>

                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-4 text-sm">

                    <div>
                      <p className="text-gray-500">
                        Category
                      </p>

                      <p className="font-medium">
                        {book.category}
                      </p>
                    </div>

                    <div>
                      <p className="text-gray-500">
                        Published
                      </p>

                      <p className="font-medium">
                        {book.published_year}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-gray-500">
                        ISBN
                      </p>

                      <p className="font-medium break-all">
                        {book.isbn}
                      </p>
                    </div>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

        {/* Footer */}

        <div className="border-t px-6 py-4 flex justify-end">

          <button
            onClick={onClose}
            className="bg-[#6B4423] text-white px-6 py-2 rounded-lg hover:bg-[#5B381F] transition"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}

export default AuthorDetailModal;