import EducationForm from '../components/EducationForm';
import LanguageForm from '../components/LanguageForm';
import PersonalForm from '../components/PersonalForm';
import ProfileImageForm from '../components/ProfileImageForm';
import ProjectForm from '../components/ProjectForm';
import SkillForm from '../components/SkillForm';

function Editor() {
  return (
    <main className="editor-page">
      <header className="editor-header">
        <h1>Editor del CV</h1>
        <p>Captura, organiza y actualiza la informacion que aparecera en tu CV.</p>
      </header>

      <div className="editor-sections">
        <ProfileImageForm />
        <PersonalForm />
        <SkillForm />
        <ProjectForm />
        <EducationForm />
        <LanguageForm />
      </div>
    </main>
  );
}

export default Editor;
