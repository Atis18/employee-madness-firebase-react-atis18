import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import EmployeeForm from "../Components/EmployeeForm";
import Loading from "../Components/Loading";
import { getOneEmployeeById, updateEmployee } from "../client/employees";

const EmployeeUpdater = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    let lock = false;

    setLoading(true);
    (async () => {
      const data = await getOneEmployeeById(id);
      if (!lock) {
        setEmployee(data);
        setLoading(false);
      }
    })();

    return () => {
      lock = true;
    };
  }, [id]);

  const handleUpdateEmployee = async (employee) => {
    setMutating(true);
    await updateEmployee(id, employee);
    setMutating(false);
    navigate("/list");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <EmployeeForm
      employee={employee}
      onSave={handleUpdateEmployee}
      disabled={mutating}
      onCancel={() => navigate("/")}
    />
  );
};

export default EmployeeUpdater;
