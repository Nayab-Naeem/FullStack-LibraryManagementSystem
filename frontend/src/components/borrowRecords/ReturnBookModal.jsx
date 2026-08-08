import { motion } from "framer-motion";
import { X, RotateCcw } from "lucide-react";
import { useState } from "react";
import API from "../../api/API";
import toast from "react-hot-toast";


function ReturnBookModal({
    record,
    closeModal,
    refreshRecords
}) {


    const [returnDate, setReturnDate] = useState("");



    const handleReturn = async()=>{

        try{

            await API.put(
                `/borrow-records/${record.id}`,
                {
                    return_date:returnDate
                }
            );


            toast.success("Book returned successfully");

            refreshRecords();

            closeModal();


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Failed to return book"
            );

        }

    };



    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">


            <motion.div

            initial={{opacity:0,scale:0.8}}

            animate={{opacity:1,scale:1}}

            className="bg-white rounded-3xl p-6 w-[90%] max-w-md shadow-xl"

            >


                <div className="flex justify-between items-center mb-6">


                    <h2 className="text-2xl font-bold text-[#6B4423]">
                        Return Book
                    </h2>


                    <button onClick={closeModal}>
                        <X/>
                    </button>


                </div>




                <div className="flex justify-center mb-5 text-[#6B4423]">

                    <RotateCcw size={45}/>

                </div>




                <p className="text-center text-gray-600 mb-5">

                    Return 
                    <span className="font-bold text-[#6B4423]">
                        {" "}{record.title}
                    </span>
                    ?

                </p>




                <input

                type="date"

                value={returnDate}

                onChange={(e)=>setReturnDate(e.target.value)}

                className="w-full border rounded-xl px-4 py-3 mb-5 outline-none focus:ring-2 focus:ring-[#D4A373]"

                required

                />





                <div className="flex gap-3">


                    <button

                    onClick={closeModal}

                    className="flex-1 py-3 rounded-xl border hover:bg-gray-100"

                    >

                        Cancel

                    </button>




                    <button

                    onClick={handleReturn}

                    disabled={!returnDate}

                    className="flex-1 py-3 rounded-xl bg-[#6B4423] text-white hover:bg-[#5a381d] disabled:opacity-50"

                    >

                        Return

                    </button>


                </div>


            </motion.div>


        </div>

    );

}


export default ReturnBookModal;