import SkillChart from '../components/SkillChart';
import { useCV } from '../hooks/useCV';

function Dashboard() {
  const { skills, projects, education, languages } = useCV();

  const stats = [
    { label: 'Habilidades', value: skills.length },
    { label: 'Proyectos', value: projects.length },
    { label: 'Educacion', value: education.length },
    { label: 'Idiomas', value: languages.length },
  ];

  return (
    <main className="dashboard-page">
      <header className="dashboard-header">
        <h1>Dashboard de Habilidades</h1>
        <p>Resumen dinamico de la informacion capturada para el CV.</p>
      </header>

      <section className="dashboard-stats" aria-label="Resumen del CV">
        {stats.map((stat) => (
          <article className="dashboard-stat" key={stat.label}>
            <span>{stat.label}</span>
            <strong>{stat.value}</strong>
          </article>
        ))}
      </section>

      <section className="dashboard-chart-section">
        <h2>Nivel de dominio por habilidad</h2>
        <SkillChart skills={skills} />
      </section>
    </main>
  );
}

export default Dashboard;
