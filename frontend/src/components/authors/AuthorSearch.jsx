import { Search } from "lucide-react";
import { motion } from "framer-motion";

function AuthorSearch({ search, setSearch }) {

  return (
    <motion.div

      initial={{
        opacity:0,
        x:30
      }}

      animate={{
        opacity:1,
        x:0
      }}

      transition={{
        duration:0.5
      }}

      className="
      relative
      w-full
      md:w-96
      "
    >


      <Search
        size={22}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-[#6B4423]
        "
      />


      <input

        type="text"

        placeholder="Search authors..."

        value={search}

        onChange={(e)=>setSearch(e.target.value)}

        className="
        w-full
        pl-12
        pr-5
        py-4
        rounded-2xl

        bg-white

        border
        border-[#E8D8C3]

        shadow-md

        text-[#6B4423]

        placeholder-gray-400

        focus:outline-none
        focus:ring-2
        focus:ring-[#D4A373]

        transition
        "

      />


    </motion.div>
  );
}


export default AuthorSearch;