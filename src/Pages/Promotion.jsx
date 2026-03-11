import Loading from "../Components/Loading";
import EmployeePromotion from "../Components/EmployeePromotion";
import { updateEmployee, getAllEmployees } from "../client/employees";
import { useState, useEffect } from "react";

const Promotion = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const handleUpdateEmployee = async (id, level) => {
    await updateEmployee(id, { level });

    setEmployees(prev =>
      prev.map(emp =>
        emp.id === id ? { ...emp, level } : emp
      )
    );

  };

  if (loading) return <Loading />;
  return (
    <>
      {employees.map((employee, i) => (
        <EmployeePromotion
          key={i}
          employee={employee}
          onLevelChange={handleUpdateEmployee}
        />
      ))}
    </>
  )

}

export default Promotion;