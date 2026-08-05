import React, { useState, useEffect } from 'react';
import {
  BookOpen, CheckCircle2, Play, ArrowRight, Sparkles, Terminal,
  ChevronRight, Lock, HelpCircle, MessageSquare, Code2, RefreshCw, Award,
  Database, ShieldCheck, Server, Cpu, Layers, GitBranch, Briefcase, FileText,
  PieChart, Activity, Zap, Search, Globe, Key, FileCheck, Layers3, Flame,
  AlertTriangle, Lightbulb, CheckSquare, MessageCircle, Info, ShieldAlert, Clock, HelpCircle as QuizIcon,
  Filter, Compass, Target, Check, ArrowUpRight, LockKeyhole, Trophy, RotateCcw, Calculator, GitPullRequest, Binary
} from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

import {
  loadLearningProgress,
  saveLearningProgress,
  isTopicUnlocked,
  isLevelUnlocked
} from '../utils/learningProgress';

import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';
import { FormattedMarkdown } from '../components/ui/FormattedMarkdown';
import { SearchInput } from '../components/ui/SearchInput';
import { DifficultyBadge } from '../components/ui/DifficultyBadge';
import { FilterPills } from '../components/ui/FilterPills';
import { EmptyStateCard } from '../components/ui/EmptyStateCard';

