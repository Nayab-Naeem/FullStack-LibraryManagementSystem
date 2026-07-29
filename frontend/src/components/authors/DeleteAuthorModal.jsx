import { motion, AnimatePresence } from "framer-motion";
import API from "../../api/api";

function DeleteAuthorModal({
  isOpen,
  onClose,
  author,
  onSuccess,
}) {

  const handleDelete = async () => {
    try {
      await API.delete(`/authors/${author.id}`);

      onSuccess();
      onClose();

    } catch (error) {
      console.error(error);
      alert("Failed to delete author.");
    }
  };


  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          <motion.div
            className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl"
            initial={{ scale: 0.9, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 40 }}
          >

            <h2 className="text-xl font-bold text-[#6B4423] mb-4">
              Delete Author
            </h2>


            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold">
                {author?.name}
              </span>
              ?
            </p>


            <div className="flex justify-end gap-3">

              <button
                onClick={onClose}
                className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              >
                Cancel
              </button>


              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>


          </motion.div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default DeleteAuthorModal;