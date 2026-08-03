import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard, Calendar, Target, BookOpen, MessageSquareCode,
  Mic, Code2, Server, FolderKanban, Dumbbell, Flame, LineChart,
  Briefcase, BookMarked, Settings, ChevronLeft, ChevronRight,
  Sparkles, Zap, Bot
} from 'lucide-react';
import { cn } from '../../utils/cn';

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const location = useLocation();

  const navSections = [
    {
      title: "Core",
      items: [
        { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { path: '/app/planner', label: 'Daily Planner', icon: Calendar, badge: 'Today' },
        { path: '/app/goals', label: 'Goals', icon: Target, badge: null }
      ]
    },
    {
      title: "Skills & Career",
      items: [
        { path: '/app/learning', label: 'Learning Hub', icon: BookOpen, badge: 'MERN' },
        { path: '/app/interview', label: 'Interview Prep', icon: MessageSquareCode, badge: 'AI' },
        { path: '/app/english', label: 'English Coach', icon: Mic, badge: null },
        { path: '/app/dsa', label: 'DSA Practice', icon: Code2, badge: null },
        { path: '/app/devops', label: 'DevOps & VPS', icon: Server, badge: 'Cloud' }
      ]
    },
    {
      title: "Projects & Work",
      items: [
        { path: '/app/projects', label: 'Project Manager', icon: FolderKanban, badge: null }
      ]
    },
    {
      title: "Health & Mindset",
      items: [
        { path: '/app/fitness', label: 'Fitness', icon: Dumbbell, badge: null },
        { path: '/app/habits', label: 'Habits', icon: Flame, badge: '🔥 14' },
        { path: '/app/journal', label: 'Journal', icon: BookMarked, badge: null },
        { path: '/app/analytics', label: 'Analytics', icon: LineChart, badge: null }
      ]
    }
  ];

  return (
    <motion.aside
      animate={{ width: isCollapsed ? 80 : 260 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="fixed left-0 top-0 bottom-0 z-40 bg-[#0c0c10]/90 backdrop-blur-2xl border-r border-white/10 flex flex-col justify-between select-none"
    >
      {/* Top Header Logo */}
      <div>
        <div className="h-16 px-4 flex items-center justify-between border-b border-white/10">
          <NavLink to="/app/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shrink-0 shadow-lg shadow-indigo-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#0c0c10] rounded-[10px] flex items-center justify-center">
                <Bot className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col whitespace-nowrap"
              >
                <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
                  LifeOS <span className="text-gradient font-black text-xs px-1.5 py-0.5 rounded bg-white/10">AI</span>
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">Personal Coach</span>
              </motion.div>
            )}
          </NavLink>

          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Toggle Sidebar (Cmd+B)"
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 max-h-[calc(100vh-140px)] overflow-y-auto space-y-6">
          {navSections.map((section, idx) => (
            <div key={idx} className="space-y-1">
              {!isCollapsed && (
                <h4 className="px-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-2">
                  {section.title}
                </h4>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "relative group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600/30 to-purple-600/30 border border-white/10 shadow-lg shadow-purple-500/10"
                        : "text-gray-400 hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <Icon className={cn("w-5 h-5 shrink-0 transition-colors", isActive ? "text-cyan-400" : "text-gray-400 group-hover:text-gray-200")} />

                    {!isCollapsed && (
                      <span className="truncate whitespace-nowrap">{item.label}</span>
                    )}

                    {!isCollapsed && item.badge && (
                      <span className="ml-auto text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 border border-white/10">
                        {item.badge}
                      </span>
                    )}

                    {/* Tooltip on collapse */}
                    {isCollapsed && (
                      <div className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-[#181822] text-white text-xs font-medium border border-white/10 shadow-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                        {item.label}
                      </div>
                    )}
                  </NavLink>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Footer Profile Status */}
      <div className="p-3 border-t border-white/10 bg-white/[0.02]">
        <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
              M
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 border-2 border-[#0c0c10]" />
          </div>

          {!isCollapsed && (
            <div className="flex flex-col truncate">
              <span className="text-xs font-semibold text-white truncate">Manoj Kumar</span>
              <span className="text-[10px] text-cyan-400 font-mono">Pro Member • AI Active</span>
            </div>
          )}
        </div>
      </div>
    </motion.aside>
  );
};
