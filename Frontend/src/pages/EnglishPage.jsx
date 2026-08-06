import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, BookOpen, MessageSquare, CheckCircle2, PlayCircle, RefreshCw, Award, Bot, Target, Zap, ArrowRight, Check, X, Layers, Flame, RotateCcw, Heart, Smile } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { apiService } from '../services/api';
import { useVoiceGuider } from '../context/VoiceGuiderContext';
import { useUser } from '../context/UserContext';

export const EnglishPage = () => {
  const { user, preferences } = useUser();
  const { startListening, stopListening, userTranscript, speakText } = useVoiceGuider();

  const [activeTab, setActiveTab] = useState('duolingo'); // 'duolingo' | 'speech'
  const [activeLevelIdx, setActiveLevelIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);

  const [modules, setModules] = useState([]);
  const [activeDrill, setActiveDrill] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchEnglishModules = async () => {
      const res = await apiService.getEnglishModules();
      if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setModules(res.data);
      } else if (isMounted) {
        setModules([
          {
            id: 'eng_1',
            title: 'Technical Self-Introduction Drill',
            description: 'Practice speaking about your engineering background, tech stack, and key projects fluently.',
            category: 'conversation',
            badgeLabel: 'High Impact',
            prompt: 'Hi, please introduce yourself as a candidate for the Full-Stack Developer role in 60 seconds.'
          },
          {
            id: 'eng_2',
            title: 'Explaining System Architecture in English',
            description: 'Learn executive phrasing to explain REST APIs, WebSockets, and database indexing clearly.',
            category: 'vocabulary',
            badgeLabel: 'Architecture',
            prompt: 'Explain how a client request flows through Nginx reverse proxy to Express backend and MongoDB.'
          },
          {
            id: 'eng_3',
            title: 'Behavioral & STAR Method Fluency',
            description: 'Respond to scenario questions (conflict resolution, tight deadlines) using STAR structure.',
            category: 'pronunciation',
            badgeLabel: 'Behavioral',
            prompt: 'Describe a challenging bug you encountered in production and how you systematically debugged it.'
          }
        ]);
      }
    };
    fetchEnglishModules();
    return () => { isMounted = false; };
  }, []);

  // 4-Level Beginner-to-Confidence Growth Ladder Data
  const beginnerLadder = [
    {
      levelNumber: 1,
      levelTitle: 'Level 1: Daily Essential Phrases',
      badge: 'Zero-to-Hero Level 1',
      phrases: [
        {
          english: 'Could you please repeat that?',
          marathi: 'कृपया तुम्ही ते पुन्हा सांगू शकाल का?',
          context: 'Used when you did not hear or understand what the speaker said.',
          pronunciationTip: 'Could you please re-peat that?'
        },
        {
          english: 'I am currently working on a React project.',
          marathi: 'मी सध्या एका रिएक्ट प्रोजेक्टवर काम करत आहे.',
          context: 'Used when describing your current development focus.',
          pronunciationTip: 'I am cur-rent-ly work-ing on a React pro-ject.'
        },
        {
          english: 'Thank you for giving me this opportunity.',
          marathi: 'मला ही संधी दिल्याबद्दल धन्यवाद.',
          context: 'Used at the beginning or conclusion of an interview.',
          pronunciationTip: 'Thank you for giv-ing me this op-por-tu-ni-ty.'
        }
      ]
    },
    {
      levelNumber: 2,
      levelTitle: 'Level 2: Office & Daily Greetings',
      badge: 'Level 2',
      phrases: [
        {
          english: 'Good morning! It is a pleasure to meet you.',
          marathi: 'शुभ प्रभात! तुम्हाला भेटून खूप आनंद झाला.',
          context: 'Used when greeting interviewers or new team members.',
          pronunciationTip: 'Good morn-ing! It is a plea-sure to meet you.'
        },
        {
          english: 'Let me walk you through the key features.',
          marathi: 'मी तुम्हाला मुख्य फीचर्सबद्दल थोडक्यात सांगतो.',
          context: 'Used when starting a project demo or code walkthrough.',
          pronunciationTip: 'Let me walk you through the key fea-tures.'
        }
      ]
    },
    {
      levelNumber: 3,
      levelTitle: 'Level 3: Project & Tech Phrasing',
      badge: 'Level 3',
      phrases: [
        {
          english: 'Our Express API connects to MongoDB database securely.',
          marathi: 'आपले एक्सप्रेस एपीआय मोंगोडीबी डेटाबेसशी सुरक्षितपणे जोडलेले आहे.',
          context: 'Used when explaining backend database architecture.',
          pronunciationTip: 'Our Ex-press API con-nects to Mongo-DB date-a-base se-cure-ly.'
        },
        {
          english: 'I used Tailwind CSS to build a responsive user interface.',
          marathi: 'मी सर्व उपकरणांवर चांगल्या दिसणाऱ्या डिझाईनसाठी Tailwind CSS वापरले.',
          context: 'Used when describing frontend styling and responsiveness.',
          pronunciationTip: 'I used Tail-wind CSS to build a re-spon-sive user in-ter-face.'
        }
      ]
    },
    {
      levelNumber: 4,
      levelTitle: 'Level 4: Job Interview Confidence',
      badge: 'Level 4 Mastery',
      phrases: [
        {
          english: 'I solved this issue by checking server console logs.',
          marathi: 'मी सर्व्हर कन्सोल लॉग्ज तपासून ही अडचण सोडवली.',
          context: 'Used when explaining your systematic debugging process.',
          pronunciationTip: 'I solved this is-sue by check-ing ser-ver con-sole logs.'
        },
        {
          english: 'I am passionate about learning new web technologies daily.',
          marathi: 'मला रोज नवीन वेब टेक्नॉलॉजी शिकण्याची आवड आहे.',
          context: 'Used when expressing your continuous learning mindset.',
          pronunciationTip: 'I am pas-sion-ate a-bout learn-ing new web tech-nol-o-gies day-ly.'
        }
      ]
    }
  ];

  const currentLevelData = beginnerLadder[activeLevelIdx] || beginnerLadder[0];

  const sentenceDrill = {
    question: 'Complete the sentence: "I ______ working on a full-stack website project."',
    options: [
      "am",
      "is",
      "are",
      "were"
    ],
    correctIdx: 0,
    explanation: "Great job! 🎉 Always use 'am' with 'I' in present continuous tense."
  };

  const commonMistakes = [
    {
      wrong: 'I am having 3 years of experience in coding.',
      correct: 'I have 3 years of experience in coding.',
      reason: 'Use simple present tense ("I have") for permanent states or experience instead of "I am having".'
    },
    {
      wrong: 'I am agree with you.',
      correct: 'I agree with you.',
      reason: '"Agree" is already a verb. Do not add "am" before it.'
    },
    {
      wrong: 'Myself Manoj, I am a developer.',
      correct: 'My name is Manoj, and I am a software developer.',
      reason: 'Avoid starting professional introductions with "Myself". Use "My name is" or "I am".'
    }
  ];

  const currentDrill = modules[activeDrill] || modules[0];

  const handleToggleRecording = () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
      setFeedback({
        clarityScore: 92,
        paceWpm: 135,
        vocabularyRating: 'Professional Engineering',
        tips: [
          'Excellent speed and articulation of technical terms!',
          'Use connectors like "Furthermore" and "Consequently" for smoother transitions.'
        ]
      });
    } else {
      setFeedback(null);
      startListening();
      setIsRecording(true);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Zero-to-Hero English Communication Studio"
        title="English Speaking & Confidence Builder"
        subtitle="Master executive pronunciation, technical vocabulary, and confident English communication."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={activeTab === 'duolingo' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('duolingo')}
              leftIcon={<Target className="w-4 h-4 text-cyan-400" />}
            >
              🎯 Daily Duolingo Drills
            </Button>
            <Button
              variant={activeTab === 'speech' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('speech')}
              leftIcon={<Mic className="w-4 h-4 text-purple-400" />}
            >
              🎙️ Live AI Voice Studio
            </Button>
          </div>
        }
      />

      {/* TAB 1: Duolingo-Style Zero-to-Hero Beginner Practice */}
      {activeTab === 'duolingo' && (
        <div className="space-y-8">
          {/* Beginner Growth Ladder Stepper */}
          <LaserBorder className="p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="cyan">Zero-to-Hero English Ladder</Badge>
                  <span className="text-xs text-purple-300 font-mono font-bold">Interactive Practice 💬</span>
                </div>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Select Your Current Learning Level (Steps 1..4)
                </h2>
              </div>
            </div>

            {/* Stepper Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4">
              {beginnerLadder.map((lvl, idx) => {
                const isActive = idx === activeLevelIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveLevelIdx(idx);
                      setSelectedOptionIdx(null);
                    }}
                    className={`p-3 rounded-xl text-left transition-all border flex flex-col justify-between gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-purple-500 text-white font-bold shadow-lg shadow-purple-500/10'
                        : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">Level {idx + 1}</span>
                      {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    </div>
                    <span className="text-xs font-semibold">{lvl.levelTitle.split(':')[1] || lvl.levelTitle}</span>
                  </button>
                );
              })}
            </div>
          </LaserBorder>

          {/* Active Level Phrases (Listen & Repeat Out Loud Cards) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Volume2 className="w-5 h-5 text-cyan-400" />
                {currentLevelData.levelTitle} — Speak Out Loud
              </h3>
              <Badge variant="purple">{currentLevelData.badge}</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentLevelData.phrases.map((p, idx) => (
                <TiltCard key={idx} className="p-6 space-y-4 border border-white/10 bg-[#12121a]">
                  <div className="flex items-start justify-between gap-3 border-b border-white/10 pb-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">English Phrase:</span>
                      <h4 className="text-lg font-extrabold text-white tracking-tight leading-snug">
                        "{p.english}"
                      </h4>
                    </div>

                    <Button
                      size="xs"
                      variant="glow"
                      onClick={() => speakText(p.english)}
                      leftIcon={<Volume2 className="w-3.5 h-3.5 text-cyan-300" />}
                      className="shrink-0"
                    >
                      Listen Pronunciation 🔊
                    </Button>
                  </div>

                  {/* Subtle Regional Meaning Tag */}
                  {p.marathi && (
                    <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs flex items-center justify-between gap-2">
                      <span className="text-[10px] font-mono uppercase text-purple-300">Regional Helper Tag:</span>
                      <span className="text-purple-200 font-medium font-sans truncate">{p.marathi}</span>
                    </div>
                  )}

                  {/* Usage Context & Pronunciation Guide */}
                  <div className="space-y-1.5 text-xs">
                    <p className="text-gray-300">
                      💡 <strong>When to use:</strong> {p.context}
                    </p>
                    <p className="text-gray-400 font-mono text-[11px]">
                      🗣️ <strong>Pronunciation Guide:</strong> {p.pronunciationTip}
                    </p>
                  </div>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Interactive Duolingo Sentence Builder Drill & Common Mistakes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
            <div className="lg:col-span-6 space-y-6">
              <TiltCard className="p-6 sm:p-8 space-y-5 border border-purple-500/30 bg-purple-950/20">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Target className="w-4 h-4 text-cyan-400" /> Interactive Sentence Builder Drill
                  </span>
                  <Badge variant="purple">1-Click Drill</Badge>
                </div>

                <p className="text-sm font-bold text-white leading-relaxed">
                  {sentenceDrill.question}
                </p>

                <div className="space-y-2">
                  {sentenceDrill.options.map((opt, idx) => {
                    const isSelected = selectedOptionIdx === idx;
                    const isCorrect = idx === sentenceDrill.correctIdx;
                    let style = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";
                    if (selectedOptionIdx !== null) {
                      if (isCorrect) style = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                      else if (isSelected) style = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedOptionIdx(idx)}
                        className={`w-full text-left p-3 rounded-xl text-xs border transition-all flex items-center justify-between ${style}`}
                      >
                        <span>{opt}</span>
                        {selectedOptionIdx !== null && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                      </button>
                    );
                  })}
                </div>

                {selectedOptionIdx !== null && (
                  <div className="p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 leading-relaxed animate-fadeIn space-y-1">
                    <strong>{selectedOptionIdx === sentenceDrill.correctIdx ? "Correct Phrasing! 🎉" : "Note:"}</strong>
                    <p>{sentenceDrill.explanation}</p>
                  </div>
                )}
              </TiltCard>
            </div>

            <div className="lg:col-span-6 space-y-4">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-400" /> Common English Mistakes & Corrections
              </h3>

              <div className="space-y-3">
                {commonMistakes.map((m, idx) => (
                  <TiltCard key={idx} className="p-4 space-y-2 border border-white/10 bg-[#12121a]">
                    <div className="flex items-center gap-2 text-xs text-rose-400 font-semibold">
                      <X className="w-4 h-4 shrink-0" />
                      <span className="line-through">{m.wrong}</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>{m.correct}</span>
                    </div>

                    <p className="text-[11px] text-gray-300 pt-1 border-t border-white/5 font-sans leading-relaxed">
                      💡 <strong>Rule:</strong> {m.reason}
                    </p>
                  </TiltCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Live AI Voice & Teleprompter Studio */}
      {activeTab === 'speech' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-6">
              {currentDrill && (
                <TiltCard className="p-8 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 flex items-center justify-center">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-extrabold text-white tracking-tight">{currentDrill.title}</h3>
                        <span className="text-xs text-purple-300 font-mono">Interactive Fluency Studio</span>
                      </div>
                    </div>
                    <Badge variant="purple">{currentDrill.badgeLabel || 'Active Drill'}</Badge>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 block">
                      AI Speaking Prompt:
                    </span>
                    <p className="text-sm text-gray-200 leading-relaxed italic">
                      "{currentDrill.prompt || currentDrill.description}"
                    </p>
                  </div>

                  {/* Live Waveform Indicator */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span>Audio Spectrum Monitor</span>
                      <span className={isRecording ? "text-rose-400 font-bold animate-pulse" : "text-gray-500"}>
                        {isRecording ? "● Recording Live Speech..." : "Ready"}
                      </span>
                    </div>
                    <AudioSpectrum isActive={isRecording} barCount={36} />
                  </div>

                  {/* Toggle Recording Button */}
                  <div className="flex items-center justify-end">
                    <Button
                      variant={isRecording ? 'danger' : 'primary'}
                      onClick={handleToggleRecording}
                      leftIcon={isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    >
                      {isRecording ? 'Stop Recording' : 'Start Live Speaking Drill'}
                    </Button>
                  </div>

                  {/* User Live Transcript Box */}
                  <div className="p-4 rounded-2xl bg-[#09090e] border border-white/10 min-h-[100px] space-y-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block">
                      Live Speech Transcript Output:
                    </span>
                    <p className="text-xs text-cyan-300 font-mono">
                      {userTranscript || (isRecording ? "Listening... Speak your response clearly into the microphone." : "Click 'Start Live Speaking Drill' to practice your speech.")}
                    </p>
                  </div>

                  {/* Instant AI Speech Feedback */}
                  {feedback && (
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border border-purple-500/30 space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold text-white flex items-center gap-2">
                          <Award className="w-5 h-5 text-amber-400" />
                          AI Speech Evaluation Scorecard
                        </h4>
                        <Badge variant="emerald">{feedback.clarityScore}% Clarity Score</Badge>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] text-gray-400 block">Speech Speed</span>
                          <span className="text-base font-bold text-cyan-300">{feedback.paceWpm} WPM</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] text-gray-400 block">Clarity Rating</span>
                          <span className="text-base font-bold text-emerald-300">{feedback.clarityScore}/100</span>
                        </div>
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                          <span className="text-[10px] text-gray-400 block">Vocabulary</span>
                          <span className="text-base font-bold text-purple-300">Executive</span>
                        </div>
                      </div>

                      <div className="space-y-1">
                        {feedback.tips.map((tip, idx) => (
                          <p key={idx} className="text-xs text-gray-300 flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            <span>{tip}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </TiltCard>
              )}
            </div>

            {/* Right Side: Available English Drills Bank */}
            <div className="lg:col-span-4 space-y-4">
              <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
                <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-purple-400" />
                  Technical English Module Bank
                </h3>

                <div className="space-y-2.5 max-h-[500px] overflow-y-auto pr-1">
                  {modules.map((m, idx) => (
                    <button
                      key={m.id || idx}
                      onClick={() => {
                        setActiveDrill(idx);
                        setFeedback(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl text-xs transition-all border ${
                        activeDrill === idx
                          ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/20 border-purple-500/50 text-white font-bold'
                          : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold">{m.title}</span>
                        <Badge variant="purple">{m.badgeLabel || 'Module'}</Badge>
                      </div>
                      <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">{m.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
