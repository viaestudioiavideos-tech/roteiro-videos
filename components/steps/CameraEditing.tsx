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

const CameraEditing: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {
    
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const cameraMoves = [
        { id: 'Estático', img: 'https://images.unsplash.com/photo-1512790182412-b19e6d62bc39?auto=format&fit=crop&q=80&w=200' },
        { id: 'Suave', img: 'https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Dinâmico', img: 'https://images.unsplash.com/photo-1495707902641-75cac588d2e9?auto=format&fit=crop&q=80&w=200' },
        { id: 'Handheld', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Órbita', img: 'https://images.unsplash.com/photo-1506260408121-e353d10b87c7?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Panorâmica', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=200' }, 
    ];

    const transitions = [
        { id: 'Corte Seco', img: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Fade', img: 'https://images.unsplash.com/photo-1516575150278-77136aed6920?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Zoom', img: 'https://images.unsplash.com/photo-1504198266287-1659872e6590?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Criativo', img: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=200' }, 
    ];

    const renderCaptionImage = (captionType: string) => {
        if (captionType === 'Normal') {
            return <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover" alt="Subtitles" />;
        } else {
            return <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=150" className="w-full h-full object-cover opacity-80" alt="No Subtitles" />;
        }
    };

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-dark-bg shadow-2xl transition-colors duration-300">
             {/* Header & Progress */}
             <div className="sticky top-0 z-30 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-b border-slate-200 dark:border-dark-border">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500 shadow-neon' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-dark-surface transition-all active:scale-95">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h2 className="text-slate-900 dark:text-white text-base font-semibold tracking-tight">Câmera e Edição</h2>
                    </div>
                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <main className="relative z-10 flex-1 px-5 py-6 flex flex-col gap-8 pb-40">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 ml-1">
                        <span className="flex h-2 w-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"></span>
                        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase text-[11px]">Movimento de Câmera</label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        {cameraMoves.map((cam) => (
                            <label key={cam.id} className="cursor-pointer group relative block">
                                <input 
                                    checked={data.cameraMovement === cam.id}
                                    onChange={() => updateData({ cameraMovement: cam.id })}
                                    className="peer sr-only" 
                                    name="camera" 
                                    type="radio" 
                                />
                                <div className="relative flex flex-col items-center justify-center gap-0 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:shadow-neon peer-checked:scale-[1.02] transition-all duration-300 h-28 overflow-hidden">
                                    <img src={cam.img} alt={cam.id} className="w-full h-20 object-cover opacity-80" />
                                    <div className="absolute inset-0 bg-black/20 peer-checked:bg-transparent transition-colors"></div>
                                    <div className="w-full h-8 flex items-center justify-center bg-white dark:bg-dark-surface">
                                         <span className="text-slate-600 dark:text-slate-300 font-medium text-sm peer-checked:text-primary-700 dark:peer-checked:text-primary-300 relative z-10">{cam.id}</span>
                                    </div>
                                    <div className="absolute top-2 right-2 text-primary-500 opacity-0 peer-checked:opacity-100 transition-all scale-50 peer-checked:scale-100 bg-white rounded-full shadow-lg">
                                        <span className="material-symbols-outlined filled" style={{ fontSize: '18px', display:'block', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 ml-1">
                        <span className="flex h-2 w-2 rounded-full bg-secondary shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase text-[11px]">Transições</label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                         {transitions.map((trans) => (
                             <label key={trans.id} className="cursor-pointer group relative block">
                                <input 
                                    checked={data.transition === trans.id}
                                    onChange={() => updateData({ transition: trans.id })}
                                    className="peer sr-only" 
                                    name="transition" 
                                    type="radio" 
                                />
                                <div className="relative flex flex-col items-center justify-center gap-0 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-secondary peer-checked:bg-secondary-50 dark:peer-checked:bg-secondary-900/20 peer-checked:shadow-[0_0_20px_rgba(6,182,212,0.5)] peer-checked:scale-[1.02] transition-all duration-300 h-28 overflow-hidden">
                                     <img src={trans.img} alt={trans.id} className="w-full h-20 object-cover opacity-80" />
                                     <div className="absolute inset-0 bg-black/20 peer-checked:bg-transparent transition-colors"></div>
                                     <div className="w-full h-8 flex items-center justify-center bg-white dark:bg-dark-surface">
                                        <span className="text-slate-600 dark:text-slate-300 font-medium text-sm peer-checked:text-secondary-700 dark:peer-checked:text-secondary-300 relative z-10">{trans.id}</span>
                                     </div>
                                    <div className="absolute top-2 right-2 text-secondary opacity-0 peer-checked:opacity-100 transition-all scale-50 peer-checked:scale-100 bg-white rounded-full shadow-lg">
                                        <span className="material-symbols-outlined filled" style={{ fontSize: '18px', display:'block', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    </div>
                                </div>
                            </label>
                         ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-2 ml-1">
                        <span className="flex h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_rgba(14,165,233,0.8)]"></span>
                        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase text-[11px]">Estilo de Legenda</label>
                    </div>
                    <div className="flex flex-col gap-3">
                        {['Normal', 'Sem Legenda'].map((caption) => (
                            <label key={caption} className="cursor-pointer group relative block">
                                <input 
                                    checked={data.captionStyle === caption}
                                    onChange={() => updateData({ captionStyle: caption })}
                                    className="peer sr-only" 
                                    name="caption" 
                                    type="radio" 
                                />
                                <div className="relative flex items-center justify-between px-2 py-2 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-accent peer-checked:bg-accent-50 dark:peer-checked:bg-accent-900/20 peer-checked:shadow-[0_0_20px_rgba(14,165,233,0.5)] peer-checked:scale-[1.02] transition-all duration-300">
                                    <div className="flex items-center gap-4 w-full">
                                        <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-200 relative shrink-0">
                                            {renderCaptionImage(caption)}
                                        </div>
                                        <span className="text-slate-700 dark:text-slate-200 font-bold text-base">{caption}</span>
                                    </div>
                                    <div className="text-accent opacity-0 peer-checked:opacity-100 transition-all pr-4">
                                        <span className="material-symbols-outlined filled" style={{ fontSize: '24px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                 {/* Seção de Libras Separada */}
                 <div className="flex flex-col gap-4 mt-2">
                    <div className="flex items-center gap-2 ml-1">
                        <span className="flex h-2 w-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
                        <label className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-wide uppercase text-[11px]">Intérprete de Libras (Acessibilidade)</label>
                    </div>
                    <div className="flex gap-4">
                        <label className="flex-1 cursor-pointer group relative block">
                            <input 
                                checked={data.libras === true}
                                onChange={() => updateData({ libras: true })}
                                className="peer sr-only" 
                                name="libras" 
                                type="radio" 
                            />
                            <div className="relative flex items-center justify-center px-4 py-4 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-indigo-500 peer-checked:bg-indigo-50 dark:peer-checked:bg-indigo-900/20 peer-checked:shadow-[0_0_20px_rgba(99,102,241,0.5)] peer-checked:scale-[1.02] transition-all duration-300">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-indigo-600 dark:peer-checked:text-indigo-400">sign_language</span>
                                    <span className="text-slate-700 dark:text-slate-200 font-bold text-base">Sim</span>
                                </div>
                                <div className="absolute top-2 right-2 text-indigo-500 opacity-0 peer-checked:opacity-100 transition-all scale-75 peer-checked:scale-100">
                                    <span className="material-symbols-outlined filled text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>
                        <label className="flex-1 cursor-pointer group relative block">
                            <input 
                                checked={data.libras === false}
                                onChange={() => updateData({ libras: false })}
                                className="peer sr-only" 
                                name="libras" 
                                type="radio" 
                            />
                             <div className="relative flex items-center justify-center px-4 py-4 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-slate-400 dark:peer-checked:border-slate-500 peer-checked:bg-slate-100 dark:peer-checked:bg-white/5 transition-all duration-300">
                                <div className="flex flex-col items-center gap-1">
                                    <span className="material-symbols-outlined text-3xl text-slate-400 peer-checked:text-slate-600 dark:peer-checked:text-slate-300">do_not_touch</span>
                                    <span className="text-slate-700 dark:text-slate-200 font-bold text-base">Não</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

            </main>

            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-t border-slate-200 dark:border-dark-border">
                <div className="max-w-md mx-auto w-full px-5 py-4 pb-8">
                    <button 
                        onClick={onNext}
                        className="group relative w-full flex items-center justify-center gap-3 h-14 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-neon transition-all active:scale-[0.98] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <span className="material-symbols-outlined relative z-10" style={{ fontSize: '24px' }}>arrow_forward</span>
                        <span className="relative z-10 font-bold text-lg tracking-wide">Continuar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CameraEditing;