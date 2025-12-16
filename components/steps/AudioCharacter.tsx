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

const AudioCharacter: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {
    
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const musicStyles = [
        { id: 'pop', name: 'Pop', img: 'https://images.unsplash.com/photo-1493225255756-d9584f8606e9?auto=format&fit=crop&q=80&w=150', desc: 'Energia positiva.' },
        { id: 'corporate', name: 'Corporativo', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=150', desc: 'Sério e focado.' },
        { id: 'electronic', name: 'Eletrônica', img: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=150', desc: 'Futurista.' },
        { id: 'acoustic', name: 'Acústico', img: 'https://images.unsplash.com/photo-1460039230329-eb070fc6c77c?auto=format&fit=crop&q=80&w=150', desc: 'Orgânico e leve.' },
        // Fixed Lofi Image
        { id: 'lofi', name: 'Lofi', img: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?auto=format&fit=crop&q=80&w=150', desc: 'Relaxante.' },
        { id: 'rock', name: 'Rock', img: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&q=80&w=150', desc: 'Intenso.' },
        { id: 'epic', name: 'Épico', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=150', desc: 'Grandioso.' },
        { id: 'jazz', name: 'Jazz', img: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=150', desc: 'Sofisticado.' },
    ];

    return (
        <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden bg-slate-50 dark:bg-dark-bg shadow-2xl transition-colors duration-300">
             {/* Header & Progress */}
             <div className="sticky top-0 z-30 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-b border-slate-200 dark:border-dark-border transition-colors duration-300">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-dark-surface transition-all">
                        <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>arrow_back_ios_new</span>
                    </button>
                    <div className="flex flex-col items-center">
                        <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight">Áudio</h2>
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

            <main className="relative z-10 flex-1 px-6 py-6 flex flex-col gap-8 pb-36">
                <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-slate-800 dark:text-slate-200 ml-1 flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary-500" style={{ fontSize: '20px' }}>record_voice_over</span>
                        Voz da Narração
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                        <label className="cursor-pointer group relative block">
                            <input 
                                checked={data.audioVoice === 'male'}
                                onChange={() => updateData({ audioVoice: 'male' })}
                                className="peer sr-only" 
                                name="voice" 
                                type="radio" 
                            />
                            <div className="relative flex flex-col items-center justify-center gap-3 p-2 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:shadow-[0_0_20px_rgba(59,130,246,0.5)] peer-checked:scale-[1.02] transition-all duration-300 h-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200" alt="Male Voice" className="w-20 h-20 rounded-full object-cover mb-1 border-2 border-white dark:border-dark-bg shadow-md" />
                                <div className="text-center pb-2">
                                    <p className="text-slate-900 dark:text-white font-semibold text-sm">Masculina</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tom Profundo</p>
                                </div>
                                <div className="absolute top-3 right-3 text-primary-500 opacity-0 peer-checked:opacity-100 transition-all scale-75 peer-checked:scale-100 bg-white rounded-full">
                                    <span className="material-symbols-outlined filled" style={{ fontSize: '20px', display:'block', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>
                        <label className="cursor-pointer group relative block">
                            <input 
                                checked={data.audioVoice === 'female'}
                                onChange={() => updateData({ audioVoice: 'female' })}
                                className="peer sr-only" 
                                name="voice" 
                                type="radio" 
                            />
                            <div className="relative flex flex-col items-center justify-center gap-3 p-2 bg-white dark:bg-dark-surface rounded-2xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:shadow-[0_0_20px_rgba(59,130,246,0.5)] peer-checked:scale-[1.02] transition-all duration-300 h-full overflow-hidden">
                                <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200" alt="Female Voice" className="w-20 h-20 rounded-full object-cover mb-1 border-2 border-white dark:border-dark-bg shadow-md" />
                                <div className="text-center pb-2">
                                    <p className="text-slate-900 dark:text-white font-semibold text-sm">Feminina</p>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Tom Suave</p>
                                </div>
                                <div className="absolute top-3 right-3 text-primary-500 opacity-0 peer-checked:opacity-100 transition-all scale-75 peer-checked:scale-100 bg-white rounded-full">
                                    <span className="material-symbols-outlined filled" style={{ fontSize: '20px', display:'block', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                                </div>
                            </div>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-end px-1">
                        <label className="text-sm font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                            <span className="material-symbols-outlined text-secondary" style={{ fontSize: '20px' }}>queue_music</span>
                            Estilo Musical
                        </label>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                         {musicStyles.map((music) => (
                             <label key={music.id} className="cursor-pointer relative group">
                                <input 
                                    checked={data.audioMusic === music.id}
                                    onChange={() => updateData({ audioMusic: music.id })}
                                    className="peer sr-only" 
                                    name="music" 
                                    type="radio" 
                                />
                                <div className="flex items-center gap-3 p-3 bg-white dark:bg-dark-surface rounded-xl border border-slate-200 dark:border-dark-border peer-checked:border-primary-500 peer-checked:bg-primary-50 dark:peer-checked:bg-primary-900/20 peer-checked:shadow-[0_0_20px_rgba(59,130,246,0.5)] peer-checked:scale-[1.02] transition-all h-full">
                                    <div className="w-12 h-12 shrink-0 rounded-lg overflow-hidden relative">
                                        <img src={music.img} alt={music.name} className="w-full h-full object-cover" />
                                        {data.audioMusic === music.id && (
                                            <div className="absolute inset-0 bg-primary-500/40 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-lg font-bold">play_arrow</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex flex-col min-w-0">
                                        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">{music.name}</span>
                                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight truncate">{music.desc}</p>
                                    </div>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 w-full z-40 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-xl border-t border-slate-200 dark:border-dark-border">
                <div className="max-w-md mx-auto w-full px-6 py-5 pb-9">
                    <button 
                        onClick={onNext}
                        className="w-full group relative flex items-center justify-center gap-3 h-14 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-500 hover:from-primary-500 hover:to-secondary-400 text-white font-bold text-lg shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all active:scale-[0.98] overflow-hidden"
                    >
                        <span className="material-symbols-outlined relative z-20 text-white" style={{ fontSize: '24px' }}>arrow_forward</span>
                        <span className="relative z-20 text-white">Continuar</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AudioCharacter;