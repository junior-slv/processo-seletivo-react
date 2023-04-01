import React, { useState } from "react";
import "./Login.css";
import LoginInput, { user } from "../../components/Login/EmailInput";
import PasswordInput, { password } from "../../components/Login/PasswordInput";
import { Link } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:3001/api/users/login";
export let isAuth = false;
export let token = "";

const sendLogin = () => {
  axios
    .post(url, {
      userLogin: `${user}`,
      userPassword: `${password}`,
    })
    .then((res) => {
      let token = res.data.token;
      // Defina o estado do token e autenticação
      isAuth = true;
      console.log(res.data);
      console.log(isAuth);
    })
    .catch(function (error) {
      console.log(error);
    });

  // Verifique o token antes de cada solicitação usando um interceptor do Axios
};

const Login = () => {
  const [themeToggle, setThemeToggle] = useState(false);
  const [loading, setLoading] = useState(false);

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
          <Link to="/dash">
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
