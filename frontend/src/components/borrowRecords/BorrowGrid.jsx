import BorrowCard from "./BorrowCard";

function BorrowGrid({
  records,
  onReturn,
  onDelete,
}) {

  if (records.length === 0) {

    return (
      <div className="text-center py-16 text-gray-500 text-lg">
        No borrow records found.
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

      {records.map((record) => (

        <BorrowCard
          key={record.id}
          record={record}
          onReturn={onReturn}
          onDelete={onDelete}
        />

      ))}

    </div>

  );

}

export default BorrowGrid;