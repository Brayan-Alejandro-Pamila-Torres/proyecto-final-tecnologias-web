function SkillCard({ skill, onEdit, onDelete }) {
  return (
    <article className="skill-card">
      <div>
        <h3>{skill.name}</h3>
        <p>{skill.category}</p>
      </div>

      <p>Nivel: {skill.level}/100</p>

      {skill.description && <p>{skill.description}</p>}

      <div className="skill-card-actions">
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

export default SkillCard;
