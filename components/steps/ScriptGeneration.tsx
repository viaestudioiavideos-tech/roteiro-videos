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

const ScriptGeneration: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const updateScript = (key: keyof BriefingData['script'], value: string) => {
        updateData({
            script: {
                ...data.script,
                [key]: value
            }
        });
    };

    const phases = [
        { id: 1, key: 'hook', title: 'Gancho (Hook)', hint: 'Chame a atenção nos primeiros 3 segundos.', color: 'cyan', time: '0-3s', icon: 'bolt' },
        { id: 2, key: 'pain', title: 'Problema (Pain)', hint: 'Conecte-se com a dor do cliente.', color: 'sky', time: '3-15s', icon: 'sentiment_dissatisfied' },
        { id: 3, key: 'value', title: 'Solução (Value)', hint: 'Apresente seu produto/serviço.', color: 'blue', time: '15-40s', icon: 'check_circle' },
        { id: 4, key: 'trust', title: 'Autoridade (Trust)', hint: 'Por que confiar em você?', color: 'indigo', time: '40-50s', icon: 'verified' },
        { id: 5, key: 'cta', title: 'Chamada (CTA)', hint: 'O que o cliente deve fazer agora?', color: 'violet', time: '50-60s', icon: 'touch_app' },
    ];

    return (
        <div className="flex flex-col h-full min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
             {/* Header & Progress */}
             <div className="sticky top-0 z-30 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-slate-100 dark:border-dark-border transition-colors">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500 shadow-neon' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-all">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight">Estrutura do Roteiro</h2>
                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <main className="relative z-10 flex-1 px-4 py-6 flex flex-col gap-5 pb-40">
                <div className="px-1 mb-2">
                    <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Passo a Passo</h3>
                </div>
                
                {phases.map((phase) => (
                    <div key={phase.id} className="relative bg-white dark:bg-dark-surface rounded-2xl p-4 border border-slate-200 dark:border-dark-border shadow-sm focus-within:ring-2 focus-within:ring-primary-500/50 focus-within:border-primary-500 transition-all">
                        <div className="flex items-center justify-between mb-3">
                             <div className="flex items-center gap-3">
                                 <div className={`flex items-center justify-center h-8 w-8 rounded-lg bg-${phase.color}-100 text-${phase.color}-600 dark:bg-${phase.color}-500/20 dark:text-${phase.color}-300`}>
                                     <span className="material-symbols-outlined text-[18px]">{phase.icon}</span>
                                 </div>
                                 <div>
                                     <h4 className="text-slate-900 dark:text-white font-bold text-sm leading-none">{phase.title}</h4>
                                     <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500">{phase.time}</span>
                                 </div>
                             </div>
                             {/* AI Helper Button (Visual) */}
                             <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-bold text-slate-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                                 <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                                 IA
                             </button>
                        </div>
                        
                        <textarea 
                            value={(data.script as any)[phase.key]}
                            onChange={(e) => updateScript(phase.key as any, e.target.value)}
                            className="w-full bg-slate-50 dark:bg-dark-bg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 border-0 rounded-xl p-3 text-sm resize-none focus:ring-0" 
                            placeholder={phase.hint}
                            rows={3}
                        ></textarea>
                    </div>
                ))}
            </main>

            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-t border-slate-100 dark:border-dark-border pt-4 pb-8 px-5">
                <div className="max-w-md mx-auto w-full">
                    <button 
                        onClick={onNext}
                        className="w-full group relative flex items-center justify-center gap-3 h-14 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white rounded-2xl font-bold text-lg shadow-neon transition-all active:scale-[0.98] overflow-hidden"
                    >
                        <span className="material-symbols-outlined relative z-10" style={{ fontSize: '24px' }}>smart_toy</span>
                        <span className="relative z-10 tracking-wide">Gerar Roteiro</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ScriptGeneration;