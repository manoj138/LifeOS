import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, CheckCircle2, Flame, Sparkles, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, Trash2 } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

const DEFAULT_TASKS = [
  { id: 't1', title: 'Deep Work: React 19 Server Actions & Compiler', start: '08:00 AM', end: '10:00 AM', category: 'Deep Work', energy: 'High', completed: true },
  { id: 't2', title: 'MERN Microservices Architecture & Redis Caching', start: '10:30 AM', end: '12:00 PM', category: 'MERN', energy: 'High', completed: true },
  { id: 't3', title: 'Lunch & 20-min AI English Speaking Drill', start: '12:30 PM', end: '01:30 PM', category: 'English', energy: 'Medium', completed: false },
  { id: 't4', title: 'AI Mock Interview Practice (System Design)', start: '02:00 PM', end: '03:30 PM', category: 'Interview', energy: 'High', completed: false },
  { id: 't5', title: 'Hostinger VPS Nginx & Docker Deployment', start: '04:00 PM', end: '05:30 PM', category: 'DevOps', energy: 'Medium', completed: false },
  { id: 't6', title: 'Evening Workout & Recovery Hydration', start: '06:30 PM', end: '08:00 PM', category: 'Fitness', energy: 'Medium', completed: false },
];

const playPomodoroChime = () => {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.2);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + 1.2);
  } catch (e) {
    console.warn('Audio chime notice:', e);
  }
};

