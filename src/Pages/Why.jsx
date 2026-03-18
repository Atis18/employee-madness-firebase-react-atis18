import EmployeeNameChange from "../Components/EmployeeNameChange";
import { getAllEmployees, updateEmployee } from "../client/employees";
import { useState, useEffect } from "react";

const Why = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    let lock = false;

    (async () => {
      const list = await getAllEmployees();
      if (!lock) {
        setEmployees(list);
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  const onSave = async (employee) => {
    await updateEmployee(employee.id, employee);
  }

  return (
    <>
      {
        employees.map((employee) => (<EmployeeNameChange key={employee.id} employee={employee} handleSave={onSave} />))
      }
    </>
  )
};

export default Why