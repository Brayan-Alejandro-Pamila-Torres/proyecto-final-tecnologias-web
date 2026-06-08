import { useRef, useState } from 'react';
import { useCV } from '../hooks/useCV';
import { useFormValidation } from '../hooks/useFormValidation';
import {
  hasValidationErrors,
  validateRequired,
  validateTextLength,
  validateUniqueProject,
  validateUrl,
} from '../utils/validations';
import ProjectCard from './ProjectCard';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

const emptyProject = {
  name: '',
  description: '',
  technologies: '',
  repositoryUrl: '',
  deployUrl: '',
  image: '',
};

function ProjectForm() {
  const { projects, addProject, updateProject, deleteProject } = useCV();
  const [editingIndex, setEditingIndex] = useState(null);
  const [imageError, setImageError] = useState('');
  const fileInputRef = useRef(null);

  const {
    values,
    errors,
    setValues,
    setErrors,
    handleChange,
    handleBlur,
    setFieldValue,
    resetForm,
  } = useFormValidation(emptyProject);

  const validateProject = (projectValues) => {
    const validationErrors = {};

    const nameError =
      validateRequired(projectValues.name) ||
      validateTextLength(projectValues.name, { min: 3, max: 80, fieldName: 'El nombre del proyecto' }) ||
      validateUniqueProject(projects, projectValues.name, editingIndex);

    const descriptionError =
      validateRequired(projectValues.description) ||
      validateTextLength(projectValues.description, { min: 20, max: 600, fieldName: 'La descripcion' });

    const technologiesError =
      validateRequired(projectValues.technologies) ||
      validateTextLength(projectValues.technologies, { min: 2, max: 180, fieldName: 'Las tecnologias' });

    const repositoryUrlError = validateUrl(projectValues.repositoryUrl);
    const deployUrlError = validateUrl(projectValues.deployUrl);

    if (nameError) {
      validationErrors.name = nameError;
    }

    if (descriptionError) {
      validationErrors.description = descriptionError;
    }

    if (technologiesError) {
      validationErrors.technologies = technologiesError;
    }

    if (repositoryUrlError) {
      validationErrors.repositoryUrl = repositoryUrlError;
    }

    if (deployUrlError) {
      validationErrors.deployUrl = deployUrlError;
    }

    return validationErrors;
  };

  const clearFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];

    setImageError('');

    if (!file) {
      return;
    }

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      setImageError('Selecciona una imagen JPG, PNG o WEBP.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setFieldValue('image', reader.result);
    };

    reader.onerror = () => {
      setImageError('No se pudo cargar la imagen. Intenta con otro archivo.');
    };

    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFieldValue('image', '');
    setImageError('');
    clearFileInput();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const validationErrors = validateProject(values);
    setErrors(validationErrors);

    if (hasValidationErrors(validationErrors)) {
      return;
    }

    const projectData = {
      name: values.name.trim(),
      description: values.description.trim(),
      technologies: values.technologies.trim(),
      repositoryUrl: values.repositoryUrl.trim(),
      deployUrl: values.deployUrl.trim(),
      image: values.image,
    };

    if (editingIndex === null) {
      addProject(projectData);
    } else {
      updateProject(editingIndex, projectData);
      setEditingIndex(null);
    }

    resetForm(emptyProject);
    setImageError('');
    clearFileInput();
  };

  const handleEdit = (index) => {
    const project = projects[index];

    setEditingIndex(index);
    setErrors({});
    setImageError('');
    clearFileInput();
    setValues({
      name: project.name || '',
      description: project.description || '',
      technologies: project.technologies || '',
      repositoryUrl: project.repositoryUrl || '',
      deployUrl: project.deployUrl || '',
      image: project.image || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setImageError('');
    resetForm(emptyProject);
    clearFileInput();
  };

  const handleDelete = (index) => {
    deleteProject(index);

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
    <section className="project-form-section">
      <form className="project-form" onSubmit={handleSubmit} noValidate>
        <h2>Proyectos</h2>

        <label>
          Nombre
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. DevProfile"
          />
          {renderError('name')}
        </label>

        <label>
          Descripcion
          <textarea
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Describe el objetivo, alcance y resultado del proyecto."
            rows="4"
          />
          {renderError('description')}
        </label>

        <label>
          Tecnologias utilizadas
          <input
            type="text"
            name="technologies"
            value={values.technologies}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Ej. React, Vite, Chart.js"
          />
          {renderError('technologies')}
        </label>

        <label>
          Enlace al repositorio
          <input
            type="url"
            name="repositoryUrl"
            value={values.repositoryUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://github.com/usuario/proyecto"
          />
          {renderError('repositoryUrl')}
        </label>

        <label>
          Enlace al deploy
          <input
            type="url"
            name="deployUrl"
            value={values.deployUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="https://proyecto.com"
          />
          {renderError('deployUrl')}
        </label>

        <label>
          Imagen o captura opcional
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleImageChange}
          />
        </label>

        {values.image && (
          <div className="project-image-preview">
            <img src={values.image} alt="Vista previa del proyecto" />
            <button type="button" onClick={handleRemoveImage}>
              Quitar imagen
            </button>
          </div>
        )}

        {imageError && <p className="form-error">{imageError}</p>}

        <button type="submit">
          {editingIndex === null ? 'Agregar proyecto' : 'Guardar cambios'}
        </button>

        {editingIndex !== null && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar edicion
          </button>
        )}
      </form>

      <div className="project-list">
        {projects.length === 0 ? (
          <p>Aun no hay proyectos registrados.</p>
        ) : (
          projects.map((project, index) => (
            <ProjectCard
              key={`${project.name}-${index}`}
              project={project}
              onEdit={() => handleEdit(index)}
              onDelete={() => handleDelete(index)}
            />
          ))
        )}
      </div>
    </section>
  );
}

export default ProjectForm;
