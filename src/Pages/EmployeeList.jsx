import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { getAllEmployees } from "../client/employees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState(null);
  const [loading, setLoading] = useState(true);

  const deleteEmployee = (id) =>
    setEmployees((employees) =>
      employees.filter((employee) => employee.id !== id)
    );

  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const list = await getAllEmployees();
      if (!lock) {
        setEmployees(list);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable onDelete={deleteEmployee} employees={employees} />;
};

export default EmployeeList;
