import { motion } from "framer-motion";
import { X, Trash2 } from "lucide-react";
import API from "../../api/API";


function DeleteMemberModal({
    member,
    closeModal,
    refreshMembers
}) {


    const handleDelete = async()=>{

        try{

            await API.delete(`/members/${member.id}`);
            refreshMembers();
            closeModal();
        }
        catch(error){

            console.log(
                "Delete member error:",
                error
            );
        }

    };

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <motion.div

            initial={{
                opacity:0,
                scale:0.8
            }}

            animate={{
                opacity:1,
                scale:1
            }}

            className="bg-white rounded-3xl p-6 w-[90%] max-w-sm shadow-xl"
            >

                <div className="flex justify-between items-center mb-5">

                    <h2 className="text-xl font-bold text-[#6B4423]">
                        Delete Member
                    </h2>

                    <button onClick={closeModal}>
                        <X/>
                    </button>

                </div>

                <div className="flex justify-center mb-4 text-red-500">
                    <Trash2 size={45}/>
                </div>


                <p className="text-center text-gray-600 mb-6">

                    Are you sure you want to delete

                    <span className="font-bold text-[#6B4423]">
                        {" "}{member.name}
                    </span>
                    ?
                </p>
                <div className="flex gap-3">

                    <button
                    onClick={closeModal}
                    className="flex-1 py-3 rounded-xl border border-gray-300 hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>

                    <button
                    onClick={handleDelete}
                    className="flex-1 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 transition"
                    >
                        Delete
                    </button>

                </div>


            </motion.div>

        </div>
    );
}

export default DeleteMemberModal;