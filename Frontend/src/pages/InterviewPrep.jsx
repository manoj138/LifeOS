import React, { useState } from 'react';
import {
  Bot, Mic, MicOff, Play, Sparkles, Award, MessageSquare, CheckCircle2,
  ChevronRight, Activity, HelpCircle, Eye, EyeOff, UserCheck, FileText,
  Volume2, Briefcase, GraduationCap, Code2, Layers, RefreshCw
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Tabs } from '../components/ui/Tabs';

export const InterviewPrep = () => {
  const [activeTab, setActiveTab] = useState('self-intro');
  const [selectedLevel, setSelectedLevel] = useState('Senior / Staff');
  const [isRecording, setIsRecording] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [showModelAnswer, setShowModelAnswer] = useState(false);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState('1x');

  const selfIntroData = {
    name: "Manoj Mansing Chougule",
    location: "Mangle, Maharashtra",
    education: "B.Tech in Computer Science Engineering — Dr. D. Y. Patil Agriculture and Technical University",
    currentRole: "Junior Software Developer Intern @ CloudRegex Infotech",
    skills: ["MongoDB", "Express.js", "React.js", "Node.js", "REST APIs", "SQL", "Git/GitHub", "Postman", "Tailwind CSS"],
    projects: [
      {
        name: "E-Commerce Platform",
        panels: "User, Seller & Admin Panels",
        features: "Product Management, Order Tracking, Inventory, Coupon Engine, Dynamic Shipping Fee Calculation"
      },
      {
        name: "RoyalESeva — Document Portal Hub",
        module: "Vendor Module & Processing Workflow",
        features: "Customer Info Management, Digital Document Processing Workflow, Backend API & DB Integration"
      }
    ],
    fullScript: `Good morning, sir/madam. My name is Manoj Mansing Chougule, and I am from Mangle, Maharashtra. I am currently pursuing my B.Tech in Computer Science Engineering from Dr. D. Y. Patil Agriculture and Technical University.

I am a MERN Stack Developer with hands-on experience in developing full-stack web applications using MongoDB, Express.js, React.js, and Node.js. Currently, I am working as a Junior Software Developer Intern at CloudRegex Infotech, where I have been working on RESTful APIs, database integration, authentication, and dynamic user interfaces.

During my internship, I worked on two major projects:
1. E-Commerce Platform (User, Seller, Admin panels, product/order management, coupons, dynamic shipping fee calculation).
2. RoyalESeva Document Portal Hub (Vendor module, digital document processing workflow, customer info & document management).

Through these projects, I have strengthened my skills in MERN Stack, REST APIs, database management, and authentication. I am also comfortable with JavaScript, SQL, Git, GitHub, Postman, and Tailwind CSS.

My goal is to continuously improve my technical and problem-solving skills and contribute to building scalable and impactful software solutions. Thank you for giving me the opportunity to introduce myself.`
  };

  const questions = [
    {
      id: 0,
      type: "System Design Architecture",
      level: "Staff Architect",
      question: "How would you design a distributed Rate Limiter for an API Gateway serving 100,000 requests per second?",
      talkingPoints: [
        "Compare Token Bucket vs Leaky Bucket vs Sliding Window Log.",
        "Explain Redis Cluster with LUA script execution for atomic counter operations.",
        "Discuss Handling Race Conditions under high concurrency."
      ],
      modelAnswer: "To handle 100k req/sec, I would place a Redis Cluster behind the API Gateway. Using a Redis LUA script ensures that incrementing request counts and setting expiration happens atomically, avoiding race conditions. I'd use the Sliding Window Counter algorithm to allow smooth traffic spikes while strictly enforcing limits."
    },
    {
      id: 1,
      type: "React 19 & Frontend Architecture",
      level: "Senior Frontend",
      question: "Explain React 19 Server Components (RSC) vs Client Components and how hydration errors occur.",
      talkingPoints: [
        "Serialization boundaries between server render and client bundle.",
        "Hooks availability: useActionState, useOptimistic, useFormStatus.",
        "Causes of Hydration Mismatches (Date.now(), SSR vs DOM text)."
      ],
      modelAnswer: "React Server Components run exclusively on the server, generating zero client JS bundle overhead. Client components are hydrated on the browser. Hydration mismatches happen when the server-rendered HTML differs from the initial client render (e.g. rendering window.innerWidth or un-seeded timestamps)."
    }
  ];

  const currentQ = questions[activeQuestion];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="AI Voice & Studio Simulator"
        title="AI Interview Studio & Self Introduction"
        subtitle="Practice your real interview self-introduction script and technical questions with live voice analysis."
        actions={
          <Tabs
            tabs={[
              { id: 'self-intro', label: 'Self Introduction Studio', icon: <UserCheck className="w-4 h-4 text-cyan-400" /> },
              { id: 'technical', label: 'Technical Q&A', icon: <MessageSquare className="w-4 h-4 text-purple-400" /> }
            ]}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        }
      />

      {activeTab === 'self-intro' ? (
        /* SELF INTRODUCTION STUDIO (MANOJ MANSING CHOUGULE) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Teleprompter & Live Voice Practice */}
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
                    onClick={() => setIsRecording(!isRecording)}
                    leftIcon={isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  >
                    {isRecording ? 'Stop & Get AI Delivery Score' : 'Start Speaking Intro'}
                  </Button>
                </div>
              </div>
            </LaserBorder>
          </div>

          {/* Right 5 Cols: Profile Key Stats & Checklist */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Profile Summary Card */}
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

            {/* AI Delivery Checklist */}
            <TiltCard className="p-6 space-y-3">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-400" />
                Self Intro Delivery Evaluation
              </h3>

              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Clear Greeting & Name</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>CloudRegex Internship & MERN Stack</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>E-Commerce & RoyalESeva Project Impact</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Strong Closing Career Goal</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      ) : (
        /* TECHNICAL Q&A SIMULATOR */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-4">
            <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-3">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-purple-400" />
                Technical Question Bank
              </h3>

              <div className="space-y-2">
                {questions.map((q, idx) => (
                  <button
                    key={q.id}
                    onClick={() => {
                      setActiveQuestion(idx);
                      setShowModelAnswer(false);
                    }}
                    className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border ${
                      activeQuestion === idx
                        ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50 text-white font-bold'
                        : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                    }`}
                  >
                    <span className="text-[10px] text-cyan-400 font-mono block">{q.type}</span>
                    <span className="font-bold line-clamp-2 mt-0.5">{q.question}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <LaserBorder className="p-6 space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-xs text-purple-400 font-mono font-bold uppercase">
                  [{currentQ.type}] • {currentQ.level}
                </span>
                <Badge variant="purple">Question {activeQuestion + 1} of {questions.length}</Badge>
              </div>

              <h2 className="text-xl font-extrabold text-white tracking-tight">
                "{currentQ.question}"
              </h2>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Key Points to Mention:</h4>
                <div className="space-y-1.5">
                  {currentQ.talkingPoints.map((tp, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-gray-200 bg-white/5 p-2.5 rounded-xl border border-white/10">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
                      <span>{tp}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Button
                  size="xs"
                  variant="glass"
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  leftIcon={showModelAnswer ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
                >
                  {showModelAnswer ? "Hide Model Answer" : "See Model Answer"}
                </Button>

                {showModelAnswer && (
                  <div className="mt-3 p-4 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 leading-relaxed">
                    🌟 <strong>AI Model Answer:</strong> "{currentQ.modelAnswer}"
                  </div>
                )}
              </div>

              <div className="p-4 rounded-2xl bg-[#09090d] border border-white/10 space-y-4">
                <AudioSpectrum isActive={isRecording} barCount={28} />
                <div className="flex justify-center">
                  <Button
                    variant={isRecording ? 'danger' : 'glow'}
                    size="lg"
                    onClick={() => setIsRecording(!isRecording)}
                    leftIcon={isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  >
                    {isRecording ? 'Stop & Get AI Score' : 'Start Voice Answer'}
                  </Button>
                </div>
              </div>
            </LaserBorder>
          </div>
        </div>
      )}
    </div>
  );
};
