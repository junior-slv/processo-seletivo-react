import React, { useState } from "react";
import validator from "validator";
import "./loginInput.css";

const LoginInput = () => {
  const [emailError, setEmailError] = useState("");
  const validateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    var email = e.currentTarget.value;

    if (validator.isEmail(email)) {
      setEmailError(" ");
    } else {
      setEmailError("Insira um email válido!");
    }
  };
  return (
    <div>
      <i className="bx bx-envelope" />
      <input
        type="text"
        id="userEmail"
        placeholder="Insira seu email"
        onChange={(e) => validateEmail(e)}
      ></input>{" "}
      <br />
      <span>{emailError}</span>
    </div>
  );
};

export default LoginInput;
