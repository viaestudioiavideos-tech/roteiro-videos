import React from 'react';
import { BriefingData } from '../../types';

interface Props {
    data: BriefingData;
    updateData: (data: Partial<BriefingData>) => void;
    onNext: () => void;
    onBack: () => void;
    totalSteps: number;
    currentStep: number;
}

const NegativePrompt: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const toggleTag = (tag: string) => {
        const current = data.negativePrompt || "";
        if (current.includes(tag)) {
            updateData({ negativePrompt: current.replace(tag + ", ", "").replace(tag, "").trim() });
        } else {
            updateData({ negativePrompt: current ? `${current}, ${tag}` : tag });
        }
    };

    const tags = [
        { label: "Texto excessivo", icon: "title" },
        { label: "Desfocado", icon: "blur_on" },
        { label: "Pessoas", icon: "person_off" },
        { label: "Marca d'água", icon: "copyright" },
        { label: "Distorção", icon: "broken_image" },
        { label: "Cores Neon", icon: "palette" },
    ];

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
             <div className="fixed top-0 left-0 -z-10 h-64 w-64 rounded-full bg-primary-400/20 blur-[100px] dark:bg-primary-900/20"></div>
            <div className="fixed bottom-0 right-0 -z-10 h-64 w-64 rounded-full bg-accent-400/20 blur-[100px] dark:bg-accent-900/20"></div>
            
             {/* Header & Progress */}
             <div className="sticky top-0 z-50 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-slate-100 dark:border-dark-border transition-colors">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                    <button onClick={onBack} className="group flex size-10 items-center justify-center rounded-full border border-transparent bg-transparent text-slate-600 hover:border-slate-200 hover:bg-slate-50 dark:text-slate-300 dark:hover:border-slate-700 dark:hover:bg-white/5 transition-all">
                        <span className="material-symbols-outlined text-2xl transition-transform group-hover:-translate-x-0.5">arrow_back_ios_new</span>
                    </button>
                    <h1 className="text-xs font-bold tracking-wide text-slate-900 dark:text-white uppercase opacity-90">Configuração de IA</h1>
                     <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <main className="flex-1 overflow-y-auto pb-32">
                <div className="px-6 pt-8 pb-4">
                    <div className="mb-3 flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400">
                            <span className="material-symbols-outlined text-[16px]">do_not_disturb_on</span>
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">Negative Prompt</span>
                    </div>
                    <h2 className="text-3xl font-extrabold leading-tight text-slate-900 dark:text-white mb-3">
                        O que <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-accent-500 dark:from-primary-400 dark:to-accent-400">evitar</span>?
                    </h2>
                    <p className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                        Ajude a IA a refinar o resultado listando o que você <strong className="text-slate-800 dark:text-slate-200">não quer</strong> ver no seu vídeo.
                    </p>
                </div>

                <div className="mt-2 px-6">
                    <div className="flex items-center justify-between mb-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Sugestões Rápidas</p>
                        <span className="text-[10px] bg-slate-100 dark:bg-white/10 px-2 py-0.5 rounded-full text-slate-500 dark:text-slate-400 font-medium">Toque para adicionar</span>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                        {tags.map((tag) => {
                            const active = data.negativePrompt.includes(tag.label);
                            return (
                                <button 
                                    key={tag.label}
                                    onClick={() => toggleTag(tag.label)}
                                    className={`chip-transition group flex items-center gap-x-2 rounded-xl border px-3 py-2 hover:shadow-md transition-all ${active ? 'border-primary-500/50 bg-primary-50 dark:bg-primary-500/20' : 'border-slate-200 bg-white dark:border-white/10 dark:bg-white/5'}`}
                                >
                                    <span className={`material-symbols-outlined text-[18px] ${active ? 'text-primary-600 dark:text-primary-300' : 'text-slate-400 dark:text-slate-500'}`}>{tag.icon}</span>
                                    <span className={`text-sm font-medium ${active ? 'text-primary-700 dark:text-primary-200 font-semibold' : 'text-slate-600 dark:text-slate-300'}`}>{tag.label}</span>
                                    {active && <span className="material-symbols-outlined text-[16px] text-primary-400 ml-1">close</span>}
                                </button>
                            );
                        })}
                    </div>
                </div>

                <div className="px-6 mt-8">
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2" htmlFor="negative-prompt">
                        Detalhamento
                    </label>
                    <div className="relative group">
                        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-blue-500 opacity-20 blur transition duration-500 group-hover:opacity-40 dark:opacity-30 dark:group-hover:opacity-50"></div>
                        <textarea 
                            value={data.negativePrompt}
                            onChange={(e) => updateData({ negativePrompt: e.target.value })}
                            className="relative block w-full resize-none rounded-2xl border-0 bg-white p-5 text-base text-slate-900 shadow-xl shadow-slate-200/50 ring-1 ring-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-primary-500 dark:bg-dark-surface dark:text-white dark:ring-white/10 dark:placeholder:text-slate-500 dark:shadow-none min-h-[180px] transition-all" 
                            id="negative-prompt" 
                            placeholder="Descreva aqui o que não deve aparecer..."
                        ></textarea>
                         <div className="absolute bottom-4 right-4 pointer-events-none">
                            <span className="text-xs font-medium text-slate-400 bg-white/80 dark:bg-dark-surface/80 px-2 py-1 rounded-md backdrop-blur-sm">{data.negativePrompt.length}/500</span>
                        </div>
                    </div>
                </div>

                <div className="px-6 mt-6">
                    <div className="flex gap-4 rounded-2xl bg-slate-50 p-5 border border-slate-100 dark:bg-white/5 dark:border-white/5 backdrop-blur-sm">
                        <div className="flex-shrink-0">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-100 text-accent-600 dark:bg-accent-500/20 dark:text-accent-400">
                                <span className="material-symbols-outlined">auto_awesome</span>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">Nota sobre IA</h4>
                            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                A inteligência artificial fará o possível para evitar estes elementos, mas pequenas variações artísticas podem ocorrer naturalmente.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-100 bg-white/90 backdrop-blur-xl p-5 dark:border-white/5 dark:bg-[#0f172a]/90">
                <div className="mx-auto max-w-md w-full">
                    <button 
                        onClick={onNext}
                        className="group relative flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-primary-600 px-6 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-primary-700 hover:scale-[1.02] active:scale-[0.98] dark:bg-primary-600 dark:hover:bg-primary-500"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                        <span className="relative">Confirmar Proibições</span>
                        <span className="material-symbols-outlined relative text-[22px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NegativePrompt;