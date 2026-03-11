import { useState } from "react";

const EmployeePromotion = ({ employee, onLevelChange }) => {
  const [level, setLevel] = useState();

  const handleChange = (e) => {
    setLevel(e.target.value);
  };

  const handlePromote = () => {
    onLevelChange(employee.id, level);
  }


  return (
    <div style={{ backgroundColor: "#EADDCA", marginTop: "5px", marginBottom: "5px" }}>
      <p>{employee.fullName}</p>
      <p>{employee.level}</p>
      <label htmlFor="level"></label>
      <select defaultValue={employee.level} value={level} onChange={handleChange} name="level" id="level">
        <option value="Junior">Junior</option>
        <option value="Medior">Medior</option>
        <option value="Senior">Senior</option>
        <option value="Expert">Expert</option>
        <option value="Godlike">Godlike</option>
      </select>
      <button onClick={handlePromote}>Promote</button>
    </div>
  )
}

export default EmployeePromotion;