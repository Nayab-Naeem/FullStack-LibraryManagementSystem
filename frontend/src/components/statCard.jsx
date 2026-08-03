import { motion } from "framer-motion";

function StatCard({ title, value, icon, color = "amber" }) {
  const colorMap = {
    amber: "from-amber-50 to-orange-50 border-amber-100 text-amber-800",
    green: "from-emerald-50 to-green-50 border-emerald-100 text-emerald-800",
    blue: "from-sky-50 to-blue-50 border-sky-100 text-sky-800",
    purple: "from-violet-50 to-purple-50 border-violet-100 text-violet-800",
    rose: "from-rose-50 to-pink-50 border-rose-100 text-rose-800",
  };

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`rounded-2xl bg-gradient-to-br ${colorMap[color]} p-6 shadow-sm border hover:shadow-md transition-shadow`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium opacity-70">{title}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight">{value}</p>
        </div>
        <div className="text-3xl opacity-80">{icon}</div>
      </div>
    </motion.div>
  );
}

export default StatCard;