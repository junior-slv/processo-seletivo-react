import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./privateRoutes";
import Salas from '../pages/Salas/Salas';
import Colegio from '../pages/Colegio/Colegio';
const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dash"
          element={
            <PrivateRoutes>
              <Dashboard />
            </PrivateRoutes>
          }
        />
                <Route
          path="/salas"
          element={
            <PrivateRoutes>
              <Salas />
            </PrivateRoutes>
          }
        />
                <Route
          path="/colegio"
          element={
            <PrivateRoutes>
              <Colegio />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
