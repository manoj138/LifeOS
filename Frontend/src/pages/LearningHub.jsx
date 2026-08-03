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
import { learningContent, getFallbackTopicContent } from '../data/learningContent';
import {
  loadLearningProgress,
  saveLearningProgress,
  isTopicUnlocked,
  isLevelUnlocked
} from '../utils/learningProgress';

export const LearningHub = () => {
  // Load saved progress state from localStorage on mount
  const initialProgress = loadLearningProgress();

  const [activeModule, setActiveModule] = useState(initialProgress.lastActiveModule || 'js');
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

  // Decoupled, Distinct Roadmap Modules
  const roadmapModules = [
    { id: 'js', label: '1. JavaScript (ES6+)', icon: <Code2 className="w-4 h-4 text-cyan-400" />, count: '25 Topics' },
    { id: 'react', label: '2. React.js', icon: <Layers className="w-4 h-4 text-purple-400" />, count: '23 Topics' },
    { id: 'node', label: '3. Node.js', icon: <Terminal className="w-4 h-4 text-emerald-400" />, count: '11 Topics' },
    { id: 'express', label: '4. Express.js', icon: <Server className="w-4 h-4 text-amber-400" />, count: '13 Topics' },
    { id: 'mongo', label: '5. MongoDB', icon: <Database className="w-4 h-4 text-emerald-500" />, count: '11 Topics' },
    { id: 'auth', label: '6. Authentication', icon: <ShieldCheck className="w-4 h-4 text-rose-400" />, count: '11 Topics' },
    { id: 'api', label: '7. API Development', icon: <Activity className="w-4 h-4 text-indigo-400" />, count: '10 Topics' },
    { id: 'project', label: '8. Project Architecture', icon: <Cpu className="w-4 h-4 text-blue-400" />, count: '9 Topics' },
    { id: 'dsa', label: '9. DSA Master Studio', icon: <Binary className="w-4 h-4 text-cyan-300" />, count: '12 Topics' },
    { id: 'aptitude', label: '10. Aptitude & Logic', icon: <Calculator className="w-4 h-4 text-amber-300" />, count: '10 Topics' },
    { id: 'git', label: '11. Git & GitHub', icon: <GitPullRequest className="w-4 h-4 text-orange-400" />, count: '8 Topics' },
    { id: 'career', label: '12. Career & LinkedIn', icon: <Briefcase className="w-4 h-4 text-yellow-400" />, count: '10 Topics' },
    { id: 'devops', label: '13. DevOps & Hostinger VPS', icon: <Server className="w-4 h-4 text-teal-300" />, count: '10 Topics' },
  ];

  // Complete Un-truncated Master Syllabus containing ALL 175+ topics with Level Tags
  const masterSyllabus = {
    js: {
      title: "1️⃣ JavaScript (ES6+) Complete Studio (25 Topics)",
      lessons: [
        { id: "js-0", title: "1.1 Variables, Scope & Temporal Dead Zone (TDZ)", topicName: "Variables & TDZ", level: "Beginner" },
        { id: "js-1", title: "1.2 Primitive & Non-Primitive Data Types", topicName: "Data Types", level: "Beginner" },
        { id: "js-2", title: "1.3 Operators (Arithmetic, Logical, Bitwise)", topicName: "Operators", level: "Beginner" },
        { id: "js-3", title: "1.4 Conditionals (if-else, switch, ternary)", topicName: "Conditionals", level: "Beginner" },
        { id: "js-4", title: "1.5 Loops (for, while, do-while, for-of, for-in)", topicName: "Loops", level: "Beginner" },
        { id: "js-5", title: "1.6 Functions (Declarations vs Expressions)", topicName: "Functions", level: "Beginner" },
        { id: "js-6", title: "1.7 Arrow Functions & Lexical `this`", topicName: "Arrow Functions", level: "Beginner" },
        { id: "js-7", title: "1.8 Scope (Global, Function, Block)", topicName: "Scope", level: "Beginner" },
        { id: "js-8", title: "1.9 Hoisting Mechanism", topicName: "Hoisting", level: "Intermediate" },
        { id: "js-9", title: "1.10 Closures & Lexical Scope", topicName: "Closures", level: "Intermediate" },
        { id: "js-10", title: "1.11 Callbacks & Callback Hell", topicName: "Callbacks", level: "Intermediate" },
        { id: "js-11", title: "1.12 Promises & Promise Chaining", topicName: "Promises", level: "Intermediate" },
        { id: "js-12", title: "1.13 Async / Await Syntax", topicName: "Async Await", level: "Intermediate" },
        { id: "js-13", title: "1.14 Array Methods (map, filter, reduce)", topicName: "Array Methods", level: "Beginner" },
        { id: "js-14", title: "1.15 Objects & Prototype Chain", topicName: "Objects & Prototypes", level: "Intermediate" },
        { id: "js-15", title: "1.16 Destructuring (Arrays & Objects)", topicName: "Destructuring", level: "Beginner" },
        { id: "js-16", title: "1.17 Spread Operator (...)", topicName: "Spread Operator", level: "Beginner" },
        { id: "js-17", title: "1.18 Rest Parameters (...args)", topicName: "Rest Parameters", level: "Beginner" },
        { id: "js-18", title: "1.19 ES6 Modules (import & export)", topicName: "ES6 Modules", level: "Beginner" },
        { id: "js-19", title: "1.20 ES6 Classes & Inheritance", topicName: "ES6 Classes", level: "Intermediate" },
        { id: "js-20", title: "1.21 DOM Manipulation & Event Handling", topicName: "DOM Manipulation", level: "Beginner" },
        { id: "js-21", title: "1.22 Fetch API & HTTP Network Requests", topicName: "Fetch API", level: "Intermediate" },
        { id: "js-22", title: "1.23 Event Loop (Call Stack & Queues)", topicName: "Event Loop", level: "Advanced" },
        { id: "js-23", title: "1.24 Memory Management & Garbage Collection", topicName: "Memory & GC", level: "Advanced" },
        { id: "js-24", title: "1.25 Execution Context & Call Stack", topicName: "Execution Context", level: "Advanced" }
      ]
    },
    react: {
      title: "2️⃣ React.js Complete Studio (23 Topics)",
      lessons: [
        { id: "react-0", title: "2.1 JSX Syntax & Expressions", topicName: "JSX Syntax", level: "Beginner" },
        { id: "react-1", title: "2.2 Functional Components", topicName: "Functional Components", level: "Beginner" },
        { id: "react-2", title: "2.3 Props & Prop Drilling", topicName: "Props", level: "Beginner" },
        { id: "react-3", title: "2.4 State Management (useState)", topicName: "State & useState", level: "Beginner" },
        { id: "react-4", title: "2.5 Event Handling", topicName: "Event Handling", level: "Beginner" },
        { id: "react-5", title: "2.6 Conditional Rendering", topicName: "Conditional Rendering", level: "Beginner" },
        { id: "react-6", title: "2.7 Lists & Unique Keys", topicName: "Lists & Keys", level: "Beginner" },
        { id: "react-7", title: "2.8 Controlled vs Uncontrolled Forms", topicName: "Forms", level: "Intermediate" },
        { id: "react-8", title: "2.9 Lifting State Up", topicName: "Lifting State", level: "Intermediate" },
        { id: "react-9", title: "2.10 Built-in Hooks (useEffect, useRef)", topicName: "Built-in Hooks", level: "Intermediate" },
        { id: "react-10", title: "2.11 Custom Hooks Creation", topicName: "Custom Hooks", level: "Intermediate" },
        { id: "react-11", title: "2.12 Context API & Global State", topicName: "Context API", level: "Intermediate" },
        { id: "react-12", title: "2.13 Reducers (useReducer)", topicName: "useReducer", level: "Intermediate" },
        { id: "react-13", title: "2.14 React Router & Navigation", topicName: "React Router", level: "Intermediate" },
        { id: "react-14", title: "2.15 Protected Routes & Auth Guards", topicName: "Protected Routes", level: "Advanced" },
        { id: "react-15", title: "2.16 Lazy Loading (React.lazy & Suspense)", topicName: "Lazy Loading", level: "Advanced" },
        { id: "react-16", title: "2.17 Error Boundaries", topicName: "Error Boundaries", level: "Advanced" },
        { id: "react-17", title: "2.18 Performance (React.memo, useMemo)", topicName: "Performance Optimization", level: "Advanced" },
        { id: "react-18", title: "2.19 React Query (TanStack Query)", topicName: "React Query", level: "Advanced" },
        { id: "react-19", title: "2.20 Axios & HTTP Interceptors", topicName: "Axios Interceptors", level: "Intermediate" },
        { id: "react-20", title: "2.21 Authentication Integration", topicName: "Auth Integration", level: "Advanced" },
        { id: "react-21", title: "2.22 Role-Based Access Control (RBAC)", topicName: "RBAC Controls", level: "Advanced" },
        { id: "react-22", title: "2.23 Reusable CVA Components", topicName: "Reusable Components", level: "Intermediate" }
      ]
    },
    node: {
      title: "3️⃣ Node.js Architecture (11 Topics)",
      lessons: [
        { id: "node-0", title: "3.1 CommonJS vs ES Modules", topicName: "Modules", level: "Beginner" },
        { id: "node-1", title: "3.2 File System (FS) Operations", topicName: "File System", level: "Beginner" },
        { id: "node-2", title: "3.3 Path Module Utilities", topicName: "Path Module", level: "Beginner" },
        { id: "node-3", title: "3.4 OS Module Metrics", topicName: "OS Module", level: "Beginner" },
        { id: "node-4", title: "3.5 HTTP Core Module Server", topicName: "HTTP Server", level: "Intermediate" },
        { id: "node-5", title: "3.6 EventEmitter Pattern", topicName: "Events", level: "Intermediate" },
        { id: "node-6", title: "3.7 Streams (Readable, Writable)", topicName: "Streams", level: "Advanced" },
        { id: "node-7", title: "3.8 Memory Buffers", topicName: "Buffers", level: "Advanced" },
        { id: "node-8", title: "3.9 Process Object & Signals", topicName: "Process Object", level: "Intermediate" },
        { id: "node-9", title: "3.10 Environment Variables (dotenv)", topicName: "Environment Secrets", level: "Beginner" },
        { id: "node-10", title: "3.11 Package Management (npm & npx)", topicName: "Package Management", level: "Beginner" }
      ]
    },
    express: {
      title: "4️⃣ Express.js Backend (13 Topics)",
      lessons: [
        { id: "express-0", title: "4.1 Express Routing & Methods", topicName: "Express Routing", level: "Beginner" },
        { id: "express-1", title: "4.2 Middleware Pipeline & Order", topicName: "Middleware Architecture", level: "Intermediate" },
        { id: "express-2", title: "4.3 Controller Design Pattern", topicName: "Controllers", level: "Intermediate" },
        { id: "express-3", title: "4.4 Service Layer Separation", topicName: "Service Layer", level: "Intermediate" },
        { id: "express-4", title: "4.5 REST API Architecture", topicName: "REST API Design", level: "Intermediate" },
        { id: "express-5", title: "4.6 Request Validation (Zod / Joi)", topicName: "Request Validation", level: "Intermediate" },
        { id: "express-6", title: "4.7 Authentication Middleware", topicName: "Auth Middleware", level: "Advanced" },
        { id: "express-7", title: "4.8 Authorization Middleware (RBAC)", topicName: "Role Authorization", level: "Advanced" },
        { id: "express-8", title: "4.9 Centralized Error Handling", topicName: "Global Error Handling", level: "Advanced" },
        { id: "express-9", title: "4.10 File Upload (Multer)", topicName: "File Uploads", level: "Intermediate" },
        { id: "express-10", title: "4.11 Express Rate Limiting", topicName: "Rate Limiting", level: "Advanced" },
        { id: "express-11", title: "4.12 Security Best Practices (Helmet)", topicName: "Security Best Practices", level: "Advanced" },
        { id: "express-12", title: "4.13 Logging & Profiling (Winston)", topicName: "Logging & Profiling", level: "Advanced" }
      ]
    },
    mongo: {
      title: "5️⃣ MongoDB & Mongoose (11 Topics)",
      lessons: [
        { id: "mongo-0", title: "5.1 MongoDB CRUD Operations", topicName: "MongoDB CRUD", level: "Beginner" },
        { id: "mongo-1", title: "5.2 Mongoose Schema Design", topicName: "Mongoose Schema", level: "Beginner" },
        { id: "mongo-2", title: "5.3 Mongoose Models & Methods", topicName: "Mongoose Models", level: "Intermediate" },
        { id: "mongo-3", title: "5.4 Relationships (Embedded vs Referenced)", topicName: "Document Relations", level: "Intermediate" },
        { id: "mongo-4", title: "5.5 Query Population (populate())", topicName: "Query Population", level: "Intermediate" },
        { id: "mongo-5", title: "5.6 Database Indexing (B-Tree)", topicName: "Database Indexing", level: "Advanced" },
        { id: "mongo-6", title: "5.7 Aggregation Pipeline ($match, $lookup)", topicName: "Aggregation Pipeline", level: "Advanced" },
        { id: "mongo-7", title: "5.8 Database Transactions & Sessions", topicName: "Transactions", level: "Advanced" },
        { id: "mongo-8", title: "5.9 Pagination Strategies", topicName: "Pagination", level: "Intermediate" },
        { id: "mongo-9", title: "5.10 Text Search & Regex Queries", topicName: "Text Search", level: "Intermediate" },
        { id: "mongo-10", title: "5.11 Database Backup & Restore", topicName: "Backup & Restore", level: "Advanced" }
      ]
    },
    auth: {
      title: "6️⃣ Authentication & Security (11 Topics)",
      lessons: [
        { id: "auth-0", title: "6.1 JSON Web Tokens (JWT) Architecture", topicName: "JWT Architecture", level: "Intermediate" },
        { id: "auth-1", title: "6.2 Refresh Token Rotation", topicName: "Refresh Token Rotation", level: "Advanced" },
        { id: "auth-2", title: "6.3 Access Token Verification", topicName: "Access Tokens", level: "Intermediate" },
        { id: "auth-3", title: "6.4 Google OAuth 2.0 Integration", topicName: "Google OAuth", level: "Advanced" },
        { id: "auth-4", title: "6.5 Password Hashing (Bcrypt)", topicName: "Password Hashing", level: "Intermediate" },
        { id: "auth-5", title: "6.6 OTP Verification System", topicName: "OTP System", level: "Intermediate" },
        { id: "auth-6", title: "6.7 Forgot Password Workflow", topicName: "Forgot Password", level: "Intermediate" },
        { id: "auth-7", title: "6.8 Password Reset Endpoint", topicName: "Password Reset", level: "Intermediate" },
        { id: "auth-8", title: "6.9 Email Verification Engine", topicName: "Email Verification", level: "Intermediate" },
        { id: "auth-9", title: "6.10 Role-Based Access Control (RBAC)", topicName: "Role-Based Access", level: "Advanced" },
        { id: "auth-10", title: "6.11 Granular Permissions Matrix", topicName: "Permissions Matrix", level: "Advanced" }
      ]
    },
    api: {
      title: "7️⃣ API Development & Standards (10 Topics)",
      lessons: [
        { id: "api-0", title: "7.1 REST API Naming Standards", topicName: "REST Naming", level: "Beginner" },
        { id: "api-1", title: "7.2 CRUD API Architecture", topicName: "CRUD API", level: "Beginner" },
        { id: "api-2", title: "7.3 API Pagination Strategy", topicName: "API Pagination", level: "Intermediate" },
        { id: "api-3", title: "7.4 Dynamic Query Filtering", topicName: "Filtering", level: "Intermediate" },
        { id: "api-4", title: "7.5 Multi-Column Sorting", topicName: "Sorting", level: "Intermediate" },
        { id: "api-5", title: "7.6 Full-Text Search Queries", topicName: "Searching", level: "Intermediate" },
        { id: "api-6", title: "7.7 Input Validation & Sanitization", topicName: "Validation", level: "Intermediate" },
        { id: "api-7", title: "7.8 Standard HTTP Status Codes", topicName: "Status Codes", level: "Beginner" },
        { id: "api-8", title: "7.9 Consistent Error Responses", topicName: "Error Payloads", level: "Intermediate" },
        { id: "api-9", title: "7.10 OpenAPI / Swagger Documentation", topicName: "API Documentation", level: "Advanced" }
      ]
    },
    project: {
      title: "8️⃣ Project Architecture & Clean Code (9 Topics)",
      lessons: [
        { id: "proj-0", title: "8.1 Scalable Folder Structure", topicName: "Folder Structure", level: "Beginner" },
        { id: "proj-1", title: "8.2 Clean Code & Refactoring", topicName: "Clean Code", level: "Intermediate" },
        { id: "proj-2", title: "8.3 Reusable Component Patterns", topicName: "Reusable Components", level: "Intermediate" },
        { id: "proj-3", title: "8.4 SOLID Principles Basics", topicName: "SOLID Basics", level: "Advanced" },
        { id: "proj-4", title: "8.5 Debugging Workflows", topicName: "Debugging", level: "Intermediate" },
        { id: "proj-5", title: "8.6 Frontend Performance Optimization", topicName: "Optimization", level: "Advanced" },
        { id: "proj-6", title: "8.7 Testing Basics (Jest & Vitest)", topicName: "Testing Basics", level: "Intermediate" },
        { id: "proj-7", title: "8.8 Production Code Auditing", topicName: "Production Readiness", level: "Advanced" },
        { id: "proj-8", title: "8.9 Monorepo & Microservices Setup", topicName: "Monorepo Setup", level: "Advanced" }
      ]
    },
    dsa: {
      title: "9️⃣ Data Structures & Algorithms (DSA Studio)",
      lessons: [
        { id: "car-0", title: "9.1 Arrays & Two-Pointer Pattern", topicName: "DSA Arrays", level: "Intermediate" },
        { id: "car-1", title: "9.2 Strings & Sliding Window Pattern", topicName: "DSA Strings", level: "Intermediate" },
        { id: "car-2", title: "9.3 Linked Lists (Singly & Doubly)", topicName: "DSA Linked List", level: "Intermediate" },
        { id: "car-3", title: "9.4 Stack & Queue Implementations", topicName: "DSA Stack & Queue", level: "Intermediate" },
        { id: "car-4", title: "9.5 HashMap & HashSets O(1) Lookups", topicName: "DSA HashMap", level: "Intermediate" },
        { id: "car-5", title: "9.6 Binary Search & Binary Search Trees", topicName: "DSA BST", level: "Advanced" },
        { id: "car-6", title: "9.7 Heaps & Priority Queues", topicName: "DSA Heap", level: "Advanced" },
        { id: "car-7", title: "9.8 Graph BFS & DFS Traversals", topicName: "DSA Graphs", level: "Advanced" },
        { id: "car-8", title: "9.9 Tries & Prefix Search", topicName: "DSA Trie", level: "Advanced" },
        { id: "car-9", title: "9.10 Recursion & Backtracking", topicName: "DSA Backtracking", level: "Advanced" },
        { id: "car-10", title: "9.11 Sorting Algorithms (Quick & Merge)", topicName: "DSA Sorting", level: "Intermediate" },
        { id: "car-11", title: "9.12 Dynamic Programming (Memo & Tabulation)", topicName: "DSA DP", level: "Advanced" }
      ]
    },
    aptitude: {
      title: "🔟 Quantitative Aptitude & Logic",
      lessons: [
        { id: "car-12", title: "10.1 Percentages & Profit/Loss", topicName: "Percentages", level: "Beginner" },
        { id: "car-13", title: "10.2 Time & Work, Speed & Distance", topicName: "Speed & Work", level: "Beginner" },
        { id: "car-14", title: "10.3 Ratio, Averages & Interest Calculations", topicName: "Ratios", level: "Beginner" },
        { id: "apt-0", title: "10.4 Logical Reasoning & Series Completion", topicName: "Logical Reasoning", level: "Beginner" },
        { id: "apt-1", title: "10.5 Data Interpretation (Charts & Graphs)", topicName: "Data Interpretation", level: "Intermediate" }
      ]
    },
    git: {
      title: "1️⃣1️⃣ Git & GitHub Version Control",
      lessons: [
        { id: "car-15", title: "11.1 Git Init, Clone, Status, Add & Commit", topicName: "Git Basics", level: "Beginner" },
        { id: "car-16", title: "11.2 Branching, Merging & Rebase Workflows", topicName: "Git Branching", level: "Intermediate" },
        { id: "car-17", title: "11.3 Resolving Merge Conflicts & Stashing", topicName: "Git Conflicts", level: "Intermediate" },
        { id: "git-0", title: "11.4 Pull Requests & Code Review Workflow", topicName: "GitHub PRs", level: "Intermediate" }
      ]
    },
    career: {
      title: "1️⃣2️⃣ Career & LinkedIn Portfolio Prep",
      lessons: [
        { id: "car-18", title: "12.1 Resume ATS Keyword Optimization", topicName: "ATS Resume", level: "Beginner" },
        { id: "car-19", title: "12.2 LinkedIn Profile & Portfolio Optimization", topicName: "LinkedIn Portfolio", level: "Beginner" },
        { id: "car-20", title: "12.3 Technical Interview Alignment & QA", topicName: "Interview Alignment", level: "Intermediate" }
      ]
    },
    devops: {
      title: "1️⃣3️⃣ DevOps & Hostinger VPS Deployment",
      lessons: [
        { id: "dev-0", title: "13.1 Linux / Ubuntu SSH Remote Login", topicName: "Linux SSH", level: "Intermediate" },
        { id: "dev-1", title: "13.2 Hostinger VPS & UFW Firewall Setup", topicName: "Hostinger VPS Setup", level: "Advanced" },
        { id: "dev-2", title: "13.3 CloudPanel Control Panel Installation", topicName: "CloudPanel Install", level: "Intermediate" },
        { id: "dev-3", title: "13.4 Domain DNS Records (A, CNAME, MX)", topicName: "DNS Records", level: "Beginner" },
        { id: "dev-4", title: "13.5 Let's Encrypt SSL & HTTPS Renewal", topicName: "SSL Certificates", level: "Intermediate" },
        { id: "dev-5", title: "13.6 Nginx Reverse Proxy Configuration", topicName: "Nginx Proxy", level: "Advanced" },
        { id: "dev-6", title: "13.7 PM2 Process Manager & Clustering", topicName: "PM2 Clustering", level: "Advanced" },
        { id: "dev-7", title: "13.8 Docker Containerization & Dockerfile", topicName: "Dockerfile Setup", level: "Advanced" },
        { id: "dev-8", title: "13.9 Docker Compose Multi-Container Setup", topicName: "Docker Compose", level: "Advanced" },
        { id: "dev-9", title: "13.10 CI/CD GitHub Actions Automated Deploy", topicName: "CI/CD Actions", level: "Advanced" }
      ]
    }
  };

  // Auto-Save progress state to localStorage whenever state changes
  useEffect(() => {
    saveLearningProgress({
      completedLessons,
      passedQuizzes,
      lastActiveModule: activeModule,
      lastActiveLessonIdx: activeLessonIdx
    });
  }, [completedLessons, passedQuizzes, activeModule, activeLessonIdx]);

  // Hydration Engine: Retrives handcrafted detailed topic content or fallback engine
  const getRichLessonDetail = (lesson) => {
    if (!lesson) return null;
    const customContent = learningContent[lesson.id];
    if (customContent) {
      return {
        id: lesson.id,
        title: lesson.title,
        difficulty: lesson.level || customContent.difficulty || "Beginner",
        ...customContent,
        notes: customContent.howItWorks,
        useCases: customContent.realWorldUse,
        beginnerPitfalls: customContent.keyTakeaways,
        code: customContent.practiceCode
      };
    }
    const fallback = getFallbackTopicContent(lesson);
    return {
      id: lesson.id,
      title: lesson.title,
      difficulty: lesson.level || fallback.difficulty || "Beginner",
      ...fallback,
      notes: fallback.howItWorks,
      useCases: fallback.realWorldUse,
      beginnerPitfalls: fallback.keyTakeaways,
      code: fallback.practiceCode
    };
  };

  const currentModuleData = masterSyllabus[activeModule] || masterSyllabus.js;

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
      localStorage.removeItem('lifeos_learning_hub_progress_v2');
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
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {roadmapModules.map((mod) => (
          <button
            key={mod.id}
            onClick={() => {
              setActiveModule(mod.id);
              setActiveLessonIdx(0);
              setSearchQuery('');
              setQuizAnswers({});
              setActiveTab('concept');
              setQuizErrorMessage(null);
            }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap border ${
              activeModule === mod.id
                ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            {mod.icon}
            <span>{mod.label}</span>
          </button>
        ))}
      </div>

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
                <Badge variant={nextUncompletedLesson.level === 'Beginner' ? 'emerald' : nextUncompletedLesson.level === 'Intermediate' ? 'amber' : 'rose'}>
                  {nextUncompletedLesson.level}
                </Badge>
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
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search topics (e.g. Scope, Closure, Event Loop)..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setActiveLessonIdx(0);
                  setQuizAnswers({});
                  setQuizErrorMessage(null);
                }}
                className="w-full bg-white/[0.04] text-xs text-white placeholder:text-gray-500 pl-9 pr-3 py-2 rounded-xl border border-white/10 outline-none focus:border-purple-500/50"
              />
            </div>

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
                "Hi Manoj! You are studying <strong>{currentLessonData?.title}</strong>. Choose an option below for customized guidance:"
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
                      <div className="text-xs text-gray-300 leading-relaxed whitespace-pre-line font-sans p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                        {currentLessonData.notes}
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
