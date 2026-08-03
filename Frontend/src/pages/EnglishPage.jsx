import React from 'react';
import { Mic, Volume2, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const EnglishPage = () => {
  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Fluency & Vocabulary"
        title="English Speaking Coach"
        subtitle="Practice professional executive English speaking, pronunciation, and technical vocabulary."
        actions={
          <Button variant="primary" leftIcon={<Mic className="w-4 h-4" />}>
            Start Daily Speaking Drill
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <GlassCard className="p-6 space-y-3">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 w-fit">
            <Volume2 className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Pronunciation & Accent Tuning</h3>
          <p className="text-xs text-gray-400">AI analyzes your tone, pitch, and syllable stress in real time.</p>
          <Badge variant="emerald">Fluency Score: 94%</Badge>
        </GlassCard>

        <GlassCard className="p-6 space-y-3">
          <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 w-fit">
            <BookOpen className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Executive Technical Vocabulary</h3>
          <p className="text-xs text-gray-400">Learn 5 advanced tech idioms & executive phrases daily.</p>
          <Badge variant="purple">Word Streak: 28 Days</Badge>
        </GlassCard>

        <GlassCard className="p-6 space-y-3">
          <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 w-fit">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">Mock Client Conversation</h3>
          <p className="text-xs text-gray-400">Simulate architectural discussions with US/EU engineering directors.</p>
          <Badge variant="cyan">Scenario Ready</Badge>
        </GlassCard>
      </div>
    </div>
  );
};
