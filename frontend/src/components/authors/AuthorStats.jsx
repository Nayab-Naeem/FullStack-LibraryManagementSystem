import { Users } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

function AuthorStats({ totalAuthors }) {

  const [count, setCount] = useState(0);


  // Animated counter
  useEffect(() => {

    let start = 0;

    const duration = 800;
    const increment = totalAuthors / (duration / 20);


    const timer = setInterval(() => {

      start += increment;

      if (start >= totalAuthors) {
        setCount(totalAuthors);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }

    },20);


    return () => clearInterval(timer);

  }, [totalAuthors]);



  return (

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
        duration:0.5
      }}

      whileHover={{
        y:-8,
        scale:1.03
      }}

      className="mb-8"

    >


      <div
        className="
        relative overflow-hidden
        w-full md:w-80
        rounded-3xl
        p-6
        bg-gradient-to-br 
        from-[#6B4423]
        via-[#8B5E34]
        to-[#D4A373]
        text-white
        shadow-xl
        "
      >


        {/* Animated background circles */}

        <motion.div

          animate={{
            rotate:360
          }}

          transition={{
            duration:12,
            repeat:Infinity,
            ease:"linear"
          }}

          className="
          absolute
          -right-12
          -top-12
          w-40
          h-40
          rounded-full
          bg-white/10
          "
        />



        <motion.div

          animate={{
            y:[0,-10,0]
          }}

          transition={{
            duration:3,
            repeat:Infinity
          }}

          className="
          relative
          w-16
          h-16
          rounded-2xl
          bg-white/20
          flex
          items-center
          justify-center
          backdrop-blur-md
          mb-5
          "

        >

          <Users size={32}/>

        </motion.div>



        <p className="text-white/80 text-sm">
          Total Authors
        </p>



        <motion.h2

          className="
          text-5xl
          font-bold
          mt-2
          "

        >
          {count}
        </motion.h2>



        <p className="
        mt-3
        text-sm
        text-white/80
        ">
          Writers contributing to your library
        </p>



      </div>


    </motion.div>

  );
}


export default AuthorStats;