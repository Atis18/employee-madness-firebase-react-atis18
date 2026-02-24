import Loading from "../Components/Loading";
import { useState } from "react";
import EmployeeTable from "../Components/EmployeeTable";
import { searchEmployees } from "../client/employees";

const SearchList = () => {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const deleteEmployee = (id) =>
    setEmployees((employees) =>
      employees.filter((employee) => employee.id !== id)
    );

  const onSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    setLoading(true);

    try {
      const employee = await searchEmployees(search);
      console.log(employee)
      setEmployees(employee);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <>
      <form className="mb-3 w-100" onSubmit={onSearch}>
        {console.log(search)}
        <div className="d-flex flex-column gap-2">
          <div className="form-floating flex-fill">
            <input type="text" className="form-control" placeholder="Name" value={search} onChange={(e) => setSearch(e.target.value)} />
            <label>Name:</label>
          </div>
        </div>

        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <EmployeeTable onDelete={deleteEmployee} employees={employees} />
    </>
  );
}

export default SearchList;