export const LearningHub = () => {
  const { preferences } = useUser();

  // Load saved progress state from localStorage on mount
  const initialProgress = loadLearningProgress();

  const [activeModule, setActiveModule] = useState(initialProgress.lastActiveModule || 'js');
  const [dynamicTopics, setDynamicTopics] = useState(null);
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
    const fetchTopics = async () => {
      const res = await apiService.getCurriculumTopics(activeModule);
      if (isMounted && res?.success && Array.isArray(res.data)) {
        setDynamicTopics(res.data);
      } else if (isMounted) {
        setDynamicTopics(null);
      }
    };
    fetchTopics();
    return () => { isMounted = false; };
  }, [activeModule]);

  const [activeLessonIdx, setActiveLessonIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [completedLessons, setCompletedLessons] = useState(initialProgress.completedLessons || ['js-0']);
  const [passedQuizzes, setPassedQuizzes] = useState(initialProgress.passedQuizzes || {});
  
  const [aiExplainMode, setAiExplainMode] = useState(false);
  const [aiCustomPrompt, setAiCustomPrompt] = useState(null);
  const [activeTab, setActiveTab] = useState('concept'); // 'concept', 'code', 'project', 'quiz', 'sandbox'
  const [quizAnswers, setQuizAnswers] = useState({}); // { questionIdx: selectedOptionIdx }
  const [quizErrorMessage, setQuizErrorMessage] = useState(null);
  const [activeLevelFilter, setActiveLevelFilter] = useState('all'); // 'all', 'Beginner', 'Intermediate', 'Advanced'
  const [showLevelMasterModal, setShowLevelMasterModal] = useState(false);


  const roadmapModules = dynamicModules.map((dm, idx) => ({
    id: dm.id,
    label: `${idx + 1}. ${dm.title || dm.id}`,
    icon: <BookOpen className="w-4 h-4 text-cyan-400" />,
    count: dm.topicCount ? `${dm.topicCount} Topics` : 'Topics'
  }));

  const activeLessonsList = dynamicTopics
    ? dynamicTopics.map(dt => ({
        id: dt.id,
        title: dt.title || dt.topicName,
        topicName: dt.topicName || dt.title,
        level: dt.level || 'Beginner',
      }))
    : [];

  const activeModuleTitle = dynamicModules.find(m => m.id === activeModule)?.title || activeModule;

  const currentModuleData = {
    id: activeModule,
    title: activeModuleTitle,
    lessons: activeLessonsList
  };

  const getRichLessonDetail = (lesson) => {
    if (!lesson) return null;
    const dynamicTopic = dynamicTopics?.find(dt => 
      String(dt.id) === String(lesson.id) || 
      dt.title === lesson.title || 
      (dt.topicName && lesson.topicName && dt.topicName.toLowerCase() === lesson.topicName.toLowerCase())
    );

    if (!dynamicTopic) {
      return {
        id: lesson.id,
        title: lesson.title,
        difficulty: lesson.level || "Beginner",
        summary: `Topic: ${lesson.title}`,
        notes: `Study the core concepts of ${lesson.title}.`,
        useCases: `Applied in modern web applications.`,
        keyTakeaways: [`Master fundamental concepts of ${lesson.title}.`],
        code: `// Practical Example: ${lesson.title}\nconsole.log("Exploring ${lesson.title}...");`,
        goodCode: null,
        badCode: null,
        quiz: [],
        taskTitle: `Chapter Challenge: ${lesson.title}`,
        taskDescription: `Complete the practical exercise for ${lesson.title}.`,
        starterCode: `// Starter Code for ${lesson.title}\n`,
        solutionCriteria: `Execute code without errors.`
      };
    }

    return {
      id: dynamicTopic.id,
      title: dynamicTopic.title || dynamicTopic.topicName,
      difficulty: dynamicTopic.level || "Beginner",
      summary: dynamicTopic.conceptExplanation 
        ? dynamicTopic.conceptExplanation.split('\n')[0] 
        : `Dynamic topic: ${dynamicTopic.title}`,
      notes: dynamicTopic.conceptExplanation || '',
      useCases: dynamicTopic.projectApplication || '',
      keyTakeaways: [
        `Master fundamental concepts of ${dynamicTopic.title}.`,
        "Apply standard software architecture patterns.",
        "Practice building small working examples."
      ],
      code: dynamicTopic.codeSnippet || '',
      goodCode: dynamicTopic.codeSnippet || null,
      badCode: null,
      quiz: (dynamicTopic.quizQuestions && dynamicTopic.quizQuestions.length > 0)
        ? dynamicTopic.quizQuestions.map(q => ({
            question: q.q || q.question,
            options: q.options || [q.a || "Correct Answer", "Option B", "Option C", "Option D"],
            correctIndex: 0,
            explanation: q.a || "Correct implementation"
          }))
        : [],
      taskTitle: dynamicTopic.taskTitle || `Chapter Challenge: ${dynamicTopic.title}`,
      taskDescription: dynamicTopic.taskDescription || `Solve the practical challenge for ${dynamicTopic.title}`,
      starterCode: dynamicTopic.starterCode || `// Starter Code for ${dynamicTopic.title}\n`,
      solutionCriteria: dynamicTopic.solutionCriteria || `Return valid result object.`
    };
  };

  // Dual Filtering: By Search Query AND Active Difficulty Level Filter
  const filteredLessons = currentModuleData.lessons.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = activeLevelFilter === 'all' || l.level === activeLevelFilter;
    return matchesSearch && matchesLevel;
  });

  const rawLessonData = filteredLessons[activeLessonIdx] || filteredLessons[0] || currentModuleData.lessons[0];
  const currentLessonData = getRichLessonDetail(rawLessonData);

  // Lock status calculation for current selected topic
  const isCurrentTopicUnlocked = isTopicUnlocked(rawLessonData, currentModuleData.lessons, completedLessons);

  // Recommended Next Topic calculation
  const nextUncompletedLesson = currentModuleData.lessons.find(l => 
    !completedLessons.includes(l.id) && isTopicUnlocked(l, currentModuleData.lessons, completedLessons)
  );

  // Strict Quiz Verification before Marking Topic Complete
  const markCompleteWithQuizCheck = () => {
    if (!currentLessonData) return;

    const quizList = currentLessonData.quiz || [];
    if (quizList.length > 0) {
      // Check if user has answered all quiz questions correctly
      const totalQuestions = quizList.length;
      let correctCount = 0;

      quizList.forEach((q, idx) => {
        if (quizAnswers[idx] === q.correctIndex) {
          correctCount++;
        }
      });

      const passRate = (correctCount / totalQuestions) * 100;
      if (passRate < 100) {
        setQuizErrorMessage(`⚠️ Please pass the Quiz with 100% correct answers to unlock progression! (${correctCount}/${totalQuestions} correct)`);
        setActiveTab('quiz'); // Auto-navigate to Quiz tab
        return;
      }
    }

    // Passed Quiz! Mark completed and save
    setQuizErrorMessage(null);
    if (!completedLessons.includes(currentLessonData.id)) {
      const newCompleted = [...completedLessons, currentLessonData.id];
      setCompletedLessons(newCompleted);
      setPassedQuizzes({ ...passedQuizzes, [currentLessonData.id]: 100 });

      // Check if this completes the entire current level (Beginner/Intermediate)
      const currentLevel = currentLessonData.difficulty;
      const sameLevelLessons = currentModuleData.lessons.filter(l => l.level === currentLevel);
      const isLevelFinished = sameLevelLessons.every(l => newCompleted.includes(l.id));

      if (isLevelFinished && currentLevel !== 'Advanced') {
        setShowLevelMasterModal(true);
      }
    }
  };

  const handleResetProgress = () => {
    if (window.confirm("Are you sure you want to reset your learning progress?")) {
      setCompletedLessons(['js-0']);
      setPassedQuizzes({ 'js-0': 100 });
      setActiveLessonIdx(0);
    }
  };


  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="13-Module Decoupled Roadmap"
        title="Beginner 🟢 ➔ Intermediate 🟡 ➔ Advanced 🔴 Mastery"
        subtitle="Dedicated modules for DSA, Aptitude, Git, Career, and DevOps with strict progressive locking and auto-saved progress!"
        actions={
          <div className="flex items-center gap-3">
            <Badge variant="purple" className="px-3 py-1.5 font-mono text-xs">
              Roadmap Progress: {completedLessons.length} / 175+ Topics Mastered
            </Badge>
            <Button
              variant="ghost"
              size="xs"
              onClick={handleResetProgress}
              leftIcon={<RotateCcw className="w-3.5 h-3.5 text-gray-400" />}
              className="text-gray-400 hover:text-rose-400"
            >
              Reset
            </Button>
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

      {/* Level Master Celebration Modal Banner */}
      {showLevelMasterModal && (
        <LaserBorder className="p-6 bg-gradient-to-r from-purple-900/60 to-blue-900/60 border-purple-400 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400 flex items-center justify-center">
                <Trophy className="w-6 h-6 text-amber-300 animate-bounce" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white flex items-center gap-2">
                  🎉 Level Mastered! Unlocked Next Tier!
                </h3>
                <p className="text-xs text-purple-200">
                  Congratulations! You completed all <strong>{currentLessonData?.difficulty}</strong> topics in {currentModuleData.title.split(' ')[1]}.
                </p>
              </div>
            </div>
            <Button size="sm" variant="glow" onClick={() => setShowLevelMasterModal(false)}>
              Continue Learning 🚀
            </Button>
          </div>
        </LaserBorder>
      )}

      {/* Decoupled Roadmap Navigation Selector Pills */}
      <FilterPills
        options={roadmapModules}
        activeOption={activeModule}
        onSelect={(modId) => {
          setActiveModule(modId);
          setActiveLessonIdx(0);
          setSearchQuery('');
          setQuizAnswers({});
          setActiveTab('concept');
          setQuizErrorMessage(null);
        }}
        size="md"
      />

      {/* Guided Progression Banner: Recommended Next Topic */}
      {nextUncompletedLesson && (
        <LaserBorder className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0">
              <Compass className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div>
              <span className="text-[11px] font-bold text-purple-300 uppercase tracking-wider">
                🎯 Auto-Resume Next Unlocked Topic in {currentModuleData.title.split(' ')[1]}
              </span>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                {nextUncompletedLesson.title}
                <DifficultyBadge level={nextUncompletedLesson.level} />
              </h4>
            </div>
          </div>
          <Button
            size="xs"
            variant="primary"
            rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            onClick={() => {
              const idx = currentModuleData.lessons.findIndex(l => l.id === nextUncompletedLesson.id);
              if (idx !== -1) setActiveLessonIdx(idx);
            }}
          >
            Jump to Active Topic
          </Button>
        </LaserBorder>
      )}

      {/* Main Guided Course Player Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Topics List with Strict Locking */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
            {/* Search Box */}
            <SearchInput
              placeholder="Search topics (e.g. Scope, Closure, Event Loop)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setActiveLessonIdx(0);
                setQuizAnswers({});
                setQuizErrorMessage(null);
              }}
              onClear={() => setSearchQuery('')}
            />

            {/* Scaffolding Difficulty Tier Filter Buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                <Filter className="w-3.5 h-3.5 text-purple-400" /> Filter by Skill Level:
              </span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {[
                  { id: 'all', label: 'All Levels' },
                  { id: 'Beginner', label: '🟢 Beginner Core' },
                  { id: 'Intermediate', label: '🟡 Intermediate' },
                  { id: 'Advanced', label: '🔴 Advanced' }
                ].map(lvl => {
                  const unlocked = isLevelUnlocked(lvl.id, currentModuleData.lessons, completedLessons);
                  return (
                    <button
                      key={lvl.id}
                      onClick={() => {
                        if (!unlocked) {
                          alert(`🔒 Level "${lvl.id}" is locked! Complete all preceding topics to unlock.`);
                          return;
                        }
                        setActiveLevelFilter(lvl.id);
                        setActiveLessonIdx(0);
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all border flex items-center gap-1 ${
                        activeLevelFilter === lvl.id
                          ? 'bg-purple-500/20 border-purple-500 text-purple-200'
                          : unlocked
                          ? 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white'
                          : 'bg-white/[0.01] border-white/5 text-gray-600 opacity-60 cursor-not-allowed'
                      }`}
                    >
                      {!unlocked && <LockKeyhole className="w-3 h-3 text-rose-400" />}
                      <span>{lvl.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Module Topics
              </h3>
              <Badge variant="glass">{filteredLessons.length} Topics</Badge>
            </div>

            <div className="space-y-1.5 max-h-[460px] overflow-y-auto pr-1">
              {filteredLessons.length === 0 ? (
                <p className="text-xs text-gray-500 text-center py-4">No topics matching level "{activeLevelFilter}"</p>
              ) : (
                filteredLessons.map((l, idx) => {
                  const isSelected = activeLessonIdx === idx;
                  const isDone = completedLessons.includes(l.id);
                  const isUnlocked = isTopicUnlocked(l, currentModuleData.lessons, completedLessons);

                  return (
                    <button
                      key={l.id}
                      onClick={() => {
                        setActiveLessonIdx(idx);
                        setQuizAnswers({});
                        setQuizErrorMessage(null);
                        setActiveTab('concept');
                      }}
                      className={`w-full text-left p-3 rounded-xl text-xs transition-all flex items-center justify-between gap-2 border ${
                        isSelected
                          ? 'bg-gradient-to-r from-purple-600/30 to-blue-600/30 border-purple-500/50 text-white font-bold shadow-md shadow-purple-500/10'
                          : isUnlocked
                          ? 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                          : 'bg-white/[0.01] border-white/5 text-gray-500 hover:text-gray-400'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        {isDone ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : isUnlocked ? (
                          <div className="w-4 h-4 rounded-full border border-purple-400/50 shrink-0" />
                        ) : (
                          <LockKeyhole className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span className="truncate">{l.title}</span>
                      </div>

                      <span className={`text-[10px] font-mono font-semibold shrink-0 px-1.5 py-0.5 rounded border ${
                        l.level === 'Beginner' ? 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' :
                        l.level === 'Intermediate' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                        'text-rose-400 border-rose-500/30 bg-rose-500/10'
                      }`}>
                        {l.level}
                      </span>
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Deep Detailed Lesson Reader + AI Assistant + Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          {/* AI Mentor Assistant */}
          {aiExplainMode && (
            <LaserBorder className="p-6 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 animate-pulse" /> AI Mentor Coach (Marathi & Hinglish Enabled)
                </span>
                <Button size="xs" variant="ghost" onClick={() => setAiExplainMode(false)}>Close</Button>
              </div>

              <p className="text-xs text-gray-200 leading-relaxed font-sans">
                "Hi {user?.name || user?.email?.split('@')[0] || 'Learner'}! You are studying <strong>{currentLessonData?.title}</strong>. Choose an option below for customized guidance:"
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <Button
                  size="xs"
                  variant="glass"
                  onClick={() => setAiCustomPrompt(`मराठीत सोप्या भाषेत स्पष्टीकरण:\n"${currentLessonData?.title}" म्हणजे अगदी सोप्या भाषेत असे की standard web apps मध्ये हे वापरल्याने data सुरक्षित राहतो आणि code मधील bugs टाळता येतात.`)}
                >
                  मराठीत सोप्या भाषेत सांगा
                </Button>

                <Button
                  size="xs"
                  variant="glass"
                  onClick={() => setAiCustomPrompt(`Real-World Analogy:\nImagine this concept like an automated checkpost in daily life. It ensures only verified payloads enter the next phase safely.`)}
                >
                  Real-World Analogy
                </Button>

                <Button
                  size="xs"
                  variant="glass"
                  onClick={() => setAiCustomPrompt(`Step-by-Step Code Debugger:\n1. Check variable declarations\n2. Verify async execution boundaries\n3. Enforce return statement error handling.`)}
                >
                  Step-by-Step Debugger
                </Button>
              </div>

              {aiCustomPrompt && (
                <div className="mt-3 p-3.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs text-purple-200 leading-relaxed font-sans whitespace-pre-line">
                  🤖 <strong>AI Coach Guidance:</strong>\n{aiCustomPrompt}
                </div>
              )}
            </LaserBorder>
          )}

          {/* Deep Detailed Lesson Reader Card */}
          {currentLessonData && (
            <TiltCard className="p-6 sm:p-8 space-y-6">
              {/* Lock Warning Banner if topic is locked */}
              {!isCurrentTopicUnlocked && (
                <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-3 font-semibold">
                  <LockKeyhole className="w-5 h-5 text-rose-400 shrink-0" />
                  <div>
                    🔒 <strong>Topic Locked:</strong> You can read the concept, but you must complete previous topics and pass their quizzes to unlock progression for this topic!
                  </div>
                </div>
              )}

              {/* Quiz Requirement Error Banner */}
              {quizErrorMessage && (
                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-3 font-semibold">
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                  <div>{quizErrorMessage}</div>
                </div>
              )}

              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-purple-400 font-mono font-bold uppercase">
                      {currentModuleData.title}
                    </span>
                    <Badge variant={currentLessonData.difficulty === 'Beginner' ? 'emerald' : currentLessonData.difficulty === 'Intermediate' ? 'amber' : 'rose'}>
                      {currentLessonData.difficulty || 'Beginner'} 🟢
                    </Badge>
                    {currentLessonData.estimatedTime && (
                      <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                        <Clock className="w-3.5 h-3.5 text-cyan-400" /> {currentLessonData.estimatedTime}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {currentLessonData.title}
                  </h2>
                </div>
                <Badge variant="cyan" className="shrink-0">Topic {currentLessonData.id}</Badge>
              </div>

              {/* Reader View Selector Tabs */}
              <div className="flex items-center gap-2 border-b border-white/10 pb-3 overflow-x-auto">
                <button
                  onClick={() => setActiveTab('concept')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'concept'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5 text-cyan-400" /> 📖 Concept & Analogy
                </button>

                <button
                  onClick={() => setActiveTab('code')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'code'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5 text-emerald-400" /> ⚡ Bad vs Good Code
                </button>

                <button
                  onClick={() => setActiveTab('project')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'project'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5 text-amber-400" /> 🛠️ Enterprise Use Case
                </button>

                <button
                  onClick={() => setActiveTab('task')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'task'
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <CheckSquare className="w-3.5 h-3.5 text-emerald-400" /> 🎯 Chapter Task & Challenge
                </button>

                <button
                  onClick={() => setActiveTab('quiz')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'quiz'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <QuizIcon className="w-3.5 h-3.5 text-rose-400" /> ❓ Mandatory Quiz & QA
                </button>

                <button
                  onClick={() => setActiveTab('sandbox')}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    activeTab === 'sandbox'
                      ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" /> 🧪 Live Sandbox
                </button>
              </div>

              {/* TAB 1: CONCEPT & ANALOGY */}
              {activeTab === 'concept' && (
                <div className="space-y-5">
                  {/* 💡 Concept Overview */}
                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/25 text-xs text-cyan-200 font-medium leading-relaxed flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-cyan-300 font-bold mb-0.5">💡 Core Goal & Beginner Summary:</strong>
                      {currentLessonData.summary}
                    </div>
                  </div>

                  {/* 🏠 Everyday Analogy */}
                  {currentLessonData.analogy && (
                    <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/25 text-xs text-purple-200 leading-relaxed font-sans whitespace-pre-line">
                      {currentLessonData.analogy}
                    </div>
                  )}

                  {/* 📖 Step-by-Step Technical Guide */}
                  {currentLessonData.notes && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        Step-by-Step Execution Mechanics
                      </h3>
                      <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        <FormattedMarkdown content={currentLessonData.notes} />
                      </div>
                    </div>
                  )}

                  {/* 🎯 Core Takeaways */}
                  {currentLessonData.keyTakeaways && (
                    <div className="space-y-2">
                      <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                        <CheckSquare className="w-4 h-4" /> Essential Points to Remember
                      </h3>
                      <div className="space-y-1.5">
                        {currentLessonData.keyTakeaways.map((kt, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-gray-200 p-2.5 rounded-xl bg-white/5 border border-white/10">
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                            <span>{kt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: CODE COMPARISON */}
              {activeTab === 'code' && (
                <div className="space-y-4">
                  <p className="text-xs text-gray-300">
                    Understanding <strong>bad practices vs recommended code</strong> is the fastest way to write bug-free, senior-level applications:
                  </p>

                  {currentLessonData.badCode && currentLessonData.goodCode && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-500/30 space-y-2 font-mono text-xs text-rose-300">
                        <span className="text-[11px] font-bold text-rose-400 uppercase flex items-center gap-1.5">
                          <AlertTriangle className="w-4 h-4" /> ❌ Incorrect (Unoptimized Pattern):
                        </span>
                        <pre className="overflow-x-auto p-2.5 bg-black/40 rounded-lg"><code>{currentLessonData.badCode}</code></pre>
                      </div>

                      <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 space-y-2 font-mono text-xs text-emerald-300">
                        <span className="text-[11px] font-bold text-emerald-400 uppercase flex items-center gap-1.5">
                          <CheckCircle2 className="w-4 h-4" /> ✅ Recommended (Production Pattern):
                        </span>
                        <pre className="overflow-x-auto p-2.5 bg-black/40 rounded-lg"><code>{currentLessonData.goodCode}</code></pre>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: REAL-WORLD ENTERPRISE USE CASE */}
              {activeTab === 'project' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 text-xs text-emerald-200 leading-relaxed font-sans whitespace-pre-line">
                    <h3 className="font-bold text-emerald-300 mb-1 flex items-center gap-2 text-sm">
                      <Briefcase className="w-4 h-4" /> How Enterprise MERN & DevOps Apps Use This:
                    </h3>
                    {currentLessonData.useCases}
                  </div>
                </div>
              )}

              {/* TAB 4: MANDATORY SELF-QUIZ & QA */}
              {activeTab === 'quiz' && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <QuizIcon className="w-4 h-4 text-purple-400" /> Mandatory Quiz Verification for {currentLessonData.title}
                  </h3>

                  <p className="text-xs text-amber-300 font-semibold bg-amber-500/10 border border-amber-500/20 p-3 rounded-xl">
                    ⚠️ You must answer all quiz questions correctly to unlock completion and advance to the next topic!
                  </p>

                  {currentLessonData.quiz && currentLessonData.quiz.length > 0 ? (
                    currentLessonData.quiz.map((q, qIdx) => {
                      const selectedOpt = quizAnswers[qIdx];
                      const isSubmitted = selectedOpt !== undefined;
                      const isCorrect = selectedOpt === q.correctIndex;

                      return (
                        <div key={qIdx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 space-y-3">
                          <p className="text-xs font-bold text-white">Q{qIdx + 1}: {q.question}</p>
                          <div className="space-y-2">
                            {q.options.map((opt, optIdx) => {
                              let btnStyle = "bg-white/5 border-white/10 text-gray-300 hover:bg-white/10";
                              if (isSubmitted) {
                                if (optIdx === q.correctIndex) {
                                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-300 font-bold";
                                } else if (optIdx === selectedOpt) {
                                  btnStyle = "bg-rose-500/20 border-rose-500 text-rose-300 font-bold";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => setQuizAnswers({ ...quizAnswers, [qIdx]: optIdx })}
                                  className={`w-full text-left p-3 rounded-lg text-xs border transition-all flex items-center justify-between ${btnStyle}`}
                                >
                                  <span>{opt}</span>
                                  {isSubmitted && optIdx === q.correctIndex && (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {isSubmitted && (
                            <div className={`p-3 rounded-lg text-xs leading-relaxed ${isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'}`}>
                              <strong>{isCorrect ? "Correct! 🎉" : "Explanation:"}</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-gray-400">No quiz questions generated for this topic yet.</p>
                  )}
                </div>
              )}

              {/* TAB: CHAPTER TASK & CODING CHALLENGE */}
              {activeTab === 'task' && (
                <div className="space-y-4 font-sans">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
                    <h3 className="text-sm font-bold text-emerald-300 flex items-center gap-2">
                      <CheckSquare className="w-4 h-4 text-emerald-400" />
                      {currentLessonData.taskTitle || `Chapter Task: ${currentLessonData.title}`}
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      {currentLessonData.taskDescription}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Task Solution Criteria:
                    </span>
                    <p className="text-xs font-mono text-cyan-300 bg-black/40 p-3 rounded-xl border border-cyan-500/30">
                      {currentLessonData.solutionCriteria}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Starter Code Boilerplate:
                    </span>
                    <CodeEditor
                      initialFiles={[
                        { name: "task_solution.js", lang: "javascript", code: currentLessonData.starterCode || currentLessonData.code || `// Complete task code here\n` }
                      ]}
                    />
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="glow"
                      size="sm"
                      onClick={markCompleteWithQuizCheck}
                      disabled={!isCurrentTopicUnlocked}
                      leftIcon={<CheckCircle2 className="w-4 h-4 text-emerald-300" />}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600"
                    >
                      {completedLessons.includes(currentLessonData.id) 
                        ? "Chapter Task Mastered ✓" 
                        : "Submit Task & Unlock Next Chapter 🔓"}
                    </Button>
                  </div>
                </div>
              )}

              {/* TAB 5: LIVE SANDBOX */}
              {activeTab === 'sandbox' && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> Practice Workspace for {currentLessonData.title}
                  </h3>

                  <CodeEditor
                    initialFiles={[
                      { name: "practice.js", lang: "javascript", code: currentLessonData.code || `console.log("Practicing ${currentLessonData.title}");` }
                    ]}
                  />
                </div>
              )}

              {/* Action Bar */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <Button
                  variant={completedLessons.includes(currentLessonData.id) ? "glass" : "primary"}
                  size="sm"
                  onClick={markCompleteWithQuizCheck}
                  disabled={!isCurrentTopicUnlocked}
                  leftIcon={<CheckCircle2 className="w-4 h-4" />}
                >
                  {completedLessons.includes(currentLessonData.id) 
                    ? "Topic Mastered ✓" 
                    : !isCurrentTopicUnlocked
                    ? "🔒 Topic Locked"
                    : "Pass Quiz & Mark Topic Mastered"}
                </Button>
              </div>
            </TiltCard>
          )}
        </div>
      </div>
    </div>
  );
};
