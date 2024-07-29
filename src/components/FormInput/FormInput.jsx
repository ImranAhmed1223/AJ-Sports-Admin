import React from "react";
import "./FormInput.css";
import { ErrorMessage, useField } from "formik";
const FormInput = ({ color, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={field.name} className={`${color}`}>
        {label}
      </label>
      <input
        type="text"
        className={`form-input ${meta.touched && meta.error && "is-invalid"}`}
        {...field}
        {...props}
        autoComplete="off"
      />
      <ErrorMessage component="div" name={field.name} className="form-error" />
    </>
  );
};

export default FormInput;