export const DailyPlanner = () => {
  const { user, preferences } = useUser();

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('lifeos_planner_tasks');
    return saved ? JSON.parse(saved) : DEFAULT_TASKS;
  });

  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      const res = await apiService.getPlannerTasks();
      if (isMounted && res?.success && res.data && res.data.length > 0) {
        setTasks(res.data);
      }
    };
    fetchTasks();
    return () => { isMounted = false; };
  }, []);

  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskCategory, setNewTaskCategory] = useState('Deep Work');
  const [newTaskStart, setNewTaskStart] = useState('09:00 AM');
  const [newTaskEnd, setNewTaskEnd] = useState('10:00 AM');

  // Pomodoro Timer State
  const [pomodoroMode, setPomodoroMode] = useState('work'); // 'work' | 'shortBreak' | 'longBreak'
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('lifeos_planner_tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Pomodoro countdown effect
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playPomodoroChime();
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, timeLeft]);

  const switchPomodoroMode = (mode) => {
    setPomodoroMode(mode);
    setIsRunning(false);
    if (mode === 'work') setTimeLeft(25 * 60);
    else if (mode === 'shortBreak') setTimeLeft(5 * 60);
    else if (mode === 'longBreak') setTimeLeft(15 * 60);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask = {
      id: `t_${Date.now()}`,
      title: newTaskTitle.trim(),
      start: newTaskStart,
      end: newTaskEnd,
      category: newTaskCategory,
      energy: 'High',
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.completed).length;
  const completionPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const totalPomodoroTime = pomodoroMode === 'work' ? 25 * 60 : pomodoroMode === 'shortBreak' ? 5 * 60 : 15 * 60;
  const timerProgress = Math.round(((totalPomodoroTime - timeLeft) / totalPomodoroTime) * 100);

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge={`Daily Goal: ${preferences?.dailyHours || 4} Hours Commitment`}
        title={`Daily Timeline for ${user?.name || 'Manoj'} ⚡`}
        subtitle={`Time-blocking schedule tailored for ${preferences?.targetRole || 'Full-Stack Developer'} • ${completionPercentage}% Daily Target Completed.`}

        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" leftIcon={<ChevronLeft className="w-4 h-4" />}>Prev</Button>
            <Badge variant="glass" className="px-3 py-1.5 font-mono text-xs">Today • Aug 3, 2026</Badge>
            <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>Next</Button>
          </div>
        }
      />

      {/* Quick Add Form */}
      <GlassCard className="p-4">
        <form onSubmit={handleAddTask} className="flex flex-col sm:flex-row items-center gap-3">
          <Input
            placeholder="Add new time block (e.g. Master Docker Compose on VPS)..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            className="flex-1"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={newTaskCategory}
              onChange={(e) => setNewTaskCategory(e.target.value)}
              className="bg-white/[0.04] text-gray-100 rounded-xl px-3 py-2 text-xs border border-white/10 outline-none"
            >
              <option value="Deep Work" className="bg-gray-900">Deep Work</option>
              <option value="MERN" className="bg-gray-900">MERN</option>
              <option value="Interview" className="bg-gray-900">Interview</option>
              <option value="DevOps" className="bg-gray-900">DevOps</option>
              <option value="English" className="bg-gray-900">English</option>
              <option value="Fitness" className="bg-gray-900">Fitness</option>
            </select>
            <Button type="submit" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
              Add Block
            </Button>
          </div>
        </form>
      </GlassCard>

      {/* Main Time Blocking Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline Blocks */}
        <div className="lg:col-span-2 space-y-4">
          {tasks.map((task) => (
            <GlassCard
              key={task.id}
              className={`p-6 transition-all duration-300 ${
                task.completed ? 'opacity-50 border-white/5 bg-white/[0.01]' : 'hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <button
                    onClick={() => toggleTask(task.id)}
                    className={`mt-1 w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${
                      task.completed ? 'bg-cyan-500 border-cyan-500 text-black' : 'border-white/20 hover:border-cyan-400'
                    }`}
                  >
                    {task.completed && <CheckCircle2 className="w-4 h-4" />}
                  </button>

                  <div className="space-y-1">
                    <h3 className={`text-base font-bold tracking-tight ${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                      {task.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-purple-400" />
                        {task.start} - {task.end}
                      </span>
                      <span>• Energy Level: <strong className="text-cyan-300">{task.energy}</strong></span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Badge
                    variant={
                      task.category === 'MERN' ? 'cyan' :
                      task.category === 'Interview' ? 'purple' :
                      task.category === 'Fitness' ? 'rose' : 'glass'
                    }
                  >
                    {task.category}
                  </Badge>

                  <button
                    onClick={() => deleteTask(task.id)}
                    className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Pomodoro Timer & Energy Breakdown Sidebar */}
        <div className="space-y-6">
          {/* Integrated Pomodoro Focus Widget */}
          <GlassCard className="p-6 space-y-5 border-purple-500/30">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-300 flex items-center gap-2">
                <Flame className="w-4 h-4 text-rose-500" />
                Focus Pomodoro Timer
              </span>
              <button
                onClick={playPomodoroChime}
                title="Test Audio Chime"
                className="p-1 rounded text-gray-400 hover:text-cyan-300 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Mode Switcher */}
            <div className="grid grid-cols-3 gap-1 bg-white/5 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => switchPomodoroMode('work')}
                className={`py-1.5 rounded-lg transition-all ${
                  pomodoroMode === 'work' ? 'bg-purple-500 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Focus (25m)
              </button>
              <button
                onClick={() => switchPomodoroMode('shortBreak')}
                className={`py-1.5 rounded-lg transition-all ${
                  pomodoroMode === 'shortBreak' ? 'bg-cyan-500 text-gray-950 font-bold shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Short (5m)
              </button>
              <button
                onClick={() => switchPomodoroMode('longBreak')}
                className={`py-1.5 rounded-lg transition-all ${
                  pomodoroMode === 'longBreak' ? 'bg-indigo-500 text-white shadow' : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                Long (15m)
              </button>
            </div>

            {/* Circular / Large Timer Display */}
            <div className="text-center py-4 space-y-2">
              <div className="text-5xl font-extrabold font-mono tracking-tight text-white drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-400">
                {pomodoroMode === 'work' ? '🧠 Deep Work Sprint' : '☕ Relax & Recharge'}
              </p>

              {/* Progress Line */}
              <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden mt-3">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-purple-500 transition-all duration-500"
                  style={{ width: `${timerProgress}%` }}
                />
              </div>
            </div>

            {/* Timer Actions */}
            <div className="flex items-center justify-center gap-3">
              <Button
                variant={isRunning ? 'secondary' : 'primary'}
                onClick={() => setIsRunning(!isRunning)}
                leftIcon={isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                className="w-32"
              >
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                variant="ghost"
                onClick={() => switchPomodoroMode(pomodoroMode)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset
              </Button>
            </div>
          </GlassCard>

          {/* AI Energy Breakdown Card */}
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <span>AI Energy Distribution</span>
            </div>
            <p className="text-xs text-gray-400">
              Your peak cognitive energy is between 08:00 AM and 11:30 AM. Deep MERN and Interview tasks are scheduled in this window.
            </p>

            <div className="space-y-3 pt-2">
              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Deep Work Target</span>
                  <span>5.5 / 6.0 hrs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Daily Task Completion</span>
                  <span>{completionPercentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

