import React from 'react';

interface WelcomeProps {
    onStart: () => void;
}

const Welcome: React.FC<WelcomeProps> = ({ onStart }) => {
    
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    return (
        <div className="relative flex flex-col h-full min-h-screen w-full bg-white dark:bg-[#0B1120] overflow-hidden transition-colors duration-300">
            {/* Background Effects */}
            <div className="absolute top-[-10%] left-[-20%] w-[80%] h-[40%] bg-blue-400/20 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow"></div>
            <div className="absolute bottom-[-10%] right-[-20%] w-[80%] h-[40%] bg-sky-400/20 dark:bg-sky-500/15 rounded-full blur-3xl pointer-events-none mix-blend-multiply dark:mix-blend-screen animate-pulse-slow" style={{ animationDelay: '2s' }}></div>

            <div className="z-10 flex items-center justify-between px-6 py-6 shrink-0">
                <div className="flex items-center gap-2.5">
                    {/* Apenas texto Artifex, sem logo de imagem */}
                    <span className="text-2xl font-display font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Artifex</span>
                </div>
                <button 
                    onClick={toggleTheme}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors cursor-pointer"
                >
                    <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                    <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                </button>
            </div>

            <div className="z-10 flex-1 flex flex-col w-full px-6 overflow-y-auto no-scrollbar">
                <div className="relative w-full aspect-[4/3] mb-8 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-500 to-accent-500 rounded-3xl blur opacity-20 dark:opacity-30 group-hover:opacity-40 transition-opacity duration-500"></div>
                    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5 dark:ring-white/10 bg-gray-200 dark:bg-gray-800">
                        {/* Imagem Futurística Moderna Artifex */}
                        <div className="w-full h-full bg-center bg-cover transform transition-transform duration-700 hover:scale-105" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-70"></div>
                        </div>
                        <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-lg">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse"></span>
                            Artifex AI Script
                        </div>
                    </div>
                </div>

                <div className="flex flex-col space-y-6">
                    <div className="space-y-3">
                        <h1 className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300">
                                Roteiros de Vídeo
                            </span>
                            <br />
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">
                                Profissionais
                            </span>
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 text-[17px] leading-relaxed font-normal max-w-[95%]">
                            Ferramenta exclusiva para estruturação de ideias e geração de roteiros persuasivos para seus clientes.
                        </p>
                    </div>

                    {/* Foco único em Roteiro */}
                    <div className="w-full py-2">
                        <div className="flex items-center gap-4 p-0">
                            <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-300">
                                <span className="material-symbols-outlined text-2xl">description</span>
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white text-lg">Geração de Roteiro</h3>
                                <p className="text-sm text-slate-500 dark:text-slate-400">Fluxo otimizado para Hooks e CTAs.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="z-10 w-full px-6 pb-8 pt-4 shrink-0 flex flex-col gap-4">
                <button 
                    onClick={onStart}
                    className="group relative w-full flex items-center justify-center h-14 rounded-2xl bg-slate-900 dark:bg-white overflow-hidden shadow-xl shadow-primary-900/10 transition-transform active:scale-[0.98]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent opacity-100 dark:opacity-0 transition-opacity"></div>
                    <div className="absolute inset-0 bg-white opacity-0 dark:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 text-base font-bold text-white dark:text-primary-700 flex items-center gap-2">
                        Criar Roteiro
                        <span className="material-symbols-outlined text-[20px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default Welcome;