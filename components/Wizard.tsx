import React, { useState, useEffect } from 'react';
import { BriefingData } from '../types';

// Step Components
import ProjectDetails from './steps/ProjectDetails';
import AvatarSelection from './steps/AvatarSelection';
import ScriptGeneration from './steps/ScriptGeneration';
import ArtDirection from './steps/ArtDirection';
import CameraEditing from './steps/CameraEditing';
import AudioCharacter from './steps/AudioCharacter';
import NegativePrompt from './steps/NegativePrompt';
import FinalReview from './steps/FinalReview';

interface WizardProps {
    initialData: BriefingData;
    onFinish: (data: BriefingData) => void;
    onBack: () => void;
    onSave: (data: BriefingData) => BriefingData;
}

const Wizard: React.FC<WizardProps> = ({ initialData, onFinish, onBack, onSave }) => {
    const [step, setStep] = useState(1);
    const [data, setData] = useState<BriefingData>(initialData);

    // Update state when initialData changes (e.g. loading a different project)
    useEffect(() => {
        setData(initialData);
    }, [initialData]);

    const updateData = (updates: Partial<BriefingData>) => {
        setData(prev => ({ ...prev, ...updates }));
    };

    const nextStep = () => {
        try {
            // Attempt to save and get back the object with ID
            const savedProject = onSave(data);
            
            // If we didn't have an ID before, update local state with the new ID
            // This prevents creating duplicate projects on subsequent steps
            if (!data.id && savedProject.id) {
                setData(prev => ({ ...prev, id: savedProject.id }));
            }
        } catch (error) {
            console.error("Auto-save failed, continuing navigation anyway", error);
        }
        
        setStep(prev => prev + 1);
    };
    
    const prevStep = () => {
        if (step === 1) {
            onBack();
        } else {
            setStep(prev => prev - 1);
        }
    };

    const goToStep = (stepNumber: number) => {
        setStep(stepNumber);
    };

    return (
        <div className="relative flex flex-col h-full min-h-screen">
             {step === 1 && <ProjectDetails data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={1} />}
             {step === 2 && <AvatarSelection data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={2} />}
             {step === 3 && <ScriptGeneration data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={3} />}
             {step === 4 && <ArtDirection data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={4} />}
             {step === 5 && <CameraEditing data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={5} />}
             {step === 6 && <AudioCharacter data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={6} />}
             {step === 7 && <NegativePrompt data={data} updateData={updateData} onNext={nextStep} onBack={prevStep} totalSteps={8} currentStep={7} />}
             {step === 8 && <FinalReview data={data} onFinish={() => onFinish(data)} onBack={prevStep} onEditStep={goToStep} totalSteps={8} currentStep={8} />}
        </div>
    );
};

export default Wizard;