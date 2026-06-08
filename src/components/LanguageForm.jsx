import { useState } from 'react';
import { useCV } from '../hooks/useCV';
import { useFormValidation } from '../hooks/useFormValidation';
import {
  hasValidationErrors,
  validateRequired,
  validateTextLength,
} from '../utils/validations';

const emptyLanguage = {
  name: '',
  level: '',
  description: '',
};

function LanguageForm() {
  const { languages, addLanguage, updateLanguage, deleteLanguage } = useCV();
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormValidation(emptyLanguage);

  const validateLanguage = (languageValues) => {
    const validationErrors = {};

    const nameError =
      validateRequired(languageValues.name) ||
      validateTextLength(languageValues.name, {
        min: 2,
        max: 60,
        fieldName: 'El idioma',
      });

    const levelError =
      validateRequired(languageValues.level) ||
      validateTextLength(languageValues.level, {
        min: 2,
        max: 60,
        fieldName: 'El nivel',
      });

    const descriptionError = validateTextLength(languageValues.description, {
      max: 220,
      fieldName: 'La descripcion o certificacion',
    });

    if (nameError) {
      validationErrors.name = nameError;
    }

    if (levelError) {
      validationErrors.level = levelError;
    }

    if (descriptionError) {
      validationErrors.description = descriptionError;
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateLanguage(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    const languageData = {
      name: values.name.trim(),
      level: values.level.trim(),
      description: values.description.trim(),
    };

    if (editingIndex === null) {
      addLanguage(languageData);
    } else {
      updateLanguage(editingIndex, languageData);
      setEditingIndex(null);
    }

    resetForm(emptyLanguage);
  };

  const handleEdit = (index) => {
    const language = languages[index];

    setEditingIndex(index);
    setErrors({});
    setValues({
      name: language.name || '',
      level: language.level || '',
      description: language.description || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetForm(emptyLanguage);
  };

  const handleDelete = (index) => {
    deleteLanguage(index);

    if (editingIndex === index) {
      handleCancelEdit();
    }
  };

  const renderError = (fieldName) => {
    if (!errors[fieldName]) {
      return null;
    }

    return <p className="form-error">{errors[fieldName]}</p>;
  };

  return (
    <section className="language-form-section">
      <form className="language-form" onSubmit={handleSubmit} noValidate>
        <h2>Idiomas</h2>

        <label>
          Idioma
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Ingles"
          />
          {renderError('name')}
        </label>

        <label>
          Nivel
          <input
            type="text"
            name="level"
            value={values.level}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. B2, Avanzado, Nativo"
          />
          {renderError('level')}
        </label>

        <label>
          Descripcion o certificacion opcional
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Certificacion TOEFL o experiencia profesional."
            rows="3"
          />
          {renderError('description')}
        </label>

        <button type="submit">
          {editingIndex === null ? 'Agregar idioma' : 'Guardar cambios'}
        </button>

        {editingIndex !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar edicion
          </button>
        )}
      </form>

      <div className="language-list">
        {languages.length === 0 ? (
          <p>Aun no hay idiomas registrados.</p>
        ) : (
          languages.map((language, index) => (
            <article className="language-card" key={`${language.name}-${index}`}>
              <h3>{language.name}</h3>
              <p>{language.level}</p>
              {language.description && <p>{language.description}</p>}
              <div className="language-card-actions">
                <button type="button" onClick={() => handleEdit(index)}>
                  Editar
                </button>
                <button type="button" onClick={() => handleDelete(index)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default LanguageForm;
