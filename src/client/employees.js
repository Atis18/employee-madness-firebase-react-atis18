import auth from "../firebase/auth";

const BASE_URL = `${import.meta.env.VITE_FB_DATABASE_URL}/employees`;

const getToken = () => auth?.currentUser?.accessToken ?? "";

const getUriForList = () => `${BASE_URL}/list.json?auth=${getToken()}`;

const getUriForOne = (id) => `${BASE_URL}/list/${id}.json?auth=${getToken()}`;

const _time = (time) => new Date(time).getTime();

export const getAllEmployees = async () => {
  const response = await fetch(getUriForList());
  const employees = await response.json();

  // Mapping the id-s into the response array
  return Object.keys(employees ?? {})
    .map((key) => ({
      id: key,
      ...employees[key],
    }))
    .toSorted((a, b) => _time(b.created) - _time(a.created));
};

export const getOneEmployeeById = async (id) => {
  const response = await fetch(getUriForOne(id));
  const employee = await response.json();
  return employee;
};

export const updateEmployee = async (id, data) => {
  const response = await fetch(getUriForOne(id), {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Update operation failed");
  }

  return response;
};

export const deleteEmployee = async (id) => {
  const response = await fetch(getUriForOne(id), {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Delete operation failed");
  }

  return response;
};

export const createEmployee = async (employee) => {
  const response = await fetch(getUriForList(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...employee, created: Date.now() }),
  });

  if (!response.ok) {
    throw new Error("Create operation failed");
  }

  return await response.json();
};
