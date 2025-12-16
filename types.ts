export interface ExtraCharacter {
    id: string;
    name: string;
    type: string;
    description: string;
    image?: string; // Base64 or URL
}

export interface BriefingData {
    id?: string; // Unique ID for saving
    lastModified?: number;
    projectName: string;
    videoType: 'institucional' | 'propaganda' | 'venda' | 'educacional' | 'outros';
    format: 'vertical' | 'horizontal';
    duration: number; // in seconds
    objective: string;
    assetsLink: string;
    avatarType: 'clone' | 'human' | 'mascot' | 'audio_only' | 'upload';
    avatarName?: string;
    avatarUrl?: string; // URL pública para compartilhamento (se aplicável)
    uploadedAvatarImage?: string; // For preview (Base64)
    hasMoreCharacters?: boolean;
    extraCharacters?: ExtraCharacter[];
    script: {
      hook: string;
      pain: string;
      value: string;
      trust: string;
      cta: string;
    };
    visualStyle: string; // e.g., 'Cinemático'
    lighting: string;
    colorGrading: string;
    cameraMovement: string;
    transition: string;
    captionStyle: string;
    libras: boolean; // New field for sign language interpreter
    audioVoice: 'male' | 'female';
    audioMusic: string;
    negativePrompt: string;
}

export const INITIAL_DATA: BriefingData = {
    projectName: 'Novo Projeto',
    videoType: 'institucional',
    format: 'vertical',
    duration: 60,
    objective: '',
    assetsLink: '',
    avatarType: 'human',
    avatarName: '',
    avatarUrl: '',
    hasMoreCharacters: false,
    extraCharacters: [],
    script: {
        hook: '',
        pain: '',
        value: '',
        trust: '',
        cta: ''
    },
    visualStyle: 'Cinemático',
    lighting: 'Natural',
    colorGrading: 'Padrão',
    cameraMovement: 'Estático',
    transition: 'Corte Seco',
    captionStyle: 'Moderno',
    libras: false,
    audioVoice: 'female',
    audioMusic: 'pop',
    negativePrompt: 'Pessoas, '
};