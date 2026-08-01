import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import API from "../../api/api";
import toast from "react-hot-toast";


function DeleteBookModal({
    record,
    closeModal,
    refreshRecords
}) {


    const handleDelete = async()=>{


        try{

            await API.delete(
                `/borrow-records/${record.id}`
            );


            toast.success(
                "Borrow record deleted"
            );


            refreshRecords();

            closeModal();


        }
        catch(error){

            toast.error(
                error.response?.data?.message ||
                "Delete failed"
            );

        }


    };



    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">


            <motion.div

            initial={{opacity:0,scale:0.8}}

            animate={{opacity:1,scale:1}}

            className="bg-white rounded-3xl p-6 w-[90%] max-w-sm shadow-xl"

            >


                <div className="flex justify-between items-center mb-5">


                    <h2 className="text-xl font-bold text-[#6B4423]">
                        Delete Record
                    </h2>


                    <button onClick={closeModal}>
                        <X/>
                    </button>


                </div>




                <div className="flex justify-center text-red-500 mb-4">

                    <Trash2 size={45}/>

                </div>




                <p className="text-center text-gray-600 mb-6">

                    Delete borrow record for

                    <span className="font-bold text-[#6B4423]">
                        {" "}{record.title}
                    </span>
                    ?

                </p>




                <div className="flex gap-3">


                    <button

                    onClick={closeModal}

                    className="flex-1 py-3 rounded-xl border hover:bg-gray-100"

                    >

                        Cancel

                    </button>




                    <button

                    onClick={handleDelete}

                    className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700"

                    >

                        Delete

                    </button>


                </div>


            </motion.div>


        </div>

    );

}


export default DeleteBookModal;