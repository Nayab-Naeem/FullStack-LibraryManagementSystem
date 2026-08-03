import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from "recharts";

function LibraryOverviewChart({ stats }) {
  const availabilityData = [
    { name: "Available", value: stats.available_copies || 0 },
    { name: "Borrowed", value: stats.borrowed_books || 0 },
  ];

  const overviewData = [
    { name: "Books", value: stats.total_books || 0 },
    { name: "Authors", value: stats.total_authors || 0 },
    { name: "Members", value: stats.total_members || 0 },
    { name: "Categories", value: stats.total_categories || 0 },
  ];

  const COLORS = ["#16A34A", "#6B4423"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Availability Donut */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-amber-100">
        <h2 className="mb-4 text-lg font-bold text-[#6B4423]">Book Availability</h2>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={availabilityData}
              cx="50%"
              cy="50%"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
              dataKey="value"
            >
              {availabilityData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
        <p className="text-center text-sm text-gray-500 mt-2">
          Total Copies: <span className="font-semibold text-[#6B4423]">{stats.total_copies}</span>
        </p>
      </div>

      {/* Overview Bar */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-amber-100">
        <h2 className="mb-4 text-lg font-bold text-[#6B4423]">Library Overview</h2>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={overviewData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#6B4423" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default LibraryOverviewChart;