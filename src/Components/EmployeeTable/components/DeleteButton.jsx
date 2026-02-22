import { useState } from "react";
import { deleteEmployee } from "../../../client/employees";

const DeleteButton = ({ employeeId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    onDelete(employeeId)
    setLoading(true);
    await deleteEmployee(employeeId);
    setLoading(false);
  };

  return (
    <button disabled={loading} className="btn btn-danger" type="button" onClick={handleDelete}>
      {!loading ? "Delete" : "..."}
    </button>
  );
};

export default DeleteButton;
