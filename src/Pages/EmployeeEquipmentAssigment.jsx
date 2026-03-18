import { useState, useEffect } from "react";
import { getAllEmployees, updateEmployee } from "../client/employees";
import { getAllEquipments } from "../client/equipments";
import EmployeeCard from "../Components/EmployeeCard/EmployeeCard";

const EmployeeEquipmentAssigment = () => {
  const [employees, setEmployees] = useState([]);
  const [equipments, setEquipments] = useState([]);

  useEffect(() => {
    let lock = false;

    (async () => {
      const list = await getAllEmployees();
      const list2 = await getAllEquipments()
      if (!lock) {
        setEmployees(list);
        setEquipments(list2)
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  const saveEquipment = async (employee) => {
    await updateEmployee(employee.id, employee);
    setEmployees(prev => prev.map(emp => emp.id === employee.id ? employee : emp));
  }

  return (
    <>
      {employees.map((employee) => <EmployeeCard key={employee.id} employee={employee} equipments={equipments} onSave={saveEquipment} />)}
    </>
  )
}

export default EmployeeEquipmentAssigment;