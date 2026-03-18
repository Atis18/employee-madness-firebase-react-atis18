import { useState, useEffect } from "react";
import { getAllEquipments } from "../client/equipments";

const EquipmentInventory = () => {
  const [equipments, setEquipments] = useState([]);
  const [filteredEquipments, setfilteredEquipments] = useState([]);
  const [isFiltered, setIsFiltered] = useState(false);
  const [config, setConfig] = useState('');

  useEffect(() => {
    let lock = false;

    (async () => {
      const list = await getAllEquipments();
      if (!lock) {
        setEquipments(list);
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  const handleFilter = () => {
  if (config === '') {
    setIsFiltered(false);
    setfilteredEquipments([]);
    return;
  }

  const updated = equipments.filter(equip => equip.type === config);
  setfilteredEquipments(updated);
  setIsFiltered(true);
};

  const show = isFiltered ? filteredEquipments : equipments;
  return (
    <>
      <select value={config} onChange={e => setConfig(e.target.value)}>Filter by Type
        <option value="">All</option>
        <option value="Laptop">Laptop</option>
        <option value="Phone">Phone</option>
        <option value="Monitor">Monitor</option>
        <option value="Tablet">Tablet</option>
      </select>
      <button onClick={handleFilter}>Filter</button>
      {show.map((equip, index) => {
        return (
          <div key={index} style={{ borderStyle: 'solid', margin: '5px', padding: '10px' }}>
            <p>{equip.name}</p>
            <p>{equip.type}</p>
          </div>
        )
      })}
    </>
  )

}

export default EquipmentInventory;