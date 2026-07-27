import { FiBook,FiCheckCircle, FiAlertCircle, } from "react-icons/fi";

function BookStats({ books }) {

  const total = books.length;

  const available = books.filter(
    (b) => b.available_quantity > 0
  ).length;

  const lowStock = books.filter(
    (b) => b.available_quantity <= 2 &&
         b.available_quantity > 0
  ).length;

  const outStock = books.filter(
    (b) => b.available_quantity === 0
  ).length;

  const cards = [
    {
      title: "Total Books",
      value: total,
      icon: <FiBook size={30} />,
      color: "bg-blue-500",
    },
    {
      title: "Available",
      value: available,
      icon: <FiCheckCircle size={30} />,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: lowStock,
      icon: <FiAlertCircle size={30} />,
      color: "bg-yellow-500",
    },
    {
      title: "Out of Stock",
      value: outStock,
      icon: <FiAlertCircle size={30} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
        >

          <div
            className={`${card.color} text-white w-14 h-14 rounded-xl flex items-center justify-center`}
          >
            {card.icon}
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {card.value}
          </h2>

          <p className="text-gray-500">
            {card.title}
          </p>

        </div>

      ))}

    </div>
  );
}

export default BookStats;