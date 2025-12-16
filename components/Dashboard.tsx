import React from 'react';
import { BriefingData } from '../types';

interface DashboardProps {
  onCreateNew: () => void;
  projects: BriefingData[];
  onLoadProject: (project: BriefingData) => void;
  onDeleteProject: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onCreateNew, projects, onLoadProject, onDeleteProject }) => {
  
  const formatDate = (ts?: number) => {
    if (!ts) return '';
    return new Date(ts).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
  };

  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
  };

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
      {/* TopAppBar */}
      <div className="sticky top-0 z-20 flex items-center bg-slate-50/95 dark:bg-dark-bg/95 backdrop-blur-md px-5 py-4 justify-between border-b border-gray-200 dark:border-dark-border">
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-secondary-500 text-white shadow-neon">
                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
            </div>
            <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight">Meus Projetos</h2>
        </div>
        <div className="flex items-center justify-end gap-3">
          <button 
                onClick={toggleTheme}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
                <span className="material-symbols-outlined text-[18px] dark:hidden">dark_mode</span>
                <span className="material-symbols-outlined text-[18px] hidden dark:block">light_mode</span>
            </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-dark-card overflow-hidden border border-white dark:border-dark-border shadow-sm">
             <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-5 pt-6 pb-24 overflow-y-auto">
        {projects.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <div className="w-24 h-24 bg-slate-100 dark:bg-dark-surface rounded-full flex items-center justify-center mb-6 border border-slate-200 dark:border-dark-border shadow-sm">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600">movie_edit</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Nenhum projeto ainda</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-[250px] leading-relaxed">
                    Seus briefings gerados aparecerão aqui. Comece criando o seu primeiro agora.
                </p>
                <div className="mt-8">
                    <span className="material-symbols-outlined text-primary-300 animate-bounce">arrow_downward</span>
                </div>
            </div>
        ) : (
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="group relative bg-white dark:bg-dark-surface p-4 rounded-2xl border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md transition-all active:scale-[0.99]">
                         <div onClick={() => onLoadProject(project)} className="cursor-pointer">
                            <div className="flex justify-between items-start mb-2">
                                <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-primary-50 dark:bg-primary-900/20 text-[10px] font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                                    <span className="material-symbols-outlined text-[12px]">videocam</span>
                                    {project.videoType}
                                </div>
                                <span className="text-xs font-medium text-slate-400 dark:text-slate-500">{formatDate(project.lastModified)}</span>
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-bold text-lg mb-1 truncate">{project.projectName || 'Sem Nome'}</h3>
                            <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-2 leading-snug">
                                {project.script?.hook || project.objective || 'Sem descrição...'}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
                                <span className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">timer</span> {project.duration}s
                                </span>
                                <span className="flex items-center gap-1 capitalize">
                                    <span className="material-symbols-outlined text-[14px]">style</span> {project.visualStyle}
                                </span>
                            </div>
                         </div>
                         
                         <button 
                            onClick={(e) => { e.stopPropagation(); if(project.id) onDeleteProject(project.id); }}
                            className="absolute top-4 right-4 p-1.5 text-slate-300 hover:text-red-500 dark:text-slate-600 dark:hover:text-red-400 transition-colors z-10"
                         >
                             <span className="material-symbols-outlined text-[18px]">delete</span>
                         </button>
                    </div>
                ))}
            </div>
        )}
      </div>

      {/* FAB */}
      <div className="fixed bottom-0 left-0 right-0 p-5 max-w-md mx-auto z-30 bg-gradient-to-t from-slate-50 via-slate-50 to-transparent dark:from-dark-bg dark:via-dark-bg pt-12 pb-8">
        <button 
            onClick={onCreateNew}
            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-2xl h-16 bg-primary-600 text-white gap-3 text-lg font-bold leading-normal tracking-wide min-w-0 p-0 shadow-neon hover:bg-primary-700 active:scale-[0.98] transition-all"
        >
          <span className="material-symbols-outlined text-[28px]">add_circle</span>
          <span className="truncate">Criar Novo Briefing</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;