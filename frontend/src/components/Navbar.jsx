import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar(){
    const navigate = useNavigate();


     const handleLogout = ()=>{

    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    toast.success("Logged out successfully");
    navigate("/login");

  };

  const admin = JSON.parse(
  localStorage.getItem("admin")
);


  return (

    <header className="min-h-16 bg-white shadow flex items-center justify-between px-4 sm:px-6 gap-3">

      <h2 className="text-lg sm:text-xl font-semibold text-[#6B4423] truncate">
        Library Management System
      </h2>


   <div className="flex items-center gap-2 sm:gap-3">


  <div 
  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#D4A373] flex items-center justify-center font-bold text-white" >

    {admin?.name?.charAt(0).toUpperCase()}

  </div>

        <button
        onClick={handleLogout}
        className="bg-[#6B4423] text-white px-3 sm:px-4 py-2 text-sm sm:text-base rounded-lg hover:bg-[#5a381d] transition" >

          Logout

        </button>

      </div>


    </header>

  )

}

export default Navbar;