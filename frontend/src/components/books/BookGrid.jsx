import BookCard from "./BookCard";

function BookGrid({ books }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-10">

      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
        />
      ))}

    </div>
  );
}

export default BookGrid;