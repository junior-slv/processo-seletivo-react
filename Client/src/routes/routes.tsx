import {
    createBrowserRouter,
  } from "react-router-dom";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import Colegio from "../pages/Colegio/Colegio";
import Salas from "../pages/Salas/Salas";
  
  
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login/>,
    },
    {
      path: "/dashboard",
      element: <Dashboard/>
    },
    {
      path: "/colegio",
      element: <Colegio/>
    },
    {
      path: "/salas",
      element: <Salas/>
    },
  ]);
  export default router;