import React, { useState } from 'react';
import { BriefingData, ExtraCharacter } from '../../types';

interface Props {
    data: BriefingData;
    updateData: (data: Partial<BriefingData>) => void;
    onNext: () => void;
    onBack: () => void;
    totalSteps: number;
    currentStep: number;
}

const AvatarSelection: React.FC<Props> = ({ data, updateData, onNext, onBack, totalSteps, currentStep }) => {
    
    // Image Constants
    const CLONE_IMG = "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&q=80&w=400";
    const HUMAN_IMG = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400";
    const MASCOT_IMG = "https://images.unsplash.com/photo-1634896941598-b6b500a502a7?q=80&w=400&auto=format&fit=crop";

    // Local state for main avatar upload
    const handleMainAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                updateData({ 
                    avatarType: 'upload', 
                    uploadedAvatarImage: reader.result as string,
                    avatarUrl: undefined // Clear URL as this is a local upload
                });
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleTheme = () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
    };

    // --- Extra Characters Logic ---
    const [extraName, setExtraName] = useState('');
    const [extraType, setExtraType] = useState('Humano');
    const [extraDesc, setExtraDesc] = useState('');
    const [extraImage, setExtraImage] = useState<string | undefined>(undefined);
    const [isAddingChar, setIsAddingChar] = useState(false);

    const handleExtraImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setExtraImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const addExtraCharacter = () => {
        if (!extraName.trim()) return;
        
        const newChar: ExtraCharacter = {
            id: crypto.randomUUID(),
            name: extraName,
            type: extraType,
            description: extraDesc,
            image: extraImage
        };

        const currentList = data.extraCharacters || [];
        updateData({
            extraCharacters: [...currentList, newChar]
        });

        // Reset
        setExtraName('');
        setExtraType('Humano');
        setExtraDesc('');
        setExtraImage(undefined);
        setIsAddingChar(false);
    };

    const removeExtraCharacter = (id: string) => {
        const currentList = data.extraCharacters || [];
        const newList = currentList.filter((c) => c.id !== id);
        updateData({ extraCharacters: newList });
    };

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
                    <button onClick={onBack} className="flex items-center justify-center size-10 -ml-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-dark-surface transition-all active:scale-95">
                        <span className="material-symbols-outlined">arrow_back_ios_new</span>
                    </button>
                    <h2 className="text-slate-900 dark:text-white text-base font-bold tracking-tight">Avatar & Elenco</h2>
                    <button 
                        onClick={toggleTheme}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[20px] dark:hidden">dark_mode</span>
                        <span className="material-symbols-outlined text-[20px] hidden dark:block">light_mode</span>
                    </button>
                </div>
            </div>

            <main className="flex-1 px-5 pt-4 pb-32">
                <div className="text-center mb-6">
                    <h1 className="text-2xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white mb-2">
                        Quem apresentará?
                    </h1>
                    <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        Defina o apresentador principal e adicione personagens secundários se necessário.
                    </p>
                </div>

                <div className="flex flex-col gap-4">
                    {/* Main Featured Option */}
                    <div 
                        onClick={() => updateData({ avatarType: 'clone', avatarUrl: CLONE_IMG })}
                        className={`group relative overflow-hidden rounded-3xl p-1 transition-all hover:-translate-y-1 cursor-pointer ${data.avatarType === 'clone' ? 'border-2 border-primary-500 bg-primary-50 dark:bg-primary-900/10 shadow-neon scale-[1.02]' : 'bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border'}`}
                    >
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1614027164847-1b28cfe1df60?auto=format&fit=crop&q=80&w=600')] bg-cover bg-center opacity-5 dark:opacity-10"></div>
                        <div className="relative z-10 flex flex-col items-center gap-5 rounded-[1.3rem] p-6">
                            <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-primary-100 dark:bg-primary-900/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                                <span className="material-symbols-outlined text-[14px]">star</span>
                                Recomendado
                            </div>
                            <div className="relative mt-2">
                                <img src={CLONE_IMG} alt="Clone" className="w-20 h-20 rounded-2xl object-cover shadow-lg border-2 border-white dark:border-dark-surface rotate-3 group-hover:rotate-0 transition-transform" />
                                {data.avatarType === 'clone' && (
                                    <div className="absolute -bottom-2 -left-2 flex h-8 w-8 items-center justify-center rounded-full bg-primary-500 text-white shadow-neon ring-4 ring-white dark:ring-dark-bg">
                                        <span className="material-symbols-outlined text-[16px]">check</span>
                                    </div>
                                )}
                            </div>
                            <div className="text-center">
                                <h3 className="text-lg font-bold text-slate-900 dark:text-white">Criar Clone Digital</h3>
                                <p className="mt-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
                                    Use uma selfie para gerar um avatar <br /> idêntico a você em segundos.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Upload Option */}
                    <div 
                        onClick={() => document.getElementById('avatar-upload')?.click()}
                        className={`group relative flex items-center gap-4 rounded-2xl p-4 cursor-pointer transition-all active:scale-[0.99] border ${data.avatarType === 'upload' ? 'bg-primary-50 dark:bg-primary-900/10 border-primary-500 shadow-neon' : 'bg-white dark:bg-dark-surface border-slate-200 dark:border-dark-border'}`}
                    >
                         <input 
                            id="avatar-upload" 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            onChange={handleMainAvatarUpload}
                        />
                         <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-slate-100 dark:bg-dark-card overflow-hidden">
                             {data.uploadedAvatarImage ? (
                                 <img src={data.uploadedAvatarImage} className="w-full h-full object-cover" alt="Uploaded" />
                             ) : (
                                 <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-2xl">cloud_upload</span>
                             )}
                        </div>
                        <div className="flex-1">
                            <h4 className="font-semibold text-slate-900 dark:text-white">Upload de Foto</h4>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Carregar foto do cliente</p>
                        </div>
                         <div className={`h-6 w-6 rounded-full border-2 transition-colors flex items-center justify-center ${data.avatarType === 'upload' ? 'border-primary-500 bg-primary-500' : 'border-slate-300 dark:border-dark-border bg-transparent'}`}>
                             {data.avatarType === 'upload' && <span className="material-symbols-outlined text-white text-[14px]">check</span>}
                         </div>
                    </div>

                    <div className="flex items-center gap-4 py-2 opacity-60">
                        <div className="h-px flex-1 bg-slate-300 dark:bg-dark-border"></div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">Outras Opções</span>
                        <div className="h-px flex-1 bg-slate-300 dark:bg-dark-border"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                         {/* Human */}
                        <div 
                            onClick={() => updateData({ avatarType: 'human', avatarUrl: HUMAN_IMG })}
                            className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-dark-surface shadow-sm transition-all cursor-pointer active:scale-[0.98] ${data.avatarType === 'human' ? 'border-2 border-primary-500 shadow-neon' : 'border border-slate-200 dark:border-dark-border'}`}
                        >
                            <div className="aspect-[4/5] w-full bg-slate-100 dark:bg-dark-card relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${HUMAN_IMG}")` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                {data.avatarType === 'human' && (
                                    <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center shadow-neon">
                                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="font-bold text-white text-sm leading-tight drop-shadow-md">Humano Realista</h4>
                                </div>
                            </div>
                        </div>
                        {/* Mascot */}
                        <div 
                            onClick={() => updateData({ avatarType: 'mascot', avatarUrl: MASCOT_IMG })}
                            className={`group relative flex flex-col overflow-hidden rounded-3xl bg-white dark:bg-dark-surface shadow-sm transition-all cursor-pointer active:scale-[0.98] ${data.avatarType === 'mascot' ? 'border-2 border-primary-500 shadow-neon' : 'border border-slate-200 dark:border-dark-border'}`}
                        >
                            <div className="aspect-[4/5] w-full bg-slate-100 dark:bg-dark-card relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url("${MASCOT_IMG}")` }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                {data.avatarType === 'mascot' && (
                                    <div className="absolute top-3 right-3 h-6 w-6 rounded-full bg-primary-500 flex items-center justify-center shadow-neon">
                                        <span className="material-symbols-outlined text-white text-[14px]">check</span>
                                    </div>
                                )}
                                <div className="absolute bottom-4 left-4 right-4">
                                    <h4 className="font-bold text-white text-sm leading-tight drop-shadow-md">Mascote 3D</h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 mt-2">
                        {/* Avatar Name Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 ml-1">Nome do Personagem Principal</label>
                            <input
                                type="text"
                                value={data.avatarName}
                                onChange={(e) => updateData({ avatarName: e.target.value })}
                                className="w-full h-12 px-4 rounded-xl bg-white dark:bg-dark-surface border border-slate-200 dark:border-dark-border text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white dark:focus:bg-dark-surface transition-all placeholder:text-slate-400"
                                placeholder="Ex: João, Assistente Virtual..."
                            />
                        </div>

                         {/* More Characters Logic */}
                         <div className="rounded-2xl border border-slate-200 dark:border-dark-border bg-white dark:bg-dark-surface p-4 shadow-sm">
                             <div className="flex items-center justify-between mb-3">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input 
                                        type="checkbox"
                                        checked={data.hasMoreCharacters}
                                        onChange={(e) => updateData({ hasMoreCharacters: e.target.checked })}
                                        className="w-5 h-5 rounded-md border-slate-300 text-primary-600 focus:ring-primary-500"
                                    />
                                    <span className="text-sm font-semibold text-slate-900 dark:text-white">Adicionar mais personagens?</span>
                                </label>
                             </div>
                             
                             {data.hasMoreCharacters && (
                                 <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                                     {/* Add New Character Form */}
                                     {isAddingChar ? (
                                         <div className="bg-slate-50 dark:bg-dark-bg p-4 rounded-xl border border-slate-200 dark:border-dark-border space-y-3">
                                             <div className="flex items-center gap-3">
                                                 <div onClick={() => document.getElementById('extra-char-upload')?.click()} className="h-12 w-12 rounded-lg bg-slate-200 dark:bg-dark-card flex items-center justify-center cursor-pointer overflow-hidden border border-slate-300 dark:border-dark-border shrink-0">
                                                     {extraImage ? (
                                                         <img src={extraImage} className="h-full w-full object-cover" alt="preview" />
                                                     ) : (
                                                         <span className="material-symbols-outlined text-slate-400">add_a_photo</span>
                                                     )}
                                                     <input id="extra-char-upload" type="file" className="hidden" accept="image/*" onChange={handleExtraImageUpload} />
                                                 </div>
                                                 <input 
                                                    type="text" 
                                                    placeholder="Nome do personagem" 
                                                    value={extraName}
                                                    onChange={(e) => setExtraName(e.target.value)}
                                                    className="flex-1 h-10 rounded-lg text-sm bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border px-3"
                                                />
                                             </div>
                                             
                                             <select 
                                                value={extraType}
                                                onChange={(e) => setExtraType(e.target.value)}
                                                className="w-full h-10 rounded-lg text-sm bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border px-3"
                                            >
                                                <option>Humano</option>
                                                <option>Mascote</option>
                                                <option>Cliente</option>
                                                <option>Voz Off</option>
                                            </select>

                                             <textarea
                                                placeholder="Breve descrição ou papel no vídeo..."
                                                value={extraDesc}
                                                onChange={(e) => setExtraDesc(e.target.value)}
                                                className="w-full h-20 rounded-lg text-sm bg-white dark:bg-dark-surface border border-slate-300 dark:border-dark-border p-3 resize-none"
                                             ></textarea>

                                             <div className="flex gap-2 justify-end mt-2">
                                                 <button onClick={() => setIsAddingChar(false)} className="px-3 py-1.5 text-xs font-medium text-slate-500 hover:text-slate-700">Cancelar</button>
                                                 <button onClick={addExtraCharacter} className="px-3 py-1.5 text-xs font-bold bg-primary-600 text-white rounded-lg hover:bg-primary-700">Salvar Personagem</button>
                                             </div>
                                         </div>
                                     ) : (
                                         <button 
                                            onClick={() => setIsAddingChar(true)}
                                            className="w-full py-2 border border-dashed border-primary-300 dark:border-primary-800 rounded-xl text-primary-600 dark:text-primary-400 text-sm font-medium hover:bg-primary-50 dark:hover:bg-primary-900/10 transition-colors flex items-center justify-center gap-2"
                                         >
                                             <span className="material-symbols-outlined text-[18px]">add</span>
                                             Novo Personagem
                                         </button>
                                     )}
                                     
                                     {/* List of Extra Characters */}
                                     {data.extraCharacters && data.extraCharacters.length > 0 && (
                                         <div className="flex flex-col gap-2 mt-4">
                                             {data.extraCharacters.map((char) => (
                                                 <div key={char.id} className="flex items-start justify-between p-3 bg-slate-50 dark:bg-dark-bg rounded-xl border border-slate-100 dark:border-dark-border">
                                                     <div className="flex gap-3">
                                                         <div className="h-10 w-10 rounded-lg bg-slate-200 dark:bg-dark-card overflow-hidden shrink-0">
                                                             {char.image ? (
                                                                 <img src={char.image} className="h-full w-full object-cover" alt={char.name} />
                                                             ) : (
                                                                 <div className="h-full w-full flex items-center justify-center text-xs font-bold text-slate-400 bg-slate-200 dark:bg-dark-card">{char.name[0]}</div>
                                                             )}
                                                         </div>
                                                         <div>
                                                             <h5 className="text-sm font-bold text-slate-800 dark:text-slate-200 leading-tight">{char.name}</h5>
                                                             <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/10 text-slate-500 dark:text-slate-400">{char.type}</span>
                                                             {char.description && <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{char.description}</p>}
                                                         </div>
                                                     </div>
                                                     <button onClick={() => removeExtraCharacter(char.id)} className="text-slate-400 hover:text-red-500 p-1">
                                                         <span className="material-symbols-outlined text-[18px]">delete</span>
                                                     </button>
                                                 </div>
                                             ))}
                                         </div>
                                     )}
                                 </div>
                             )}
                         </div>
                    </div>
                </div>
            </main>

            <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-dark-bg/90 p-5 backdrop-blur-xl border-t border-slate-100 dark:border-dark-border pb-8">
                <button 
                    onClick={onNext}
                    className="group relative w-full flex items-center justify-center h-14 rounded-2xl bg-primary-600 hover:bg-primary-700 text-white shadow-neon transition-all active:scale-[0.98] overflow-hidden"
                >
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span className="relative z-10 text-base font-bold flex items-center gap-2">
                        Continuar
                        <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                    </span>
                </button>
            </div>
        </div>
    );
};

export default AvatarSelection;