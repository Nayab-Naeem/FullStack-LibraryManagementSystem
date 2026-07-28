function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <select
      value={selectedCategory}
      onChange={(e) => setSelectedCategory(e.target.value)}
      className="
        px-5
        py-3
        rounded-xl
        bg-white
        shadow-md
        text-[#4A2C2A]
        outline-none
        cursor-pointer
        focus:ring-2
        focus:ring-[#8B5E3C]
      "
    >

      <option value="">
        All Categories
      </option>

      {categories.map((category) => (
        <option
          key={category}
          value={category}
        >
          {category}
        </option>
      ))}

    </select>
  );
}

export default CategoryFilter;