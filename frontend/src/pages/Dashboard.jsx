import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import API from "../api/api";
import LibraryOverviewChart from "../components/bookChart";

function Dashboard() {

  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");



  useEffect(() => {

    async function fetchStats() {

      try {

        const books = await API.get("/books");
        const authors = await API.get("/authors");
        const members = await API.get("/members");
        const borrowRecords = await API.get("/borrow-records");


        setStats({
          books: books.data.data.length,
          authors: authors.data.data.length,
          members: members.data.data.length,
          borrowed: borrowRecords.data.data.filter(
            (record) => record.status === "Borrowed"
          ).length
        });


      } catch (error) {

        console.log("Dashboard Error:", error.message);

        setError("Failed to load dashboard data");

      } finally {

        setLoading(false);

      }

    }


    fetchStats();

  }, []);

  if (loading) {

    return (
      <div>
        <h1 className="text-3xl font-bold text-[#6B4423]">
          Dashboard
        </h1>

        <p className="mt-5 text-gray-600">
          Loading dashboard data...
        </p>
      </div>
    );
  }

  if (error) {

    return (
      <div>
        <h1 className="text-3xl font-bold text-[#6B4423]">
          Dashboard
        </h1>

        <p className="mt-5 text-red-500">
          {error}
        </p>
      </div>
    );

  }

  return (
    <div>
<div className="flex items-center justify-between">

  <div>
    <h1 className="text-3xl font-bold text-[#6B4423]">
      Dashboard
    </h1>

    <p className="mt-2 text-gray-600">
      Welcome back...
    </p>
  </div>


  {/* Dashboard Animation */}

  <div className="relative flex h-32 w-32 items-center justify-center">

    <div className="absolute h-24 w-24 animate-pulse rounded-full bg-amber-300/30 blur-xl">
    </div>


    <div className="relative animate-bounce text-6xl">
      📚
    </div>


    <div className="absolute left-2 top-2 animate-pulse text-xl">
      ✨
    </div>


    <div className="absolute right-2 bottom-2 animate-bounce text-xl">
      📖
    </div>

  </div>

</div>



      <div className="mt-8"> <LibraryOverviewChart stats={stats} /> </div>

{/* Stat Cards After Chart */}
    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">


      <StatCard
        title="Total Books"
        value={stats.books}
      />


      <StatCard
        title="Authors"
        value={stats.authors}
      />


      <StatCard
        title="Members"
        value={stats.members}
      />


      <StatCard
        title="Borrowed Books"
        value={stats.borrowed}
      />


    </div>

    </div>
  );
}

export default Dashboard;