import React, { useState } from "react";
import validator from "validator";
import "./loginInput.css";
export var email: string;
const LoginInput = () => {
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    email = e.currentTarget.value;
    
    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Insira um email válido!");
    }
  };
  return (
    <div className="email-container">
      <div className="email-input">
              <i className="bx bx-envelope" />
      <input
        type="text"
        id="userEmail"
        placeholder="Insira seu email"
        onChange={(e) => validateEmail(e)}
      ></input>{" "}
      <br />

      </div>
      <span>{emailError}</span>
    </div>
  );
};

export default LoginInput;
