import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, CheckCircle2, Flame, Sparkles, ChevronLeft, ChevronRight, Play, Pause, RotateCcw, Volume2, Trash2 } from 'lucide-react';
import { SectionHeader, Button, Badge, Input, GlassCard, PomodoroTimer } from '../components/common';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

export const DailyPlanner = () => {
  const { user, preferences } = useUser();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchTasks = async () => {
      setLoading(true);
      const res = await apiService.getPlannerTasks();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setTasks(res.data);
        } else {
          setTasks([]);
        }
        setLoading(false);
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

  const displayName = user?.name || user?.email?.split('@')[0] || 'Member';

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge={`Daily Goal: ${preferences?.dailyHours || 4} Hours Commitment`}
        title={`Daily Timeline for ${displayName} ⚡`}
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
          {tasks.length === 0 ? (
            <div className="p-10 text-center border border-white/10 rounded-2xl bg-white/5 space-y-3">
              <Clock className="w-10 h-10 text-cyan-400 mx-auto" />
              <p className="text-sm font-semibold text-gray-200">No Time Blocks Scheduled Today</p>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Use the input form above to block out your deep work focus sessions, MERN coding drills, and workout times.
              </p>
            </div>
          ) : (
            tasks.map((task) => (
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
          ))
          )}
        </div>

        {/* Pomodoro Timer & Energy Breakdown Sidebar */}
        <div className="space-y-6">
          {/* Integrated Pomodoro Focus Widget */}
          <PomodoroTimer onTimerComplete={playPomodoroChime} />

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

