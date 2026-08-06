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
import { ArrowLeft, ArrowRight, CheckCircle2, Sparkles, UserCheck } from 'lucide-react';

// Import exact 9 user-selected SVG vector art illustrations
import studentSvg from '../assets/graident-ai-robot-vectorart/STUDENT.svg';
import dataSecuritySvg from '../assets/graident-ai-robot-vectorart/data security.svg';
import graduationLightSvg from '../assets/graident-ai-robot-vectorart/Graduation Light.svg';
import loginSvg from '../assets/graident-ai-robot-vectorart/Login.svg';
import targetCommercialSvg from '../assets/graident-ai-robot-vectorart/target commercial.svg';
import timingSvg from '../assets/graident-ai-robot-vectorart/timing.svg';
import windowLayoutSvg from '../assets/graident-ai-robot-vectorart/Window layout.svg';
import workingSvg from '../assets/graident-ai-robot-vectorart/Working.svg';
import codingSvg from '../assets/graident-ai-robot-vectorart/Coding.svg';

const STEP_SVG_MAP = {
  1: { svg: loginSvg, title: 'Identity & Language', subtitle: 'Personalizing your AI companion', scaleClass: 'scale-110' },
  2: { svg: studentSvg, title: 'Academic Background', subtitle: 'Degree discipline and college campus', scaleClass: 'scale-115' },
  3: { svg: graduationLightSvg, title: 'Graduation Timeline', subtitle: 'Academic status & milestones', scaleClass: 'scale-120' },
  4: { svg: workingSvg, title: 'Industry Experience', subtitle: 'Company background & work history', scaleClass: 'scale-115' },
  5: { svg: codingSvg, title: 'Flagship Portfolio Project', subtitle: 'Architecting primary showcase software', scaleClass: 'scale-115' },
  6: { svg: windowLayoutSvg, title: 'Secondary Portfolio Apps', subtitle: 'Showcasing additional engineering projects', scaleClass: 'scale-110' },
  7: { svg: targetCommercialSvg, title: 'Target Specialization', subtitle: 'Calibrating target engineering role', scaleClass: 'scale-120' },
  8: { svg: codingSvg, title: 'Technical Skill Assessment', subtitle: 'Focusing AI drills on weak areas', scaleClass: 'scale-115' },
  9: { svg: timingSvg, title: 'Daily Routine & Timeline', subtitle: 'Establishing daily commitment', scaleClass: 'scale-125' },
  10: { svg: dataSecuritySvg, title: 'AI Coach & Security PIN', subtitle: 'Master unlock PIN & mentor persona', scaleClass: 'scale-125' },
};

