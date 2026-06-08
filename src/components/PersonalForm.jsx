import { useState } from 'react';
import { useCV } from '../hooks/useCV';
import { useFormValidation } from '../hooks/useFormValidation';
import {
  validateEmail,
  validateRequired,
  validateTextLength,
  validateUrl,
} from '../utils/validations';

const personalValidationSchema = {
  name: [
    validateRequired,
    (value) => validateTextLength(value, { min: 3, max: 80, fieldName: 'El nombre completo' }),
  ],
  profession: [
    validateRequired,
    (value) => validateTextLength(value, { min: 3, max: 80, fieldName: 'La carrera o profesion' }),
  ],
  city: [
    validateRequired,
    (value) => validateTextLength(value, { min: 2, max: 80, fieldName: 'La ciudad' }),
  ],
  email: [validateRequired, validateEmail],
  phone: [
    validateRequired,
    (value) => validateTextLength(value, { min: 7, max: 20, fieldName: 'El telefono' }),
  ],
  summary: [
    validateRequired,
    (value) => validateTextLength(value, { min: 30, max: 600, fieldName: 'El perfil profesional' }),
  ],
  github: [validateUrl],
  linkedin: [validateUrl],
  portfolio: [validateUrl],
};

function PersonalForm() {
  const { personalInfo, updatePersonalInfo } = useCV();
  const [savedMessage, setSavedMessage] = useState('');

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    validateAndSubmit,
  } = useFormValidation(
    {
      name: personalInfo.name || '',
      profession: personalInfo.profession || '',
      city: personalInfo.city || personalInfo.address || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      summary: personalInfo.summary || '',
      github: personalInfo.github || '',
      linkedin: personalInfo.linkedin || '',
      portfolio: personalInfo.portfolio || '',
    },
    personalValidationSchema
  );

  const handleSubmit = validateAndSubmit((formValues) => {
    updatePersonalInfo(formValues);
    setSavedMessage('Informacion personal guardada correctamente.');
  });

  const renderError = (fieldName) => {
    if (!errors[fieldName]) {
      return null;
    }

    return <p className="form-error">{errors[fieldName]}</p>;
  };

  return (
    <form className="personal-form" onSubmit={handleSubmit} noValidate>
      <h2>Informacion personal</h2>

      <label>
        Nombre completo
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej. Ana Martinez Lopez"
        />
        {renderError('name')}
      </label>

      <label>
        Carrera o profesion
        <input
          type="text"
          name="profession"
          value={values.profession}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej. Desarrolladora Frontend"
        />
        {renderError('profession')}
      </label>

      <label>
        Ciudad
        <input
          type="text"
          name="city"
          value={values.city}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej. Ciudad de Mexico"
        />
        {renderError('city')}
      </label>

      <label>
        Correo
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="correo@ejemplo.com"
        />
        {renderError('email')}
      </label>

      <label>
        Telefono
        <input
          type="tel"
          name="phone"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Ej. 5551234567"
        />
        {renderError('phone')}
      </label>

      <label>
        Perfil profesional
        <textarea
          name="summary"
          value={values.summary}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Describe tu experiencia, enfoque profesional y fortalezas principales."
          rows="5"
        />
        {renderError('summary')}
      </label>

      <label>
        GitHub
        <input
          type="url"
          name="github"
          value={values.github}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://github.com/usuario"
        />
        {renderError('github')}
      </label>

      <label>
        LinkedIn
        <input
          type="url"
          name="linkedin"
          value={values.linkedin}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://linkedin.com/in/usuario"
        />
        {renderError('linkedin')}
      </label>

      <label>
        Portafolio
        <input
          type="url"
          name="portfolio"
          value={values.portfolio}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="https://miportafolio.com"
        />
        {renderError('portfolio')}
      </label>

      <button type="submit">Guardar informacion</button>

      {savedMessage && <p className="form-success">{savedMessage}</p>}
    </form>
  );
}

export default PersonalForm;
