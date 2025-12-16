import React from 'react';
import { BriefingData } from '../../types';

interface Props {
    data: BriefingData;
    onFinish: () => void;
    onBack: () => void;
    onEditStep: (step: number) => void;
    totalSteps: number;
    currentStep: number;
}

const FinalReview: React.FC<Props> = ({ data, onFinish, onBack, onEditStep, totalSteps, currentStep }) => {
    
    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    const handleWhatsAppShare = () => {
        // Build character text
        let extrasText = '';
        if (data.extraCharacters && data.extraCharacters.length > 0) {
            extrasText = '\n\n👥 *Elenco Extra:*\n' + data.extraCharacters.map(c => `- ${c.name} (${c.type}): ${c.description}`).join('\n');
        }

        const text = `
🎬 *NOVO BRIEFING DE VÍDEO* 🎬

📌 *Projeto:* ${data.projectName}
📹 *Tipo:* ${data.videoType}
📐 *Formato:* ${data.format}
⏱️ *Duração:* ${data.duration}s

🎯 *Objetivo:*
${data.objective || 'Não informado'}

🎭 *Direção de Arte:*
- Estilo: ${data.visualStyle}
- Iluminação: ${data.lighting}

🎥 *Câmera & Edição:*
- Movimento: ${data.cameraMovement}
- Transição: ${data.transition}
- Legenda: ${data.captionStyle}

🔊 *Áudio:*
- Voz: ${data.audioVoice === 'male' ? 'Masculina' : 'Feminina'}
- Música: ${data.audioMusic}

👤 *Avatar Principal:* ${data.avatarType}
- Nome: ${data.avatarName || 'Não informado'}${extrasText}

📝 *Roteiro Resumido:*
Hook: ${data.script.hook}
CTA: ${data.script.cta}

🤖 *Gerado por Briefing.AI*
`;
        const encoded = encodeURIComponent(text);
        window.open(`https://wa.me/?text=${encoded}`, '_blank');
        onFinish(); // This now triggers save and redirect
    };

    return (
        <div className="relative mx-auto flex h-full min-h-screen w-full max-w-md flex-col overflow-x-hidden pb-32 bg-slate-50 dark:bg-dark-bg shadow-2xl transition-colors duration-300">
             {/* Header & Progress */}
             <div className="sticky top-0 z-30 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-md border-b border-slate-200 dark:border-dark-border transition-colors duration-300">
                 <div className="w-full px-4 pt-3 pb-1">
                    <div className="flex gap-1.5 h-1">
                        {[...Array(totalSteps)].map((_, i) => (
                            <div key={i} className={`flex-1 rounded-full transition-colors duration-300 ${i < currentStep ? 'bg-primary-500' : 'bg-slate-200 dark:bg-dark-border'}`} />
                        ))}
                    </div>
                </div>
                <div className="flex items-center justify-between px-5 py-3">
                    <button onClick={onBack} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-all active:scale-95 shadow-sm">
                        <span className="material-symbols-outlined text-[20px]">arrow_back</span>
                    </button>
                    <h2 className="text-base font-bold tracking-tight text-slate-900 dark:text-white uppercase text-sm">Resumo</h2>
                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <div className="px-6 mt-6 mb-2">
                <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">
                    Tudo pronto?
                </h1>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm leading-relaxed">
                    Revise os detalhes do seu briefing abaixo e envie para produção. O projeto será salvo automaticamente.
                </p>
            </div>

            <div className="flex flex-col gap-4 px-5 mt-4">
                {/* Project */}
                <div className="group relative bg-white dark:bg-dark-surface rounded-2xl p-4 border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md hover:border-primary-200 transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 dark:bg-primary-500/10 dark:text-primary-400">
                            <span className="material-symbols-outlined text-2xl">description</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Projeto</p>
                                <button onClick={() => onEditStep(1)} className="text-slate-300 hover:text-primary-500 dark:text-slate-600 dark:hover:text-primary-400 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-semibold text-base truncate">{data.projectName}</h3>
                            <div className="flex flex-wrap gap-2 mt-2">
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 capitalize">
                                    <span className="material-symbols-outlined text-[14px] mr-1">movie</span> {data.videoType}
                                </span>
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                    <span className="material-symbols-outlined text-[14px] mr-1">timer</span> {data.duration}s
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Script Summary */}
                 <div className="group relative bg-white dark:bg-dark-surface rounded-2xl p-4 border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md hover:border-secondary-200 transition-all duration-300">
                    <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary-50 text-secondary-600 dark:bg-secondary-500/10 dark:text-secondary-400">
                            <span className="material-symbols-outlined text-2xl">article</span>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Roteiro</p>
                                <button onClick={() => onEditStep(3)} className="text-slate-300 hover:text-secondary-500 dark:text-slate-600 dark:hover:text-secondary-400 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                            <div className="relative mt-1 pl-3 border-l-2 border-secondary-200 dark:border-secondary-800">
                                <p className="text-sm italic text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                                    "{data.script.hook || 'Sem roteiro definido'}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                 {/* Avatar */}
                <div className="group relative bg-white dark:bg-dark-surface rounded-2xl p-4 border border-slate-200 dark:border-dark-border shadow-sm hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="relative shrink-0">
                            <img alt="Avatar" className="relative size-14 rounded-full object-cover border-2 border-white dark:border-dark-surface shadow-sm" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100" />
                            <div className="absolute -bottom-1 -right-1 bg-white dark:bg-dark-surface rounded-full p-0.5 border border-slate-100 dark:border-dark-border shadow-sm">
                                <span className="material-symbols-outlined text-secondary-500 text-[16px]">verified</span>
                            </div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-0.5">Estilo & Avatar</p>
                                <button onClick={() => onEditStep(2)} className="text-slate-300 hover:text-secondary-500 dark:text-slate-600 dark:hover:text-secondary-400 transition-colors">
                                    <span className="material-symbols-outlined text-[18px]">edit</span>
                                </button>
                            </div>
                            <h3 className="text-slate-900 dark:text-white font-semibold text-base capitalize">{data.visualStyle}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 capitalize">{data.audioVoice} • {data.audioMusic}</p>
                            {data.avatarName && <p className="text-xs text-slate-400 mt-1">Avatar: {data.avatarName} {data.extraCharacters && data.extraCharacters.length > 0 ? `(+${data.extraCharacters.length} extra)` : ''}</p>}
                        </div>
                    </div>
                </div>

                <div className="mt-8 px-6 mb-4">
                    <label className="flex items-start gap-4 cursor-pointer group p-4 rounded-xl hover:bg-white dark:hover:bg-dark-surface border border-transparent hover:border-slate-100 dark:hover:border-dark-border transition-all">
                        <div className="relative flex items-center pt-0.5">
                            <input className="peer appearance-none size-6 rounded-lg border-2 border-slate-300 dark:border-slate-600 bg-white dark:bg-dark-surface checked:bg-primary-600 checked:border-primary-600 focus:ring-0 focus:ring-offset-0 transition-all cursor-pointer" type="checkbox" />
                            <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-opacity">
                                <span className="material-symbols-outlined text-[18px] font-bold">check</span>
                            </span>
                        </div>
                        <div className="flex-1">
                            <p className="text-sm font-medium text-slate-700 dark:text-slate-300 leading-snug group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                                Confirmo que revisei todas as informações.
                            </p>
                        </div>
                    </label>
                </div>

                <div className="fixed bottom-0 left-0 right-0 z-40 px-5 pt-4 pb-8 bg-white/90 dark:bg-dark-bg/90 backdrop-blur-lg border-t border-slate-200 dark:border-dark-border max-w-md mx-auto">
                    <button 
                        onClick={handleWhatsAppShare}
                        className="group relative w-full flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 active:from-primary-700 active:to-secondary-700 py-4 px-6 shadow-neon transition-all transform active:scale-[0.98]"
                    >
                        <span className="material-symbols-outlined text-white text-[24px]">chat</span>
                        <span className="text-lg font-bold text-white tracking-wide">Salvar e Gerar WhatsApp</span>
                    </button>
                    <p className="text-center text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-widest">Abre o app do WhatsApp</p>
                </div>
            </div>
        </div>
    );
};

export default FinalReview;