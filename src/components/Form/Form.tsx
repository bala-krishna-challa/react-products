import React, { useState } from "react";
import './form.css'
import { validateEmail, validatePassword } from "../../util";
import { EMAIL_ERROR_MESSAGE, PASSWORD_ERROR_MESSAGE } from "../../constants";
import FormFields from "./FormFields";

interface Validator {
    message: string;
    validator: (...args) => boolean;
}



export interface Field {
    name: string, 
    type: string,
    placeHolder: string, 
    defaultValue?: string, 
    validators?: Validator[]
}

interface Data {
    [key:string]: string
}

export interface FormData extends Data {};
export interface ErrorData extends Data {};

interface Props {
    title: string,
    fields: Field[],
    onSubmit: (formData: FormData) => void;
    errorMessage?: string;
}

const getDefaultFormData = (fields: Field[]): FormData => {
    return fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || '';
        return acc;
    }, {})
}

const getDefaultErrorData = (fields: Field[]): ErrorData => {
    return fields.reduce((acc, field) => {
        if(field.validators && field.validators.length > 0) {
            acc[field.name] = '';
        }
       
        return acc;
    }, {})
}

const Form = ({title, fields, onSubmit}: Props) => {
const [formData, setFormData] = useState(() => getDefaultFormData(fields));
const [errorData, setErrorData] = useState(() => getDefaultErrorData(fields));

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

const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    onSubmit(formData);
}

    return <div className="container">
        <h2 className="header">{title}</h2>
        <form className="form" onSubmit={handleSubmit}>
            {/* <label className="label">
                EmailId
                <input name="emailId" type="text" placeholder="Enter emailId" onChange={handleChange} value={formData.emailId} onBlur={validateField} />
            </label>
            {errorData.emailId && <p style={{color: 'red'}}>{errorData.emailId}</p>}
            <label className="label">
                Password
                <input name="password" type="password" placeholder="Enter password" onChange={handleChange} value={formData.password} onBlur={validateField} />
            </label>
            {errorData.password && <p style={{color: 'red'}}>{errorData.password}</p>}
            <div className="actions"><button type="submit">Submit</button></div> */}
            {/* {fields.map(field => {
                return <div key={field.name}>
                    <input name={field.name} type={field.type} placeholder={field.placeHolder} value={formData[field.name]} onChange={handleChange} onBlur={validateField}/>
                    {errorData[field.name] && <p style={{color: 'red'}}>{errorData[field.name]}</p>}
                </div>
            })} */}
            <FormFields fields={fields} handleChange={handleChange} validateField={validateField} formData={formData} errorData={errorData} />
            <div className="actions"><button type="submit">Submit</button></div>
        </form>
    </div>
}

export default Form;