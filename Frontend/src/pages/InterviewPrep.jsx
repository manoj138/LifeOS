import React, { useState, useEffect } from 'react';
import {
  Bot, Mic, MicOff, Play, Sparkles, Award, MessageSquare, CheckCircle2,
  ChevronRight, Activity, HelpCircle, Eye, EyeOff, UserCheck, FileText,
  Volume2, Briefcase, GraduationCap, Code2, Layers, RefreshCw, ShieldAlert,
  Search, Terminal, Database, ShieldCheck, GitBranch, Cpu, Star
} from 'lucide-react';
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

  useEffect(() => {
    let isMounted = true;
    const fetchModules = async () => {
      const res = await apiService.getRoadmapModules();
      if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setDynamicModules(res.data);
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
  const careerLevel = preferences?.careerLevel || 'Intermediate (1-3 yrs experience)';
  const education = preferences?.education || 'B.E. Computer Science';
  const userLocation = preferences?.location || 'India';
  const proj1 = preferences?.project1 || 'E-Commerce Platform with Stripe & Coupon Engine';
  const proj2 = preferences?.project2 || 'LifeOS AI Teleprompter & Learning Studio';

  const selfIntroData = {
    name: userName,
    location: userLocation,
    education: education,
    currentRole: `${targetRole} (${careerLevel})`,
    skills: preferences?.focusAreas || ["React.js", "Node.js", "System Architecture", "DevOps & Cloud", "DSA Algorithms"],
    proj1: proj1,
    proj2: proj2,
    fullScript: `Good morning, sir/madam. My name is ${userName}. I hold a background in ${education} based out of ${userLocation}, specializing as a ${targetRole}.

I have hands-on experience building production software, system architecture optimization, and full-stack development. My career level is ${careerLevel}.

Key highlights of my portfolio projects include:
1. ${proj1}: Scalable web application featuring dynamic routing, authentication, API integrations, and robust database state management.
2. ${proj2}: Interactive enterprise application with modular services, responsive UI design, and automated workflow pipelines.

My core technical focus areas include ${preferences?.focusAreas?.join(', ') || 'Coding, System Design, and Communication'}. My objective is to deliver high-performance software engineering solutions. Thank you for giving me this opportunity to introduce myself.`
  };

  // Follow-Up Questions derived from candidate's tailored intro
  const derivedFollowUpQuestions = [
    {
      q: `You mentioned building '${proj1}'. How did you handle concurrent user transactions and state management?`,
      a: `In ${proj1}, state integrity is maintained using atomic database transactions (ACID guarantees), optimist concurrency locking, and centralized state handlers.`,
      mr: `प्रोजेक्ट '${proj1}' मधील ट्रान्झॅक्शन सायकल आणि स्टेट मॅनेजमेंट कसे हँडल केले?`
    },
    {
      q: `You highlighted '${proj2}'. What architectural decisions did you make to ensure low latency and responsive performance?`,
      a: `In ${proj2}, performance is optimized using lazy component loading, API response caching, debounced event listeners, and minimized DOM re-renders.`,
      mr: `प्रोजेक्ट '${proj2}' मधील लेटन्सी कमी करण्यासाठी आणि परफॉर्मन्स वाढवण्यासाठी कोणते आर्किटेक्चर वापरले?`
    },
    {
      q: `As a ${targetRole}, how do you approach error handling and RESTful API security in production?`,
      a: `Error handling is enforced via global express middleware, standardized HTTP status responses (200, 400, 500), CORS origin restrictions, and JWT authentication tokens.`,
      mr: `RESTful API सुरक्षेसाठी आणि एरर हँडलिंगसाठी काय बेस्ट प्रॅक्टिसेस वापरता?`
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
              { id: 'master-bank', label: 'AI Voice Interview Drills', icon: <MessageSquare className="w-4 h-4 text-purple-400" /> }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        }
      />

      {activeTab === 'self-intro' ? (
        /* SELF INTRODUCTION STUDIO (MANOJ MANSING CHOUGULE) */
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

                <div className="p-6 rounded-2xl bg-[#09090d] border border-white/15 text-sm text-gray-200 leading-relaxed font-sans max-h-96 overflow-y-auto space-y-4">
                  <p className="text-cyan-300 font-semibold">{selfIntroData.fullScript.split('\n\n')[0]}</p>
                  <p>{selfIntroData.fullScript.split('\n\n')[1]}</p>
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-purple-300 uppercase tracking-wider">Major Project Highlights:</span>
                    <ul className="space-y-1 text-xs text-gray-300">
                      <li>• <strong>E-Commerce Platform:</strong> User, Seller, Admin panels, coupons, dynamic shipping fee calculation.</li>
                      <li>• <strong>RoyalESeva Document Portal Hub:</strong> Vendor Module & Digital Document processing workflow.</li>
                    </ul>
                  </div>
                  <p>{selfIntroData.fullScript.split('\n\n')[3]}</p>
                  <p className="text-emerald-400 font-semibold">{selfIntroData.fullScript.split('\n\n')[4]}</p>
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

                <AudioSpectrum isActive={isRecording} barCount={32} />

                <div className="flex justify-center">
                  <Button
                    variant={isRecording ? 'danger' : 'glow'}
                    size="xl"
                    onClick={handleToggleRecording}
                    leftIcon={isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  >
                    {isRecording ? 'Stop & Get AI Delivery Score' : 'Start Speaking Intro'}
                  </Button>
                </div>
              </div>
            </LaserBorder>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <TiltCard className="p-6 space-y-4">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-cyan-400" />
                Education & Background
              </h3>

              <div className="space-y-2 text-xs text-gray-300">
                <p><strong>Education:</strong> {selfIntroData.education}</p>
                <p><strong>Location:</strong> {selfIntroData.location}</p>
                <p><strong>Role:</strong> {selfIntroData.currentRole}</p>
              </div>

              <div className="pt-2 border-t border-white/10">
                <span className="text-xs font-bold text-purple-300 block mb-2">Technical Skill Set:</span>
                <div className="flex flex-wrap gap-1.5">
                  {selfIntroData.skills.map((sk, i) => (
                    <Badge key={i} variant="neon">{sk}</Badge>
                  ))}
                </div>
              </div>
            </TiltCard>

            {/* Dynamic Follow-Up Questions Derived from Onboarding Intro */}
            <LaserBorder className="p-6 space-y-4 border border-purple-500/30 bg-purple-950/20">
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                  Likely Interviewer Follow-Ups (From Your Intro)
                </h4>
                <Badge variant="cyan">95% LIKELY</Badge>
              </div>

              <div className="space-y-3">
                {derivedFollowUpQuestions.map((fq, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-950/80 border border-white/10 space-y-2">
                    <h5 className="text-xs font-bold text-white flex items-start gap-2">
                      <span className="text-purple-400 font-mono">Q{idx + 1}.</span>
                      <span>{fq.q}</span>
                    </h5>
                    <p className="text-[11px] text-gray-300 font-mono bg-black/40 p-2 rounded-lg border border-purple-500/20">
                      <strong>Sample Answer:</strong> {fq.a}
                    </p>
                    <p className="text-[11px] text-purple-300 font-sans italic">
                      💡 <strong>मराठी हेतू:</strong> {fq.mr}
                    </p>
                  </div>
                ))}
              </div>
            </LaserBorder>
          </div>
        </div>
      ) : (
        /* AI VOICE MOCK INTERVIEW DRILLS */
        <div className="space-y-6">
          {/* Category Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categoryList.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setActiveQuestionIdx(0);
                  setAiEvaluation(null);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-purple-500 text-white shadow-lg'
                    : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Questions Sidebar List */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-3">
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Questions ({currentQuestions.length})
                </h3>

                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {currentQuestions.map((q, idx) => (
                    <button
                      key={q.id || idx}
                      onClick={() => {
                        setActiveQuestionIdx(idx);
                        setAiEvaluation(null);
                      }}
                      className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border ${
                        activeQuestionIdx === idx
                          ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50 text-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <span className="font-bold line-clamp-2">{q.question || q.q || 'Question'}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Detail & Answer Studio */}
            <div className="lg:col-span-8 space-y-6">
              {currentActiveQ ? (
                <LaserBorder className="p-6 space-y-6">
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <Badge variant="purple">Question {activeQuestionIdx + 1} of {currentQuestions.length}</Badge>

                    {/* AI Read Question Out Loud Button */}
                    <Button
                      variant="glass"
                      size="sm"
                      onClick={handleReadQuestion}
                      leftIcon={<Volume2 className="w-3.5 h-3.5 text-cyan-400" />}
                    >
                      Ask Me Question (AI Voice)
                    </Button>
                  </div>

                  <h2 className="text-xl font-extrabold text-white tracking-tight">
                    "{currentQText}"
                  </h2>

                  {/* English Master Answer */}
                  <div className="p-4 rounded-2xl bg-[#09090d] border border-purple-500/30 space-y-2">
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                      🌟 Word-for-Word English Interview Answer:
                    </span>
                    <p className="text-sm text-gray-100 leading-relaxed font-sans font-medium">
                      "{currentAText}"
                    </p>
                  </div>

                  {/* Marathi Interviewer Intent Box */}
                  {currentActiveQ.marathiIntent && (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 leading-relaxed">
                      💡 <strong>इंटरव्ह्यूवर काय तपासत आहे? (Marathi Intent):</strong> {currentActiveQ.marathiIntent}
                    </div>
                  )}

                  {/* AI Score Evaluation Banner */}
                  {aiEvaluation && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-purple-950/80 to-cyan-950/80 border border-emerald-500/40 space-y-3 shadow-xl">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                          <span className="text-sm font-bold text-white">AI Delivery & Technical Rating</span>
                        </div>
                        <Badge variant="emerald" className="text-sm px-3 py-1 font-bold">
                          Score: {aiEvaluation.score} / 10
                        </Badge>
                      </div>

                      <p className="text-xs text-emerald-200 font-medium leading-relaxed">
                        {aiEvaluation.feedback}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        <span className="text-[10px] font-bold text-gray-400 self-center">Keywords Recognized:</span>
                        {aiEvaluation.keywordsFound.map((kw, i) => (
                          <span key={i} className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Live Voice Recording & Rating Area */}
                  <div className="p-4 rounded-2xl bg-[#09090d] border border-white/10 space-y-4">
                    <AudioSpectrum isActive={isRecording} barCount={28} />
                    <div className="flex justify-center">
                      <Button
                        variant={isRecording ? 'danger' : 'glow'}
                        size="lg"
                        onClick={handleToggleRecording}
                        leftIcon={isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                      >
                        {isRecording ? 'Stop & Get AI Score' : 'Practice Answer Out Loud'}
                      </Button>
                    </div>
                  </div>
                </LaserBorder>
              ) : (
                <LaserBorder className="p-8 text-center space-y-3">
                  <p className="text-gray-400 text-sm">No interview questions available for this category.</p>
                </LaserBorder>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
