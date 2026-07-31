import MemberCard from "./MemberCard";

function MemberGrid({
  members,
  onEdit,
  onDelete,
}) {
  if (members.length === 0) {
    return (
      <div className="text-center text-gray-500 py-10">
        No members found.
      </div>
    );
  }

  return (
    <div
      className="
      grid
      grid-cols-1
      md:grid-cols-2
      xl:grid-cols-3
      gap-6
      "
    >
      {members.map((member) => (
        <MemberCard
          key={member.id}
          member={member}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default MemberGrid;