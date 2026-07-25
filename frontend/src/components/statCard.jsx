function StatCard({ title, value }) {
  return (
    <div className="rounded-xl bg-white p-6 shadow-md border border-amber-100 hover:shadow-lg transition">
      <h3 className="text-gray-500 text-sm">{title}</h3>

      <p className="mt-2 text-3xl font-bold text-[#6B4423]">
        {value}
      </p>
    </div>
  );
}

export default StatCard;