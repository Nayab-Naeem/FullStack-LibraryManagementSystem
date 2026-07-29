import AuthorCard from "./AuthorCard";

function AuthorGrid({ authors }) {
  if (authors.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No authors found.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {authors.map((author) => (
        <AuthorCard
          key={author.id}
          author={author}
        />
      ))}
    </div>
  );
}

export default AuthorGrid;