import { useEffect, useState } from "react";
import API from "../api/api";

import BorrowStats from "../components/borrowRecords/BorrowStats";
import BorrowGrid from "../components/borrowRecords/BorrowGrid";
import IssueBookModal from "../components/borrowRecords/IssueBookModal";

function BorrowRecords() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showIssueModal, setShowIssueModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [members, setMembers] = useState([]);

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

    useEffect(() => {

    fetchRecords();
    fetchBooks();
    fetchMembers();

}, []);


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



            {/* Borrow Cards */}

            <BorrowGrid
                records={records}
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
        </div>

    );

}

export default BorrowRecords;