import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, Bell, Sparkles, Command, Plus, ChevronRight, SlidersHorizontal } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '../../utils/cn';

export const Navbar = ({ onOpenCommandPalette, isSidebarCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hasUnread, setHasUnread] = useState(true);

  const getPageTitle = (path) => {
    const routeTitles = {
      '/app/dashboard': 'Dashboard Overview',
      '/app/planner': 'Daily Planner & Time-Blocking',
      '/app/goals': 'Life Goals & Milestones',
      '/app/learning': 'MERN & Fullstack Learning Hub',
      '/app/interview': 'AI Interview Simulator',
      '/app/english': 'English Speaking Coach',
      '/app/dsa': 'DSA Practice & Visualizer',
      '/app/devops': 'DevOps & Hostinger VPS',
      '/app/projects': 'Project Manager',
      '/app/jobs': 'Job Application Pipeline',
      '/app/fitness': 'Fitness & Recovery',
      '/app/habits': 'Habit Tracker Matrix',
      '/app/journal': 'AI Reflection Journal',
      '/app/analytics': 'Growth Analytics & Insights',
      '/app/settings': 'Account & AI Settings'
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

      {/* Center Search Bar Trigger (Cmd+K) */}
      <button
        onClick={onOpenCommandPalette}
        className="hidden md:flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 px-4 py-2 rounded-xl text-sm text-gray-400 hover:text-white transition-all w-80 shadow-inner group"
      >
        <Search className="w-4 h-4 text-gray-400 group-hover:text-cyan-400 transition-colors" />
        <span className="truncate">Search commands, tools...</span>
        <span className="ml-auto text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300 border border-white/10">
          ⌘K
        </span>
      </button>

      {/* Right Action Icons & Status */}
      <div className="flex items-center gap-3">
        {/* AI Status Badge */}
        <div className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-medium text-purple-300">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>AI Coach Active</span>
        </div>

        {/* Quick Action Button */}
        <Button
          size="sm"
          variant="primary"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={onOpenCommandPalette}
        >
          Quick Action
        </Button>

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
