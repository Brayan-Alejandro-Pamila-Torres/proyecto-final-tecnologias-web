import { useState } from 'react';
import { useCV } from '../hooks/useCV';
import { useFormValidation } from '../hooks/useFormValidation';
import {
  hasValidationErrors,
  validateRequired,
  validateTextLength,
  validateUrl,
} from '../utils/validations';

const emptyEducation = {
  institution: '',
  program: '',
  period: '',
  description: '',
  evidenceUrl: '',
};

function EducationForm() {
  const { education, addEducation, updateEducation, deleteEducation } = useCV();
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormValidation(emptyEducation);

  const validateEducation = (educationValues) => {
    const validationErrors = {};

    const institutionError =
      validateRequired(educationValues.institution) ||
      validateTextLength(educationValues.institution, {
        min: 3,
        max: 100,
        fieldName: 'La institucion',
      });

    const programError =
      validateRequired(educationValues.program) ||
      validateTextLength(educationValues.program, {
        min: 3,
        max: 120,
        fieldName: 'El programa, curso o certificacion',
      });

    const periodError =
      validateRequired(educationValues.period) ||
      validateTextLength(educationValues.period, {
        min: 4,
        max: 40,
        fieldName: 'El año o periodo',
      });

    const descriptionError = validateTextLength(educationValues.description, {
      max: 400,
      fieldName: 'La descripcion',
    });

    const evidenceUrlError = validateUrl(educationValues.evidenceUrl);

    if (institutionError) {
      validationErrors.institution = institutionError;
    }

    if (programError) {
      validationErrors.program = programError;
    }

    if (periodError) {
      validationErrors.period = periodError;
    }

    if (descriptionError) {
      validationErrors.description = descriptionError;
    }

    if (evidenceUrlError) {
      validationErrors.evidenceUrl = evidenceUrlError;
    }

    return validationErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateEducation(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    const educationData = {
      institution: values.institution.trim(),
      program: values.program.trim(),
      period: values.period.trim(),
      description: values.description.trim(),
      evidenceUrl: values.evidenceUrl.trim(),
    };

    if (editingIndex === null) {
      addEducation(educationData);
    } else {
      updateEducation(editingIndex, educationData);
      setEditingIndex(null);
    }

    resetForm(emptyEducation);
  };

  const handleEdit = (index) => {
    const educationItem = education[index];

    setEditingIndex(index);
    setErrors({});
    setValues({
      institution: educationItem.institution || '',
      program: educationItem.program || '',
      period: educationItem.period || '',
      description: educationItem.description || '',
      evidenceUrl: educationItem.evidenceUrl || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetForm(emptyEducation);
  };

  const handleDelete = (index) => {
    deleteEducation(index);

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
    <section className="education-form-section">
      <form className="education-form" onSubmit={handleSubmit} noValidate>
        <h2>Educacion</h2>

        <label>
          Institucion
          <input
            type="text"
            name="institution"
            value={values.institution}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Universidad Nacional"
          />
          {renderError('institution')}
        </label>

        <label>
          Programa, curso o certificacion
          <input
            type="text"
            name="program"
            value={values.program}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Ingenieria en Sistemas"
          />
          {renderError('program')}
        </label>

        <label>
          Año o periodo
          <input
            type="text"
            name="period"
            value={values.period}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. 2022 - 2026"
          />
          {renderError('period')}
        </label>

        <label>
          Descripcion
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe logros, enfoque o contenido relevante."
            rows="3"
          />
          {renderError('description')}
        </label>

        <label>
          Enlace de evidencia opcional
          <input
            type="url"
            name="evidenceUrl"
            value={values.evidenceUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://..."
          />
          {renderError('evidenceUrl')}
        </label>

        <button type="submit">
          {editingIndex === null ? 'Agregar educacion' : 'Guardar cambios'}
        </button>

        {editingIndex !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar edicion
          </button>
        )}
      </form>

      <div className="education-list">
        {education.length === 0 ? (
          <p>Aun no hay educacion registrada.</p>
        ) : (
          education.map((educationItem, index) => (
            <article className="education-card" key={`${educationItem.institution}-${index}`}>
              <h3>{educationItem.program}</h3>
              <p>{educationItem.institution}</p>
              <p>{educationItem.period}</p>
              {educationItem.description && <p>{educationItem.description}</p>}
              {educationItem.evidenceUrl && (
                <a href={educationItem.evidenceUrl} target="_blank" rel="noreferrer">
                  Ver evidencia
                </a>
              )}
              <div className="education-card-actions">
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

export default EducationForm;
