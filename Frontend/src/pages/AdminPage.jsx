import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ShieldCheck, Users, BarChart3, Award, Server, RefreshCw, Download, Sparkles, LogOut, Cpu, HardDrive, Database, Activity } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/ui/Button';
import { AdminMetrics } from '../components/admin/AdminMetrics';
import { OnboardingAnalyticsChart } from '../components/admin/OnboardingAnalyticsChart';
import { CandidateTable } from '../components/admin/CandidateTable';
import { PlacementQueue } from '../components/admin/PlacementQueue';
import { AdminCurriculumEditor } from '../components/admin/AdminCurriculumEditor';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { apiService } from '../services/api';
import { useUser } from '../context/UserContext';

const HEADER_CONFIG = {
  analytics: {
    badge: "Onboarding Analytics",
    title: "Candidate Network & Skill Telemetry ⚡",
    subtitle: "Real-time telemetry on candidate onboarding completion, target role distribution, and skill readiness."
  },
  candidates: {
    badge: "Directory Registry",
    title: "Candidate Directory & User Records 👥",
    subtitle: "Manage registered student profiles, skill level breakdowns, daily target commitments, and onboarding preferences."
  },
  placement: {
    badge: "Placement Queue",
    title: "Hiring & Placement Readiness Leaderboard 🎯",
    subtitle: "Track candidates ready for interview matching, DSA problem solves, and portfolio verification."
  },
  curriculum: {
    badge: "Curriculum Studio",
    title: "Roadmap Modules & AI Curriculum Generator 📚",
    subtitle: "Create custom tech modules, generate AI topic sequences in bulk, and edit lesson content in real time."
  },
  telemetry: {
    badge: "System Telemetry",
    title: "VPS Hostinger Server Health & Live Logs ⚡",
    subtitle: "Live system metrics stream, SQLite connection status, memory utilization, and background process logs."
  }
};

export const AdminPage = () => {
  const [searchParams] = useSearchParams();
  const rawTab = searchParams.get('tab') || 'analytics';
  const activeTab = rawTab === 'placements' ? 'placement' : rawTab === 'vps' ? 'telemetry' : rawTab;

  const [stats, setStats] = useState(null);
  const navigate = useNavigate();
  const { clearAllLocalState } = useUser();

  const handleLogout = () => {
    clearAllLocalState();
    navigate('/auth');
  };

  useEffect(() => {
    let isMounted = true;
    const fetchStats = async () => {
      const res = await apiService.getAdminMetrics();
      if (isMounted && res?.success && res.data) {
        setStats(res.data);
      }
    };
    fetchStats();
    return () => { isMounted = false; };
  }, []);

  const header = HEADER_CONFIG[activeTab] || HEADER_CONFIG.analytics;

  return (
    <div className="space-y-8 pb-12">
      {/* Top Dynamic Admin Header */}
      <SectionHeader
        badge={header.badge}
        title={header.title}
        subtitle={header.subtitle}
        actions={
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" leftIcon={<Download className="w-4 h-4 text-purple-400" />}>
              Export Report
            </Button>
            <Button
              variant="glass"
              size="sm"
              leftIcon={<LogOut className="w-4 h-4 text-rose-400" />}
              onClick={handleLogout}
              className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30"
            >
              Sign Out Admin
            </Button>
          </div>
        }
      />

      {/* KPI Top Cards (Only shown on Analytics & Candidates tabs) */}
      {(activeTab === 'analytics' || activeTab === 'candidates') && (
        <AdminMetrics stats={stats} />
      )}

      {/* Tab 1: Onboarding Analytics & Role Distribution */}
      {activeTab === 'analytics' && (
        <div className="space-y-8 animate-fadeIn">
          <OnboardingAnalyticsChart />
          <CandidateTable />
        </div>
      )}

      {/* Tab 2: Full Candidate Directory */}
      {activeTab === 'candidates' && (
        <div className="animate-fadeIn">
          <CandidateTable />
        </div>
      )}

      {/* Tab 3: Placement Queue Leaderboard */}
      {activeTab === 'placement' && (
        <div className="animate-fadeIn">
          <PlacementQueue />
        </div>
      )}

      {/* Tab 4: Curriculum Content Editor */}
      {activeTab === 'curriculum' && (
        <div className="animate-fadeIn">
          <AdminCurriculumEditor />
        </div>
      )}

      {/* Tab 5: VPS & AI Telemetry */}
      {activeTab === 'telemetry' && (
        <div className="space-y-6 animate-fadeIn">
          {/* System Telemetry KPI Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">CPU Utilization</span>
                <p className="text-xl font-bold text-cyan-400">12.4% <span className="text-xs text-emerald-400 font-normal">Normal</span></p>
              </div>
              <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                <Cpu className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">RAM Allocation</span>
                <p className="text-xl font-bold text-purple-400">1.4 GB <span className="text-xs text-gray-500 font-normal">/ 4.0 GB</span></p>
              </div>
              <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
                <HardDrive className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">SQLite Storage</span>
                <p className="text-xl font-bold text-emerald-400">Connected <span className="text-xs text-emerald-300 font-normal">(WAL)</span></p>
              </div>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                <Database className="w-5 h-5" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-between">
              <div className="space-y-1">
                <span className="text-xs text-gray-400 font-medium">Network Latency</span>
                <p className="text-xl font-bold text-amber-400">4 ms <span className="text-xs text-emerald-400 font-normal">Optimal</span></p>
              </div>
              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                <Activity className="w-5 h-5" />
              </div>
            </div>
          </div>

          <LiveTerminal title="Production Server System Telemetry & Log Stream" />
        </div>
      )}
    </div>
  );
};

