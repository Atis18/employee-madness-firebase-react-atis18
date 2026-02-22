import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import { createEmployee } from "../client/employees";

const EmployeeCreator = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateEmployee = async (employee) => {
    setLoading(true);
    await createEmployee(employee);
    setLoading(false);
    navigate("/list");
  };

  return (
    <EmployeeForm
      disabled={loading}
      onCancel={() => navigate("/")}
      onSave={handleCreateEmployee}
    />
  );
};

export default EmployeeCreator;
