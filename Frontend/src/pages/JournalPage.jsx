import React, { useState } from 'react';
import { BookMarked, Sparkles, Plus, Smile } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const JournalPage = () => {
  const [entries, setEntries] = useState([]);

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="AI Mindset Reflection"
        title="Daily AI Reflection Journal"
        subtitle="Log reflections, track emotional sentiment, and get AI insights on your weekly growth mindset."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Entry
          </Button>
        }
      />

      {entries.length === 0 ? (
        <div className="p-12 text-center border border-white/10 rounded-2xl bg-white/5 space-y-4">
          <BookMarked className="w-12 h-12 text-purple-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">No Reflections Written Yet</h3>
            <p className="text-xs text-gray-400 max-w-md mx-auto mt-1">
              Reflect on your daily learning achievements, focus sessions, and challenges to receive personalized AI growth insights.
            </p>
          </div>
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Write Your First Journal Entry
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {entries.map((entry, idx) => (
            <GlassCard key={idx} className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <span className="text-sm font-bold text-white font-mono">{entry.date}</span>
                <div className="flex items-center gap-3">
                  <Badge variant="cyan">{entry.mood}</Badge>
                  <Badge variant="purple">{entry.sentiment}</Badge>
                </div>
              </div>

              <p className="text-sm text-gray-300 leading-relaxed">{entry.content}</p>
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
};
