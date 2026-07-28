import BookCard from "./BookCard";

function BookGrid({ books ,onEdit , onDelete}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-7 mt-10">

      {books.map((book) => (
        <BookCard
        key={book.id}
        book={book}
        onEdit={onEdit}
        onDelete={onDelete}
    />

      ))}

    </div>
  );
}

export default BookGrid;