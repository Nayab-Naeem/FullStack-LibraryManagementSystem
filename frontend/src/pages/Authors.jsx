import { useEffect, useState } from "react";
import API from "../api/api";
import AuthorGrid from "../components/authors/AuthorGrid";
import AuthorDetailModal from "../components/authors/AuthorDetailModal";
import AddAuthorModal from "../components/authors/AddAuthorModal";
import DeleteAuthorModal from "../components/authors/DeleteAuthorModal";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [formMode, setFormMode] = useState("add");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
  fetchAuthors();
  fetchBooks();
}, []);

function handleViewBooks(author) {
  setSelectedAuthor(author);
  setShowDetailModal(true);
}

const handleAddAuthor = () => {
  setSelectedAuthor(null);
  setFormMode("add");
  setShowFormModal(true);
};

const handleEditAuthor = (author) => {
  setSelectedAuthor(author);
  setFormMode("edit");
  setShowFormModal(true);
};

const handleDeleteAuthor = (author) => {
  setSelectedAuthor(author);
  setShowDeleteModal(true);
};

  async function fetchAuthors() {
    try {
      setLoading(true);

      const response = await API.get("/authors");

      setAuthors(response.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load authors.");
    } finally {
      setLoading(false);
    }
  }
async function fetchBooks() {
  try {
    const response = await API.get("/books/details");
    setBooks(response.data.data);
  } catch (error) {
    console.log(error);
  }
}

  if (loading) {
    return (
      <div className="p-8 text-center text-[#6B4423]">
        Loading authors...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#6B4423]">
            Authors
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all authors in your library.
          </p>
        </div>

        <button
          className="bg-[#6B4423] text-white px-5 py-2 rounded-lg hover:bg-[#5a381d] transition"
          onClick={handleAddAuthor} >
          + Add Author
        </button>
      </div>

     <AuthorGrid authors={authors} onViewBooks={handleViewBooks} onEdit={handleEditAuthor} onDelete={handleDeleteAuthor} />

<AuthorDetailModal
    isOpen={showDetailModal}
    onClose={() => setShowDetailModal(false)}
    author={selectedAuthor}
    books={books}
/>

<AddAuthorModal
  isOpen={showFormModal}
  onClose={() => setShowFormModal(false)}
  onSuccess={fetchAuthors}
  mode={formMode}
  author={selectedAuthor}
/>

<DeleteAuthorModal
  isOpen={showDeleteModal}
  onClose={() => setShowDeleteModal(false)}
  author={selectedAuthor}
  onSuccess={fetchAuthors}
/>

    </div>
  );
}

export default Authors;