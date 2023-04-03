import React, { useState } from "react";
import "./Login.css";
import LoginInput, { user } from "../../components/Login/EmailInput";
import PasswordInput, { password } from "../../components/Login/PasswordInput";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const url = "http://localhost:3001/api/users/login";
export let isAuth = false;
export let token = "";



const Login = () => {
  const navigate = useNavigate();
  const [themeToggle, setThemeToggle] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendLogin = () => {
    axios
      .post(url, {
        userLogin: `${user}`,
        userPassword: `${password}`,
      })
      .then((res) => {
        let token = res.data.token;
        isAuth = true;
        navigate('/dashboard');
      })
      .catch(function (error) {
        console.log(error);
      });
  
  };

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
            <input onClick={sendLogin} type="button" value="ENVIAR >" />
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
