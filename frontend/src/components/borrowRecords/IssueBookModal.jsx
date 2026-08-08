import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";
import API from "../../api/API";
import toast from "react-hot-toast";


function IssueBookModal({
    books,
    members,
    closeModal,
    refreshRecords
}) {


    const [formData, setFormData] = useState({

        book_id:"",
        member_id:"",
        borrow_date:""

    });



    const handleChange = (e)=>{

        setFormData({

            ...formData,

            [e.target.name]:e.target.value

        });

    };



    const handleSubmit = async(e)=>{

        e.preventDefault();


        try{


            await API.post(
                "/borrow-records",
                formData
            );


            toast.success(
                "Book issued successfully"
            );


            refreshRecords();

            closeModal();


        }
        catch(error){


            toast.error(
                error.response?.data?.message ||
                "Failed to issue book"
            );


        }


    };




    return (

        <div
        className="
        fixed
        inset-0
        bg-black/40
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50
        "
        >


            <motion.div

            initial={{
                opacity:0,
                scale:0.8
            }}

            animate={{
                opacity:1,
                scale:1
            }}

            className="
            bg-white
            rounded-3xl
            p-6
            w-[90%]
            max-w-md
            shadow-xl
            "

            >



                {/* Header */}

                <div className="
                flex
                justify-between
                items-center
                mb-6
                ">


                    <h2 className="
                    text-2xl
                    font-bold
                    text-[#6B4423]
                    ">
                        Issue Book
                    </h2>


                    <button onClick={closeModal}>

                        <X/>

                    </button>


                </div>





                <form
                onSubmit={handleSubmit}
                className="
                space-y-4
                "
                >



                    {/* Book */}

                    <select

                    name="book_id"

                    value={formData.book_id}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#D4A373]
                    "

                    required

                    >

                    <option value="">
                        Select Book
                    </option>


                    {
                        books
                        .filter(
                            book => book.available_quantity > 0
                        )
                        .map(book=>(

                            <option
                            key={book.id}
                            value={book.id}
                            >

                                {book.title}

                            </option>

                        ))
                    }


                    </select>





                    {/* Member */}

                    <select

                    name="member_id"

                    value={formData.member_id}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#D4A373]
                    "

                    required

                    >


                    <option value="">
                        Select Member
                    </option>


                    {
                        members.map(member=>(

                            <option
                            key={member.id}
                            value={member.id}
                            >

                                {member.name}

                            </option>

                        ))
                    }


                    </select>





                    {/* Date */}

                    <input

                    type="date"

                    name="borrow_date"

                    value={formData.borrow_date}

                    onChange={handleChange}

                    className="
                    w-full
                    border
                    rounded-xl
                    px-4
                    py-3
                    outline-none
                    focus:ring-2
                    focus:ring-[#D4A373]
                    "

                    required

                    />





                    {/* Buttons */}

                    <div className="
                    flex
                    gap-3
                    pt-4
                    ">


                        <button

                        type="button"

                        onClick={closeModal}

                        className="
                        flex-1
                        py-3
                        rounded-xl
                        border
                        border-gray-300
                        hover:bg-gray-100
                        transition
                        "

                        >

                            Cancel

                        </button>




                        <button

                        type="submit"

                        className="
                        flex-1
                        py-3
                        rounded-xl
                        bg-[#6B4423]
                        text-white
                        hover:bg-[#5a381d]
                        transition
                        "

                        >

                            Issue Book

                        </button>


                    </div>



                </form>


            </motion.div>


        </div>

    );

}


export default IssueBookModal;