import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Target, BookOpen, MessageSquareCode,
  Mic, Code2, Server, FolderKanban, Dumbbell, Flame, LineChart,
  Briefcase, BookMarked, Settings, ChevronLeft, ChevronRight,
  Sparkles, Zap, Bot, ShieldCheck, Users, Award, BookCheck, LogOut
} from 'lucide-react';
import { cn } from '../../utils/cn';
import { useUser } from '../../context/UserContext';

export const Sidebar = ({ isCollapsed, isMobileOpen, onToggle, onCloseMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, clearAllLocalState } = useUser();

  const handleLogout = () => {
    clearAllLocalState();
    navigate('/auth');
  };

  const isAdmin = user?.role === 'admin' || user?.email?.toLowerCase().includes('admin');

  // 100% Isolated Navigation Sections for System Administrators
  const ADMIN_NAV_SECTIONS = [
    {
      title: "Admin Console",
      items: [
        { path: '/app/admin?tab=analytics', label: 'Onboarding Analytics', icon: LineChart, badge: 'Live' },
        { path: '/app/admin?tab=candidates', label: 'Candidate Directory', icon: Users, badge: null },
        { path: '/app/admin?tab=placements', label: 'Placement Queue', icon: Award, badge: null },
        { path: '/app/admin?tab=curriculum', label: 'Curriculum Editor', icon: BookOpen, badge: 'AI' },
        { path: '/app/admin?tab=vps', label: 'VPS System Health', icon: Server, badge: null },
      ]
    },
    {
      title: "System Control",
      items: [
        { path: '/app/settings', label: 'System Settings', icon: Settings, badge: null }
      ]
    }
  ];

  // 100% Isolated Navigation Sections for Candidates / Students
  const CANDIDATE_NAV_SECTIONS = [
    {
      title: "🚀 Studio Command",
      items: [
        { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { path: '/app/planner', label: 'Daily Timeline', icon: Calendar, badge: 'Today' }
      ]
    },
    {
      title: "📚 Core Learning & Labs",
      items: [
        { path: '/app/learning', label: 'Learning Hub', icon: BookOpen, badge: 'MERN' },
        { path: '/app/dsa', label: 'DSA Studio', icon: Code2, badge: 'LeetCode' },
        { path: '/app/devops', label: 'DevOps & VPS', icon: Server, badge: 'Cloud' }
      ]
    },
    {
      title: "🎙️ Placement & Career",
      items: [
        { path: '/app/interview', label: 'Interview Prep', icon: MessageSquareCode, badge: 'AI' },
        { path: '/app/english', label: 'English Coach', icon: Mic, badge: null },
        { path: '/app/jobs', label: 'Job Applications', icon: Briefcase, badge: 'Pipeline' }
      ]
    },
    {
      title: "🏆 Portfolio & Performance",
      items: [
        { path: '/app/projects', label: 'Project Portfolio', icon: FolderKanban, badge: null },
        { path: '/app/analytics', label: 'Analytics', icon: LineChart, badge: null },
        { path: '/app/settings', label: 'Settings', icon: Settings, badge: null }
      ]
    }
  ];

  const navSections = isAdmin ? ADMIN_NAV_SECTIONS : CANDIDATE_NAV_SECTIONS;

  return (
    <>
      {/* Mobile Drawer Overlay Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 md:hidden transition-opacity"
        />
      )}

      <motion.aside
        animate={{ width: isCollapsed ? 80 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          "fixed left-0 top-0 bottom-0 z-50 bg-[#0c0c10]/95 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between select-none transition-transform duration-300",
          isMobileOpen ? "translate-x-0 w-[260px]" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Top Header Logo */}
        <div>
          <div className="h-16 px-4 border-b border-white/10 flex items-center justify-between">
            <NavLink to={isAdmin ? "/app/admin" : "/app/dashboard"} className="flex items-center gap-3 group" onClick={onCloseMobile}>
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 p-0.5 shadow-lg shadow-purple-500/20 group-hover:shadow-cyan-500/40 transition-all duration-300">
                <div className="w-full h-full bg-[#0c0c10] rounded-[14px] flex items-center justify-center">
                  {isAdmin ? <ShieldCheck className="w-5 h-5 text-cyan-400" /> : <Bot className="w-5 h-5 text-purple-400" />}
                </div>
              </div>

              {(!isCollapsed || isMobileOpen) && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex flex-col"
                >
                  <span className="font-bold text-white text-base tracking-tight leading-none group-hover:text-cyan-300 transition-colors">
                    LifeOS <span className="text-cyan-400 text-xs">AI</span>
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    {isAdmin ? 'System Administrator' : 'Personal Growth Engine'}
                  </span>
                </motion.div>
              )}
            </NavLink>

            {/* Mobile Close or Desktop Collapse Toggle */}
            <button
              onClick={onCloseMobile}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors md:hidden"
              title="Close Menu"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={onToggle}
              className="hidden md:block p-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
              title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
            >
              {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>

          {/* Navigation Sections */}
          <div className="p-3 space-y-6 overflow-y-auto max-h-[calc(100vh-140px)] custom-scrollbar">
            {navSections.map((section, idx) => (
              <div key={idx} className="space-y-2">
                {(!isCollapsed || isMobileOpen) && (
                  <div className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    {section.title}
                  </div>
                )}

                <div className="space-y-1">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const currentFullPath = location.pathname + location.search;
                    const isSelected = currentFullPath === item.path ||
                      (location.pathname === '/app/admin' && !location.search && item.path === '/app/admin?tab=analytics');

                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onCloseMobile}
                        className={() =>
                          cn(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 group relative",
                            isSelected
                              ? "bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-white border border-purple-500/30 shadow-md shadow-purple-500/10"
                              : "text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent"
                          )
                        }
                      >
                        <Icon className={cn("w-4 h-4 shrink-0 transition-transform group-hover:scale-110", isSelected ? "text-cyan-400" : "text-gray-400 group-hover:text-gray-200")} />

                        {(!isCollapsed || isMobileOpen) && (
                          <div className="flex items-center justify-between flex-1 truncate">
                            <span className="truncate">{item.label}</span>
                            {item.badge && (
                              <span className={cn(
                                "text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wide",
                                isSelected
                                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/30"
                                  : "bg-white/5 text-gray-400 group-hover:bg-white/10"
                              )}>
                                {item.badge}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Active Indicator Glow */}
                        {isSelected && (
                          <motion.div
                            layoutId="activeGlow"
                            className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-gradient-to-b from-cyan-400 to-purple-500 rounded-r-full"
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          />
                        )}
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Profile Status */}
        <div className="p-3 border-t border-white/10 bg-white/[0.02]">
          <div className={cn("flex items-center gap-3", isCollapsed && !isMobileOpen && "justify-center")}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                {(user?.name || 'M').charAt(0).toUpperCase()}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0c0c10]" />
            </div>

            {(!isCollapsed || isMobileOpen) && (
              <div className="flex items-center justify-between flex-1 truncate">
                <div className="flex flex-col truncate">
                  <span className="text-xs font-semibold text-white truncate">{user?.name || 'System User'}</span>
                  <span className="text-[10px] text-cyan-400 font-mono">
                    {isAdmin ? 'System Admin • Online' : 'Candidate • Active'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 transition-colors ml-2"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
};

