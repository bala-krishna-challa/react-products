import React, { useState } from "react";
import './register.css'
import { validateConfirmPassword, validateEmail, validateName, validatePassword } from "../util";
import { CONFIRM_PASSWORD_ERROR_MESSAGE, EMAIL_ERROR_MESSAGE, NAME_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from "../constants";
import { Field, FormData } from "../components/Form/Form";
import FormFields from "../components/Form/FormFields";



interface Data extends FormData {
    name: string;
    emailId: string;
    password: string;
    confirmPassword: string;
}

const fields: Field[] = [
    { name: 'name', placeHolder: 'Enter your name', type: "text", validators: [{message: NAME_ERROR_MESSAGE, validator: validateName}] }, 
    { name: 'emailId', placeHolder: 'Enter emailId', type: "email", validators: [{message: EMAIL_ERROR_MESSAGE, validator: validateEmail}] }, 
    { name: 'password', placeHolder: 'Enter password', type: "password", validators: [{message: PASSWORD_ERROR_MESSAGE, validator: validatePassword}] } 
];


const defaultErrorData:Data = {name: '', emailId: '', password: '', confirmPassword: ''};
const defaultFormData:Data = {name: '', emailId: '', password: '', confirmPassword: ''};

const Register = () => {
    const [formData, setFormData] = useState(defaultFormData);
const [errorData, setErrorData] = useState(defaultErrorData);

const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({...formData, [event.target.name]: event.target.value});
    setErrorData({...errorData, [event.target.name]: ''});
}

const validateField = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const field = fields.find(f => f.name === event.target.name);
    if(field.validators && field.validators.length > 0) {
        const errorMessages = field.validators.map(validator => {
            if(!validator.validator(formData[event.target.name])) {
                return validator.message;
            }

            return '';
        });

        const errorMessage = errorMessages.join('; ');
        setErrorData({...errorData, [event.target.name]: errorMessage});
    }
}

const handleConfirmPassword = () => {
    const {confirmPassword, password} = formData;
    if(!validateConfirmPassword(confirmPassword, password)) {
        setErrorData({...errorData, confirmPassword: CONFIRM_PASSWORD_ERROR_MESSAGE});
    }
}

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Register details', formData);
}
     
    return <div className="container">
    <h2 className="header">Register</h2>
    <form className="form" onSubmit={handleSubmit}>
        {/* {fields.map(field => {
            return <div key={field.name}>
                <input name={field.name} type={field.type} placeholder={field.placeHolder} value={formData[field.name]} onChange={handleChange} onBlur={validateField}/>
                {errorData[field.name] && <p style={{color: 'red'}}>{errorData[field.name]}</p>}
            </div>
        })} */}
        <FormFields fields={fields} handleChange={handleChange} validateField={validateField} formData={formData} errorData={errorData} />
        <div>
                <input name="confirmPassword" type="text" placeholder="Confirm password" value={formData.confirmPassword} onChange={handleChange} onBlur={handleConfirmPassword}/>
                {errorData.confirmPassword && <p style={{color: 'red'}}>{errorData.confirmPassword}</p>}
            </div>
        <div className="actions"><button type="submit">Submit</button></div>
    </form>
</div>
}

export default Register;
