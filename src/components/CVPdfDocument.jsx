import {
  Document,
  Image,
  Link,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 34,
    color: '#1f2933',
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.45,
  },
  header: {
    flexDirection: 'row',
    gap: 16,
    paddingBottom: 18,
    borderBottomWidth: 1.5,
    borderBottomColor: '#243b53',
    borderBottomStyle: 'solid',
  },
  photo: {
    width: 92,
    height: 92,
    borderRadius: 46,
    objectFit: 'cover',
  },
  headerContent: {
    flex: 1,
  },
  name: {
    color: '#102a43',
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 4,
  },
  profession: {
    color: '#486581',
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
  },
  contactLine: {
    color: '#52606d',
    marginBottom: 3,
  },
  linksRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 5,
  },
  link: {
    color: '#0b7285',
    textDecoration: 'none',
    fontWeight: 700,
  },
  section: {
    marginTop: 16,
  },
  sectionTitle: {
    color: '#102a43',
    fontSize: 12,
    fontWeight: 700,
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#bcccdc',
    borderBottomStyle: 'solid',
    textTransform: 'uppercase',
  },
  paragraph: {
    marginBottom: 4,
  },
  list: {
    gap: 8,
  },
  item: {
    paddingBottom: 7,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9e2ec',
    borderBottomStyle: 'solid',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 3,
  },
  itemTitle: {
    flex: 1,
    color: '#243b53',
    fontSize: 10.5,
    fontWeight: 700,
  },
  itemMeta: {
    color: '#627d98',
    fontWeight: 700,
  },
  muted: {
    color: '#52606d',
  },
  projectImage: {
    width: 170,
    height: 96,
    objectFit: 'cover',
    marginBottom: 6,
  },
  twoColumnGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  compactCard: {
    width: '48%',
    padding: 8,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#d9e2ec',
    borderStyle: 'solid',
  },
});

function PdfSection({ title, children, isVisible = true }) {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function CVPdfDocument({ cvData }) {
  const {
    personalInfo = {},
    profileImage = '',
    skills = [],
    projects = [],
    education = [],
    languages = [],
  } = cvData;

  const professionalLinks = [
    { label: 'GitHub', url: personalInfo.github },
    { label: 'LinkedIn', url: personalInfo.linkedin },
    { label: 'Portafolio', url: personalInfo.portfolio },
  ].filter((link) => link.url);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          {profileImage && <Image style={styles.photo} src={profileImage} />}

          <View style={styles.headerContent}>
            <Text style={styles.name}>{personalInfo.name || 'Nombre completo'}</Text>
            <Text style={styles.profession}>
              {personalInfo.profession || 'Carrera o profesion'}
            </Text>
            {personalInfo.city && <Text style={styles.contactLine}>{personalInfo.city}</Text>}
            {personalInfo.email && <Text style={styles.contactLine}>{personalInfo.email}</Text>}
            {personalInfo.phone && <Text style={styles.contactLine}>{personalInfo.phone}</Text>}

            {professionalLinks.length > 0 && (
              <View style={styles.linksRow}>
                {professionalLinks.map((link) => (
                  <Link key={link.label} src={link.url} style={styles.link}>
                    {link.label}
                  </Link>
                ))}
              </View>
            )}
          </View>
        </View>

        <PdfSection title="Perfil profesional" isVisible={Boolean(personalInfo.summary)}>
          <Text style={styles.paragraph}>{personalInfo.summary}</Text>
        </PdfSection>

        <PdfSection title="Habilidades" isVisible={skills.length > 0}>
          <View style={styles.twoColumnGrid}>
            {skills.map((skill, index) => (
              <View style={styles.compactCard} key={`${skill.name}-${index}`} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{skill.name}</Text>
                  <Text style={styles.itemMeta}>{skill.level}/100</Text>
                </View>
                {skill.category && <Text style={styles.muted}>{skill.category}</Text>}
                {skill.description && <Text>{skill.description}</Text>}
              </View>
            ))}
          </View>
        </PdfSection>

        <PdfSection title="Proyectos" isVisible={projects.length > 0}>
          <View style={styles.list}>
            {projects.map((project, index) => (
              <View style={styles.item} key={`${project.name}-${index}`} wrap={false}>
                {project.image && <Image style={styles.projectImage} src={project.image} />}
                <Text style={styles.itemTitle}>{project.name}</Text>
                {project.description && <Text style={styles.paragraph}>{project.description}</Text>}
                {project.technologies && (
                  <Text style={styles.muted}>Tecnologias: {project.technologies}</Text>
                )}
                {project.repositoryUrl && (
                  <Link src={project.repositoryUrl} style={styles.link}>
                    Repositorio
                  </Link>
                )}
                {project.deployUrl && (
                  <Link src={project.deployUrl} style={styles.link}>
                    Deploy
                  </Link>
                )}
              </View>
            ))}
          </View>
        </PdfSection>

        <PdfSection title="Educacion" isVisible={education.length > 0}>
          <View style={styles.list}>
            {education.map((educationItem, index) => (
              <View style={styles.item} key={`${educationItem.institution}-${index}`} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{educationItem.program}</Text>
                  <Text style={styles.itemMeta}>{educationItem.period}</Text>
                </View>
                <Text style={styles.muted}>{educationItem.institution}</Text>
                {educationItem.description && <Text>{educationItem.description}</Text>}
                {educationItem.evidenceUrl && (
                  <Link src={educationItem.evidenceUrl} style={styles.link}>
                    Ver evidencia
                  </Link>
                )}
              </View>
            ))}
          </View>
        </PdfSection>

        <PdfSection title="Idiomas" isVisible={languages.length > 0}>
          <View style={styles.twoColumnGrid}>
            {languages.map((language, index) => (
              <View style={styles.compactCard} key={`${language.name}-${index}`} wrap={false}>
                <View style={styles.itemHeader}>
                  <Text style={styles.itemTitle}>{language.name}</Text>
                  <Text style={styles.itemMeta}>{language.level}</Text>
                </View>
                {language.description && <Text>{language.description}</Text>}
              </View>
            ))}
          </View>
        </PdfSection>
      </Page>
    </Document>
  );
}

export default CVPdfDocument;
