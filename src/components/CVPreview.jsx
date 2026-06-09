import { useCV } from '../hooks/useCV';

function CVSection({ title, children, isVisible = true }) {
  if (!isVisible) {
    return null;
  }

  return (
    <section className="cv-preview-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function CVPreview() {
  const {
    personalInfo,
    profileImage,
    skills,
    projects,
    education,
    languages,
  } = useCV();

  const links = [
    { label: 'GitHub', url: personalInfo.github },
    { label: 'LinkedIn', url: personalInfo.linkedin },
    { label: 'Portafolio', url: personalInfo.portfolio },
  ].filter((link) => link.url);

  const hasContactInfo = personalInfo.city || personalInfo.email || personalInfo.phone;

  return (
    <article className="cv-preview">
      <header className="cv-preview-header">
        {profileImage && (
          <img className="cv-preview-photo" src={profileImage} alt="Foto de perfil" />
        )}

        <div className="cv-preview-heading">
          <h1>{personalInfo.name || 'Tu nombre completo'}</h1>
          <p className="cv-preview-profession">
            {personalInfo.profession || 'Carrera o profesion'}
          </p>

          {hasContactInfo && (
            <div className="cv-preview-contact">
              {personalInfo.city && <span>{personalInfo.city}</span>}
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>{personalInfo.phone}</span>}
            </div>
          )}

          {links.length > 0 && (
            <div className="cv-preview-links">
              {links.map((link) => (
                <a key={link.label} href={link.url} target="_blank" rel="noreferrer">
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </header>

      <CVSection title="Perfil profesional" isVisible={Boolean(personalInfo.summary)}>
        <p>{personalInfo.summary}</p>
      </CVSection>

      <CVSection title="Habilidades" isVisible={skills.length > 0}>
        <div className="cv-preview-skills">
          {skills.map((skill, index) => (
            <div className="cv-preview-skill" key={`${skill.name}-${index}`}>
              <div className="cv-preview-row">
                <strong>{skill.name}</strong>
                <span>{skill.level}/100</span>
              </div>
              {skill.category && <p>{skill.category}</p>}
              {skill.description && <p>{skill.description}</p>}
            </div>
          ))}
        </div>
      </CVSection>

      <CVSection title="Proyectos" isVisible={projects.length > 0}>
        <div className="cv-preview-list">
          {projects.map((project, index) => (
            <div className="cv-preview-item" key={`${project.name}-${index}`}>
              {project.image && (
                <img
                  className="cv-preview-project-image"
                  src={project.image}
                  alt={`Captura de ${project.name}`}
                />
              )}
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                {project.technologies && <p>Tecnologias: {project.technologies}</p>}
                <div className="cv-preview-links">
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
              </div>
            </div>
          ))}
        </div>
      </CVSection>

      <CVSection title="Educacion" isVisible={education.length > 0}>
        <div className="cv-preview-list">
          {education.map((educationItem, index) => (
            <div className="cv-preview-item" key={`${educationItem.institution}-${index}`}>
              <div>
                <div className="cv-preview-row">
                  <h3>{educationItem.program}</h3>
                  <span>{educationItem.period}</span>
                </div>
                <p>{educationItem.institution}</p>
                {educationItem.description && <p>{educationItem.description}</p>}
                {educationItem.evidenceUrl && (
                  <a href={educationItem.evidenceUrl} target="_blank" rel="noreferrer">
                    Ver evidencia
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </CVSection>

      <CVSection title="Idiomas" isVisible={languages.length > 0}>
        <div className="cv-preview-language-grid">
          {languages.map((language, index) => (
            <div className="cv-preview-language" key={`${language.name}-${index}`}>
              <div className="cv-preview-row">
                <strong>{language.name}</strong>
                <span>{language.level}</span>
              </div>
              {language.description && <p>{language.description}</p>}
            </div>
          ))}
        </div>
      </CVSection>
    </article>
  );
}

export default CVPreview;
