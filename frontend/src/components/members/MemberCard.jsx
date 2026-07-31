import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

function MemberCard({
  member,
  onEdit,
  onDelete,
}) {

  const joinedDate = new Date(member.joined_date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <motion.div
      whileHover={{
        y: -4,
        scale: 1.01,
      }}
      transition={{ duration: 0.25 }}
      className="
    bg-white
    rounded-2xl
    shadow-md
    p-5
    border
    border-[#f0e5d8]"
    
    >
      {/* Avatar */}

      <div
        className="
        w-12
        h-12
        rounded-full
        bg-gradient-to-br
        from-[#6B4423]
        to-[#D4A373]
        flex
        items-center
        justify-center
        text-white
        mb-5
        "
      >
        <User size={22} />
      </div>

      {/* Name */}

      <h2
        className="
        text-1xl
        font-bold
        text-[#6B4423]
        mb-3
        "
      >
        {member.name}
      </h2>

      {/* Email */}

      <div className="flex items-center gap-2 mb-2 text-gray-700">
        <Mail size={18} />
        <span>{member.email}</span>
      </div>

      {/* Phone */}

      <div className="flex items-center gap-2 mb-2 text-gray-700">
        <Phone size={18} />
        <span>{member.phone}</span>
      </div>

      {/* Joined */}

      <div className="flex items-center gap-2 mb-4 text-gray-700">
        <CalendarDays size={18} />
        <span>{joinedDate}</span>
      </div>
  
      <div className="border-t border-gray-200 pt-4 grid grid-cols-2 gap-3">

  <button
    onClick={() => onEdit(member)}
    className="flex items-center justify-center gap-2 rounded-xl border border-[#D4A373] py-2.5 text-[#6B4423] font-medium hover:bg-[#FAF3E7] transition-all duration-200 text-sm"
  >
    <Pencil size={18} />
    Edit
  </button>

  <button
    onClick={() => onDelete(member)}
    className="flex items-center justify-center gap-2 rounded-xl border border-red-200 py-2.5 text-red-600 font-medium hover:bg-red-50 transition-all duration-200 text-sm"
  >
    <Trash2 size={18} />
    Delete
  </button>

</div>

  

    </motion.div>
  );
}

export default MemberCard;