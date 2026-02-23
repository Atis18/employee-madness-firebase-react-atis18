import { useState } from "react";
import { deleteEquipment } from "../../../client/equipments";

const DeleteButton = ({ equipmentId, onDelete }) => {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    onDelete(equipmentId)
    setLoading(true);
    await deleteEquipment(equipmentId);
    setLoading(false);
  };

  return (
    <button disabled={loading} className="btn btn-danger" type="button" onClick={handleDelete}>
      {!loading ? "Delete" : "..."}
    </button>
  );
};

export default DeleteButton;
