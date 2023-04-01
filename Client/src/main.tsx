
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import router from './routes/routes';
import Rotas from './routes/routes';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Rotas/>
  </React.StrictMode>
);