function CategoryFilter({
  categories,
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex gap-3 flex-wrap">

      {categories.map((category) => (

        <button
          key={category}
          onClick={() => setSelectedCategory(category)}
          className={`px-5 py-3 rounded-full transition

          ${
            selectedCategory === category
              ? "bg-[#8B5E3C] text-white"
              : "bg-white text-[#8B5E3C]"
          }`}
        >
          {category}
        </button>

      ))}

    </div>
  );
}

export default CategoryFilter;