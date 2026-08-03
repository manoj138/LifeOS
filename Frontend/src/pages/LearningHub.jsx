import React from 'react';
import { BookOpen, Code2, CheckCircle2, Play, ArrowRight, Sparkles, Terminal, Cpu } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const LearningHub = () => {
  const modules = [
    {
      title: "MERN Microservices Architecture & Redis Caching",
      lessons: "12 Lessons • 8.5 hrs",
      progress: 88,
      status: "In Progress",
      topics: ["Express Gateway", "JWT Auth & Redis", "MongoDB Indexing", "Docker Containers"]
    },
    {
      title: "Next.js 15 App Router & React 19 Compiler",
      lessons: "10 Lessons • 6.0 hrs",
      progress: 100,
      status: "Completed",
      topics: ["Server Actions", "Streaming & Suspense", "Tailwind CSS v4", "Optimistic UI"]
    },
    {
      title: "Node.js Performance Tuning & V8 Profiling",
      lessons: "8 Lessons • 4.5 hrs",
      progress: 65,
      status: "In Progress",
      topics: ["Cluster Module", "Worker Threads", "Memory Leaks", "v8 Profiling"]
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Technical Mastery Studio"
        title="MERN & Fullstack Learning Hub"
        subtitle="Industry-grade engineering curriculum with live embedded Node.js IDE sandbox."
        actions={
          <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
            Generate AI Study Plan
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Full IDE Sandbox Experience */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                Live Node.js / Express IDE Sandbox
              </h3>
              <Badge variant="emerald">Runtime Ready</Badge>
            </div>
            <CodeEditor />
          </div>
        </div>

        {/* Right Col: Curriculum Roadmap Modules */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-purple-400" />
            Curriculum Roadmap
          </h3>

          <div className="space-y-4">
            {modules.map((m, idx) => (
              <TiltCard key={idx} className="p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <h4 className="text-sm font-bold text-white tracking-tight">{m.title}</h4>
                  <Badge variant={m.status === 'Completed' ? 'emerald' : 'cyan'}>
                    {m.status}
                  </Badge>
                </div>

                <p className="text-xs text-gray-400 font-mono">{m.lessons}</p>

                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full" style={{ width: `${m.progress}%` }} />
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
