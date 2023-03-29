import React, { useState } from "react";
import * as Yup from "yup";

const PasswordInput = () => {
  const [showpassword, setShowpassword] = useState(false);

  return (
    <div className="password-container">
      <span>
        <i className="bx bx-lock-alt" />
        <input
          type={showpassword ? "text" : "password"}
          placeholder="Insira sua senha"
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
