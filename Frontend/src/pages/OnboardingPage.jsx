import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useVoiceGuider } from '../context/VoiceGuiderContext';
import { StepPersonalIdentity } from '../components/onboarding/StepPersonalIdentity';
import { StepAcademicCredentials } from '../components/onboarding/StepAcademicCredentials';
import { StepGraduationStatus } from '../components/onboarding/StepGraduationStatus';
import { StepWorkExperience } from '../components/onboarding/StepWorkExperience';
import { StepProjectPrimary } from '../components/onboarding/StepProjectPrimary';
import { StepProjectSecondary } from '../components/onboarding/StepProjectSecondary';
import { StepTargetSpecialization } from '../components/onboarding/StepTargetSpecialization';
import { StepSkillAssessment } from '../components/onboarding/StepSkillAssessment';
import { StepCommitmentTimeline } from '../components/onboarding/StepCommitmentTimeline';
import { StepVoiceAISecurity } from '../components/onboarding/StepVoiceAISecurity';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, preferences, onboardingCompleted, completeOnboarding } = useUser();
  const { setupCustomPin, setIsLocked } = useVoiceGuider();
  const [currentStep, setCurrentStep] = useState(1);

  // If onboarding is already completed and user manually visits /onboarding, redirect to dashboard
  React.useEffect(() => {
    if (user && onboardingCompleted) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [user, onboardingCompleted, navigate]);

  // Form State initialized with rich defaults
  const [formData, setFormData] = useState({
    name: user?.name || user?.email?.split('@')[0] || '',
    cityState: preferences?.cityState || 'Pune, Maharashtra',
    aiLanguage: preferences?.aiLanguage || 'English',
    degree: preferences?.degree || 'B.E. / B.Tech Computer Science',
    collegeName: preferences?.collegeName || 'COEP Technological University',
    collegeCity: preferences?.collegeCity || 'Pune',
    educationStatus: preferences?.educationStatus || 'Completed',
    currentSemester: preferences?.currentSemester || '7th - 8th Sem (Final Year)',
    graduationPeriod: preferences?.graduationPeriod || '6 Months Ago (2025 Batch)',
    hasExperience: preferences?.hasExperience || 'No',
    experienceType: preferences?.experienceType || 'Fresher',
    companyName: preferences?.companyName || '',
    experienceRole: preferences?.experienceRole || '',
    experienceDuration: preferences?.experienceDuration || '',
    companyTechStack: preferences?.companyTechStack || '',
    project1Name: preferences?.project1Name || 'E-Commerce Platform with Stripe & Coupon Engine',
    project1Tagline: preferences?.project1Tagline || 'Scalable Full-Stack E-Commerce Engine',
    project1Desc: preferences?.project1Desc || 'Full-stack application with real-time payment processing, coupon algorithms & inventory tracking.',
    project1TechStack: preferences?.project1TechStack || 'React, Node.js, Express, MongoDB, Docker',
    project1Link: preferences?.project1Link || 'https://github.com/user/ecommerce-engine',
    project2Name: preferences?.project2Name || 'LifeOS AI Teleprompter & Learning Studio',
    project2Desc: preferences?.project2Desc || 'AI-assisted speech coach, voice command interpreter & autonomous learning dashboard.',
    project2TechStack: preferences?.project2TechStack || 'React, Web Speech API, Express, SQLite',
    leetcodeHandle: preferences?.leetcodeHandle || '',
    githubHandle: preferences?.githubHandle || '',
    linkedinUrl: preferences?.linkedinUrl || '',
    targetRole: preferences?.targetRole || 'Full-Stack Web Developer',
    targetCompanyTier: preferences?.targetCompanyTier || 'High-Growth Product Startups (Series A-C)',
    skillLevels: preferences?.skillLevels || { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' },
    weakDsaTopics: preferences?.weakDsaTopics || ['Dynamic Programming', 'Graphs & BFS/DFS'],
    weakDevopsTopics: preferences?.weakDevopsTopics || ['Kubernetes Clusters', 'CI/CD Pipelines (GitHub Actions)'],
    dailyHours: preferences?.dailyHours || 4,
    preferredTimeSlot: preferences?.preferredTimeSlot || 'Night Owl (8 PM - 12 AM)',
    targetDate: preferences?.targetDate || '2026-12-31',
    focusAreas: preferences?.focusAreas || ['Coding & DSA', 'DevOps & Cloud', 'English Fluency', 'System Architecture'],
    aiPersona: preferences?.aiPersona || 'Motivational Tech Mentor',
    pin: '1234',
  });

  const updateFormData = (fields) => {
    setFormData((prev) => ({ ...prev, ...fields }));
  };

  const handleNext = () => {
    if (currentStep < 10) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit & Finish Onboarding with Custom PIN Setup
      const userPin = (formData.pin && formData.pin.length === 4) ? formData.pin : '1234';
      setupCustomPin(userPin);
      setIsLocked(false);

      completeOnboarding({
        user: { name: formData.name },
        preferences: { ...formData, pin: userPin },
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
            Life<span className="text-purple-400">OS</span> AI Deep Setup
          </span>
        </div>

        {/* 10 Step Counter Pills */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((step) => {
            const isCompleted = step < currentStep;
            const isCurrent = step === currentStep;
            return (
              <div
                key={step}
                title={`Step ${step}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCurrent
                    ? 'w-6 sm:w-8 bg-purple-500 shadow-md shadow-purple-500/50'
                    : isCompleted
                    ? 'w-2 sm:w-3 bg-purple-800'
                    : 'w-2 sm:w-3 bg-white/10'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Main Wizard Content Card */}
      <div className="max-w-2xl w-full mx-auto my-auto z-10 py-4">
        <div className="bg-[#12131a]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl shadow-purple-950/20">
          {currentStep === 1 && <StepPersonalIdentity formData={formData} updateFormData={updateFormData} />}
          {currentStep === 2 && <StepAcademicCredentials formData={formData} updateFormData={updateFormData} />}
          {currentStep === 3 && <StepGraduationStatus formData={formData} updateFormData={updateFormData} />}
          {currentStep === 4 && <StepWorkExperience formData={formData} updateFormData={updateFormData} />}
          {currentStep === 5 && <StepProjectPrimary formData={formData} updateFormData={updateFormData} />}
          {currentStep === 6 && <StepProjectSecondary formData={formData} updateFormData={updateFormData} />}
          {currentStep === 7 && <StepTargetSpecialization formData={formData} updateFormData={updateFormData} />}
          {currentStep === 8 && <StepSkillAssessment formData={formData} updateFormData={updateFormData} />}
          {currentStep === 9 && <StepCommitmentTimeline formData={formData} updateFormData={updateFormData} />}
          {currentStep === 10 && <StepVoiceAISecurity formData={formData} updateFormData={updateFormData} />}

          {/* Wizard Action Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-6">
            <Button
              variant="secondary"
              onClick={handleBack}
              disabled={currentStep === 1}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className={currentStep === 1 ? 'opacity-0 pointer-events-none' : ''}
            >
              Back
            </Button>

            <span className="text-xs text-gray-500 font-mono font-medium">
              Step {currentStep} of 10
            </span>

            <Button
              variant="primary"
              onClick={handleNext}
              rightIcon={
                currentStep === 10 ? (
                  <CheckCircle2 className="w-4 h-4" />
                ) : (
                  <ArrowRight className="w-4 h-4" />
                )
              }
              className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-lg shadow-purple-600/30 text-xs font-semibold"
            >
              {currentStep === 10 ? 'Launch LifeOS' : 'Continue'}
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-[11px] text-gray-500 z-10 py-1">
        LifeOS Autonomous Learning & Growth Assistant • Ultra-Deep 10-Step Setup
      </div>
    </div>
  );
};
