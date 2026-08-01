import { useEffect, useState } from "react";
import API from "../api/api";

import BorrowStats from "../components/borrowRecords/BorrowStats";
import BorrowGrid from "../components/borrowRecords/BorrowGrid";
import IssueBookModal from "../components/borrowRecords/IssueBookModal";
import ReturnBookModal from "../components/borrowRecords/ReturnBookModal";
import DeleteBookModal from "../components/borrowRecords/DeleteBookModal";
import SearchBar from "../components/borrowRecords/SearchBar";

function BorrowRecords() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [deleteRecord, setDeleteRecord] = useState(null);
    const [search, setSearch] = useState("");

    const fetchRecords = async () => {

        try {

            const response = await API.get("/borrow-records");

            setRecords(response.data.data);

        } catch (error) {

            console.log("Borrow records error:", error);

        } finally {

            setLoading(false);

        }

    };

const fetchBooks = async () => {

    try {

        const response = await API.get("/books");

        setBooks(response.data.data);

    } catch (error) {

        console.log(error);

    }

};

const fetchMembers = async () => {

    try {

        const response = await API.get("/members");

        setMembers(response.data.data);

    } catch (error) {

        console.log(error);

    }

};

const handleReturn = (record) => {
    setSelectedRecord(record);
};


const handleDelete = (record)=>{
    setDeleteRecord(record);
};

    useEffect(() => {

    fetchRecords();
    fetchBooks();
    fetchMembers();

}, []);

const filteredRecords = records.filter((record)=>{

    return (
        record.title
        .toLowerCase()
        .includes(search.toLowerCase())
        ||
        record.member
        .toLowerCase()
        .includes(search.toLowerCase())
    );

});


    if (loading) {

        return (
            <div className="flex justify-center items-center h-[70vh]">
                <p className="text-xl text-[#6B4423] font-semibold">
                    Loading Borrow Records...
                </p>
            </div>
        );

    }


    return (

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

            {/* Header */}

            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">

                <div>

                    <h1 className="text-4xl font-bold text-[#6B4423]">
                        Borrow Records
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Manage all borrowed and returned books.
                    </p>

                </div>


                <button
                    className="bg-[#6B4423] text-white px-6 py-3 rounded-xl hover:bg-[#5a381d] transition shadow-md"
                     onClick={() => setShowIssueModal(true)}
                >
                    + Issue Book
                </button>

            </div>



            {/* Statistics */}

            <BorrowStats records={records} />

            {/* Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">
          <SearchBar search={search} setSearch={setSearch} />
            </div>

            {/* Borrow Cards */}

            <BorrowGrid
                records={filteredRecords}
                onReturn={handleReturn}
                onDelete={handleDelete}
            />

{
showIssueModal && (
        <IssueBookModal
        books={books}
        members={members}
        closeModal={() => setShowIssueModal(false)}
        refreshRecords={fetchRecords}
/>
)}

{
selectedRecord && (
        <ReturnBookModal
        record={selectedRecord}
        closeModal={() => setSelectedRecord(null)}
        refreshRecords={fetchRecords}
/>
)}

{
deleteRecord && (
        <DeleteBookModal
        record={deleteRecord}
        closeModal={()=>setDeleteRecord(null)}
        refreshRecords={fetchRecords}
/>
)}
        </div>

    );

}

export default BorrowRecords;