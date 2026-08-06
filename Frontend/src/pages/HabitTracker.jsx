import React, { useState, useEffect } from 'react';
import { Flame, CheckCircle2, Trophy, Zap, Plus, Trash2, Calendar, Filter, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';

import { apiService } from '../services/api';

const getTodayString = () => new Date().toISOString().split('T')[0];

const generate90Days = () => {
  const dates = [];
  const today = new Date();
  for (let i = 89; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

export const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [logs, setLogs] = useState({});
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');
  const [newHabitCategory, setNewHabitCategory] = useState('Skills');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let isMounted = true;
    const fetchHabits = async () => {
      setLoading(true);
      const res = await apiService.getHabits();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setHabits(res.data);
        } else {
          setHabits([]);
        }
        setLoading(false);
      }
    };
    fetchHabits();
    return () => { isMounted = false; };
  }, []);


  const todayStr = getTodayString();
  const todayCompletedIds = logs[todayStr] || [];

  const toggleHabitToday = (habitId) => {
    setLogs((prev) => {
      const currentToday = prev[todayStr] || [];
      const isDone = currentToday.includes(habitId);
      const updatedToday = isDone
        ? currentToday.filter((id) => id !== habitId)
        : [...currentToday, habitId];
      return { ...prev, [todayStr]: updatedToday };
    });
  };

  const handleCreateHabit = (e) => {
    e.preventDefault();
    if (!newHabitName.trim()) return;

    const newHabit = {
      id: `h_${Date.now()}`,
      name: newHabitName.trim(),
      category: newHabitCategory,
      targetPerWeek: 7,
      createdAt: new Date().toISOString()
    };

    setHabits([...habits, newHabit]);
    setNewHabitName('');
    setIsModalOpen(false);
  };

  const deleteHabit = (habitId) => {
    setHabits(habits.filter((h) => h.id !== habitId));
  };

  // Calculate current streak
  const calculateStreak = (habitId) => {
    let streak = 0;
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const dayLogs = logs[dateStr] || [];
      if (dayLogs.includes(habitId)) {
        streak++;
      } else if (i > 0) {
        // Break streak if missed a past day (skip checking today if not done yet)
        break;
      }
    }
    return streak;
  };

  const days90 = generate90Days();

  const categories = ['All', ...Array.from(new Set(habits.map((h) => h.category)))];

  const filteredHabits = selectedCategory === 'All'
    ? habits
    : habits.filter((h) => h.category === selectedCategory);

  // Overall statistics
  const totalCompletedToday = todayCompletedIds.length;
  const todayCompletionRate = habits.length > 0 ? Math.round((totalCompletedToday / habits.length) * 100) : 0;

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Consistency Engine"
        title="Habit Tracker & Streak Matrix"
        subtitle="Build unbreakable discipline with real-time contribution heatmaps & persistence."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Create New Habit
          </Button>
        }
      />

      {/* GitHub-style Contribution Grid */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Flame className="w-5 h-5 text-rose-500 animate-pulse" />
              90-Day Discipline Heatmap Matrix
            </h3>
            <p className="text-xs text-gray-400 mt-1">Hover over cells to view exact date activity.</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="neon">Today: {todayCompletionRate}% Done</Badge>
            <Badge variant="purple">{totalCompletedToday}/{habits.length} Habits</Badge>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="overflow-x-auto pb-2">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 min-w-[700px] pt-2">
            {days90.map((dateStr) => {
              const dayLogs = logs[dateStr] || [];
              const ratio = habits.length > 0 ? dayLogs.length / habits.length : 0;

              let colorClass = "bg-white/5 border border-white/5";
              if (ratio > 0 && ratio <= 0.35) colorClass = "bg-cyan-500/30 border border-cyan-500/40";
              else if (ratio > 0.35 && ratio <= 0.7) colorClass = "bg-indigo-500/60 border border-indigo-500/70";
              else if (ratio > 0.7) colorClass = "bg-purple-500 border border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.6)]";

              const isToday = dateStr === todayStr;

              return (
                <div
                  key={dateStr}
                  className={`w-3.5 h-3.5 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${colorClass} ${isToday ? 'ring-2 ring-cyan-400 ring-offset-1 ring-offset-[#121218]' : ''}`}
                  title={`${dateStr}${isToday ? ' (Today)' : ''}: ${dayLogs.length} of ${habits.length} habits completed`}
                />
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-white/10">
          <span>📅 Past 90 Days</span>
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5" />
            <div className="w-3 h-3 rounded-sm bg-cyan-500/30" />
            <div className="w-3 h-3 rounded-sm bg-indigo-500/60" />
            <div className="w-3 h-3 rounded-sm bg-purple-500 shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
            <span>More</span>
          </div>
        </div>
      </GlassCard>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-gray-400" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Habit List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHabits.map((h) => {
          const isDoneToday = todayCompletedIds.includes(h.id);
          const streak = calculateStreak(h.id);

          return (
            <GlassCard
              key={h.id}
              className={`p-6 flex items-center justify-between transition-all duration-300 ${
                isDoneToday ? 'border-purple-500/40 bg-purple-500/5' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleHabitToday(h.id)}
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center font-bold transition-all duration-300 ${
                    isDoneToday
                      ? 'bg-gradient-to-tr from-purple-600 to-indigo-500 border-purple-400 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] scale-105'
                      : 'bg-white/5 border-white/10 text-gray-500 hover:border-purple-500/50 hover:text-purple-300'
                  }`}
                >
                  <CheckCircle2 className={`w-6 h-6 ${isDoneToday ? 'text-white' : 'opacity-40'}`} />
                </button>

                <div>
                  <h4 className={`text-base font-bold tracking-tight transition-colors ${isDoneToday ? 'text-purple-200 line-through' : 'text-white'}`}>
                    {h.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400 font-mono">{h.category}</span>
                    <span className="text-gray-600">•</span>
                    <span className="text-xs text-cyan-400 flex items-center gap-1">
                      <Flame className="w-3 h-3 text-rose-500" /> {streak} Day Streak
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={streak > 14 ? 'neon' : streak > 0 ? 'purple' : 'cyan'}>
                  🔥 {streak}d
                </Badge>
                <button
                  onClick={() => deleteHabit(h.id)}
                  className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  title="Delete habit"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Add Habit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Habit"
        subtitle="Establish a new daily routine to boost your consistency score."
      >
        <form onSubmit={handleCreateHabit} className="space-y-5">
          <Input
            label="Habit Name"
            placeholder="e.g. Read 20 pages of System Design book"
            value={newHabitName}
            onChange={(e) => setNewHabitName(e.target.value)}
            required
          />

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Category
            </label>
            <select
              value={newHabitCategory}
              onChange={(e) => setNewHabitCategory(e.target.value)}
              className="w-full bg-white/[0.04] text-gray-100 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-purple-500/60"
            >
              <option value="Skills" className="bg-gray-900">Skills & Tech</option>
              <option value="DSA" className="bg-gray-900">DSA & Problem Solving</option>
              <option value="Mindset" className="bg-gray-900">Mindset & Reading</option>
              <option value="Health" className="bg-gray-900">Health & Wellness</option>
              <option value="Personal" className="bg-gray-900">Personal Growth</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
              Create Habit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

