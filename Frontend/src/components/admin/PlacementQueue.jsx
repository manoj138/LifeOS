import React, { useState, useEffect } from 'react';
import { Award, CheckCircle2, UserCheck, Briefcase, ChevronRight, Sparkles, Send, Users } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { apiService } from '../../services/api';

export const PlacementQueue = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchQueue = async () => {
      setLoading(true);
      const res = await apiService.getCandidates();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setCandidates(res.data);
        } else {
          setCandidates([]);
        }
        setLoading(false);
      }
    };
    fetchQueue();
    return () => { isMounted = false; };
  }, []);

  const readyCandidates = candidates.filter((c) =>
    c.role !== 'admin' && !c.email?.toLowerCase().includes('admin') && c.name !== 'System Admin' && (c.readinessScore || 0) >= 80
  );

  return (
    <GlassCard className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-emerald-400" />
          <h3 className="text-lg font-bold text-white tracking-tight">
            Job Placement & Interview Referral Queue
          </h3>
        </div>
        <Badge variant="emerald">{readyCandidates.length} Ready</Badge>
      </div>

      {readyCandidates.length === 0 ? (
        <div className="p-8 text-center border border-white/10 rounded-2xl bg-white/5 space-y-3">
          <Users className="w-10 h-10 text-gray-500 mx-auto" />
          <p className="text-sm font-semibold text-gray-300">No Placement Ready Candidates Yet</p>
          <p className="text-xs text-gray-400 max-w-md mx-auto">
            Candidates who complete onboarding and reach an 80%+ readiness score will automatically appear in this referral queue.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {readyCandidates.map((c, idx) => (
            <div
              key={c.id || idx}
              className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 via-purple-950/20 to-slate-900 border border-white/10 space-y-4 hover:border-purple-500/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 font-extrabold flex items-center justify-center text-sm">
                  #{idx + 1}
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                  {c.readinessScore || 85}% Readiness
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white">{c.name}</h4>
                <p className="text-xs text-purple-300 font-medium mt-0.5">{c.targetRole}</p>
              </div>

              <p className="text-xs text-gray-400 border-t border-b border-white/10 py-2.5">
                Target Role: <span className="text-gray-200">{c.targetRole}</span> ({c.skillLevel})
              </p>

              <Button size="sm" variant="glow" className="w-full" leftIcon={<Send className="w-3.5 h-3.5" />}>
                Refer to Tech Partner
              </Button>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
};

