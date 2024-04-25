import React, { useState } from "react";
import { validateEmail, validatePassword } from "../util";
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  TOKEN,
} from "../constants";
import Form, { FormData, Field } from "../components/Form/Form";
import Register from "../Register/Register";

interface LoginFormData extends FormData {
  emailId: string;
  password: string;
}

const fields: Field[] = [
  {
    name: "emailId",
    placeHolder: "Enter emailId",
    type: "email",
    validators: [{ message: EMAIL_ERROR_MESSAGE, validator: validateEmail }],
  },
  {
    name: "password",
    placeHolder: "Enter password",
    type: "password",
    validators: [
      { message: PASSWORD_ERROR_MESSAGE, validator: validatePassword },
    ],
  },
];

interface Props {
  onUserLogin: (val: boolean) => void;
}

const Login = ({ onUserLogin }: Props) => {
  const handleSubmit = async ({ emailId, password }: LoginFormData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ emailId, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.status.toString().startsWith("2")) {
        console.log(TOKEN, data.body.token);
        sessionStorage.setItem(TOKEN, data.body.token);
        onUserLogin(true);
      } else {
        console.log("error", data.body.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return <Form title="Login" fields={fields} onSubmit={handleSubmit} />;
};

export default Login;
