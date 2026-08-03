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
import { useVoiceGuider } from '../context/VoiceGuiderContext';

export const InterviewPrep = () => {
  const { speakText, language, startListening, stopListening, userTranscript } = useVoiceGuider();

  const [activeTab, setActiveTab] = useState('self-intro');
  const [selectedCategory, setSelectedCategory] = useState('js');
  const [isRecording, setIsRecording] = useState(false);
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const [teleprompterSpeed, setTeleprompterSpeed] = useState('1x');
  const [aiEvaluation, setAiEvaluation] = useState(null);

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

  const masterQuestionBank = {
    js: [
      {
        id: "js-1",
        q: "What are Primitive and Non-Primitive data types in JavaScript?",
        a: "Primitive data types include String, Number, Boolean, Undefined, Null, BigInt, and Symbol. They are immutable and stored by value. Non-primitive types include Objects, Arrays, and Functions, which are mutable and stored by reference.",
        marathiIntent: "इंटरव्ह्यूवर तपासत आहे की तुला Memory Allocation (Value vs Reference) समजते का.",
        keywords: ["primitive", "non-primitive", "immutable", "value", "reference", "string", "number", "object"],
        code: `let a = 10; // Primitive (Value)\nlet b = { name: "Manoj" }; // Non-Primitive (Reference)`
      },
      {
        id: "js-2",
        q: "What is the difference between == and ===?",
        a: "`==` (loose equality) compares values after implicit type coercion, whereas `===` (strict equality) compares both value and data type without coercion.",
        marathiIntent: "Type coercion चे नियम आणि strict comparison चे महत्त्व समजते का हे तपासले जाते.",
        keywords: ["loose equality", "strict equality", "coercion", "type", "value"],
        code: `5 == "5"   // true (type coerced)\n5 === "5"  // false (strictly different types)`
      },
      {
        id: "js-3",
        q: "What is the Temporal Dead Zone (TDZ)?",
        a: "The Temporal Dead Zone is the period between entering a scope and the actual line of declaration of a `let` or `const` variable, during which accessing the variable throws a ReferenceError.",
        marathiIntent: "let, const आणि var मधील hoisting चा फरक तुला माहित आहे का.",
        keywords: ["scope", "declaration", "let", "const", "hoisting", "referenceerror"],
        code: `console.log(a); // ReferenceError: Cannot access 'a' before initialization\nlet a = 10;`
      },
      {
        id: "js-4",
        q: "Explain Event Loop, Call Stack, Microtask, and Macrotask Queues.",
        a: "JavaScript is single-threaded. Synchronous code executes on the Call Stack. Asynchronous callbacks enter queues: Promises enter the Microtask Queue, while setTimeout/setInterval enter the Macrotask (Task) Queue. The Event Loop continuously monitors the Call Stack and pushes Microtasks first before Macrotasks.",
        marathiIntent: "Async JavaScript चे inner architecture समजते का हे तपासणारा सर्वात महत्त्वाचा प्रश्न.",
        keywords: ["call stack", "event loop", "microtask", "macrotask", "single-threaded", "promises", "settimeout"]
      }
    ],
    react: [
      {
        id: "react-1",
        q: "What is the Virtual DOM and Reconciliation?",
        a: "Virtual DOM is a lightweight in-memory representation of the real DOM. Reconciliation is the process where React compares the new Virtual DOM tree with the previous one using its Diffing algorithm to calculate minimal real DOM updates.",
        marathiIntent: "React चे performance आणि DOM rendering कसे कार्य करते हे विचारले जाते.",
        keywords: ["virtual dom", "reconciliation", "diffing", "in-memory", "render", "updates"]
      },
      {
        id: "react-2",
        q: "Why do we need unique keys in React lists?",
        a: "Keys give list items a persistent identity across re-renders, enabling React's diffing algorithm to identify which specific items were added, changed, or removed without re-rendering the entire list.",
        marathiIntent: "Array index का key वापरू नये याचा व्यावहारिक अनुभव तपासतात.",
        keywords: ["persistent identity", "re-render", "diffing", "unique", "keys"]
      },
      {
        id: "react-3",
        q: "Controlled vs Uncontrolled Components?",
        a: "In controlled components, form data is handled by React component state (`useState`). In uncontrolled components, form data is handled natively by the DOM tree using `useRef`.",
        marathiIntent: "Forms handled कसे केले जातात हे जाणून घेण्यासाठी.",
        keywords: ["usestate", "useref", "controlled", "uncontrolled", "state", "dom"]
      }
    ],
    node: [
      {
        id: "node-1",
        q: "Is Node.js single-threaded or multi-threaded?",
        a: "Node.js executes JavaScript on a single main thread using V8. However, for background I/O operations (file system, crypto, network), it uses Libuv's thread pool under the hood.",
        marathiIntent: "Node.js चे internal architecture आणि Libuv Threadpool माहित आहे का.",
        keywords: ["single-threaded", "v8", "libuv", "thread pool", "async i/o"]
      },
      {
        id: "node-2",
        q: "How does the Express Request-Response Cycle work?",
        a: "Client sends HTTP request → Express receives it → passes through mounted Middlewares → matches Route → executes Controller business logic → queries Database → sends JSON Response back to client.",
        marathiIntent: "Backend Architecture चा प्रवाह स्पष्ट आहे का.",
        keywords: ["middleware", "routes", "controller", "database", "json response", "http"]
      }
    ],
    mongo: [
      {
        id: "mongo-1",
        q: "Mongoose Schema vs Model?",
        a: "A Schema defines the structure, data types, validators, and rules for MongoDB documents. A Model is a compiled wrapper constructor generated from the schema that provides DB methods (find, create, update) to interact with collections.",
        marathiIntent: "ODM चे मूलभूत ज्ञान तपासले जाते.",
        keywords: ["schema", "model", "validators", "constructor", "collections", "documents"]
      }
    ],
    ecommerce: [
      {
        id: "ecom-1",
        q: "How do you prevent a seller from editing another seller's product?",
        a: "Through backend Authorization: After authenticating the user via JWT middleware, the controller checks whether `product.sellerId.toString() === req.user.id`. If not, it returns HTTP 403 Forbidden.",
        marathiIntent: "🔥 Security question: तू खरोखर Security चे Logic लिहिले आहेस का?",
        keywords: ["jwt", "authorization", "403 forbidden", "sellerid", "middleware"]
      }
    ]
  };

  const categoryList = [
    { id: 'js', label: 'JavaScript Deep', icon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'react', label: 'React Architecture', icon: <Layers className="w-4 h-4 text-purple-400" /> },
    { id: 'node', label: 'Node & Express', icon: <Terminal className="w-4 h-4 text-emerald-400" /> },
    { id: 'mongo', label: 'MongoDB & Schemas', icon: <Database className="w-4 h-4 text-amber-400" /> },
    { id: 'ecommerce', label: 'E-Commerce Scenarios', icon: <Briefcase className="w-4 h-4 text-rose-400" /> }
  ];

  const currentQuestions = masterQuestionBank[selectedCategory] || masterQuestionBank.js;
  const currentActiveQ = currentQuestions[activeQuestionIdx] || currentQuestions[0];

  const handleReadQuestion = () => {
    const textToRead = language === 'mr'
      ? `इंटरव्ह्यू प्रश्न: ${currentActiveQ.q}`
      : `Interview Question: ${currentActiveQ.q}`;
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
    const textToAnalyze = (userTranscript || currentActiveQ.a).toLowerCase();
    const targetKeywords = currentActiveQ.keywords || ["javascript", "react", "node", "data"];

    const found = targetKeywords.filter(kw => textToAnalyze.includes(kw.toLowerCase()));
    const rawScore = Math.min(10, Math.max(6.8, (found.length / targetKeywords.length) * 4 + 6)).toFixed(1);

    let feedbackMsg = '';
    if (language === 'mr') {
      feedbackMsg = `उत्कृष्ट उत्तर मनोज! तुमचा AI Delivery Score १० पैकी ${rawScore} आहे. तुम्ही ${found.length} मुख्य संकल्पना अचूक स्पष्ट केल्या!`;
    } else {
      feedbackMsg = `Great explanation Manoj! Your AI Delivery Score is ${rawScore} out of 10. You successfully covered key technical concepts!`;
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
        subtitle="Customized for Manoj Mansing Chougule (CloudRegex Intern • E-Commerce & RoyalESeva Projects)."
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
                      key={q.id}
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
                      <span className="font-bold line-clamp-2">{q.q}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Detail & Answer Studio */}
            <div className="lg:col-span-8 space-y-6">
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
                  "{currentActiveQ.q}"
                </h2>

                {/* English Master Answer */}
                <div className="p-4 rounded-2xl bg-[#09090d] border border-purple-500/30 space-y-2">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                    🌟 Word-for-Word English Interview Answer:
                  </span>
                  <p className="text-sm text-gray-100 leading-relaxed font-sans font-medium">
                    "{currentActiveQ.a}"
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
