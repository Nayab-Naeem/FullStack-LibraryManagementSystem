function Navbar(){

  return (

    <header className="h-16 bg-white shadow flex items-center justify-between px-6">

      <h2 className="text-xl font-semibold text-[#6B4423]">
        Library Management System
      </h2>


      <div className="flex items-center gap-3">

        <span className="text-gray-600">
          Welcome 👋
        </span>

        <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center">
          N
        </div>

      </div>


    </header>

  )

}

export default Navbar;