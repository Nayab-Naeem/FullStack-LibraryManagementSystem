import StatCard from "../components/StatCard";
import { useEffect, useState } from "react";
import API from "../api/api";


function Dashboard() {


  const [stats, setStats] = useState({ books: 0, authors: 0, members: 0, borrowed: 0 });


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
        console.log("Dashboard Error:", error.message); }
 }


    fetchStats();

  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#6B4423]">
        Dashboard
      </h1>

      <p className="mt-2 text-gray-600">
        Welcome back...
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      <StatCard  title="Total Books"  value={stats.books} />
      <StatCard  title="Authors"  value={stats.authors} />
      <StatCard  title="Members"  value={stats.members} />
      <StatCard  title="Borrowed Books"  value={stats.borrowed} />
      </div>
    </div>
  );
}

export default Dashboard;