import React, { useState } from "react";
import "./loginInput.css";
export var user: string;
const LoginInput = () => {
  const [userError, setUserError] = useState("");
  const User = (e: React.FormEvent<HTMLInputElement>) => {
    user = e.currentTarget.value;
    
  };
  return (
    <div className="user-container">
      <div className="user-input">
              <i className="bx bx-user" />
      <input
        type="text"
        id="user"
        placeholder="Insira seu usuário"
        onChange={(e) => User(e)}
      ></input>{" "}
      <br />

      </div>
      <span>{userError}</span>
    </div>
  );
};

export default LoginInput;
