import { Link } from "react-router-dom";
import DeleteButton from "./components/DeleteButton";

const EmployeeTable = ({ employees, onDelete }) => (
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Name</th>
        <th>Level</th>
        <th>Position</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {employees.map((employee) => (
        <tr key={employee.id}>
          <td>{employee.name}</td>
          <td>{employee.level}</td>
          <td>{employee.position}</td>
          <td>
            <div className="btn-group">
              <Link to={`/update/${employee.id}`} className="btn btn-primary">
                Update
              </Link>
              <DeleteButton employeeId={employee.id} onDelete={onDelete} />
            </div>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default EmployeeTable;
