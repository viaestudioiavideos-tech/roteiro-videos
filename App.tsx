import React, { useState, useEffect } from 'react';
import Welcome from './components/Welcome';
import Dashboard from './components/Dashboard';
import Wizard from './components/Wizard';
import { BriefingData, INITIAL_DATA } from './types';

// View state management
type View = 'WELCOME' | 'DASHBOARD' | 'WIZARD';

// Safe UUID generator
const generateId = () => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('WELCOME');
  const [currentProject, setCurrentProject] = useState<BriefingData | null>(null);
  const [savedProjects, setSavedProjects] = useState<BriefingData[]>([]);

  // Initialize Theme and Load Projects
  useEffect(() => {
    // Theme Init
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Projects Init
    const stored = localStorage.getItem('artifex_projects');
    if (stored) {
      try {
        setSavedProjects(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    }
  }, []);

  const saveProjectToStorage = (project: BriefingData): BriefingData => {
    const projectId = project.id || generateId();
    const newProject = { 
      ...project, 
      id: projectId,
      lastModified: Date.now() 
    };

    const updatedList = savedProjects.some(p => p.id === newProject.id)
      ? savedProjects.map(p => p.id === newProject.id ? newProject : p)
      : [newProject, ...savedProjects];
    
    setSavedProjects(updatedList);
    localStorage.setItem('artifex_projects', JSON.stringify(updatedList));
    
    // Return the project with the guaranteed ID
    return newProject;
  };

  const deleteProject = (id: string) => {
    const updatedList = savedProjects.filter(p => p.id !== id);
    setSavedProjects(updatedList);
    localStorage.setItem('artifex_projects', JSON.stringify(updatedList));
  };

  const handleStart = () => setCurrentView('DASHBOARD');
  
  const handleCreateNew = () => {
    setCurrentProject(INITIAL_DATA);
    setCurrentView('WIZARD');
  };

  const handleLoadProject = (project: BriefingData) => {
    setCurrentProject(project);
    setCurrentView('WIZARD');
  };

  const handleFinishWizard = (finalData: BriefingData) => {
    saveProjectToStorage(finalData);
    setCurrentView('DASHBOARD');
  };

  const handleBackToDashboard = () => setCurrentView('DASHBOARD');

  return (
    <div className="relative flex flex-col h-full min-h-screen w-full max-w-md mx-auto bg-white dark:bg-dark-bg overflow-x-hidden shadow-2xl transition-colors duration-300">
      {currentView === 'WELCOME' && <Welcome onStart={handleStart} />}
      {currentView === 'DASHBOARD' && (
        <Dashboard 
          onCreateNew={handleCreateNew} 
          projects={savedProjects}
          onLoadProject={handleLoadProject}
          onDeleteProject={deleteProject}
        />
      )}
      {currentView === 'WIZARD' && (
        <Wizard 
          initialData={currentProject || INITIAL_DATA}
          onFinish={handleFinishWizard} 
          onBack={handleBackToDashboard} 
          onSave={saveProjectToStorage}
        />
      )}
    </div>
  );
};

export default App;