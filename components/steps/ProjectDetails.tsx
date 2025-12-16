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

const ProjectDetails: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {
    // Helper to format time
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        if (m === 0) return `${s}s`;
        return `${m}m ${s > 0 ? `${s}s` : ''}`;
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const videoTypes = [
        { id: 'institucional', label: 'Institucional', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'propaganda', label: 'Propaganda', img: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'venda', label: 'Venda Prod.', img: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'educacional', label: 'Educacional', img: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=300&h=200' },
        // Fixed broken image for 'outros'
        { id: 'outros', label: 'Outros', img: 'https://images.unsplash.com/photo-1601506521937-2433d3e3a936?auto=format&fit=crop&q=80&w=300&h=200' },
    ];

    return (
        <div className="flex flex-col h-full min-h-screen bg-slate-50 dark:bg-dark-bg transition-colors duration-300">
            {/* Header & Progress */}
            <div className="sticky top-0 z-30 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-slate-100 dark:border-dark-border transition-colors">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition-all active:scale-95">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight">Detalhes do Projeto</h2>
                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <main className="relative z-10 flex-1 px-5 py-6 flex flex-col gap-8 pb-32">
                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 ml-1">Nome do Projeto</label>
                    <div className="relative group">
                        <input
                            className="w-full bg-white dark:bg-dark-surface text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border border-slate-200 dark:border-dark-border rounded-2xl h-14 px-4 text-base transition-all shadow-sm group-hover:border-primary-300 dark:group-hover:border-primary-600"
                            placeholder="Ex: Lançamento Verão 2024"
                            type="text"
                            value={data.projectName}
                            onChange={(e) => updateData({ projectName: e.target.value })}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 ml-1">Tipo de Vídeo</label>
                    {/* Horizontal Scroll Container */}
                    <div className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 no-scrollbar snap-x touch-pan-x">
                        {videoTypes.map((type) => (
                            <label key={type.id} className="relative flex-none snap-start cursor-pointer group min-w-[140px]">
                                <input
                                    checked={data.videoType === type.id}
                                    onChange={() => updateData({ videoType: type.id as any })}
                                    className="peer sr-only"
                                    name="video_type"
                                    type="radio"
                                />
                                <div className="w-full h-36 rounded-2xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border overflow-hidden flex flex-col transition-all duration-300 peer-checked:border-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500/50 peer-checked:shadow-glow active:scale-95">
                                    <div className="h-24 w-full relative">
                                        <img src={type.img} alt={type.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                        <div className="absolute bottom-2 right-2 text-primary-400 opacity-0 peer-checked:opacity-100 transition-opacity scale-75 peer-checked:scale-100">
                                            <span className="material-symbols-outlined filled" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                        </div>
                                    </div>
                                    <div className="flex-1 flex items-center justify-center bg-white dark:bg-dark-surface peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/30">
                                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300 peer-checked:text-primary-700 dark:peer-checked:text-primary-400 text-center leading-tight">
                                            {type.label}
                                        </span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-3">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 ml-1">Formato</label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="cursor-pointer group relative block">
                            <input
                                checked={data.format === 'vertical'}
                                onChange={() => updateData({ format: 'vertical' })}
                                className="peer sr-only"
                                name="format"
                                type="radio"
                            />
                            <div className="relative flex flex-col items-center gap-0 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500/50 peer-checked:shadow-glow active:scale-[0.98] transition-all duration-300 h-full overflow-hidden">
                                <div className="w-full h-24 bg-slate-100 dark:bg-dark-card relative">
                                     <img src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&q=80&w=300&h=200" className="w-full h-full object-cover opacity-80" alt="Vertical" />
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                         <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>smartphone</span>
                                     </div>
                                </div>
                                <div className="p-3 text-center w-full bg-white dark:bg-dark-surface peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/30">
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">Vertical</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium mt-0.5">9:16 Reels/TikTok</p>
                                </div>
                            </div>
                        </label>
                        <label className="cursor-pointer group relative block">
                            <input
                                checked={data.format === 'horizontal'}
                                onChange={() => updateData({ format: 'horizontal' })}
                                className="peer sr-only"
                                name="format"
                                type="radio"
                            />
                             <div className="relative flex flex-col items-center gap-0 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:ring-2 peer-checked:ring-primary-500/50 peer-checked:shadow-glow active:scale-[0.98] transition-all duration-300 h-full overflow-hidden">
                                <div className="w-full h-24 bg-slate-100 dark:bg-dark-card relative">
                                     <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=300&h=200" className="w-full h-full object-cover opacity-80" alt="Horizontal" />
                                     <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                                         <span className="material-symbols-outlined text-white" style={{ fontSize: '32px' }}>desktop_windows</span>
                                     </div>
                                </div>
                                <div className="p-3 text-center w-full bg-white dark:bg-dark-surface peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/30">
                                    <p className="text-slate-900 dark:text-white font-bold text-sm">Horizontal</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium mt-0.5">16:9 YouTube</p>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="p-5 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border shadow-sm relative overflow-hidden">
                    <div className="flex justify-between items-center mb-6 relative z-10">
                        <label className="text-sm font-bold text-slate-700 dark:text-slate-200">Duração</label>
                        <div className="bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 px-3 py-1.5 rounded-lg shadow-sm">
                            <span className="text-primary-600 dark:text-primary-400 font-bold font-mono text-lg tracking-tight">
                                {formatTime(data.duration)}
                            </span>
                        </div>
                    </div>
                    <div className="relative w-full h-6 flex items-center px-1 z-10">
                        <input
                            className="w-full appearance-none bg-transparent z-10 focus:outline-none"
                            max="1800"
                            min="15"
                            step="15"
                            type="range"
                            value={data.duration}
                            onChange={(e) => updateData({ duration: Number(e.target.value) })}
                        />
                    </div>
                    <div className="flex justify-between px-1 text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase mt-3 tracking-wide relative z-10">
                        <span>15s</span>
                        <span>5m</span>
                        <span>15m</span>
                        <span>30m</span>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400 ml-1">Objetivo (CTA)</label>
                    <div className="relative group">
                        <textarea
                            value={data.objective}
                            onChange={(e) => updateData({ objective: e.target.value })}
                            className="flex w-full min-w-0 resize-none bg-white dark:bg-dark-surface text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 border border-slate-200 dark:border-dark-border rounded-2xl min-h-[120px] placeholder:text-slate-400 dark:placeholder:text-slate-600 p-4 text-base leading-relaxed transition-all shadow-sm"
                            placeholder="Ex: Incentivar o clique no link da bio..."
                        ></textarea>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-t border-slate-100 dark:border-dark-border transition-colors">
                <div className="max-w-md mx-auto w-full px-5 py-4 pb-8">
                    <button
                        onClick={onNext}
                        className="w-full group relative flex items-center justify-center gap-3 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-2xl font-bold text-lg shadow-lg shadow-primary-500/25 transition-all active:scale-[0.98] overflow-hidden"
                    >
                        <span className="material-symbols-outlined relative z-10 text-white/90" style={{ fontSize: '24px' }}>arrow_forward</span>
                        <span className="relative z-10">Continuar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProjectDetails;