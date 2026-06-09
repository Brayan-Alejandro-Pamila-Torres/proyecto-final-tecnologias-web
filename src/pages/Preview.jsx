import { PDFDownloadLink } from '@react-pdf/renderer';
import CVPdfDocument from '../components/CVPdfDocument';
import CVPreview from '../components/CVPreview';
import { useCV } from '../hooks/useCV';
import { getPdfFileName } from '../utils/pdfGenerator';

function Preview() {
  const { cvData, personalInfo } = useCV();

  return (
    <main className="preview-page">
      <div className="preview-actions">
        <PDFDownloadLink
          document={<CVPdfDocument cvData={cvData} />}
          fileName={getPdfFileName(personalInfo)}
          className="download-pdf-button"
        >
          {({ loading }) => (loading ? 'Preparando PDF...' : 'Descargar PDF')}
        </PDFDownloadLink>
      </div>
      <CVPreview />
    </main>
  );
}

export default Preview;
