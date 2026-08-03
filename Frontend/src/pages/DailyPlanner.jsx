import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Clock, CheckCircle2, Flame, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Input } from '../components/ui/Input';

export const DailyPlanner = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Deep Work: React 19 Server Actions & Compiler', start: '08:00 AM', end: '10:00 AM', category: 'Deep Work', energy: 'High', completed: true },
    { id: 2, title: 'MERN Microservices Architecture & Redis Caching', start: '10:30 AM', end: '12:00 PM', category: 'MERN', energy: 'High', completed: true },
    { id: 3, title: 'Lunch & 20-min AI English Speaking Drill', start: '12:30 PM', end: '01:30 PM', category: 'English', energy: 'Medium', completed: false },
    { id: 4, title: 'AI Mock Interview Practice (System Design)', start: '02:00 PM', end: '03:30 PM', category: 'Interview', energy: 'High', completed: false },
    { id: 5, title: 'Hostinger VPS Nginx & Docker Deployment', start: '04:00 PM', end: '05:30 PM', category: 'DevOps', energy: 'Medium', completed: false },
    { id: 6, title: 'Evening Workout & Recovery Hydration', start: '06:30 PM', end: '08:00 PM', category: 'Fitness', energy: 'Medium', completed: false },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState('');

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title: newTaskTitle,
        start: '09:00 PM',
        end: '10:00 PM',
        category: 'Personal',
        energy: 'Medium',
        completed: false
      }
    ]);
    setNewTaskTitle('');
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Time-Blocking Matrix"
        title="Daily Planner & Energy Optimizer"
        subtitle="Notion Calendar inspired visual time-blocking timeline to maximize deep work focus."
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
          <Button type="submit" variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Add Block
          </Button>
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

                <Badge
                  variant={
                    task.category === 'MERN' ? 'cyan' :
                    task.category === 'Interview' ? 'purple' :
                    task.category === 'Fitness' ? 'rose' : 'glass'
                  }
                >
                  {task.category}
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* Energy & Deep Work Breakdown */}
        <div className="space-y-6">
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
                  <span>Deep Work Hours</span>
                  <span>5.5 / 6.0 hrs</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '90%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Task Completion</span>
                  <span>{Math.round((tasks.filter(t => t.completed).length / tasks.length) * 100)}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${(tasks.filter(t => t.completed).length / tasks.length) * 100}%` }} />
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
