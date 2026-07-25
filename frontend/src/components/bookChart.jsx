import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";


function LibraryOverviewChart({ stats }) {


  const data = [
    {
      name: "Borrowed",
      value: stats.borrowed
    },
    {
      name: "Available",
      value: stats.books - stats.borrowed
    }
  ];


  const COLORS = [
    "#6B4423", // Borrowed - Brown
    "#16A34A"  // Available - Green
  ];


  return (

    <div className="rounded-xl bg-white p-6 shadow-md border border-amber-100">

      <h2 className="mb-5 text-xl font-bold text-[#6B4423]">
        Book Availability
      </h2>


      <ResponsiveContainer width="100%" height={300}>

        <PieChart>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >

            {
              data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index]}
                />
              ))
            }

          </Pie>


          <Tooltip />

          <Legend />

        </PieChart>

      </ResponsiveContainer>


      <div className="mt-4 text-center">

        <p className="text-gray-600">
          Total Books:
          <span className="ml-2 font-bold text-[#6B4423]">
            {stats.books}
          </span>
        </p>

      </div>


    </div>

  );

}


export default LibraryOverviewChart;