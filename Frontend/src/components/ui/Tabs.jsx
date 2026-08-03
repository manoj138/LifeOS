import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

export const Tabs = ({ tabs = [], activeTab, onChange, className }) => {
  return (
    <div className={cn("flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-xl w-fit", className)}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "relative px-4 py-2 text-sm font-medium rounded-xl transition-colors duration-200 select-none flex items-center gap-2",
              isActive ? "text-white" : "text-gray-400 hover:text-gray-200"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeTabPill"
                className="absolute inset-0 bg-gradient-to-r from-blue-600/80 via-indigo-600/80 to-purple-600/80 rounded-xl shadow-lg border border-white/10 -z-0"
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10 flex items-center gap-2">
              {tab.icon && <span>{tab.icon}</span>}
              {tab.label}
              {tab.badge && (
                <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-white/20 text-white">
                  {tab.badge}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
};
