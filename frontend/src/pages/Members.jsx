import { useEffect, useMemo, useState } from "react";
import API from "../api/api";

import MemberStats from "../components/members/MemberStats";
import MemberModal from "../components/members/MemberModal";
import MemberGrid from "../components/members/MemberGrid";
import DeleteMemberModal from "../components/members/DeleteMemberModal";
import SearchBar from "../components/members/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";

function Members() {

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showMemberModal,setShowMemberModal] = useState(false);
  const [selectedMember,setSelectedMember] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const fetchMembers = async () => {
    try {
      const response = await API.get("/members");
      setMembers(response.data.data);

    } catch (error) {
      console.log("Error fetching members:", error);
    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);


  const filteredMembers = useMemo(() => {

    return members.filter((member) => {

      const value = search.toLowerCase();

      return (
        member.name.toLowerCase().includes(value) ||
        member.email.toLowerCase().includes(value) ||
        member.phone.includes(value)
      );

    });

  }, [members, search]);

  const handleEdit = (member) => {
  setSelectedMember(member);
  setShowMemberModal(true);
};

  const handleDelete = (member) => {
  setSelectedMember(member);
  setShowDeleteModal(true);
};

 if (loading) {
  return <LoadingSpinner message="Loading Members..." />;
}

  return (
    <div className="p-6">

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">

        <div>
          <h1 className="text-3xl font-bold text-[#6B4423]">
            Members
          </h1>

          <p className="text-gray-600 mt-1">
            Manage all library members.
          </p>
        </div>

        <button
        
          className="
          bg-[#6B4423]
          text-white
          px-6
          py-3
          rounded-xl
          hover:bg-[#5a381d]
          transition
          w-full
          md:w-auto
          "
          onClick={()=>{

    setSelectedMember(null);

    setShowMemberModal(true);
   } } >
        
          + Add Member
        </button>

      </div>


      {/* Stats */}

      <MemberStats members={members}/>

    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8">

    <SearchBar
        search={search}
        setSearch={setSearch}
    />

  </div>
  
      <MemberGrid
          members={filteredMembers} onEdit={handleEdit} onDelete={handleDelete}
      />


  {
showMemberModal && (
  <MemberModal
  closeModal={()=>setShowMemberModal(false)}
  refreshMembers={fetchMembers}
  member={selectedMember}
  />
)}

{
showDeleteModal && (
<DeleteMemberModal
member={selectedMember}
closeModal={()=>setShowDeleteModal(false)}
refreshMembers={fetchMembers}/>
)}

    </div>
  );
}
export default Members;