import { useState } from 'react';
import { useCV } from '../hooks/useCV';
import { useFormValidation } from '../hooks/useFormValidation';
import {
  hasValidationErrors,
  validateRequired,
  validateSkillLevel,
  validateTextLength,
  validateUniqueSkill,
} from '../utils/validations';
import SkillCard from './SkillCard';

const emptySkill = {
  name: '',
  category: '',
  level: '',
  description: '',
};

function SkillForm() {
  const { skills, addSkill, updateSkill, deleteSkill } = useCV();
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    resetForm,
  } = useFormValidation(emptySkill);

  const validateSkill = (skillValues) => {
    const validationErrors = {};

    const nameError =
      validateRequired(skillValues.name) ||
      validateTextLength(skillValues.name, { min: 2, max: 60, fieldName: 'El nombre de la habilidad' }) ||
      validateUniqueSkill(skills, skillValues.name, editingIndex);

    const categoryError =
      validateRequired(skillValues.category) ||
      validateTextLength(skillValues.category, { min: 2, max: 60, fieldName: 'La categoria' });

    const levelError = validateRequired(skillValues.level) || validateSkillLevel(skillValues.level);

    const descriptionError = validateTextLength(skillValues.description, {
      max: 180,
      fieldName: 'La descripcion',
    });

    if (nameError) {
      validationErrors.name = nameError;
    }

    if (categoryError) {
      validationErrors.category = categoryError;
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

    const validationErrors = validateSkill(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    const skillData = {
      ...values,
      name: values.name.trim(),
      category: values.category.trim(),
      level: Number(values.level),
      description: values.description.trim(),
    };

    if (editingIndex === null) {
      addSkill(skillData);
    } else {
      updateSkill(editingIndex, skillData);
      setEditingIndex(null);
    }

    resetForm(emptySkill);
  };

  const handleEdit = (index) => {
    const skill = skills[index];

    setEditingIndex(index);
    setErrors({});
    setValues({
      name: skill.name || '',
      category: skill.category || '',
      level: skill.level || '',
      description: skill.description || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    resetForm(emptySkill);
  };

  const handleDelete = (index) => {
    deleteSkill(index);

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
    <section className="skill-form-section">
      <form className="skill-form" onSubmit={handleSubmit} noValidate>
        <h2>Habilidades</h2>

        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. React"
          />
          {renderError('name')}
        </label>

        <label>
          Categoria
          <input
            type="text"
            name="category"
            value={values.category}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. Frontend"
          />
          {renderError('category')}
        </label>

        <label>
          Nivel de dominio
          <input
            type="number"
            name="level"
            min="1"
            max="100"
            value={values.level}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="1 - 100"
          />
          {renderError('level')}
        </label>

        <label>
          Descripcion breve
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe como usas esta habilidad."
            rows="3"
          />
          {renderError('description')}
        </label>

        <button type="submit">
          {editingIndex === null ? 'Agregar habilidad' : 'Guardar cambios'}
        </button>

        {editingIndex !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar edicion
          </button>
        )}
      </form>

      <div className="skill-list">
        {skills.length === 0 ? (
          <p>Aun no hay habilidades registradas.</p>
        ) : (
          skills.map((skill, index) => (
            <SkillCard
              key={`${skill.name}-${index}`}
              skill={skill}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default SkillForm;
