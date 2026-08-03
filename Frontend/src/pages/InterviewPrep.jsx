import React, { useState } from 'react';
import { Bot, Mic, MicOff, Play, Sparkles, Award, MessageSquare, CheckCircle2, ChevronRight, Activity } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const InterviewPrep = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    {
      id: 1,
      type: "System Design",
      question: "How would you design a distributed Rate Limiter for an API Gateway serving 100k requests per second?",
      hints: ["Token Bucket vs Leaky Bucket", "Redis Cluster & Sliding Window Log", "Concurrency & Race Conditions"]
    },
    {
      id: 2,
      type: "React / Frontend",
      question: "Explain React 19 Server Components vs Client Components and how hydration errors occur.",
      hints: ["Serialization boundaries", "useActionState & useOptimistic", "Bundle size optimization"]
    },
    {
      id: 3,
      type: "MERN Backend",
      question: "How do you handle database indexing and transaction rollbacks in MongoDB with Mongoose?",
      hints: ["Compound Indexes", "ACID Transactions with Sessions", "Explain Plans"]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="AI Voice & Studio Simulator"
        title="AI Interview Studio"
        subtitle="Practice real-time technical interviews with an AI Staff Engineer. Get real-time voice feedback & metrics."
        actions={
          <Badge variant="purple" className="px-3 py-1.5 font-mono text-xs">
            Confidence Score: 95% (Senior Staff Ready)
          </Badge>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Studio Room */}
        <div className="lg:col-span-2 space-y-6">
          <LaserBorder className="p-8 space-y-6">
            {/* AI Avatar */}
            <div className="flex items-center gap-4 pb-4 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#0c0c10] rounded-[14px] flex items-center justify-center">
                  <Bot className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
              </div>

              <div>
                <span className="text-xs font-semibold text-cyan-400 uppercase tracking-widest">AI Interviewer</span>
                <h3 className="text-lg font-bold text-white tracking-tight">Staff Frontend Architect AI</h3>
              </div>

              <Badge variant="neon" className="ml-auto">
                Question {activeQuestion + 1} of {questions.length}
              </Badge>
            </div>

            {/* Current Question */}
            <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 space-y-3">
              <span className="text-xs text-purple-400 font-mono font-bold uppercase tracking-wider">
                [{questions[activeQuestion].type}]
              </span>
              <h2 className="text-xl font-extrabold text-white tracking-tight leading-snug">
                "{questions[activeQuestion].question}"
              </h2>
            </div>

            {/* Live Audio Spectrum */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs text-gray-400">
                <span>Real-Time Voice Spectrum Visualizer</span>
                <Badge variant={isRecording ? 'rose' : 'emerald'}>
                  {isRecording ? '● Recording Voice' : 'Ready'}
                </Badge>
              </div>

              <AudioSpectrum isActive={isRecording} barCount={32} />

              <div className="flex items-center justify-center pt-2">
                <Button
                  variant={isRecording ? 'danger' : 'glow'}
                  size="xl"
                  onClick={() => setIsRecording(!isRecording)}
                  leftIcon={isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                >
                  {isRecording ? 'Stop & Submit Voice Response' : 'Start Voice Answer'}
                </Button>
              </div>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <Button
                variant="ghost"
                size="sm"
                disabled={activeQuestion === 0}
                onClick={() => setActiveQuestion(prev => prev - 1)}
              >
                Previous Question
              </Button>
              <Button
                variant="primary"
                size="sm"
                disabled={activeQuestion === questions.length - 1}
                onClick={() => setActiveQuestion(prev => prev + 1)}
                rightIcon={<ChevronRight className="w-4 h-4" />}
              >
                Next Question
              </Button>
            </div>
          </LaserBorder>
        </div>

        {/* Right Col: AI Metrics */}
        <div className="space-y-6">
          <TiltCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Live AI Evaluation Scorecard
            </h3>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Technical Depth</span>
                  <span className="text-cyan-400">96%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: '96%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Speech Clarity & Pace</span>
                  <span className="text-purple-400">92%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full" style={{ width: '92%' }} />
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
