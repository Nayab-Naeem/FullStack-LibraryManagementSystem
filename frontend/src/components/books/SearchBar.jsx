import { FiSearch } from "react-icons/fi";

function SearchBar({ search, setSearch }) {
  return (
    <div className="relative flex-1">

      <FiSearch
        className="absolute left-4 top-4 text-gray-500"
        size={20}
      />

      <input
        type="text"
        placeholder="Search by title or ISBN..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="
        w-full
        pl-12
        pr-4
        py-3
        rounded-xl
        bg-white
        shadow
        outline-none
        focus:ring-2
        focus:ring-[#8B5E3C]"
      />

    </div>
  );
}

export default SearchBar;