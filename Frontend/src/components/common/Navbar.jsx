import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Sparkles, Command, Plus, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { VoiceGuiderWidget } from '../voice/VoiceGuiderWidget';
import { useUser } from '../../context/UserContext';
import { cn } from '../../utils/cn';

export const Navbar = ({ onOpenCommandPalette, isSidebarCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(true);
  const { user } = useUser();

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

  const getPageTitle = (path) => {
    const routeTitles = {
      '/app/dashboard': 'Candidate Command Center',
      '/app/planner': 'Daily Timeline & Study Schedule',
      '/app/learning': 'Technical Mastery & Full-Stack Hub',
      '/app/interview': 'AI Teleprompter & Interview Studio',
      '/app/english': 'English Speaking & Fluency Coach',
      '/app/dsa': 'DSA Practice & LeetCode Studio',
      '/app/devops': 'DevOps Labs & Hostinger VPS',
      '/app/projects': 'Project Architectural Showcase',
      '/app/jobs': 'Job Application & Hiring Pipeline',
      '/app/analytics': 'Growth Velocity & Insights',
      '/app/settings': 'Account & Strategy Settings'
    };
    return routeTitles[path] || 'LifeOS AI';
  };

  return (
    <header
      className={cn(
        "fixed top-0 right-0 z-30 h-16 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/10 px-6 flex items-center justify-between transition-all duration-300",
        isSidebarCollapsed ? "left-[80px]" : "left-[260px]"
      )}
    >
      {/* Left Breadcrumb & Page Title */}
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-500 font-medium">LifeOS AI</span>
        <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
        <span className="text-sm font-bold text-white tracking-tight">
          {getPageTitle(location.pathname)}
        </span>
      </div>

      {/* Right Action Icons & Status */}
      <div className="flex items-center gap-3">
        {/* Voice Guider Widget (Candidates Only) */}
        {!isAdmin && <VoiceGuiderWidget />}

        {/* AI Status Badge */}
        <div className="hidden xl:flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-medium text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>AI Active</span>
        </div>

        {/* Notifications Button */}
        <button
          onClick={() => setHasUnread(false)}
          className="relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          {hasUnread && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          )}
        </button>

        {/* Settings button */}
        <button
          onClick={() => navigate('/app/settings')}
          className="p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-gray-400 hover:text-white transition-colors"
          title="Settings"
        >
          <SlidersHorizontal className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
};
