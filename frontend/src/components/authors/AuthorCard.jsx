function AuthorCard({ author }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
      <h2 className="text-xl font-bold text-[#6B4423]">
        {author.name}
      </h2>

      <p className="mt-3">
        📍 {author.country}
      </p>

      <p>
        ✉ {author.email}
      </p>

      <p className="mt-3 font-medium">
        📚 Books Written: {author.total_books}
      </p>
    </div>
  );
}

export default AuthorCard;