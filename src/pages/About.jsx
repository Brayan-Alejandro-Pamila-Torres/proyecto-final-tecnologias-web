import React from 'react';

function About() {
  return (
    <main className="about-page">
      <section className="about-section" style={{ textAlign: 'left', padding: '32px' }}>
        
        {/* Encabezado de la página */}
        <div style={{ marginBottom: '24px', borderBottom: '1px solid var(--border)', paddingBottom: '16px' }}>
          <span className="home-kicker" style={{ display: 'block', marginBottom: '4px' }}>Proyecto Final</span>
          <br />
          <h1 style={{ margin: 0, textAlign: 'left', fontSize: '2.5rem' }}>¿Qué es PamilonCV?</h1>
        </div>

        {/* Texto de Introducción */}
        <div style={{ marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: 'var(--text)' }}>
            Somos un equipo conformado por estudiantes de la Universidad Autónoma de
            Aguascalientes. La creación de esta página forma parte de nuestro proyecto
            final para la materia de Tecnologías Web, donde implementamos una arquitectura 
            robusta basada en React y estándares modernos de desarrollo.
          </p>
        </div>

        {/* Sección de Objetivos con Grid Limpio */}
        <div style={{ marginTop: '32px' }}>
          <span className="home-kicker" style={{ display: 'block', marginBottom: '8px' }}>Alcance Tecnológico</span>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem', color: 'var(--text)' }}>Objetivos e Implementación</h2>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', 
            gap: '20px' 
          }}>
            <article className="skill-card" style={{ textAlign: 'left', margin: 0 }}>
              <h3 style={{ marginTop: 0 }}>Manejo de Estado y Rutas</h3>
              <p>Sincronización global de datos dinámicos y navegación SPA fluida entre paneles.</p>
            </article>

            <article className="skill-card" style={{ textAlign: 'left', margin: 0 }}>
              <h3 style={{ marginTop: 0 }}>Formularios Controlados</h3>
              <p>Validaciones estrictas en tiempo real, control de campos obligatorios y seguridad en la captura.</p>
            </article>

            <article className="skill-card" style={{ textAlign: 'left', margin: 0 }}>
              <h3 style={{ marginTop: 0 }}>Persistencia y Gráficas</h3>
              <p>Soporte nativo con localStorage para evitar pérdidas de datos y visualización dinámica de habilidades.</p>
            </article>

            <article className="skill-card" style={{ textAlign: 'left', margin: 0 }}>
              <h3 style={{ marginTop: 0 }}>Exportación a PDF</h3>
              <p>Generación y descarga de currículums profesionales listos para el entorno laboral.</p>
            </article>
          </div>
        </div>

        {/* Bloque del Repositorio de GitHub corregido y centrado */}
        <div style={{ 
          marginTop: '40px', 
          padding: '32px', 
          background: 'var(--code-bg)', 
          borderRadius: '12px', 
          textAlign: 'center',
          border: '1px solid var(--border)'
        }}>
          <p style={{ fontWeight: '700', marginBottom: '20px', color: 'var(--text-h)', fontSize: '1.1rem' }}>
            ¿Deseas conocer más sobre el desarrollo o revisar el código fuente?
          </p>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <a 
              href="https://github.com/Brayan-Alejandro-Pamila-Torres/proyecto-final-tecnologias-web" 
              target="_blank" 
              rel="noopener noreferrer"
              className="home-primary-link"
              style={{ 
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                textDecoration: 'none',
                padding: '12px 32px', 
                fontSize: '0.95rem',
                borderRadius: '8px'
              }}
            >
              Visitar Repositorio en GitHub
            </a>
          </div>
        </div>

      </section>
    </main>
  );
}

export default About;