import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Search, Command, LayoutDashboard, Calendar, Target, BookOpen,
  MessageSquareCode, Mic, Code2, Server, FolderKanban, Dumbbell,
  Flame, LineChart, Briefcase, BookMarked, Settings, User
} from 'lucide-react';

export const CommandPalette = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const commands = [
    { id: 'dashboard', label: 'Go to Dashboard', group: 'Navigation', icon: <LayoutDashboard className="w-4 h-4 text-blue-400" />, path: '/app/dashboard' },
    { id: 'planner', label: 'Daily Planner & Time-Blocking', group: 'Productivity', icon: <Calendar className="w-4 h-4 text-indigo-400" />, path: '/app/planner' },
    { id: 'learning', label: 'MERN Stack & Fullstack Roadmap', group: 'Skills', icon: <BookOpen className="w-4 h-4 text-cyan-400" />, path: '/app/learning' },
    { id: 'interview', label: 'AI Interview Simulator & Flashcards', group: 'Skills', icon: <MessageSquareCode className="w-4 h-4 text-pink-400" />, path: '/app/interview' },
    { id: 'english', label: 'English Speaking & Fluency Coach', group: 'Skills', icon: <Mic className="w-4 h-4 text-emerald-400" />, path: '/app/english' },
    { id: 'dsa', label: 'DSA Algorithmic Visualizer & Problem Solver', group: 'Skills', icon: <Code2 className="w-4 h-4 text-amber-400" />, path: '/app/dsa' },
    { id: 'devops', label: 'Hostinger VPS & CloudPanel Manager', group: 'Infrastructure', icon: <Server className="w-4 h-4 text-sky-400" />, path: '/app/devops' },
    { id: 'project', label: 'Project Manager & Kanban Sprint Board', group: 'Work', icon: <FolderKanban className="w-4 h-4 text-purple-400" />, path: '/app/projects' },
    { id: 'analytics', label: 'Analytics & Growth Velocity Insights', group: 'Insights', icon: <LineChart className="w-4 h-4 text-purple-400" />, path: '/app/analytics' },
    { id: 'settings', label: 'Account & AI Model Preferences', group: 'System', icon: <Settings className="w-4 h-4 text-gray-400" />, path: '/app/settings' },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.toLowerCase()) ||
    cmd.group.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % (filteredCommands.length || 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % (filteredCommands.length || 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          navigate(filteredCommands[selectedIndex].path);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-2xl bg-[#121218] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10"
          >
            {/* Search Input Bar */}
            <div className="flex items-center px-4 border-b border-white/10">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Type a command or search feature... (e.g. MERN, Planner, DevOps)"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent py-4 px-3 text-sm text-gray-100 placeholder:text-gray-500 outline-none"
              />
              <span className="text-xs text-gray-500 bg-white/10 px-2 py-1 rounded-md">ESC</span>
            </div>

            {/* Results List */}
            <div className="max-h-[380px] overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-12 text-center text-gray-500 text-sm">
                  No matching features found.
                </div>
              ) : (
                filteredCommands.map((cmd, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={cmd.id}
                      onClick={() => {
                        navigate(cmd.path);
                        onClose();
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between px-3.5 py-3 rounded-xl cursor-pointer text-sm transition-all duration-150 ${
                        isSelected
                          ? 'bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-white border border-white/10'
                          : 'text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          {cmd.icon}
                        </div>
                        <span className="font-medium">{cmd.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500 font-mono px-2 py-0.5 rounded bg-white/5">
                          {cmd.group}
                        </span>
                        {isSelected && <span className="text-xs text-purple-400">↵ Jump</span>}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Command Footer */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-white/[0.02] border-t border-white/10 text-xs text-gray-500">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white/10 rounded">↑</kbd> <kbd className="px-1 py-0.5 bg-white/10 rounded">↓</kbd> to navigate</span>
                <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-white/10 rounded">↵</kbd> to select</span>
              </div>
              <div className="flex items-center gap-1">
                <Command className="w-3 h-3 text-purple-400" />
                <span className="font-semibold text-gray-400">LifeOS AI Command Center</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
