import React, { useState } from "react";
import "./Login.css";
import LoginInput from "../../components/Login/EmailInput";
import PasswordInput from "../../components/Login/PasswordInput";
import ButtonInput from "../../components/Login/ButtonInput";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-email">
          <h3>Insira seu email</h3>
          <LoginInput />
        </div>
        <div className="login-password">
          <h3>Insira sua senha</h3>
          <PasswordInput />
        </div>
        <div className="login-button">
          <ButtonInput />
        </div>
      </div>
    </div>
  );
};

export default Login;
