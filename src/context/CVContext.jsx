import { useState } from 'react';
import CVContext from './CVContextBase';

const initialCVData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    address: '',
    profession: '',
    summary: '',
  },
  profileImage: '',
  skills: [],
  projects: [],
  education: [],
  languages: [],
};

export function CVProvider({ children }) {
  const [cvData, setCVData] = useState(initialCVData);

  const updatePersonalInfo = (personalInfo) => {
    setCVData((currentData) => ({
      ...currentData,
      personalInfo: {
        ...currentData.personalInfo,
        ...personalInfo,
      },
    }));
  };

  const updateProfileImage = (profileImage) => {
    setCVData((currentData) => ({
      ...currentData,
      profileImage,
    }));
  };

  const addItem = (section, item) => {
    setCVData((currentData) => ({
      ...currentData,
      [section]: [...currentData[section], item],
    }));
  };

  const updateItem = (section, index, updatedItem) => {
    setCVData((currentData) => ({
      ...currentData,
      [section]: currentData[section].map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...updatedItem } : item
      ),
    }));
  };

  const deleteItem = (section, index) => {
    setCVData((currentData) => ({
      ...currentData,
      [section]: currentData[section].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const addSkill = (skill) => addItem('skills', skill);
  const updateSkill = (index, skill) => updateItem('skills', index, skill);
  const deleteSkill = (index) => deleteItem('skills', index);

  const addProject = (project) => addItem('projects', project);
  const updateProject = (index, project) => updateItem('projects', index, project);
  const deleteProject = (index) => deleteItem('projects', index);

  const addEducation = (educationItem) => addItem('education', educationItem);
  const updateEducation = (index, educationItem) => updateItem('education', index, educationItem);
  const deleteEducation = (index) => deleteItem('education', index);

  const addLanguage = (language) => addItem('languages', language);
  const updateLanguage = (index, language) => updateItem('languages', index, language);
  const deleteLanguage = (index) => deleteItem('languages', index);

  const value = {
    cvData,
    personalInfo: cvData.personalInfo,
    profileImage: cvData.profileImage,
    skills: cvData.skills,
    projects: cvData.projects,
    education: cvData.education,
    languages: cvData.languages,
    updatePersonalInfo,
    updateProfileImage,
    addSkill,
    updateSkill,
    deleteSkill,
    addProject,
    updateProject,
    deleteProject,
    addEducation,
    updateEducation,
    deleteEducation,
    addLanguage,
    updateLanguage,
    deleteLanguage,
  };

  return <CVContext.Provider value={value}>{children}</CVContext.Provider>;
}
