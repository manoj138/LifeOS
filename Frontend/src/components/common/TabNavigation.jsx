import React from 'react';

export const TabNavigation = ({
  tabs = [], // Array of { id, label, icon: Icon, badgeCount }
  activeTab,
  onTabChange,
  variant = 'glass', // 'glass' | 'pills'
  className = ''
}) => {
  return (
    <div className={`inline-flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 shadow-2xl flex-wrap ${className}`}>
      {tabs.map((tab) => {
        const isObj = typeof tab === 'object' && tab !== null;
        const id = isObj ? tab.id : tab;
        const label = isObj ? tab.label : tab;
        const Icon = isObj ? tab.icon : null;
        const badgeCount = isObj ? tab.badgeCount : undefined;
        const isSelected = String(activeTab).toLowerCase() === String(id).toLowerCase();

        return (
          <button
            key={id}
            type="button"
            onClick={() => onTabChange && onTabChange(id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 select-none cursor-pointer ${
              isSelected
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25 border border-purple-400/30'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {Icon && <Icon className="w-4 h-4 shrink-0" />}
            <span>{label}</span>

            {badgeCount !== undefined && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-white/10 text-gray-400'
              }`}>
                {badgeCount}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabNavigation;
