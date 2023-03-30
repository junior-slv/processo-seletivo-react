import React, { useEffect, useState } from "react";
import "./Login.css";
import LoginInput, { email } from "../../components/Login/EmailInput";
import PasswordInput, { password } from "../../components/Login/PasswordInput";
import { Link } from "react-router-dom";

const Login = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [themeToggle, setThemeToggle] = useState(false);
  const sendLogin = () => {
    if (email === "admin" && password === "admin") {
      setIsAuthenticated(true);
    } else {
      return;
    }
  };

  useEffect(() => {
    setIsAuthenticated(false);
  }, []);

  return (
    <div className={themeToggle ? "login-container-dark" : "login-container"}>
      <div className="login-box ">
        <div style={{ textAlign: "center", fontWeight: "600" }}>
          <h1>
            Painel <br /> Acadêmico
          </h1>
        </div>
        <div className="login-email flex-center_column">
          <h3>Insira seu email</h3>
          <LoginInput />
        </div>
        <div className="login-password flex-center_column">
          <h3>Insira sua senha</h3>
          <PasswordInput />
        </div>
        <div className="login-button">
          <Link to={isAuthenticated ? "/dashboard" : "/"}>
            {" "}
            <input onClick={sendLogin} type="button" value="ENVIAR >" />
          </Link>
        </div>
        <i
          onClick={() => setThemeToggle(!themeToggle)}
          className="bx bx-sun"
        ></i>
      </div>
    </div>
  );
};
export default Login;
