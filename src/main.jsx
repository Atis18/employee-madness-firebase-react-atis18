import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from "./Pages/Layout";
import ErrorPage from "./Pages/ErrorPage";
import Home from "./Pages/Home";
import EmployeeList from "./Pages/EmployeeList";
import EmployeeCreator from "./Pages/EmployeeCreator";
import EmployeeUpdater from "./Pages/EmployeeUpdater";
import SearchList from "./Pages/SearchList";
import EquipmentList from "./Pages/EquipmentList";
import EquipmentCreator from "./Pages/EquipmentCreator";
import EquipmentUpdater from "./Pages/EquipmentUpdater";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";

import Protected from "./Components/Protected";
import GuestsOnly from "./Components/GuestsOnly";
import AuthProvider from "./Context/AuthProvider";

import "./index.scss";

import Why from "./Pages/Why";
import OfficeLibrary from "./Pages/OfficeLibrary";
import EmployeeEquipmentAssigment from "./Pages/EmployeeEquipmentAssigment";

/* Create a new page, where all employees are listed. Each employee is displayed on a “card”. A card contains the employee’s name and their position. The name is 1rem large and its color is red. The position is displayed under the name as normal text.

Add a “Change Name” button to the employee card. If the user clicks on it, the name of the employee is changed to a text input field with the label “Name“. The input field is filled with the current name of the employee. A Save button is also displayed next to the input field.

If the user clicks on the Save button, the new name is saved to the database, and if the saving is successful, the input field is changed back to the text version of the employee name.

Hint: it is easier to implement the feature if the Employee is a separate component. */

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home />, },

      { path: "/list", element: <Protected> <EmployeeList /> </Protected> },
      { path: "/createEmployee", element: <Protected> <EmployeeCreator /> </Protected> },
      { path: "/updateEmployee/:id", element: <Protected> <EmployeeUpdater /> </Protected> },
      
      { path: "/library", element: <Protected> <OfficeLibrary /> </Protected> },
      { path: "/equipmentAssignment", element: <Protected> <EmployeeEquipmentAssigment /> </Protected> },
      { path: "/why", element: <Protected> <Why /> </Protected> },

      { path: "/employees/:search?", element: <Protected> <SearchList /> </Protected> },

      { path: "/equipments", element: <Protected> <EquipmentList /> </Protected> },
      { path: "/createEquipment", element: <Protected> <EquipmentCreator /> </Protected> },
      { path: "/updateEquipment/:id", element: <Protected> <EquipmentUpdater /> </Protected> },

      { path: "/sign-in", element: <GuestsOnly> <SignIn /> </GuestsOnly> },
      { path: "/sign-up", element: <GuestsOnly> <SignUp /> </GuestsOnly> }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);
