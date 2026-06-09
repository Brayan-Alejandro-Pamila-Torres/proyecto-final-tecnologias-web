export function getPdfFileName(personalInfo = {}) {
  const baseName = personalInfo.name?.trim() || 'pamilon-cv';

  return `${baseName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'pamilon-cv'}.pdf`;
}
