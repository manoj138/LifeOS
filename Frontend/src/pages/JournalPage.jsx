import React, { useState, useEffect } from 'react';
import { BookMarked, Sparkles, Plus, Smile } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { apiService } from '../services/api';

export const JournalPage = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('Growth Mindset');

  useEffect(() => {
    let isMounted = true;
    const fetchEntries = async () => {
      setLoading(true);
      const res = await apiService.getJournalEntries();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setEntries(res.data);
        } else {
          setEntries([]);
        }
        setLoading(false);
      }
    };
    fetchEntries();
    return () => { isMounted = false; };
  }, []);

  const handleCreateEntry = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newEntry = {
      id: `j_${Date.now()}`,
      title: title.trim() || 'Daily Reflection',
      content: content.trim(),
      mood,
      date: new Date().toISOString().split('T')[0],
      sentiment: 'Positive'
    };

    setEntries([newEntry, ...entries]);
    await apiService.createJournalEntry(newEntry);
    setTitle('');
    setContent('');
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="AI Mindset Reflection"
        title="Daily AI Reflection Journal"
        subtitle="Log reflections, track emotional sentiment, and get AI insights on your weekly growth mindset."
        actions={
          <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            New Entry
          </Button>
        }
      />

      {loading ? (
        <GlassCard className="p-8 text-center text-gray-400 text-xs">
          Loading journal reflections...
        </GlassCard>
      ) : entries.length === 0 ? (
        <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5 space-y-4">
          <BookMarked className="w-12 h-12 text-purple-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Reflections Written Yet</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
              Reflect on your daily learning achievements, focus sessions, and challenges to receive personalized AI growth insights.
            </p>
          </div>
          <Button variant="primary" onClick={() => setIsModalOpen(true)} leftIcon={<Plus className="w-4 h-4" />}>
            Write Your First Journal Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, idx) => (
            <GlassCard key={entry.id || idx} className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="space-y-1">
                  <h4 className="text-base font-bold text-white tracking-tight">{entry.title || 'Daily Reflection'}</h4>
                  <span className="text-xs font-bold text-gray-400 font-mono">{entry.date || entry.createdAt || 'Today'}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant="cyan">{entry.mood || 'Focused'}</Badge>
                  <Badge variant="purple">{entry.sentiment || 'Growth'}</Badge>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">{entry.content}</p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* New Journal Entry Modal */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Log Daily Reflection">
        <form onSubmit={handleCreateEntry} className="space-y-4">
          <Input
            label="Entry Title"
            placeholder="e.g. Mastered Dynamic Programming & React Context"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Mood / Mindset</label>
            <select
              className="w-full bg-[#121218] border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500/50"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
            >
              <option value="Growth Mindset">Growth Mindset 🚀</option>
              <option value="Productive & Focused">Productive & Focused ⚡</option>
              <option value="Challenged & Persevering">Challenged & Persevering 🔥</option>
              <option value="Rest & Reset">Rest & Reset 🌿</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Reflection Content</label>
            <textarea
              rows={4}
              required
              className="w-full bg-[#121218] border border-white/10 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500/50 resize-none"
              placeholder="What went well today? What challenges did you solve?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Reflection
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
