import React, { useState } from 'react';
import {
  BookOpen, CheckCircle2, Play, ArrowRight, Sparkles, Terminal,
  ChevronRight, Lock, HelpCircle, MessageSquare, Code2, RefreshCw, Award
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const LearningHub = () => {
  const [activeChapter, setActiveChapter] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState([0]);
  const [aiExplainMode, setAiExplainMode] = useState(false);

  const chapters = [
    {
      title: "Chapter 1: Node.js & Express API Gateway",
      badge: "Basics",
      lessons: [
        {
          id: 0,
          title: "1.1 Introduction to Express API Gateway Architecture",
          time: "10 mins",
          summary: "Learn how API gateways route incoming client traffic, validate tokens, and rate-limit IP addresses before forwarding requests to backend microservices.",
          notes: `An API Gateway serves as the single entry point for all client requests. Key responsibilities include:

1. Request Routing: Mapping routes like /api/v1/users to microservice targets.
2. Authentication: Verifying JWT headers before touching internal microservices.
3. Rate Limiting: Preventing DDoS attacks using sliding window counters in Redis.`,
          code: `import express from 'express';
const app = express();

// Basic API Gateway Route
app.use('/api/v1/users', (req, res) => {
  res.json({ service: 'User Microservice', status: 'Healthy' });
});

app.listen(3000, () => console.log('🚀 Gateway running on port 3000'));`
        },
        {
          id: 1,
          title: "1.2 Building Custom Express Middleware",
          time: "15 mins",
          summary: "Master req, res, and next() flow to intercept requests for logging, request timing, and CORS headers.",
          notes: `Express middleware functions execute sequentially in the order they are mounted via app.use().

- req: Request object containing headers, body, query parameters.
- res: Response object used to send status codes and payloads.
- next(): Function that passes control to the next middleware handler in line.`,
          code: `// Custom Request Logger Middleware
const logger = (req, res, next) => {
  console.log(\`[\${new Date().toISOString()}] \${req.method} \${req.url}\`);
  next(); // Pass control to next handler
};

app.use(logger);`
        }
      ]
    },
    {
      title: "Chapter 2: Redis Caching & Rate Limiting",
      badge: "Intermediate",
      lessons: [
        {
          id: 2,
          title: "2.1 Implementing Redis Rate Limiter (Sliding Window)",
          time: "20 mins",
          summary: "Use Redis INCR and EXPIRE to enforce a maximum of 100 requests per minute per IP address.",
          notes: `Redis is an in-memory key-value data store ideally suited for high-speed rate limiting.

- INCR key: Atomically increments integer count for an IP address.
- EXPIRE key 60: Sets key expiration to 60 seconds.
- Status Code 429: Returned when client exceeds threshold.`,
          code: `import { createClient } from 'redis';
const redis = createClient();

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const count = await redis.incr(ip);
  if (count === 1) await redis.expire(ip, 60);
  if (count > 100) return res.status(429).json({ error: 'Too Many Requests' });
  next();
};`
        }
      ]
    },
    {
      title: "Chapter 3: Docker & Hostinger VPS Deployment",
      badge: "Advanced",
      lessons: [
        {
          id: 3,
          title: "3.1 Containerizing Node.js Microservices with Docker",
          time: "25 mins",
          summary: "Write production Dockerfile and Docker Compose configuration for Hostinger VPS CloudPanel deployment.",
          notes: `Docker allows packaging your Node.js app along with its dependencies into isolated containers.

1. Use lightweight node:22-alpine base image.
2. Set NODE_ENV=production.
3. Expose application port 3000.`,
          code: `FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]`
        }
      ]
    }
  ];

  const currentLessonData = chapters[activeChapter]?.lessons[activeLesson] || chapters[0].lessons[0];

  const markLessonComplete = () => {
    if (!completedLessons.includes(currentLessonData.id)) {
      setCompletedLessons([...completedLessons, currentLessonData.id]);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Top Header */}
      <SectionHeader
        badge="Interactive Learning Studio"
        title="MERN & Fullstack Learning Hub"
        subtitle="Follow step-by-step guided lessons, read simple notes, ask the AI Mentor, and practice live code."
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="purple" className="px-3 py-1.5 font-mono text-xs">
              Progress: {completedLessons.length} / 4 Lessons Completed
            </Badge>
            <Button
              variant={aiExplainMode ? "glow" : "glass"}
              size="sm"
              onClick={() => setAiExplainMode(!aiExplainMode)}
              leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
            >
              {aiExplainMode ? "AI Mentor Active" : "Ask AI Coach"}
            </Button>
          </div>
        }
      />

      {/* Main Guided Course Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Chapter & Lesson Navigation Tree */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              Course Syllabus & Chapters
            </h3>

            <div className="space-y-3">
              {chapters.map((ch, cIdx) => (
                <div key={cIdx} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold text-gray-300 px-2 py-1">
                    <span>{ch.title}</span>
                    <Badge variant="glass">{ch.badge}</Badge>
                  </div>

                  {ch.lessons.map((l, lIdx) => {
                    const isSelected = activeChapter === cIdx && activeLesson === lIdx;
                    const isDone = completedLessons.includes(l.id);
                    return (
                      <button
                        key={l.id}
                        onClick={() => {
                          setActiveChapter(cIdx);
                          setActiveLesson(lIdx);
                        }}
                        className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white font-bold border border-purple-500/40'
                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {isDone ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-white/20 shrink-0" />
                          )}
                          <span className="truncate">{l.title}</span>
                        </div>
                        <span className="text-[10px] text-gray-500 shrink-0">{l.time}</span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 8 Columns: Lesson Reader + Code Sandbox + AI Explainer */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Mentor Assistant Pop-out (When Toggled) */}
          {aiExplainMode && (
            <LaserBorder className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 animate-pulse" /> AI Mentor Assistant
                </span>
                <Button size="xs" variant="ghost" onClick={() => setAiExplainMode(false)}>Close</Button>
              </div>

              <p className="text-xs text-gray-200 leading-relaxed">
                "Hi Manoj! In this lesson, remember that Express middleware works like a pipeline. Request enters → passes through Middleware A → Middleware B → sends Response. Ask me if you need simple real-world analogies!"
              </p>

              <div className="flex items-center gap-2 pt-2">
                <Button size="xs" variant="glass">Explain in simple terms</Button>
                <Button size="xs" variant="glass">Give me a quick Quiz</Button>
              </div>
            </LaserBorder>
          )}

          {/* Lesson Notes & Explanation Card */}
          <TiltCard className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs text-purple-400 font-mono font-bold uppercase">
                  Lesson {currentLessonData.id + 1}
                </span>
                <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                  {currentLessonData.title}
                </h2>
              </div>
              <Badge variant="cyan">{currentLessonData.time} read</Badge>
            </div>

            <p className="text-sm text-cyan-300 font-medium leading-relaxed bg-cyan-500/10 p-3.5 rounded-xl border border-cyan-500/20">
              💡 <strong>Lesson Goal:</strong> {currentLessonData.summary}
            </p>

            <div className="text-sm text-gray-300 leading-relaxed whitespace-pre-line font-sans">
              {currentLessonData.notes}
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Button
                variant={completedLessons.includes(currentLessonData.id) ? "glass" : "primary"}
                size="sm"
                onClick={markLessonComplete}
                leftIcon={<CheckCircle2 className="w-4 h-4" />}
              >
                {completedLessons.includes(currentLessonData.id) ? "Completed ✓" : "Mark Lesson Complete"}
              </Button>
            </div>
          </TiltCard>

          {/* Interactive Code Exercise Sandbox for This Lesson */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                Lesson Practice Code Sandbox
              </h3>
              <span className="text-xs text-gray-400">Run code below to verify your logic</span>
            </div>

            <CodeEditor
              initialFiles={[
                { name: "exercise.js", lang: "javascript", code: currentLessonData.code }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
