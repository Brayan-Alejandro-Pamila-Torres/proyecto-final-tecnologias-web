import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <main className="home-page" style={{ padding: '40px 20px 64px' }}>
      
      {/* Sección Principal (Hero) */}
      <section className="home-hero" style={{ padding: '64px 32px', marginBottom: '32px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          
          <span className="home-kicker" style={{ display: 'inline-block', marginBottom: '12px' }}>
            Pamilon-CV
          </span>
          
          <h1 style={{ 
            margin: '0 0 16px 0', 
            fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
            lineHeight: '1.15',
            fontWeight: '800'
          }}>
            CV PROFESIONAL EN MINUTOS
          </h1>
          
          <p style={{ 
            fontSize: '1.15rem', 
            lineHeight: '1.65', 
            maxWidth: '680px', 
            margin: '0 auto 32px auto',
            color: 'var(--text)'
          }}>
            Crea, organiza y previsualiza tu currículum desde una sola página. Agrega 
            tu información personal, habilidades, proyectos, educación e idiomas, y 
            descarga tu CV en PDF cuando esté listo.
          </p>

          {/* Botones de Acción bien alineados y centrados */}
          <div className="home-actions" style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '16px', 
            marginTop: 0 
          }}>
            <Link 
              className="home-primary-link" 
              to="/editor"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              Empezar mi CV
            </Link>
            <Link 
              className="home-secondary-link" 
              to="/preview"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                padding: '12px 32px',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            >
              Ver vista previa
            </Link>
          </div>

        </div>
      </section>

      {/* Sección de Características o Novedades */}
      <section className="home-news" style={{ marginTop: '24px' }}>
        <article style={{ padding: '32px', textAlign: 'center' }}>
          <span className="home-kicker" style={{ 
            fontSize: '0.85rem', 
            background: 'var(--accent-bg)', 
            color: 'var(--accent)', 
            padding: '4px 12px', 
            borderRadius: '20px',
            border: '1px solid var(--accent-border)',
            display: 'inline-block',
            marginBottom: '12px'
          }}>
            Nuevo
          </span>
          <h2 style={{ margin: '0 0 12px 0', fontSize: '1.75rem' }}>
            Tu CV listo para editar, guardar y descargar
          </h2>
          <p style={{ 
            maxWidth: '640px', 
            margin: '0 auto', 
            lineHeight: '1.6', 
            color: 'var(--text)',
            fontSize: '1.05rem' 
          }}>
            PamilonCV guarda tus datos automáticamente mediante persistencia local, 
            muestra una vista previa profesional en tiempo real y permite exportar 
            el resultado en PDF de alta calidad.
          </p>
        </article>
      </section>

    </main>
  );
}

export default Home;