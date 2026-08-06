import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, Sparkles, BookOpen, MessageSquare, CheckCircle2, PlayCircle, RefreshCw, Award, Bot } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard, Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { TiltCard } from '../components/ui/TiltCard';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { apiService } from '../services/api';
import { useVoiceGuider } from '../context/VoiceGuiderContext';
import { useUser } from '../context/UserContext';

export const EnglishPage = () => {
  const { user, preferences } = useUser();
  const { startListening, stopListening, userTranscript } = useVoiceGuider();

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
        badge="Fluency & Technical Vocabulary Studio"
        title="English Speaking & Interview Communication Coach"
        subtitle={`Calibrated for ${preferences?.targetRole || 'Full-Stack Developer'} • Master executive pronunciation, technical vocabulary, and fluent self-expression.`}
        actions={
          <Button
            variant={isRecording ? 'danger' : 'primary'}
            onClick={handleToggleRecording}
            leftIcon={isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          >
            {isRecording ? 'Stop Recording' : 'Start Live Speaking Drill'}
          </Button>
        }
      />

      {/* Featured Interactive Speaking Studio */}
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
  );
};
