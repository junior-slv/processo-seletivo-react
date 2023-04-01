import React, { useState } from "react";
import validator from "validator";
import "./loginInput.css";
export var user: string;
const LoginInput = () => {
  const [userError, setUserError] = useState("");
  const validateEmail = (e: React.FormEvent<HTMLInputElement>) => {
    user = e.currentTarget.value;
    
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
      <span>{userError}</span>
    </div>
  );
};

export default LoginInput;
