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

const ArtDirection: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {
    
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const visualStyles = [
        { id: 'Cinemático', icon: 'movie_filter', desc: 'Realismo e alta qualidade', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'Minimalista', icon: 'check_box_outline_blank', desc: 'Clean, foco no produto', img: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'Futurista', icon: 'hub', desc: 'Tech, neons e glow', img: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'Ilustração', icon: 'draw', desc: 'Vetorial e artístico', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'Corporativo', icon: 'business', desc: 'Sério e profissional', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=300&h=200' },
        { id: 'Pop Art', icon: 'palette', desc: 'Cores vibrantes e fortes', img: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=300&h=200' },
    ];

    const lightingStyles = [
        { id: 'Natural', img: 'https://images.unsplash.com/photo-1502444330042-d1a1ddf9bb5b?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Estúdio', img: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&q=80&w=200' }, 
        { id: 'Dramática', img: 'https://images.unsplash.com/photo-1496360166961-10a51d5f367a?auto=format&fit=crop&q=80&w=200' }, 
        // Fixed Noturna Image
        { id: 'Noturna', img: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&q=80&w=200' },
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
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-all">
                        <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">Direção de Arte</h2>
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

            <main className="relative z-10 flex-1 px-6 py-6 flex flex-col gap-8 pb-32">
                <div className="space-y-1">
                    <h1 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">
                        Estilo & Mood
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Defina a atmosfera visual do seu vídeo.</p>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between">
                        <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>style</span>
                            Estilo Visual
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {visualStyles.map((style) => (
                            <label key={style.id} className="cursor-pointer group relative block">
                                <input 
                                    checked={data.visualStyle === style.id}
                                    onChange={() => updateData({ visualStyle: style.id })}
                                    className="peer sr-only" 
                                    name="visual_style" 
                                    type="radio" 
                                />
                                <div className="relative flex flex-col overflow-hidden rounded-2xl border-2 border-transparent bg-white dark:bg-dark-surface transition-all duration-300 peer-checked:border-primary-500 peer-checked:shadow-neon peer-checked:scale-[1.02]">
                                     {/* Image Header */}
                                     <div className="h-24 w-full bg-slate-200 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-primary-900/10 z-10 group-hover:bg-transparent transition-colors"></div>
                                        <img src={style.img} alt={style.id} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                        <div className="absolute top-2 right-2 z-20 text-white opacity-0 peer-checked:opacity-100 transition-all scale-75 peer-checked:scale-100 bg-primary-500 rounded-full p-1 shadow-lg">
                                            <span className="material-symbols-outlined filled text-[16px]" style={{ display:'block', fontVariationSettings: "'FILL' 1" }}>check</span>
                                        </div>
                                     </div>
                                    <div className="p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="material-symbols-outlined text-slate-400 peer-checked:text-primary-500 text-[20px]">{style.icon}</span>
                                            <p className="text-slate-900 dark:text-white font-bold text-sm">{style.id}</p>
                                        </div>
                                        <p className="text-slate-500 dark:text-slate-400 text-[10px] font-medium leading-tight">{style.desc}</p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>light_mode</span>
                        Iluminação
                    </label>
                    <div className="flex overflow-x-auto pb-4 gap-3 no-scrollbar -mx-6 px-6 snap-x">
                        {lightingStyles.map((light) => (
                            <label key={light.id} className="cursor-pointer group relative flex-shrink-0 snap-start">
                                <input 
                                    checked={data.lighting === light.id}
                                    onChange={() => updateData({ lighting: light.id })}
                                    className="peer sr-only" 
                                    name="lighting" 
                                    type="radio" 
                                />
                                <div className="w-28 h-32 flex flex-col items-center justify-center gap-0 bg-white dark:bg-dark-surface rounded-2xl border-2 border-transparent hover:border-slate-200 dark:hover:border-slate-700 peer-checked:border-primary-500 peer-checked:shadow-neon peer-checked:scale-105 transition-all duration-200 overflow-hidden">
                                    <div className="w-full h-20 relative">
                                        <img src={light.img} alt={light.id} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                        {data.lighting === light.id && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-primary-500/30">
                                                <span className="material-symbols-outlined text-white text-2xl drop-shadow-md">check_circle</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1 flex items-center justify-center w-full bg-white dark:bg-dark-surface">
                                         <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 peer-checked:text-primary-600 dark:peer-checked:text-primary-400">{light.id}</span>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-t border-slate-200 dark:border-dark-border">
                <div className="max-w-md mx-auto w-full px-6 py-5 pb-8">
                    <button 
                        onClick={onNext}
                        className="w-full group relative flex items-center justify-center h-14 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-neon transition-all active:scale-[0.98] overflow-hidden"
                    >
                         <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                        <span className="relative z-10 flex items-center gap-2 font-bold text-lg">
                            Continuar
                            <span className="material-symbols-outlined relative z-10" style={{ fontSize: '24px' }}>arrow_forward</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ArtDirection;