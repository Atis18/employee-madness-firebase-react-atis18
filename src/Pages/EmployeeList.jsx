import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { getAllEmployees } from "../client/employees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState(null);
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

  const filterEmployees = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const position = formData.get("position");
    const level = formData.get("level");

    const filtered = employees.filter(emp =>
      emp.position.toLowerCase().includes(position.trim().toLowerCase()) &&
      emp.level.toLowerCase().includes(level.trim().toLowerCase())
    );
    setFilteredEmployees(filtered);
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <form className="d-flex gap-2 mb-3" onSubmit={filterEmployees}>
        <input type="text" className="form-control" name="position" placeholder="Position" />
        <input type="text" className="form-control" name="level" placeholder="Level" />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
      <EmployeeTable onDelete={deleteEmployee} employees={filteredEmployees || employees} />
    </>
  );
};

export default EmployeeList;
