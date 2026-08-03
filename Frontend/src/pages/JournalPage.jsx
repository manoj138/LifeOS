import React, { useState } from 'react';
import { BookMarked, Sparkles, Plus, Smile } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const JournalPage = () => {
  const [entries] = useState([
    {
      date: "Aug 3, 2026",
      mood: "Focused & Energized",
      content: "Crushed Node.js microservices architecture session and completed a 45-min System Design mock interview. LifeOS AI feedback recommended sharpening sliding window rate-limiting.",
      sentiment: "Positive (95%)"
    },
    {
      date: "Aug 2, 2026",
      mood: "Productive",
      content: "Configured Let's Encrypt Wildcard SSL certificate on Hostinger VPS using CloudPanel CLI. Ran 5km in the evening.",
      sentiment: "Positive (90%)"
    }
  ]);

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
    </div>
  );
};
