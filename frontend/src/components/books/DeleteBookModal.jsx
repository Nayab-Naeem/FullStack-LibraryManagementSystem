import { motion } from "framer-motion";
import { FiAlertTriangle, FiTrash2 } from "react-icons/fi";
import API from "../../api/API";
import toast from "react-hot-toast";

function DeleteBookModal({ book, onClose, onDeleted }) {

  const handleDelete = async () => {

    try {

      await API.delete(`/books/${book.id}`);

      toast.success("Book deleted successfully!");

      onDeleted();

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Failed to delete book."
      );

    }

  };


  return (

    <div className="
      fixed
      inset-0
      bg-black/50
      backdrop-blur-sm
      flex
      justify-center
      items-center
      z-50
      px-4
    ">

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
          shadow-2xl
          w-full
          max-w-md
          p-8
          text-center
        "

      >

        <div className="
          mx-auto
          bg-red-100
          w-16
          h-16
          rounded-full
          flex
          justify-center
          items-center
        ">

          <FiAlertTriangle
            className="text-red-500"
            size={32}
          />

        </div>


        <h2 className="
          text-2xl
          font-bold
          text-[#4A2C2A]
          mt-5
        ">
          Delete Book?
        </h2>


        <p className="
          text-gray-500
          mt-3
        ">
          Are you sure you want to delete
        </p>


        <p className="
          font-semibold
          text-[#8B5E3C]
          mt-1
        ">
          "{book.title}"
        </p>


        <div className="
          flex
          gap-4
          mt-8
        ">


          <button

            onClick={onClose}

            className="
              flex-1
              py-3
              rounded-xl
              bg-gray-200
              hover:bg-gray-300
              transition
            "

          >
            Cancel

          </button>



          <button

            onClick={handleDelete}

            className="
              flex-1
              py-3
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              flex
              justify-center
              items-center
              gap-2
              transition
            "

          >

            <FiTrash2 />

            Delete

          </button>


        </div>


      </motion.div>


    </div>

  );
}

export default DeleteBookModal;