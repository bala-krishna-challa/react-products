import React, { useContext, useEffect, useState } from "react";
import "./register.css";
import {
  validateConfirmPassword,
  validateEmail,
  validateName,
  validatePassword,
} from "../util";
import {
  CONFIRM_PASSWORD_ERROR_MESSAGE,
  EMAIL_ERROR_MESSAGE,
  NAME_ERROR_MESSAGE,
  PASSWORD_ERROR_MESSAGE,
  TOKEN,
} from "../constants";
import { Field, FormData } from "../components/Form/Form";
import FormFields from "../components/Form/FormFields";
import useHttp from "../custom-hooks/useHttp";
import Model from "../Model/Model";
import InfoContext from "../contexts/InfoContext";

interface Data extends FormData {
  name: string;
  emailId: string;
  password: string;
  confirmPassword: string;
}

const fields: Field[] = [
  {
    name: "name",
    placeHolder: "Enter your name",
    type: "text",
    validators: [{ message: NAME_ERROR_MESSAGE, validator: validateName }],
  },
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

const defaultErrorData: Data = {
  name: "",
  emailId: "",
  password: "",
  confirmPassword: "",
};
const defaultFormData: Data = {
  name: "",
  emailId: "",
  password: "",
  confirmPassword: "",
};

interface Props {
  onUserCreation: () => void;
}

interface ResponseType {
  message: string;
}

const Register = ({ onUserCreation }: Props) => {
  const { info } = useContext(InfoContext);
  const [formData, setFormData] = useState(defaultFormData);
  const [errorData, setErrorData] = useState(defaultErrorData);
  const { loading, errorMessage, statusCode, initiateRequest } =
    useHttp<ResponseType>({
      uri: "users/register",
      method: "POST",
      isLazy: true,
    });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
    setErrorData({ ...errorData, [event.target.name]: "" });
  };

  const validateField = (
    event: React.FocusEvent<HTMLInputElement, Element>
  ) => {
    const field = fields.find((f) => f.name === event.target.name);
    if (field.validators && field.validators.length > 0) {
      const errorMessages = field.validators.map((validator) => {
        if (!validator.validator(formData[event.target.name])) {
          return validator.message;
        }

        return "";
      });

      const errorMessage = errorMessages.join("; ");
      setErrorData({ ...errorData, [event.target.name]: errorMessage });
    }
  };

  const handleConfirmPassword = () => {
    const { confirmPassword, password } = formData;
    if (!validateConfirmPassword(confirmPassword, password)) {
      setErrorData({
        ...errorData,
        confirmPassword: CONFIRM_PASSWORD_ERROR_MESSAGE,
      });
    }
  };

  const isValid = () => {
    return true;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { name, emailId, password, confirmPassword } = formData;

    // WE MUST VALIDATE BEFORE SENDING INFORMATION TO SERVER

    if (!isValid()) {
      return;
    }

    initiateRequest({ name, emailId, password });
  };

  useEffect(() => {
    if (statusCode && statusCode.toString().startsWith("2")) {
      setFormData(defaultFormData);
      onUserCreation();
    }
  }, [statusCode]);

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <p>{info}</p>
      <form className="form" onSubmit={handleSubmit}>
        <FormFields
          fields={fields}
          handleChange={handleChange}
          validateField={validateField}
          formData={formData}
          errorData={errorData}
        />
        <div>
          <input
            name="confirmPassword"
            type="text"
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleChange}
            onBlur={handleConfirmPassword}
          />
          {errorData.confirmPassword && (
            <p style={{ color: "red" }}>{errorData.confirmPassword}</p>
          )}
        </div>
        <div className="actions">
          <button type="submit">Submit</button>
        </div>
      </form>
      {loading && <Model />}
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default Register;
