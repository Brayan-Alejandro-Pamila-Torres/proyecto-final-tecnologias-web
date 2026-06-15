import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import CVPdfDocument from '../components/CVPdfDocument';
import CVPreview from '../components/CVPreview';
import { useCV } from '../hooks/useCV';
import { getPdfFileName } from '../utils/pdfGenerator';

function Preview() {
  const { cvData, personalInfo } = useCV();

  return (
    <main className="preview-page" style={{ padding: '40px 20px 64px' }}>
      
      {/* Barra de Acciones y Herramientas Premium (Toolbar) */}
      <div className="preview-actions" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        width: 'min(100%, 920px)',
        margin: '0 auto 24px auto',
        padding: '16px 24px',
        background: 'var(--code-bg)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        boxShadow: 'rgba(0, 0, 0, 0.02) 0px 4px 12px'
      }}>
        
        {/* Texto indicativo a la izquierda */}
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-h)', fontWeight: '700' }}>
            Vista Previa del Documento
          </h2>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: 'var(--text)' }}>
            Revisa tu información antes de exportar el archivo final.
          </p>
        </div>

        {/* Botón de Descarga de React-PDF */}
        <PDFDownloadLink
          document={<CVPdfDocument cvData={cvData} />}
          fileName={getPdfFileName(personalInfo)}
          className="download-pdf-button"
          style={{ 
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            textDecoration: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '0.95rem',
            minHeight: '44px',
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          {({ loading }) => (
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {loading ? (
                <>
                  <span className="counter" style={{ margin: 0, padding: '2px 6px', fontSize: '12px' }}>⏳</span>
                  Generando...
                </>
              ) : (
                <>
                  Descargar CV en PDF
                </>
              )}
            </span>
          )}
        </PDFDownloadLink>

      </div>

      {/* Renderizado de la Hoja de Vida */}
      <CVPreview />
      
    </main>
  );
}

export default Preview;