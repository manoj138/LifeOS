import React, { useState, useEffect } from 'react';
import { Target, Flag, Sparkles, Plus, Trophy, Trash2, CheckSquare, Square, Filter } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useUser } from '../context/UserContext';

const DEFAULT_GOALS = [
  {
    id: 'g1',
    title: "Master Target Specialization & Technical Career Goals",
    deadline: "Q4 2026",
    category: "Career",
    milestones: [
      { id: 'm1_1', text: "Master System Design & Web Architecture Patterns", completed: true },
      { id: 'm1_2', text: "Solve 100+ LeetCode Medium/Hard Problems", completed: true },
      { id: 'm1_3', text: "Build Production Ready Applications", completed: true },
      { id: 'm1_4', text: "Complete Mock Technical Interviews with AI Teleprompter", completed: false },
    ]
  },
  {
    id: 'g2',
    title: "Deploy Production SaaS Infrastructure & DevOps Systems",
    deadline: "Q3 2026",
    category: "Engineering",
    milestones: [
      { id: 'm2_1', text: "LifeOS AI Assistant Suite", completed: true },
      { id: 'm2_2', text: "Hostinger VPS & Nginx Containerization", completed: true },
      { id: 'm2_3', text: "DevOps & Cloud Monitoring Dashboard", completed: false },
    ]
  },
];

export const GoalsPage = () => {
  const { user, preferences } = useUser();

  const [goals, setGoals] = useState(DEFAULT_GOALS);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [newTitle, setNewTitle] = useState('');
  const [newDeadline, setNewDeadline] = useState('Q4 2026');
  const [newCategory, setNewCategory] = useState('Career');
  const [newMilestonesText, setNewMilestonesText] = useState('');


  const toggleMilestone = (goalId, milestoneId) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const updated = g.milestones.map((m) =>
          m.id === milestoneId ? { ...m, completed: !m.completed } : m
        );
        return { ...g, milestones: updated };
      })
    );
  };

  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  const handleCreateGoal = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const parsedMilestones = newMilestonesText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
      .map((text, idx) => ({
        id: `m_${Date.now()}_${idx}`,
        text,
        completed: false
      }));

    const newGoal = {
      id: `g_${Date.now()}`,
      title: newTitle.trim(),
      deadline: newDeadline || 'Q4 2026',
      category: newCategory,
      milestones: parsedMilestones.length > 0 ? parsedMilestones : [
        { id: `m_${Date.now()}_0`, text: "Initial Phase Milestone", completed: false }
      ]
    };

    setGoals([...goals, newGoal]);
    setNewTitle('');
    setNewMilestonesText('');
    setIsModalOpen(false);
  };

  const categories = ['All', ...Array.from(new Set(goals.map((g) => g.category)))];

  const filteredGoals = selectedCategory === 'All'
    ? goals
    : goals.filter((g) => g.category === selectedCategory);

  const displayName = user?.name || user?.email?.split('@')[0] || 'Member';

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge={`Target Deadline: ${preferences?.targetDate || '2026-12-31'}`}
        title={`Career & Growth Milestones for ${displayName} ⚡`}
        subtitle={`Goal roadmap tailored for ${preferences?.targetRole || 'Full-Stack Web Developer'} • Daily Target: ${preferences?.dailyHours || 4} hrs/day.`}

        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />} onClick={() => setIsModalOpen(true)}>
            Create New Life Goal
          </Button>
        }
      />

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <Filter className="w-4 h-4 text-gray-400" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/25'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {filteredGoals.map((g) => {
          const totalMilestones = g.milestones.length;
          const completedCount = g.milestones.filter((m) => m.completed).length;
          const progress = totalMilestones > 0 ? Math.round((completedCount / totalMilestones) * 100) : 0;

          return (
            <GlassCard key={g.id} className="p-6 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <Badge variant="purple">{g.category}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400 font-mono">Target: {g.deadline}</span>
                    <button
                      onClick={() => deleteGoal(g.id)}
                      className="p-1 rounded text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      title="Delete goal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight">{g.title}</h3>
              </div>

              <div className="flex flex-col items-center py-2">
                <ProgressRing progress={progress} size={130} strokeWidth={10} />
                <span className="text-xs font-mono text-cyan-400 mt-2">
                  {completedCount} of {totalMilestones} Milestones Completed
                </span>
              </div>

              {/* Sub-Milestones Checklist */}
              <div className="space-y-2 border-t border-white/10 pt-4">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  Key Milestones
                </span>
                {g.milestones.map((m) => (
                  <div
                    key={m.id}
                    onClick={() => toggleMilestone(g.id, m.id)}
                    className="flex items-start gap-2 cursor-pointer group text-xs text-gray-300 hover:text-white transition-colors"
                  >
                    {m.completed ? (
                      <CheckSquare className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    ) : (
                      <Square className="w-4 h-4 text-gray-500 group-hover:text-purple-400 shrink-0 mt-0.5" />
                    )}
                    <span className={m.completed ? 'line-through text-gray-500' : ''}>
                      {m.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-cyan-400 font-semibold">
                <span>Status: {progress === 100 ? '🎉 Achieved!' : progress > 50 ? 'On Track' : 'In Progress'}</span>
                <Trophy className={`w-4 h-4 ${progress === 100 ? 'text-amber-400 animate-bounce' : 'text-gray-500'}`} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Create New Goal Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Life Goal"
        subtitle="Set clear quarterly targets and break them down into actionable milestones."
      >
        <form onSubmit={handleCreateGoal} className="space-y-5">
          <Input
            label="Goal Title"
            placeholder="e.g. Master System Design & Build Distributed SaaS"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                Target Deadline
              </label>
              <input
                type="text"
                placeholder="e.g. Q4 2026"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full bg-white/[0.04] text-gray-100 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-purple-500/60"
              />
            </div>

            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="w-full bg-white/[0.04] text-gray-100 rounded-xl px-4 py-2.5 text-sm border border-white/10 outline-none focus:border-purple-500/60"
              >
                <option value="Career" className="bg-gray-900">Career</option>
                <option value="Engineering" className="bg-gray-900">Engineering</option>
                <option value="Health" className="bg-gray-900">Health & Fitness</option>
                <option value="Finance" className="bg-gray-900">Finance</option>
                <option value="Personal" className="bg-gray-900">Personal</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">
              Key Sub-Milestones (One per line)
            </label>
            <textarea
              rows={4}
              placeholder={`Complete System Design Course\nBuild Microservices Prototype\nPublish Technical Blog Post`}
              value={newMilestonesText}
              onChange={(e) => setNewMilestonesText(e.target.value)}
              className="w-full bg-white/[0.04] text-gray-100 placeholder:text-gray-500 rounded-xl p-3 text-sm border border-white/10 outline-none focus:border-purple-500/60 font-mono"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-white/10">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
              Create Goal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

