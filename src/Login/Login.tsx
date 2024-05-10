import React, { useEffect, useState } from "react";
import { validateEmail, validatePassword } from "../util";
import {
  EMAIL_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  TOKEN,
} from "../constants";
import Form, { FormData, Field } from "../components/Form/Form";
import Register from "../Register/Register";
import useHttp from "../custom-hooks/useHttp";

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

interface ResponseType {
  token: string;
}

const Login = ({ onUserLogin }: Props) => {
  const { loading, errorMessage, statusCode, data, initiateRequest } =
    useHttp<ResponseType>({
      uri: "auth/login",
      method: "POST",
      isPublic: true,
      isLazy: true,
    });

  const handleSubmit = ({ emailId, password }: LoginFormData) => {
    initiateRequest({ emailId, password });
  };

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2") && data) {
      sessionStorage.setItem(TOKEN, data.token);
      onUserLogin(true);
    }
  }, [statusCode, data]);

  return (
    <Form
      errorMessage={errorMessage}
      isLoading={loading}
      title="Login"
      fields={fields}
      onSubmit={handleSubmit}
    />
  );
};

export default Login;
