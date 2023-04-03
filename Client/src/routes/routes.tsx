import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./privateRoutes";
import Salas from "../pages/Salas/Salas";
import Colegio from "../pages/Colegio/Colegio";
import Usuarios from "../pages/Usuarios/Usuarios";
import Professores from "../pages/Professores/Professores";
const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
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
        <Route
          path="/professores"
          element={
            <PrivateRoutes>
              <Professores />
            </PrivateRoutes>
          }
        />
        <Route
          path="/usuarios"
          element={
            <PrivateRoutes>
              <Usuarios />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
