import { useState } from "react";

const EmployeeCard = ({ employee, equipments, onSave }) => {
  const [selectedEquipment, setSelectedEquipment] = useState(employee?.equipment?.toLowerCase() || "N/A");

  const handleChange = () => {
    onSave({...employee, equipment: selectedEquipment})
  }

  return (
    <div style={{ borderStyle: 'solid', borderColor: 'gray', padding: '8px', marginBottom: '5px' }}>
      <p>{employee.fullName}</p>
      <p>{employee.equipment}</p>
      <label>Assign equipmnet
        <select className="form-control" name="sortBy" value={selectedEquipment} onChange={(e) => setSelectedEquipment(e.target.value)}>
          <option value="N/A">None</option>
          {equipments.map(equipment => (<option key={equipment.name} value={equipment.name.toLowerCase()}>{equipment.name}</option>))}
        </select >
      </label>
      <button onClick={handleChange}>Assign</button>
    </div>
  )
}

export default EmployeeCard;