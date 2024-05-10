import React, { useContext, useReducer, useState } from "react";
import { useRef } from "react";
import { validateName } from "../util";

const Input = () => {
  const ref = useRef(null);

  const handleNameValidation = () => {
    if (validateName(ref.current.value)) {
      console.log("Success");
    } else {
      console.log("Fail");
      ref.current.value = "Another data";
    }
  };

  return <input ref={ref} onBlur={handleNameValidation} />;
};

export default Input;