export const OnboardingPage = () => {
  const navigate = useNavigate();
  const { user, preferences, onboardingCompleted, completeOnboarding } = useUser();
  const { setupCustomPin, setIsLocked } = useVoiceGuider();
  const [currentStep, setCurrentStep] = useState(1);

  // Redirect if already completed
  React.useEffect(() => {
    if (user && onboardingCompleted) {
      navigate('/app/dashboard', { replace: true });
    }
  }, [user, onboardingCompleted, navigate]);

  // Form State
  const [formData, setFormData] = useState({
    name: user?.name || user?.email?.split('@')[0] || '',
    cityState: preferences?.cityState || '',
    aiLanguage: preferences?.aiLanguage || 'English',
    degree: preferences?.degree || '',
    collegeName: preferences?.collegeName || '',
    collegeCity: preferences?.collegeCity || '',
    educationStatus: preferences?.educationStatus || '',
    currentSemester: preferences?.currentSemester || '',
    graduationPeriod: preferences?.graduationPeriod || '',
    hasExperience: preferences?.hasExperience || 'No',
    experienceType: preferences?.experienceType || 'Fresher',
    companyName: preferences?.companyName || '',
    experienceRole: preferences?.experienceRole || '',
    experienceDuration: preferences?.experienceDuration || '',
    companyTechStack: preferences?.companyTechStack || '',
    project1Name: preferences?.project1Name || '',
    project1Tagline: preferences?.project1Tagline || '',
    project1Desc: preferences?.project1Desc || '',
    project1TechStack: preferences?.project1TechStack || '',
    project1Link: preferences?.project1Link || '',
    project2Name: preferences?.project2Name || '',
    project2Desc: preferences?.project2Desc || '',
    project2TechStack: preferences?.project2TechStack || '',
    leetcodeHandle: preferences?.leetcodeHandle || '',
    githubHandle: preferences?.githubHandle || '',
    linkedinUrl: preferences?.linkedinUrl || '',
    targetRole: preferences?.targetRole || 'Full-Stack Web Developer',
    targetCompanyTier: preferences?.targetCompanyTier || 'Product Startups',
    skillLevels: preferences?.skillLevels || { dsa: 'Beginner', devops: 'Beginner', english: 'Beginner' },
    weakDsaTopics: preferences?.weakDsaTopics || [],
    weakDevopsTopics: preferences?.weakDevopsTopics || [],
    dailyHours: preferences?.dailyHours || 2,
    preferredTimeSlot: preferences?.preferredTimeSlot || 'Flexible',
    targetDate: preferences?.targetDate || '',
    focusAreas: preferences?.focusAreas || ['Coding & DSA', 'DevOps & Cloud'],
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

  const progressPercent = Math.round((currentStep / 10) * 100);
  const activeStepMeta = STEP_SVG_MAP[currentStep] || STEP_SVG_MAP[1];

  return (
    <div className="h-screen max-h-screen bg-[#070709] text-gray-100 flex flex-col justify-between p-3 sm:p-6 relative overflow-hidden font-sans">
      {/* Background Decorative Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[120px] pointer-events-none animate-orb-float" />
      <div className="absolute top-1/2 -right-40 w-[450px] h-[450px] bg-cyan-600/15 rounded-full blur-[100px] pointer-events-none" />

      {/* Fixed Header Bar */}
      <div className="shrink-0 max-w-6xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between z-10 py-1 gap-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 via-indigo-500 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/25">
            <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400 animate-pulse" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-lg tracking-tight text-white">
                Life<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">OS</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30">
                Setup Studio
              </span>
            </div>
            <p className="text-[10px] text-gray-400">Autonomous AI Career & Learning System</p>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-gray-300">
            <span className="text-purple-400">{progressPercent}%</span> Completed
            <span className="text-gray-600">•</span>
            <span className="text-cyan-400">Step {currentStep} of 10</span>
          </div>

          <div className="w-full sm:w-64 h-1.5 bg-white/10 rounded-full overflow-hidden p-[1px] border border-white/5 relative">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-emerald-400 rounded-full transition-all duration-500 shadow-md shadow-cyan-500/50"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main 2-Column Split Area (No full-page scroll) */}
      <div className="flex-1 min-h-0 flex items-center justify-center my-auto w-full max-w-6xl mx-auto py-2 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center w-full h-full max-h-[90vh] lg:max-h-[82vh]">
          
          {/* Left Column: Pure Floating SVG Illustration */}
          <div className="hidden md:flex lg:col-span-5 flex-col items-center justify-center h-full text-center space-y-3 p-2">
            <div className="w-56 sm:w-72 lg:w-80 h-56 sm:h-72 lg:h-80 relative flex items-center justify-center">
              {/* Soft Ambient Radial Glow Backdrop */}
              <div className="absolute inset-0 rounded-full bg-purple-500/15 blur-3xl animate-pulse" />
              <img
                src={activeStepMeta.svg}
                alt={activeStepMeta.title}
                key={currentStep}
                className={`w-full h-full object-contain filter drop-shadow-[0_18px_35px_rgba(168,85,247,0.4)] transition-all duration-500 hover:scale-105 animate-slide-in-right ${activeStepMeta.scaleClass || 'scale-110'}`}
              />
            </div>

            <div className="space-y-0.5">
              <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-400 uppercase">
                Step {currentStep} of 10 • Matrix Illustration
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{activeStepMeta.title}</h3>
              <p className="text-[11px] text-gray-400 max-w-xs mx-auto">{activeStepMeta.subtitle}</p>
            </div>

            {/* Profile Summary Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0c0c10]/90 border border-white/10 backdrop-blur-md text-[10px] text-gray-300 shadow-lg">
              <UserCheck className="w-3 h-3 text-purple-400" />
              <span className="font-bold text-white">{formData.name || 'Learner'}</span>
              {formData.cityState && <span className="text-gray-400">• {formData.cityState}</span>}
              {formData.targetRole && <span className="text-cyan-300">• {formData.targetRole}</span>}
            </div>
          </div>

          {/* Right Column: Specular Glass Form Container with INTERNAL Scroll */}
          <div className="lg:col-span-7 card-specular rounded-3xl p-5 sm:p-8 border border-white/10 shadow-2xl relative max-h-[78vh] flex flex-col justify-between">
            
            {/* Scrollable Form Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 my-1" key={currentStep}>
              <div className="animate-slide-in-right">
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
              </div>
            </div>

            {/* Fixed Action Navigation Bar */}
            <div className="shrink-0 pt-4 border-t border-white/10 flex items-center justify-between mt-2">
              <Button
                variant="secondary"
                onClick={handleBack}
                disabled={currentStep === 1}
                leftIcon={<ArrowLeft className="w-4 h-4" />}
                className={`transition-all duration-300 ${
                  currentStep === 1 ? 'opacity-0 pointer-events-none' : 'hover:scale-105 active:scale-95'
                }`}
              >
                Back
              </Button>

              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <div
                    key={num}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      num === currentStep
                        ? 'w-4 bg-cyan-400 shadow-md shadow-cyan-400/50'
                        : num < currentStep
                        ? 'bg-purple-500'
                        : 'bg-white/15'
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="primary"
                onClick={handleNext}
                rightIcon={
                  currentStep === 10 ? (
                    <CheckCircle2 className="w-4 h-4 animate-bounce" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )
                }
                className="px-6 py-2.5 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 shadow-xl shadow-purple-600/30 text-xs font-bold tracking-wide transition-all duration-300 hover:scale-[1.03] active:scale-95"
              >
                {currentStep === 10 ? 'Launch LifeOS Studio' : 'Continue'}
              </Button>
            </div>
          </div>

        </div>
      </div>

      {/* Fixed Footer Info */}
      <div className="shrink-0 text-center text-[11px] text-gray-500 z-10 py-1 font-mono">
        LifeOS Autonomous Learning & Growth Studio • Fixed Viewport Internal Form Scroll Architecture
      </div>
    </div>
  );
};
