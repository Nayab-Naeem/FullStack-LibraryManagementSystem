import { useEffect, useState } from "react";
import API from "../api/api";
import AuthorGrid from "../components/authors/AuthorGrid";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchAuthors();
  }, []);

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
        >
          + Add Author
        </button>
      </div>

      <AuthorGrid authors={authors} />
    </div>
  );
}

export default Authors;