import React from "react";
import './form.css'
import { ErrorData, FormData, Field } from "./Form";

interface Props {
    fields: Field[],
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    validateField: (event: React.FocusEvent<HTMLInputElement, Element>) => void,
    formData: FormData,
    errorData: ErrorData
}

const FormFields = ({fields, handleChange, validateField, formData, errorData}: Props) => {

    return <>{fields.map(field => {
        return <div key={field.name}>
            <input name={field.name} type={field.type} placeholder={field.placeHolder} value={formData[field.name]} onChange={handleChange} onBlur={validateField}/>
            {errorData[field.name] && <p style={{color: 'red'}}>{errorData[field.name]}</p>}
        </div>
    })}</>
}

export default FormFields;