import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { getAllEmployees } from "../client/employees";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [sortedEmployees, setSortedEmployees] = useState([]);
  const [sortConfig, setSortConfig] = useState({ sortBy: "firstName", order: "asc" });
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
    const position = formData.get("positionInput");
    const level = formData.get("levelInput");

    const filtered = employees.filter(emp =>
      emp.position.toLowerCase().includes(position.trim().toLowerCase()) &&
      emp.level.toLowerCase().includes(level.trim().toLowerCase())
    );
    setFilteredEmployees(filtered);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updateConfig = {
      ...sortConfig,
      [name]: value
    }
    setSortConfig(updateConfig);
  };

  useEffect(() => {
    if (!sortConfig.sortBy) return;

    const listToSort = [...(filteredEmployees.length ? filteredEmployees : employees)];

    function nameToArray(obj) {
      return obj.name.split(" ");
    }

    const compareStrings = (a, b) => sortConfig.order === "asc" ? a.localeCompare(b) : b.localeCompare(a);

    let sorted;

    if (sortConfig.sortBy === "firstName") {
      sorted = listToSort.sort((a, b) =>
        compareStrings(
          nameToArray(a)[0].toLowerCase(),
          nameToArray(b)[0].toLowerCase()
        )
      );
    } else if (sortConfig.sortBy === "middleName") {
      sorted = listToSort.sort((a, b) => {
        const aArr = nameToArray(a);
        const bArr = nameToArray(b);

        const aHasMiddle = aArr.length > 2;
        const bHasMiddle = bArr.length > 2;

        if (aHasMiddle && !bHasMiddle) return -1;
        if (!aHasMiddle && bHasMiddle) return 1;

        if (aHasMiddle && bHasMiddle) {
          return compareStrings(aArr[1].toLowerCase(), bArr[1].toLowerCase());
        }

        return 0;
      });
    } else if (sortConfig.sortBy === "lastName") {
      sorted = listToSort.sort((a, b) => {
        const aArr = nameToArray(a);
        const bArr = nameToArray(b);

        return compareStrings(
          aArr[aArr.length - 1].toLowerCase(),
          bArr[bArr.length - 1].toLowerCase()
        )
      });
    } else {
      sorted = listToSort.sort((a, b) => {
        const valueA = a[sortConfig.sortBy];
        const valueB = b[sortConfig.sortBy];
        if (!valueA || !valueB) return 0;
        return compareStrings(valueA, valueB);
      });
    }

    setSortedEmployees(sorted);
  }, [sortConfig, employees, filteredEmployees]);

  if (loading) {
    return <Loading />;
  }

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
            <option value="firstName">First name</option>
            <option value="middleName">Middle name</option>
            <option value="lastName">Last name</option>
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
      <EmployeeTable onDelete={deleteEmployee} employees={sortedEmployees} />
    </>
  );
};

export default EmployeeList;
