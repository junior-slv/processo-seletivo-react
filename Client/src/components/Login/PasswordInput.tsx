import React, { useState } from "react";
import * as Yup from "yup";
export var password: string;
const PasswordInput = () => {
  const [showpassword, setShowpassword] = useState(false);
  const inputPassword = (e: React.FormEvent<HTMLInputElement>) => {
    password = e.currentTarget.value;
  };
  return (
    <div className="password-container">
      <span className="password-input">
        <i className="bx bx-lock-alt" />
        <input
          type={showpassword ? "text" : "password"}
          placeholder="Insira sua senha"
          onChange={(e) => inputPassword(e)}
          id=""
        />
      </span>
      <i
        className="bx bx-show"
        onClick={() => setShowpassword(!showpassword)}
      />
    </div>
  );
};

export default PasswordInput;
