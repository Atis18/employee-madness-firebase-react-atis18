import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EquipmentTable from "../Components/EquipmentTable";
import { getAllEquipments } from "../client/equipments";

const EquipmentList = () => {
  const [equipments, setEquipments] = useState([]);
  const [loading, setLoading] = useState(true);

  const deleteEquipment = (id) =>
    setEquipments((equipments) =>
      equipments.filter((equipment) => equipment.id !== id)
    );

  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const list = await getAllEquipments();
      if (!lock) {
        setEquipments(list);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  if (loading) return <Loading />;

  return <EquipmentTable onDelete={deleteEquipment} equipments={equipments}/>
};

export default EquipmentList;