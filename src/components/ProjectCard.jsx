function ProjectCard({ project, onEdit, onDelete }) {
  return (
    <article className="project-card">
      {project.image && (
        <div className="project-card-image">
          <img src={project.image} alt={`Captura de ${project.name}`} />
        </div>
      )}

      <div>
        <h3>{project.name}</h3>
        <p>{project.description}</p>
      </div>

      {project.technologies && <p>Tecnologias: {project.technologies}</p>}

      <div className="project-links">
        {project.repositoryUrl && (
          <a href={project.repositoryUrl} target="_blank" rel="noreferrer">
            Repositorio
          </a>
        )}

        {project.deployUrl && (
          <a href={project.deployUrl} target="_blank" rel="noreferrer">
            Deploy
          </a>
        )}
      </div>

      <div className="project-card-actions">
        <button type="button" onClick={onEdit}>
          Editar
        </button>
        <button type="button" onClick={onDelete}>
          Eliminar
        </button>
      </div>
    </article>
  );
}

export default ProjectCard;
