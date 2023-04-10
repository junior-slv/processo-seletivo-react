import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Login from "../pages/Login/Login";
import PrivateRoutes from "./privateRoutes";
import Salas from "../pages/Salas/Salas";
import Colegio from "../pages/Colegio/Colegio";
import Usuarios from "../pages/Usuarios/Usuarios";
import Professores from "../pages/Professores/Professores";
const Rotas = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
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
