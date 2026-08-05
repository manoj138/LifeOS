import React, { useState, useEffect } from 'react';
import { Mic, Volume2, Sparkles, BookOpen, MessageSquare } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';

export const EnglishPage = () => {
  const [modules, setModules] = useState([]);

  useEffect(() => {
    let isMounted = true;
    const fetchEnglishModules = async () => {
      const res = await apiService.getEnglishModules();
      if (isMounted && res?.success && Array.isArray(res.data)) {
        setModules(res.data);
      }
    };
    fetchEnglishModules();
    return () => { isMounted = false; };
  }, []);

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
        {modules.length === 0 ? (
          <GlassCard className="p-6 col-span-3 text-center text-gray-400 text-xs">
            No English modules configured. Add modules via API or Admin Console.
          </GlassCard>
        ) : (
          modules.map((m) => (
            <GlassCard key={m.id} className="p-6 space-y-3">
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 w-fit">
                {m.category === 'pronunciation' ? <Volume2 className="w-5 h-5" /> : m.category === 'vocabulary' ? <BookOpen className="w-5 h-5" /> : <MessageSquare className="w-5 h-5" />}
              </div>
              <h3 className="text-lg font-bold text-white tracking-tight">{m.title}</h3>
              <p className="text-xs text-gray-400">{m.description}</p>
              {m.badgeLabel && <Badge variant={m.badgeColor || 'purple'}>{m.badgeLabel}</Badge>}
            </GlassCard>
          ))
        )}
      </div>
    </div>
  );
};
