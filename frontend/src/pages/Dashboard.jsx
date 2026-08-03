import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import StatCard from "../components/StatCard";
import LibraryOverviewChart from "../components/bookChart";
import LoadingSpinner from "../components/LoadingSpinner";
import API from "../api/api";
import { BookOpen, Users, UserPen, Layers, BookMarked, Copy } from "lucide-react";

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await API.get("/dashboard");
        setStats(res.data.data);
      } catch (err) {
        console.error("Dashboard Error:", err);
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
  return <LoadingSpinner message="Loading Dashboard..." />;
}

  if (error) {
    return (
      <div className="rounded-xl bg-red-50 p-6 text-red-600 border border-red-100">
        {error}
      </div>
    );
  }

  const availabilityRate = stats.total_copies
    ? Math.round((stats.available_copies / stats.total_copies) * 100)
    : 0;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#6B4423]">Dashboard</h1>
          <p className="mt-1 text-gray-500">Welcome back to Librariea 📚</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800">
            {availabilityRate}% books available
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
        <StatCard title="Total Books" value={stats.total_books} icon={<BookOpen />} color="amber" />
        <StatCard title="Total Copies" value={stats.total_copies} icon={<Copy />} color="blue" />
        <StatCard title="Available Copies" value={stats.available_copies} icon={<BookMarked />} color="green" />
        <StatCard title="Borrowed Books" value={stats.borrowed_books} icon={<BookOpen />} color="rose" />
        <StatCard title="Members" value={stats.total_members} icon={<Users />} color="purple" />
        <StatCard title="Authors" value={stats.total_authors} icon={<UserPen />} color="amber" />
      </div>

      {/* Charts */}
      <LibraryOverviewChart stats={stats} />

      {/* Optional Quick Actions (nice extra) */}
      <div className="rounded-2xl bg-white p-6 shadow-sm border border-amber-100">
        <h3 className="text-lg font-bold text-[#6B4423] mb-4">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a href="/books" className="rounded-xl bg-[#6B4423] px-5 py-2.5 text-white text-sm font-medium hover:bg-[#5a3a1f] transition">
            + Add Book
          </a>
          <a href="/members" className="rounded-xl bg-amber-100 px-5 py-2.5 text-amber-900 text-sm font-medium hover:bg-amber-200 transition">
            + Add Member
          </a>
          <a href="/borrow-records" className="rounded-xl bg-emerald-100 px-5 py-2.5 text-emerald-900 text-sm font-medium hover:bg-emerald-200 transition">
            Issue Book
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;