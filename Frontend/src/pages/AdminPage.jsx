import React, { useState, useEffect } from 'react';
import { ShieldCheck, Users, BarChart3, Award, Server, RefreshCw, Download, Sparkles } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { Button } from '../components/ui/Button';
import { Tabs } from '../components/ui/Tabs';
import { AdminMetrics } from '../components/admin/AdminMetrics';
import { OnboardingAnalyticsChart } from '../components/admin/OnboardingAnalyticsChart';
import { CandidateTable } from '../components/admin/CandidateTable';
import { PlacementQueue } from '../components/admin/PlacementQueue';
import { AdminCurriculumEditor } from '../components/admin/AdminCurriculumEditor';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { apiService } from '../services/api';

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('analytics');
  const [stats, setStats] = useState(null);

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

  return (
    <div className="space-y-8 pb-12">
      {/* Top Admin Header */}
      <SectionHeader
        badge="Executive Admin Console"
        title="Candidate Network & Platform Analytics ⚡"
        subtitle="Real-time telemetry on candidate onboarding completion, target role distribution, skill levels, and placement readiness."
        actions={
          <div className="flex items-center gap-3">
            <Button variant="glass" size="sm" leftIcon={<Download className="w-4 h-4 text-purple-400" />}>
              Export Report
            </Button>
          </div>
        }
      />

      {/* KPI Top Cards */}
      <AdminMetrics stats={stats} />

      {/* Admin Navigation Tabs */}
      <div className="flex justify-center sm:justify-start border-b border-white/10 pb-4">
        <Tabs
          tabs={[
            { id: 'analytics', label: '1. Onboarding Analytics' },
            { id: 'candidates', label: '2. Candidate Directory' },
            { id: 'placement', label: '3. Placement Queue' },
            { id: 'curriculum', label: '4. Curriculum Content Editor' },
            { id: 'telemetry', label: '5. VPS System Health' },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

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
          <LiveTerminal title="Hostinger VPS Production Server (185.220.101.42)" />
        </div>
      )}
    </div>
  );
};

