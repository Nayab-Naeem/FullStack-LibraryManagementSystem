import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

// import { useState } from "react";
import AddBookModal from "../components/books/AddBookModal";
import DeleteBookModal from "../components/books/DeleteBookModal";
import BookStats from "../components/books/BookStats";
import SearchBar from "../components/books/SearchBar";
import CategoryFilter from "../components/books/CategoryFilter";
import BookGrid from "../components/books/BookGrid";

import { FiPlus } from "react-icons/fi";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [showAddModal, setShowAddModal] = useState(false);

  const [selectedBook, setSelectedBook] = useState(null); // for making modal resueable for edit button in bookCard
  const [deleteBook, setDeleteBook] = useState(null);


  async function fetchBooks() {
    try {
      const res = await API.get("/books/details");
      setBooks(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {``
      setLoading(false);
    }
  }

  async function fetchCategories() {

  try {

    const categoriesRes = await API.get("/categories");

    setCategories(
      categoriesRes.data.data.map(
        category => category.name
      )
    );

  } catch(error) {

    console.log(error);

  }

}

 useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);


 function handleEdit(book) {    //for edit button in bookcard
  setSelectedBook(book);
  setShowAddModal(true);
}

  function handleDelete(book) {  //for deleteButton on booksCard 
  setDeleteBook(book);
}

   const filteredBooks = useMemo(() => {

    return books.filter((book) => {

      const matchSearch =
        book.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        book.isbn.includes(search);

      const matchCategory =
        selectedCategory === "" ||
        book.category === selectedCategory;


      return matchSearch && matchCategory;
    });
  }, [books, search, selectedCategory]);

  if (loading)
    return (
      <div className="text-center text-xl p-10">
        Loading Books...
      </div>
    );

  return (
    <div className="p-8 bg-[#FAF3E7] min-h-screen">

      <div className="flex flex-col sm:flex-row justify-between   sm:items-center gap-4 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-[#4A2C2A]">
            Books Management
          </h1>

          <p className="text-gray-600 mt-2">
            Manage your books collection.
          </p>
        </div>

   <button
        onClick={() => setShowAddModal(true)}
        className="flex items-center gap-2 bg-[#8B5E3C] hover:bg-[#704628] text-white px-5 py-3 rounded-xl shadow-lg transition" >
       <FiPlus size={20} />
      Add Book
</button>

      </div>

      <BookStats books={books} />

      <div className="mt-8 flex flex-col md:flex-row gap-5">

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

      </div>

      <BookGrid books ={filteredBooks} onEdit = {handleEdit}   onDelete={handleDelete} />

{showAddModal && (
  <AddBookModal
     book={selectedBook}
    onClose={() => { setShowAddModal(false);
       setSelectedBook(null); } } 
    onBookAdded={fetchBooks}
  />
)}

{ deleteBook && (
    <DeleteBookModal
      book={deleteBook}
      onClose={() => setDeleteBook(null)}
      onDeleted={fetchBooks}
    />
  )}

    </div>
  );
}

export default Books;