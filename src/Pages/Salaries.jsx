import { useState, useEffect } from "react";
import { getAllEmployees, employeesFilteredBySalary } from "../client/employees";
import Loading from "../Components/Loading";

const Salaries = () => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const salary = formData.get("salary");
    let lock = false;

    setLoading(true);

    (async () => {
      const list = await employeesFilteredBySalary(salary);
      if (!lock) {
        setEmployees(list);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  };

  if (loading) return <Loading />;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Salary at most</label>
        <input name="salary" type="number" />
        <button>Filter</button>
      </form>
      {employees.map((employee, i) => (
        <div key={i} style={{ borderStyle: "solid", borderWidth: "1px", margin: "5px" }}>
          <p>{employee.fullName}</p>
          <p>Salary:{ }</p>
        </div>))}
    </>
  )
}

export default Salaries;