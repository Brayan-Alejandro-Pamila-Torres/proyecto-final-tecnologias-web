import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div>
          <p className="home-kicker">Pamilon-CV</p>
          <h1>CV PROFESIONAL EN MINUTOS </h1>
          <p>
            Crea, organiza y previsualiza tu curriculum desde una sola pagina. Agrega
            tu informacion personal, habilidades, proyectos, educacion e idiomas, y
            descarga tu CV en PDF cuando este listo.
          </p>

          <div className="home-actions">
            <Link className="home-primary-link" to="/editor">
              Empezar mi CV
            </Link>
            <Link className="home-secondary-link" to="/preview">
              Ver vista previa
            </Link>
          </div>
        </div>
      </section>

      <section className="home-news">
        <article>
          <span>Nuevo</span>
          <h2>Tu CV listo para editar, guardar y descargar</h2>
          <p>
            PamilonCV guarda tus datos automaticamente, muestra una vista previa
            profesional y permite exportar el resultado en PDF.
          </p>
        </article>
      </section>
    </main>
  );
}

export default Home;
