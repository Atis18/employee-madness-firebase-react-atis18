import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { getAllEmployees } from "../client/employees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "name.firstName", order: "asc" });
  const [loading, setLoading] = useState(true);

  /* PAGINATION */
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = sortedEmployees.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEmployees.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  /* PAGINATION */

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
    const position = formData.get("positionInput");
    const level = formData.get("levelInput");

    const filtered = employees.filter(emp =>
      emp.position.toLowerCase().includes(position.trim().toLowerCase()) &&
      emp.level.toLowerCase().includes(level.trim().toLowerCase())
    );
    setFilteredEmployees(filtered);
    setCurrentPage(1);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateConfig = {
      ...sortConfig,
      [name]: value
    }
    setSortConfig(updateConfig);
  };

  const handleSort = (column) => {
    if (sortConfig.sortBy === column) {
      setSortConfig({
        ...sortConfig,
        order: sortConfig.order === "asc" ? "desc" : "asc",
      });
    } else {
      setSortConfig({
        sortBy: column,
        order: "asc",
      });
    }
  };

  useEffect(() => {
    if (!sortConfig.sortBy) return;
    const listToSort = filteredEmployees.length > 0 ? filteredEmployees : employees;

    const getValue = (obj, path) => path.split(".").reduce((acc, key) => acc?.[key], obj);

    const direction = sortConfig.order === "asc" ? 1 : -1;

    const sorted = [...listToSort].sort((a, b) => {
      let valueA = getValue(a, sortConfig.sortBy);
      let valueB = getValue(b, sortConfig.sortBy);

      if (valueA == null && valueB == null) return 0;
      if (valueA == null) return 1;
      if (valueB == null) return -1;

      if (typeof valueA === "number" && typeof valueB === "number") {
        return (valueA - valueB) * direction;
      }

      return valueA.toString().toLowerCase().localeCompare(valueB.toString().toLowerCase()) * direction;
    });

    setSortedEmployees(sorted);
  }, [sortConfig, employees, filteredEmployees])

  if (loading) return <Loading />;

  return (
    <>
      <form className="mb-3 w-100" onSubmit={filterEmployees}>
        <div className="d-flex flex-column gap-2">
          <div className="form-floating flex-fill">
            <input type="text" className="form-control" name="positionInput" placeholder="Position" />
            <label>Position</label>
          </div>

          <div className="form-floating flex-fill">
            <input type="text" className="form-control" name="levelInput" placeholder="Level" />
            <label>Level</label>
          </div>
        </div>


        <div className="d-flex flex-column gap-2 mb-3">
          <label>Order By</label>
          <select className="form-control" name="sortBy" value={sortConfig.sortBy} onChange={handleChange}>
            <option value="name.firstName">First name</option>
            <option value="name.middleName">Middle name</option>
            <option value="name.lastName">Last name</option>
            <option value="position">Position</option>
            <option value="level">Level</option>
          </select >
          <label>Direction</label>
          <select className="form-control" name="order" value={sortConfig.order} onChange={handleChange}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select >
        </div>
        <button type="submit" className="btn btn-primary mt-2">
          Search
        </button>
      </form>
      <EmployeeTable onDelete={deleteEmployee} employees={currentEmployees} onSort={handleSort} sortConfig={sortConfig}/>

      <div className="d-flex justify-content-center mt-3 gap-2">
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`btn ${currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"}`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="btn btn-outline-primary"
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          Next
        </button>
      </div>

    </>
  );
};

export default EmployeeList;
