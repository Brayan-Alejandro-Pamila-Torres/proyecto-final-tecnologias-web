import { useState } from 'react';
import { hasValidationErrors, validateFormValues } from '../utils/validations';

export function useFormValidation(initialValues = {}, validationSchema = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validate = (valuesToValidate = values) => {
    const validationErrors = validateFormValues(valuesToValidate, validationSchema);
    setErrors(validationErrors);
    return validationErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const nextValue = type === 'checkbox' ? checked : value;

    setValues((currentValues) => {
      const nextValues = {
        ...currentValues,
        [name]: nextValue,
      };

      if (touched[name]) {
        const validationErrors = validateFormValues(nextValues, validationSchema);
        setErrors(validationErrors);
      }

      return nextValues;
    });
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((currentTouched) => ({
      ...currentTouched,
      [name]: true,
    }));

    validate(values);
  };

  const setFieldValue = (name, value) => {
    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  const resetForm = (nextValues = initialValues) => {
    setValues(nextValues);
    setErrors({});
    setTouched({});
  };

  const validateAndSubmit = (onValidSubmit) => (event) => {
    event.preventDefault();

    const validationErrors = validate(values);

    if (!hasValidationErrors(validationErrors)) {
      onValidSubmit(values);
    }
  };

  return {
    values,
    errors,
    touched,
    hasErrors: hasValidationErrors(errors),
    setValues,
    setErrors,
    setTouched,
    setFieldValue,
    handleChange,
    handleBlur,
    validate,
    resetForm,
    validateAndSubmit,
  };
}
