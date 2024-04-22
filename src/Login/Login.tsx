import React, { useState } from "react";
import { validateEmail, validatePassword } from "../util";
import { EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from "../constants";
import Form, {FormData, Field} from "../components/Form/Form";

interface LoginFormData extends FormData {
    emailId: string;
    password: string;
}

const fields: Field[] = [{ name: 'emailId', placeHolder: 'Enter emailId', type: "email", validators: [{message: EMAIL_ERROR_MESSAGE, validator: validateEmail}] }, 
{ name: 'password', placeHolder: 'Enter password', type: "password", validators: [{message: PASSWORD_ERROR_MESSAGE, validator: validatePassword}] }];

const Login = () => {
    const handleSubmit = async ({emailId, password}: LoginFormData) => {
        // fetch('http://localhost:5000/auth/login', {
        //     method: 'POST',
        //     body: JSON.stringify({emailId, password}),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json())
        // .then(res => console.log('data' ,res))
        // .catch(err => console.log('error', err));
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
            method: 'POST',
            body: JSON.stringify({emailId, password}),
            headers: {
                'Content-Type': 'application/json'
            }
             });

            const data = await response.json();
            console.log('data' ,data)
        } catch (err) {
            console.log('error', err)
        }
    }

    return <Form title="Login" fields={fields} onSubmit={handleSubmit} />
}

export default Login;