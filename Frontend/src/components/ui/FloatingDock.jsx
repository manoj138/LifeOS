import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bot, Command, Server, Calendar, Dumbbell, Sparkles, Terminal, Flame } from 'lucide-react';

export const FloatingDock = ({ onOpenCommandPalette }) => {
  const navigate = useNavigate();

  const dockItems = [
    { id: 'command', label: 'Command Palette (Cmd+K)', icon: Command, action: onOpenCommandPalette, color: 'text-cyan-400' },
    { id: 'interview', label: 'AI Voice Interview', icon: Bot, path: '/app/interview', color: 'text-purple-400' },
    { id: 'planner', label: 'Daily Time-Blocking', icon: Calendar, path: '/app/planner', color: 'text-indigo-400' },
    { id: 'learning', label: 'MERN Code Studio', icon: Terminal, path: '/app/learning', color: 'text-emerald-400' },
    { id: 'devops', label: 'Hostinger VPS Live Status', icon: Server, path: '/app/devops', color: 'text-blue-400' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="flex items-center gap-2 p-2 rounded-full bg-[#101018]/80 backdrop-blur-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-t-white/30"
      >
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.2, y: -6 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (item.action) item.action();
                else if (item.path) navigate(item.path);
              }}
              className="relative p-3 rounded-full bg-white/[0.05] hover:bg-white/[0.12] border border-white/10 text-gray-200 transition-colors group"
              title={item.label}
            >
              <Icon className={`w-5 h-5 ${item.color}`} />

              {/* Tooltip on Hover */}
              <span className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-[#181822] text-white text-xs font-semibold border border-white/15 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap shadow-xl">
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
};
