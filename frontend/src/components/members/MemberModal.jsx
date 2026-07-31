import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import API from "../../api/api";


function MemberModal({
    closeModal,
    refreshMembers,
    member
}) {

    const [formData, setFormData] = useState({ name: "", email: "", phone: ""  });

    // Fill data when editing
    useEffect(() => {

        if(member){
            setFormData({
                name: member.name,
                email: member.email,
                phone: member.phone
            });

        }
        else{

            setFormData({
                name:"",
                email:"",
                phone:""
            });
        }
    },[member]);

    const handleChange = (e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        });
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();

        try{

            if(member){
                // UPDATE MEMBER
                await API.put(
                    `/members/${member.id}`,
                    formData
                );

            }
            else{
                // ADD MEMBER
                await API.post(
                    "/members",
                    formData
                );
            }

            refreshMembers();
            closeModal();

        }
        catch(error){

            console.log(
                "Member save error:",
                error
            );
        }
    };

    return (

        <div
        className=" fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 " >
            <motion.div
            initial={{
                opacity:0,
                scale:0.8
            }}

            animate={{
                opacity:1,
                scale:1
            }}

            transition={{
                duration:0.3
            }}

            className=" bg-white w-[90%] max-w-md rounded-3xl shadow-2xl p-6 " >

                {/* Header */}

                <div
                className=" flex justify-between items-center mb-6 " >

                    <h2 className=" text-2xl font-bold text-[#6B4423] " >

                        {member ? "Edit Member" : "Add Member"}

                    </h2>

                    <button
                    onClick={closeModal}
                    className="
                    text-gray-500
                    hover:text-[#6B4423]
                    "
                    >
                        <X size={24}/>

                    </button>

                </div>


                <form
                onSubmit={handleSubmit}
                className="space-y-4"
                >

                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Member Name"
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


                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
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

                    <input

                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
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

                    <button

                    type="submit"

                    className="
                    w-full
                    bg-[#6B4423]
                    text-white
                    py-3
                    rounded-xl
                    hover:bg-[#5a381d]
                    transition
                    "                     >

                        {
                            member 
                            ? "Update Member"
                            : "Add Member"
                        }

                    </button>

                </form>

            </motion.div>

        </div>

    );
}

export default MemberModal;