import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { StepProfile } from '../components/onboarding/StepProfile';
import { StepFocusGoals } from '../components/onboarding/StepFocusGoals';
import { StepSkillLevel } from '../components/onboarding/StepSkillLevel';
import { StepRoutineFitness } from '../components/onboarding/StepRoutineFitness';
import { StepVoiceAI } from '../components/onboarding/StepVoiceAI';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, preferences, completeOnboarding } = useUser();
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || 'Manoj Kumar',
    careerLevel: preferences?.careerLevel || 'Intermediate (1-3 yrs experience)',
    targetRole: preferences?.targetRole || 'Full-Stack Web Developer',
    focusAreas: preferences?.focusAreas || ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'Fitness & Energy'],
    targetDate: preferences?.targetDate || '2026-12-31',
    skillLevels: preferences?.skillLevels || { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' },
    dailyHours: preferences?.dailyHours || 4,
    fitnessGoal: preferences?.fitnessGoal || 'Build Muscle & Increase Energy',
    workoutType: preferences?.workoutType || 'Gym Weightlifting & Strength',
    aiPersona: preferences?.aiPersona || 'Motivational Tech Mentor',
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit & Finish Onboarding
      completeOnboarding({
        user: { name: formData.name },
        preferences: formData,
      });
      navigate('/app/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0c10] text-gray-100 flex flex-col justify-between p-4 sm:p-8 relative overflow-hidden">
      {/* Background Decorative Gradients */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="max-w-4xl w-full mx-auto flex items-center justify-between z-10 py-2">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/30">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            Life<span className="text-purple-400">OS</span> AI Setup
          </span>
        </div>

        {/* Step Counter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {[1, 2, 3, 4, 5].map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-8 sm:w-10 bg-purple-500 shadow-md shadow-purple-500/50'
                    : isCompleted
                    ? 'w-3 sm:w-4 bg-purple-900'
                    : 'w-3 sm:w-4 bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Wizard Content Card */}
      <div className="max-w-2xl w-full mx-auto my-auto z-10 py-6">
        <div className="bg-[#12131a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/20">
          {currentStep === 1 && (
            <StepProfile formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 2 && (
            <StepFocusGoals formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 3 && (
            <StepSkillLevel formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 4 && (
            <StepRoutineFitness formData={formData} updateFormData={updateFormData} />
          )}
          {currentStep === 5 && (
            <StepVoiceAI formData={formData} updateFormData={updateFormData} />
          )}

          {/* Wizard Action Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-white/10 mt-8">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className={currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}
            >
              Back
            </Button>

            <Button
              variant="primary"
              onClick={handleNext}
              rightIcon={
                currentStep === 5 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30"
            >
              {currentStep === 5 ? 'Complete & Setup LifeOS' : 'Continue Step'}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-xs text-gray-500 z-10 py-2">
        LifeOS Autonomous Learning & Growth Assistant • Fully Customized to Your Goals
      </div>
    </div>
  );
};
