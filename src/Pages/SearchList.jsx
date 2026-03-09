import Loading from "../Components/Loading";
import { useEffect, useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import { searchEmployees } from "../client/employees";
import { useNavigate, useParams } from "react-router-dom";

const SearchList = () => {
  const [employees, setEmployees] = useState([]);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => { 
    navigate(`/employees/${value.trim()}`)
  }, [value])
  const { search } = useParams();

  const deleteEmployee = (id) =>
    setEmployees((employees) =>
      employees.filter((employee) => employee.id !== id)
    );

  const onSearch = async (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    setLoading(true);

    try {
      const employee = await searchEmployees(search);
      setEmployees(employee);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <form className="mb-3 w-100" onSubmit={onSearch}>
        <div className="d-flex flex-column gap-2">
          <div className="form-floating flex-fill">
            <input type="text" className="form-control" placeholder="Name" value={value} onChange={(e) => setValue(e.target.value)} />
            <label>Name:</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      {employees ? <EmployeeTable onDelete={deleteEmployee} employees={employees} /> : <p>Please Search for an employee.</p>}
    </>
  );
}

export default SearchList;