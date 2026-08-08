import { useState } from "react";
import API from "../api/API";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { motion } from "framer-motion";


function Login() {

  const navigate = useNavigate();


  const [form, setForm] = useState({
    email: "",
    password: ""
  });



  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value
    });

  };



  const handleLogin = async (e) => {

    e.preventDefault();


    try {

      const response = await API.post(
        "/auth/login",
        form
      );


      localStorage.setItem(
        "token",
        response.data.token
      );


      localStorage.setItem(
        "admin",
        JSON.stringify(response.data.admin)
      );


      toast.success("Welcome back 📚");


      navigate("/");


    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login failed"
      );

    }

  };



  return (

    <div
      className="
      min-h-screen
      bg-[#FAF3E7]
      flex
      items-center
      justify-center
      p-6
      relative
      overflow-hidden
      "
    >


      {/* Background Animations */}

      <motion.div

        animate={{
          scale:[1,1.2,1],
          rotate:[0,180,360]
        }}

        transition={{
          duration:15,
          repeat:Infinity,
          ease:"linear"
        }}

        className="
        absolute
        w-80
        h-80
        rounded-full
        bg-[#D4A373]/20
        top-[-80px]
        left-[-80px]
        "

      />



      <motion.div

        animate={{
          scale:[1,1.3,1]
        }}

        transition={{
          duration:8,
          repeat:Infinity
        }}

        className="
        absolute
        w-72
        h-72
        rounded-full
        bg-[#6B4423]/10
        bottom-[-80px]
        right-[-80px]
        "

      />




      {/* Main Card */}

      <motion.div

        initial={{
          opacity:0,
          scale:0.8,
          y:40
        }}

        animate={{
          opacity:1,
          scale:1,
          y:0
        }}

        transition={{
          duration:0.7,
          type:"spring"
        }}


        className="
        w-full
        max-w-5xl
        bg-white
        rounded-3xl
        shadow-xl
        overflow-hidden
        grid
        md:grid-cols-2
        relative
        z-10
        "

      >




        {/* LEFT SECTION */}

        <motion.div

          initial={{
            opacity:0,
            x:-60
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            delay:0.3
          }}


          className="
          hidden
          md:flex
          flex-col
          justify-center
          items-center
          bg-[#6B4423]
          text-white
          p-10
          "

        >



          <motion.div

            animate={{
              y:[0,-15,0],
              rotate:[0,5,-5,0]
            }}

            transition={{
              duration:3,
              repeat:Infinity
            }}

          >

            <BookOpen size={75}/>

          </motion.div>





          <h1 className="
          text-4xl
          font-bold
          mt-6
          ">
            Librariea
          </h1>



          <p className="
          text-center
          mt-4
          text-[#F5E6D3]
          ">

            Manage books, members and borrowing records easily.

          </p>




        </motion.div>







        {/* RIGHT SECTION */}


        <motion.form

          onSubmit={handleLogin}


          initial={{
            opacity:0,
            x:60
          }}

          animate={{
            opacity:1,
            x:0
          }}

          transition={{
            delay:0.4
          }}


          className="
          p-8
          md:p-12
          "

        >



          <h2 className="
          text-3xl
          font-bold
          text-[#6B4423]
          mb-2
          ">

            Admin Login

          </h2>




          <p className="
          text-gray-500
          mb-8
          ">

            Sign in to manage your library

          </p>





          <motion.input


            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.5
            }}


            name="email"

            type="email"

            placeholder="Email address"

            onChange={handleChange}


            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-4
            outline-none
            focus:ring-2
            focus:ring-[#D4A373]
            "

          />






          <motion.input


            initial={{
              opacity:0,
              y:20
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:0.7
            }}


            name="password"

            type="password"

            placeholder="Password"

            onChange={handleChange}


            className="
            w-full
            border
            rounded-xl
            px-4
            py-3
            mb-6
            outline-none
            focus:ring-2
            focus:ring-[#D4A373]
            "

          />







          <motion.button


            whileHover={{
              scale:1.05
            }}


            whileTap={{
              scale:0.95
            }}


            transition={{
              type:"spring",
              stiffness:300
            }}


            className="
            w-full
            bg-[#6B4423]
            text-white
            py-3
            rounded-xl
            hover:bg-[#5a381d]
            transition
            font-semibold
            "

          >

            Login

          </motion.button>





        </motion.form>




      </motion.div>



    </div>

  );

}


export default Login;