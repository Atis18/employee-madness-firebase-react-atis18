import { useState } from "react";

const EmployeeNameChange = ({ employee, handleSave }) => {
  const [name, setName] = useState(employee.fullName)
  const [clicked, setClicked] = useState(false);

  const changeName = () => {
    setClicked(true)
  }

  const saveChange = () => {
    handleSave({ ...employee, fullName: name })
    setClicked(false)
  }

  return (
    <div>
      {clicked ?
        <label >Name:
          <input type="text" onChange={(e) => setName(e.target.value)} value={name} />
          <button onClick={saveChange}>Save Change</button>
        </label>
        :
        <p style={{ color: 'red', fontSize: '1rem' }}>{`${name}`}</p>}
      <p>{employee.position}</p>
      <button onClick={changeName}>Change Name</button>
    </div>
  )
}

export default EmployeeNameChange;