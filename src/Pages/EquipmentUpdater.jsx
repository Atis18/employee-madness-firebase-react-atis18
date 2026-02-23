import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EquipmentForm from "../Components/EquipmentForm";
import Loading from "../Components/Loading";
import { getOneEquipmentById, updateEquipment } from "../client/equipments";

const EquipmentUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [equipment, setEquipment] = useState(null);

  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const data = await getOneEquipmentById(id);
      if (!lock) {
        setEquipment(data);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, [id]);

  const handleUpdateEquipment = async (equipment) => {
    setMutating(true);
    await updateEquipment(id, equipment);
    setMutating(false);
    navigate("/equipments");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <EquipmentForm
      equipment={equipment}
      onSave={handleUpdateEquipment}
      disabled={mutating}
      onCancel={() => navigate("/")}
    />
  );
};

export default EquipmentUpdater;
