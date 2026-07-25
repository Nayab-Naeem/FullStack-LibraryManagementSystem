import { NavLink } from "react-router-dom";
import { FaBook, FaUserEdit, FaUsers, FaChartPie } from "react-icons/fa";

function Sidebar() {

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaChartPie />
    },
    {
      name: "Books",
      path: "/books",
      icon: <FaBook />
    },
    {
      name: "Authors",
      path: "/authors",
      icon: <FaUserEdit />
    },
    {
      name: "Members",
      path: "/members",
      icon: <FaUsers />
    }
  ];


  return (
    <aside className="w-64 min-h-screen bg-[#6B4423] text-white p-5">

      <h1 className="text-2xl font-bold mb-8">
        📚 Librariea
      </h1>


      <nav className="space-y-3">

        {
          links.map((link)=>(
            <NavLink
              key={link.name}
              to={link.path}
              className={({isActive}) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${
                  isActive
                  ? "bg-[#D4A373] text-[#2C1B0E]"
                  : "hover:bg-[#8B5E34]"
                }`
              }
            >

              {link.icon}

              <span>
                {link.name}
              </span>

            </NavLink>
          ))
        }

      </nav>


    </aside>
  )
}

export default Sidebar;