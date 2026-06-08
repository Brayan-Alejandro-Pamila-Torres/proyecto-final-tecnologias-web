import EducationForm from '../components/EducationForm';
import LanguageForm from '../components/LanguageForm';
import PersonalForm from '../components/PersonalForm';
import ProfileImageForm from '../components/ProfileImageForm';
import ProjectForm from '../components/ProjectForm';
import SkillForm from '../components/SkillForm';

function Editor() {
  return (
    <div>
      <h1>Editor del CV</h1>
      <p>Aqui capturaremos los datos del formulario.</p>
      <ProfileImageForm />
      <PersonalForm />
      <SkillForm />
      <ProjectForm />
      <EducationForm />
      <LanguageForm />
    </div>
  );
}

export default Editor;
