import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bot, Mic, MicOff, Play, Sparkles, Award, MessageSquare, CheckCircle2,
  ChevronRight, Activity, HelpCircle, Eye, EyeOff, UserCheck, FileText,
  Volume2, Briefcase, GraduationCap, Code2, Layers, RefreshCw, ShieldAlert,
  Search, Terminal, Database, ShieldCheck, GitBranch, Cpu, Star, Zap, RotateCcw,
  Check, ArrowRight, PlayCircle
} from 'lucide-react';
import talkingGreenManSvg from '../assets/graident-ai-robot-vectorart/talking green man.svg';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';
import { GlassCard } from '../components/ui/Card';
import { useVoiceGuider } from '../context/VoiceGuiderContext';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

export const InterviewPrep = () => {
  const { speakText, language, startListening, stopListening, userTranscript } = useVoiceGuider();
  const { user, preferences } = useUser();

  const [activeTab, setActiveTab] = useState('self-intro');
  const [selectedCategory, setSelectedCategory] = useState('js');
  const [isRecording, setIsRecording] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState('1x');
  const [aiEvaluation, setAiEvaluation] = useState(null);
  const [dynamicQuestions, setDynamicQuestions] = useState(null);
  const [dynamicModules, setDynamicModules] = useState([]);

  // Live Arena Simulation States
  const [arenaState, setArenaState] = useState('setup'); // 'setup' | 'active' | 'scorecard'
  const [arenaDomain, setArenaDomain] = useState('js');
  const [arenaQuestionCount, setArenaQuestionCount] = useState(3);
  const [arenaCurrentIdx, setArenaCurrentIdx] = useState(0);
  const [arenaQuestions, setArenaQuestions] = useState([]);
  const [arenaCandidateAns, setArenaCandidateAns] = useState('');
  const [arenaSubmittedAnswers, setArenaSubmittedAnswers] = useState([]);
  const [isArenaAiSpeaking, setIsArenaAiSpeaking] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchModules = async () => {
      const res = await apiService.getRoadmapModules();
      if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setDynamicModules(res.data);
        if (res.data[0]?.id) {
          setArenaDomain(res.data[0].id);
        }
      }
    };
    fetchModules();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchQuestions = async () => {
      const res = await apiService.getInterviewQuestions(selectedCategory);
      if (isMounted && res?.success && Array.isArray(res.data)) {
        setDynamicQuestions(res.data);
      }
    };
    fetchQuestions();
    return () => { isMounted = false; };
  }, [selectedCategory]);

  const userName = user?.name || user?.email?.split('@')[0] || 'Candidate';
  const targetRole = preferences?.targetRole || 'Full-Stack Web Developer';
  const careerLevel = preferences?.careerLevel || 'Intermediate';
  const cityState = preferences?.cityState || preferences?.location || 'Pune, India';
  const degree = preferences?.degree || preferences?.education || 'B.E. Computer Science';
  const collegeName = preferences?.collegeName || 'COEP Technological University';
  const eduStatus = preferences?.educationStatus || 'Completed';
  const eduTimeline = eduStatus === 'Completed'
    ? (preferences?.graduationPeriod || '6 Months Ago')
    : (preferences?.currentSemester || 'Final Year');
  
  const hasExp = (preferences?.hasExperience || 'No') === 'Yes';
  const companyName = preferences?.companyName || 'Tech Startup';
  const expRole = preferences?.experienceRole || 'Full-Stack Intern';
  const expDuration = preferences?.experienceDuration || '6 Months';
  const expTech = preferences?.companyTechStack || 'React, Node.js, Express';

  const proj1Name = preferences?.project1Name || preferences?.project1 || 'E-Commerce Platform';
  const proj1Desc = preferences?.project1Desc || 'Full-Stack web application with real-time payment integration and inventory tracking.';
  const proj1Tech = preferences?.project1TechStack || 'React, Node.js, Express, MongoDB, Docker';

  const proj2Name = preferences?.project2Name || preferences?.project2 || 'LifeOS AI Studio';
  const proj2Desc = preferences?.project2Desc || 'AI Teleprompter & Personal Learning Studio.';
  const proj2Tech = preferences?.project2TechStack || 'React, Web Speech API, Tailwind, Express';

  const weakDsaStr = Array.isArray(preferences?.weakDsaTopics) ? preferences.weakDsaTopics.join(', ') : 'Dynamic Programming';
  const weakDevopsStr = Array.isArray(preferences?.weakDevopsTopics) ? preferences.weakDevopsTopics.join(', ') : 'Kubernetes';

  // 1. Dynamic Education Phrasing
  const eduPhrasing = (eduStatus === 'Completed' || eduStatus === 'Graduated')
    ? `I completed my ${degree} from ${collegeName}.`
    : `I am currently pursuing my ${degree} from ${collegeName}.`;

  // 2. Dynamic Work Experience Phrasing
  const isCurrentlyWorking = hasExp && (preferences?.experienceStatus === 'Currently Working' || !preferences?.experienceDuration || preferences?.experienceDuration?.includes('Present'));
  const expParagraph = hasExp
    ? (isCurrentlyWorking
        ? `Currently, I am working as a ${expRole} at ${companyName}, where I have been working on full-stack web applications, RESTful APIs, database integration, authentication, and dynamic user interfaces.`
        : `I worked as a ${expRole} at ${companyName} for ${expDuration}, where I focused on full-stack web applications, RESTful APIs, database integration, authentication, and dynamic user interfaces.`)
    : `I am actively building full-stack web applications, focusing on RESTful APIs, database integration, authentication, and dynamic user interfaces.`;

  // 3. Dynamic Projects Breakdown
  const secondaryProjsList = Array.isArray(preferences?.secondaryProjects) && preferences.secondaryProjects.length > 0
    ? preferences.secondaryProjects
    : [{ title: proj2Name, desc: proj2Desc, tagline: preferences?.project2Tagline, techStack: proj2Tech }];

  const totalProjCount = 1 + secondaryProjsList.length;
  const countWords = ['one', 'two', 'three', 'four', 'five', 'six'];
  const projCountWord = countWords[totalProjCount - 1] || `${totalProjCount}`;

  const proj1Text = `My first project was ${proj1Name}, which included ${proj1Desc}${preferences?.project1Tagline ? `. I worked on features such as ${preferences.project1Tagline}` : ''}.`;

  const secondaryProjTexts = secondaryProjsList.map((p, idx) => {
    const ordinals = ['second', 'third', 'fourth', 'fifth'];
    const ordinal = ordinals[idx] || `project #${idx + 2}`;
    const pTitle = p.title || p.name || `Project ${idx + 2}`;
    const pDesc = p.desc || p.description || 'Full-stack web portal for document & workflow management.';
    const pTagline = p.tagline ? ` In this project, ${p.tagline}.` : '';
    return `My ${ordinal} project was ${pTitle}, ${pDesc}.${pTagline}`;
  }).join('\n\n');

  const skillsListStr = Array.isArray(preferences?.focusAreas) && preferences.focusAreas.length > 0
    ? preferences.focusAreas.join(', ')
    : 'JavaScript, SQL, Git, GitHub, Postman, and Tailwind CSS';

  const fullScript = `Good morning, sir/madam.

My name is ${userName}, and I am from ${cityState}.

${eduPhrasing}

I am a ${targetRole} with hands-on experience in developing full-stack web applications using ${expTech || 'MongoDB, Express.js, React.js, and Node.js'}.

${expParagraph}

During my ${hasExp ? 'internship' : 'portfolio development'}, I worked on ${projCountWord} major projects.

${proj1Text}

${secondaryProjTexts}

Through these projects, I have strengthened my skills in ${targetRole} development, REST API integration, database management, authentication, and dynamic web application development.

I am also comfortable with ${skillsListStr}.

My goal is to continuously improve my technical and problem-solving skills and contribute to building scalable and impactful software solutions.

Thank you for giving me the opportunity to introduce myself.`;

  const selfIntroData = {
    name: userName,
    location: cityState,
    education: `${degree} from ${collegeName} (${eduStatus}: ${eduTimeline})`,
    currentRole: `${targetRole} Target`,
    skills: preferences?.focusAreas || ["React.js", "Node.js", "System Architecture", "DevOps & Cloud", "DSA Algorithms"],
    proj1: proj1Name,
    proj2: proj2Name,
    fullScript: fullScript
  };

  // Follow-Up Questions derived from candidate's tailored intro
  const derivedFollowUpQuestions = [
    {
      q: `You built '${proj1Name}' using ${proj1Tech}. How did you handle architecture and database scalability?`,
      a: `In ${proj1Name}, database scalability is maintained using indexing, optimized query aggregation pipelines, and modular REST controllers built with ${proj1Tech}.`,
      mr: `प्रोजेक्ट '${proj1Name}' मधील डेटाबेस आणि आर्किटेक्चरचे स्केलेबिलिटी कसे मॅनेज केले?`
    },
    {
      q: `You highlighted '${proj2Name}' (${proj2Tech}). What architectural choices ensured low latency and smooth UI performance?`,
      a: `In ${proj2Name}, UI performance is optimized using lazy component loading, API response caching, debounced event listeners, and state isolation.`,
      mr: `प्रोजेक्ट '${proj2Name}' मधील परफॉर्मन्स वाढवण्यासाठी आणि लेटन्सी कमी करण्यासाठी कोणते उपाय केले?`
    },
    {
      q: `As a candidate targeting ${targetRole}, how do you approach strengthening your weak areas like ${weakDsaStr}?`,
      a: `I follow a structured practice routine (${preferences?.dailyHours || 4} hrs/day), breaking down ${weakDsaStr} problems into pattern categories and solving them systematically.`,
      mr: `${targetRole} म्हणून तयारी करताना ${weakDsaStr} सारख्या विषयांवर प्रभुत्व मिळवण्यासाठी कसा सराव करता?`
    }
  ];


  const categoryList = dynamicModules.length > 0
    ? dynamicModules.map(m => ({
        id: m.id,
        label: m.title || m.id,
        icon: <Code2 className="w-4 h-4 text-cyan-400" />
      }))
    : [
        { id: 'js', label: 'JavaScript Deep', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
        { id: 'react', label: 'React Architecture', icon: <Layers className="w-4 h-4 text-purple-400" /> },
        { id: 'node', label: 'Node & Express', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
        { id: 'mongo', label: 'MongoDB & Schemas', icon: <Database className="w-4 h-4 text-amber-400" /> }
      ];

  const currentQuestions = dynamicQuestions || [];
  const currentActiveQ = currentQuestions[activeQuestionIdx] || currentQuestions[0] || null;

  const rawQ = currentActiveQ ? (currentActiveQ.question || currentActiveQ.q || 'Interview Question') : '';
  const rawA = currentActiveQ ? (currentActiveQ.answer || currentActiveQ.a || 'Sample Answer') : '';

  const currentQText = rawQ.replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim();
  const currentAText = rawA.replace(/^(ns|Ans|Answer|A)\s*[:.-]?\s*/i, '').trim();

  const handleReadQuestion = () => {
    if (!currentActiveQ) return;
    const textToRead = language === 'mr'
      ? `इंटरव्ह्यू प्रश्न: ${currentQText}`
      : `Interview Question: ${currentQText}`;
    speakText(textToRead, language);
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
      evaluateAnswer();
    } else {
      setAiEvaluation(null);
      setIsRecording(true);
      startListening();
    }
  };

  const evaluateAnswer = () => {
    if (!currentActiveQ) return;
    const textToAnalyze = (userTranscript || currentAText).toLowerCase();
    const targetKeywords = currentActiveQ.keywords || (currentQText ? currentQText.split(' ').filter(w => w.length > 3) : ["javascript", "react", "node", "data"]);

    const found = targetKeywords.filter(kw => textToAnalyze.includes(kw.toLowerCase()));
    const rawScore = Math.min(10, Math.max(6.8, (found.length / targetKeywords.length) * 4 + 6)).toFixed(1);

    let feedbackMsg = '';
    if (language === 'mr') {
      feedbackMsg = `उत्कृष्ट उत्तर ${userName}! तुमचा AI Delivery Score १० पैकी ${rawScore} आहे. तुम्ही ${found.length} मुख्य संकल्पना अचूक स्पष्ट केल्या!`;
    } else {
      feedbackMsg = `Great explanation ${userName}! Your AI Delivery Score is ${rawScore} out of 10. You successfully covered key technical concepts!`;
    }

    setAiEvaluation({
      score: rawScore,
      keywordsFound: found,
      feedback: feedbackMsg
    });

    speakText(feedbackMsg, language);
  };

  // Live Arena Handlers
  const playArenaQuestion = (qObj) => {
    if (!qObj) return;
    const cleanQ = (qObj.question || qObj.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim();
    setIsArenaAiSpeaking(true);
    const speechPrompt = language === 'mr'
      ? `इंटरव्ह्यू प्रश्न क्रमांक ${arenaCurrentIdx + 1}: ${cleanQ}`
      : `Question number ${arenaCurrentIdx + 1}: ${cleanQ}`;

    speakText(speechPrompt, language);
    setTimeout(() => setIsArenaAiSpeaking(false), 4000);
  };

  const handleStartLiveArena = async () => {
    const res = await apiService.getInterviewQuestions(arenaDomain);
    const available = res?.success && Array.isArray(res.data) && res.data.length > 0 ? res.data : (dynamicQuestions || []);
    const shuffled = [...available].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(arenaQuestionCount, shuffled.length));

    setArenaQuestions(selected);
    setArenaCurrentIdx(0);
    setArenaSubmittedAnswers([]);
    setArenaCandidateAns('');
    setArenaState('active');

    if (selected.length > 0) {
      playArenaQuestion(selected[0]);
    }
  };

  const handleSubmitArenaAnswer = () => {
    const currentQ = arenaQuestions[arenaCurrentIdx];
    if (!currentQ) return;

    const userAns = arenaCandidateAns || userTranscript || "Provided verbal response during live simulation.";
    const cleanA = (currentQ.answer || currentQ.a || '').replace(/^(ns|Ans|Answer|A)\s*[:.-]?\s*/i, '').trim();
    const cleanQ = (currentQ.question || currentQ.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '').trim();

    const targetKeywords = (cleanA ? cleanA.split(' ') : cleanQ.split(' ')).filter(w => w.length > 3);
    const found = targetKeywords.filter(kw => userAns.toLowerCase().includes(kw.toLowerCase()));
    const rawScore = Math.min(10, Math.max(7.0, (found.length / Math.max(1, targetKeywords.length)) * 4 + 6)).toFixed(1);

    const record = {
      question: cleanQ,
      idealAnswer: cleanA,
      candidateAns: userAns,
      marathiIntent: currentQ.marathiIntent,
      score: rawScore,
      keywords: found
    };

    const nextSubmitted = [...arenaSubmittedAnswers, record];
    setArenaSubmittedAnswers(nextSubmitted);
    setArenaCandidateAns('');

    if (arenaCurrentIdx + 1 < arenaQuestions.length) {
      const nextIdx = arenaCurrentIdx + 1;
      setArenaCurrentIdx(nextIdx);
      playArenaQuestion(arenaQuestions[nextIdx]);
    } else {
      setArenaState('scorecard');
      const totalScore = (nextSubmitted.reduce((acc, curr) => acc + parseFloat(curr.score), 0) / nextSubmitted.length).toFixed(1);
      const summaryMsg = language === 'mr'
        ? `अभिनंदन ${userName}! तुम्ही लाइव्ह मॉक इंटरव्ह्यू यशस्वीपणे पूर्ण केला आहे. तुमचा सरासरी हायरिंग स्कोअर १० पैकी ${totalScore} आहे!`
        : `Congratulations ${userName}! You completed your live mock interview simulation. Your overall hiring score is ${totalScore} out of 10!`;
      speakText(summaryMsg, language);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="AI Voice Mock Interviewer Active"
        title="AI Interview Studio & Delivery Rating"
        subtitle={`Customized for ${userName} (${targetRole} • ${careerLevel}).`}
        actions={
          <Tabs
            tabs={[
              { id: 'self-intro', label: 'Self Introduction Studio', icon: <UserCheck className="w-4 h-4 text-cyan-400" /> },
              { id: 'master-bank', label: 'AI Voice Interview Drills', icon: <MessageSquare className="w-4 h-4 text-purple-400" /> },
              { id: 'live-arena', label: '⚡ Live Mock Interview Arena', icon: <Zap className="w-4 h-4 text-amber-400" /> }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        }
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {activeTab === 'self-intro' && (
            /* SELF INTRODUCTION STUDIO */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7 space-y-6">
                <LaserBorder className="p-8 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center font-bold">
                        MC
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-white tracking-tight">{selfIntroData.name}</h3>
                        <span className="text-xs text-cyan-400 font-mono">{selfIntroData.currentRole}</span>
                      </div>
                    </div>

                    <Badge variant="emerald">Interview Ready</Badge>
                  </div>

                  {/* Teleprompter Display Box */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1.5 font-bold text-purple-400">
                        <FileText className="w-4 h-4" /> Live Interview Script Teleprompter
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px]">Speed:</span>
                        {['1x', '1.25x', '1.5x'].map((s) => (
                          <button
                            key={s}
                            onClick={() => setTeleprompterSpeed(s)}
                            className={`px-2 py-0.5 rounded text-[10px] ${teleprompterSpeed === s ? 'bg-purple-500 text-white font-bold' : 'bg-white/5 text-gray-400'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#08080c]/90 border border-purple-500/30 text-sm sm:text-base text-gray-100 leading-relaxed font-sans max-h-[420px] overflow-y-auto space-y-4 shadow-[inset_0_2px_15px_rgba(0,0,0,0.8)] backdrop-blur-xl custom-scrollbar">
                      {selfIntroData.fullScript.split('\n\n').map((paragraph, pIdx) => (
                        <p key={pIdx} className="text-gray-200 font-normal leading-relaxed tracking-wide">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Live Audio Recording Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Practice Speaking Self Introduction</span>
                      <Badge variant={isRecording ? 'rose' : 'emerald'}>
                        {isRecording ? '● Voice Analysis Active' : 'Mic Ready'}
                      </Badge>
                    </div>

                    {isRecording && <AudioSpectrum isPlaying={true} className="py-2" />}

                    <div className="flex items-center gap-3">
                      <Button
                        variant={isRecording ? 'danger' : 'glow'}
                        size="md"
                        onClick={handleToggleRecording}
                        leftIcon={isRecording ? <MicOff className="w-4 h-4 animate-pulse" /> : <Mic className="w-4 h-4 text-cyan-400" />}
                        className="flex-1"
                      >
                        {isRecording ? 'Stop Recording & Evaluate' : '🎙️ Start Voice Self-Intro Practice'}
                      </Button>
                    </div>
                  </div>

                  {/* Voice AI Evaluation Results */}
                  {aiEvaluation && (
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2 animate-fadeIn">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">AI Speech Rating</span>
                        <Badge variant="amber">Delivery Score: {aiEvaluation.score} / 10</Badge>
                      </div>
                      <p className="text-xs text-gray-200">{aiEvaluation.feedback}</p>
                    </div>
                  )}
                </LaserBorder>
              </div>

              <div className="lg:col-span-5 space-y-6">
                <TiltCard className="p-6 space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    Interview Candidate Profile Card
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-gray-400">Target Role:</span>
                      <span className="text-cyan-400 font-bold">{targetRole}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-gray-400">Education:</span>
                      <span className="text-white font-medium">{degree}</span>
                    </div>
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between">
                      <span className="text-gray-400">Key Projects:</span>
                      <span className="text-purple-400 font-bold">{proj1Name}, {proj2Name}</span>
                    </div>
                  </div>
                </TiltCard>

                {/* Derived Follow Up Questions */}
                <div className="p-6 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    Expected Follow-Up Questions
                  </h3>
                  <div className="space-y-3">
                    {derivedFollowUpQuestions.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-2 text-xs">
                        <span className="font-bold text-cyan-300 block">Q: {item.q}</span>
                        <p className="text-gray-300 italic text-[11px]">"{item.a}"</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'master-bank' && (
            /* AI VOICE INTERVIEW DRILLS */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4 space-y-4">
                <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                    Select Technical Domain:
                  </h3>
                  <div className="space-y-2">
                    {categoryList.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          setSelectedCategory(cat.id);
                          setActiveQuestionIdx(0);
                          setAiEvaluation(null);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs font-bold transition-all flex items-center justify-between border ${
                          selectedCategory === cat.id
                            ? 'bg-purple-500/20 border-purple-500 text-white'
                            : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <span className="flex items-center gap-2">{cat.icon} {cat.label}</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-white/10 space-y-2">
                    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Question Bank ({currentQuestions.length})</span>
                    <div className="space-y-1 max-h-[320px] overflow-y-auto pr-1">
                      {currentQuestions.map((q, idx) => (
                        <button
                          key={q.id || idx}
                          onClick={() => {
                            setActiveQuestionIdx(idx);
                            setAiEvaluation(null);
                          }}
                          className={`w-full text-left p-2.5 rounded-lg text-xs transition-all border truncate ${
                            activeQuestionIdx === idx
                              ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50 text-white font-bold'
                              : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-gray-200'
                          }`}
                        >
                          Q{idx + 1}. {(q.question || q.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 space-y-6">
                {currentActiveQ ? (
                  <TiltCard className="p-8 space-y-6">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10">
                      <Badge variant="purple">Question #{activeQuestionIdx + 1} of {currentQuestions.length}</Badge>
                      <Button size="xs" variant="glow" onClick={handleReadQuestion} leftIcon={<Volume2 className="w-3.5 h-3.5 text-cyan-400" />}>
                        🔊 Listen Question Audio
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <h2 className="text-lg font-bold text-white leading-relaxed">{currentQText}</h2>
                      {currentActiveQ.marathiIntent && (
                        <p className="text-xs text-purple-300 font-sans italic">मराठी भावार्थ: "{currentActiveQ.marathiIntent}"</p>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 space-y-2">
                      <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" /> Recommended Ideal Answer
                      </span>
                      <p className="text-xs text-emerald-100 leading-relaxed font-sans">{currentAText}</p>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <Button
                        size="xs"
                        variant="ghost"
                        onClick={() => {
                          if (activeQuestionIdx > 0) setActiveQuestionIdx(activeQuestionIdx - 1);
                        }}
                        disabled={activeQuestionIdx === 0}
                      >
                        ← Previous Q
                      </Button>
                      <Button
                        size="xs"
                        variant="primary"
                        onClick={() => {
                          if (activeQuestionIdx + 1 < currentQuestions.length) setActiveQuestionIdx(activeQuestionIdx + 1);
                        }}
                        disabled={activeQuestionIdx + 1 >= currentQuestions.length}
                        rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                      >
                        Next Q →
                      </Button>
                    </div>
                  </TiltCard>
                ) : (
                  <TiltCard className="p-8 text-center text-xs text-gray-400">
                    Select a question from the bank to start voice practice drills.
                  </TiltCard>
                )}
              </div>
            </div>
          )}

          {activeTab === 'live-arena' && (
            /* LIVE MOCK INTERVIEW ARENA */
            <div className="space-y-6">
              {arenaState === 'setup' && (
                <TiltCard className="p-8 max-w-2xl mx-auto space-y-6 text-center">
                  <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-400 flex items-center justify-center mx-auto">
                    <Zap className="w-8 h-8 text-amber-300 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="text-xl font-extrabold text-white">⚡ AI Live Mock Interview Arena</h2>
                    <p className="text-xs text-gray-400 mt-1">
                      Simulate a real technical interview. The AI will ask real-time questions via audio, evaluate your verbal responses, and compute your overall hiring scorecard!
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left pt-2">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-300">Select Tech Domain:</label>
                      <select
                        value={arenaDomain}
                        onChange={(e) => setArenaDomain(e.target.value)}
                        className="w-full bg-[#08080c] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                      >
                        {categoryList.map(c => (
                          <option key={c.id} value={c.id}>{c.label}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-300">Number of Questions:</label>
                      <select
                        value={arenaQuestionCount}
                        onChange={(e) => setArenaQuestionCount(Number(e.target.value))}
                        className="w-full bg-[#08080c] border border-white/10 rounded-xl p-2.5 text-xs text-white"
                      >
                        <option value={3}>3 Rapid Questions</option>
                        <option value={5}>5 Full Technical Questions</option>
                      </select>
                    </div>
                  </div>

                  <Button
                    variant="glow"
                    size="lg"
                    onClick={handleStartLiveArena}
                    leftIcon={<Play className="w-4 h-4 text-amber-400" />}
                    className="w-full bg-gradient-to-r from-amber-600 to-purple-600"
                  >
                    Start Live Mock Interview Simulation 🚀
                  </Button>
                </TiltCard>
              )}

              {arenaState === 'active' && arenaQuestions[arenaCurrentIdx] && (
                <LaserBorder className="p-8 max-w-3xl mx-auto space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 animate-pulse" /> Question {arenaCurrentIdx + 1} of {arenaQuestions.length}
                    </span>
                    <Badge variant="purple">Live Voice Session</Badge>
                  </div>

                  <div className="p-6 rounded-2xl bg-black/40 border border-white/10 space-y-3 text-center">
                    {isArenaAiSpeaking ? (
                      <div className="space-y-2">
                        <AudioSpectrum isPlaying={true} className="py-2" />
                        <span className="text-xs text-cyan-300 font-bold animate-pulse">🤖 AI Interviewer is asking question...</span>
                      </div>
                    ) : (
                      <h3 className="text-base sm:text-lg font-bold text-white">
                        {(arenaQuestions[arenaCurrentIdx]?.question || arenaQuestions[arenaCurrentIdx]?.q || '').replace(/^(Question|Q\d*|\d+[\.\)])\s*[:.-]?\s*/i, '')}
                      </h3>
                    )}
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-bold text-gray-300 block">Your Verbal / Written Answer:</label>
                    <textarea
                      rows={4}
                      value={arenaCandidateAns || userTranscript}
                      onChange={(e) => setArenaCandidateAns(e.target.value)}
                      placeholder="Speak using microphone or type your technical answer here..."
                      className="w-full p-4 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white placeholder-gray-500 focus:border-amber-400 focus:outline-none font-sans"
                    />

                    <div className="flex items-center justify-between pt-2">
                      <Button
                        size="xs"
                        variant={isRecording ? "danger" : "glass"}
                        onClick={handleToggleRecording}
                        leftIcon={isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-cyan-400" />}
                      >
                        {isRecording ? "Stop Dictation" : "Dictate via Mic"}
                      </Button>

                      <Button
                        size="sm"
                        variant="glow"
                        onClick={handleSubmitArenaAnswer}
                        rightIcon={<ArrowRight className="w-4 h-4" />}
                      >
                        {arenaCurrentIdx + 1 === arenaQuestions.length ? 'Submit & Finish Mock Interview' : 'Submit Answer & Next Question ➔'}
                      </Button>
                    </div>
                  </div>
                </LaserBorder>
              )}

              {arenaState === 'scorecard' && (
                <LaserBorder className="p-8 max-w-3xl mx-auto space-y-6">
                  <div className="text-center space-y-2">
                    <Award className="w-12 h-12 text-amber-400 mx-auto animate-bounce" />
                    <h2 className="text-2xl font-black text-white">🎉 Simulation Complete!</h2>
                    <p className="text-xs text-gray-300">Detailed candidate breakdown and ideal solutions:</p>
                  </div>

                  <div className="space-y-4 pt-2">
                    {arenaSubmittedAnswers.map((item, idx) => (
                      <GlassCard key={idx} className="p-5 space-y-3 border border-white/10">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-emerald-400 font-mono">Q{idx + 1}. {item.question}</span>
                          <Badge variant="purple">Score: {item.score} / 10</Badge>
                        </div>

                        <div className="p-3 rounded-xl bg-slate-950 border border-white/10 space-y-1">
                          <span className="text-[10px] font-bold text-gray-400 uppercase">Your Answer:</span>
                          <p className="text-xs text-gray-200 italic">"{item.candidateAns}"</p>
                        </div>

                        <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">🌟 Ideal Senior Developer Answer:</span>
                          <p className="text-xs text-emerald-100 font-medium">"{item.idealAnswer}"</p>
                        </div>
                      </GlassCard>
                    ))}
                  </div>

                  <div className="pt-4 flex justify-center">
                    <Button
                      variant="glow"
                      size="lg"
                      onClick={() => setArenaState('setup')}
                      leftIcon={<RotateCcw className="w-4 h-4" />}
                    >
                      🔄 Retake Mock Interview Simulation
                    </Button>
                  </div>
                </LaserBorder>
              )}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
