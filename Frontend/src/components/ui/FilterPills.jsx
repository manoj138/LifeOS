import React from 'react';

export const FilterPills = ({
  options = [],
  activeOption,
  onSelect,
  className = '',
  size = 'sm'
}) => {
  const sizeClasses = {
    xs: 'px-2.5 py-1 text-[10px]',
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-4 py-2 text-xs font-semibold'
  };

  return (
    <div className={`flex items-center gap-1.5 overflow-x-auto pb-1 ${className}`}>
      {options.map((opt) => {
        const id = typeof opt === 'object' ? opt.id : opt;
        const label = typeof opt === 'object' ? opt.label : opt;
        const icon = typeof opt === 'object' ? opt.icon : null;
        const isSelected = activeOption === id;

        return (
          <button
            key={id}
            type="button"
            onClick={() => onSelect(id)}
            className={`flex items-center gap-1.5 rounded-xl font-bold transition-all whitespace-nowrap border ${
              sizeClasses[size] || sizeClasses.sm
            } ${
              isSelected
                ? 'bg-gradient-to-r from-blue-600/40 to-purple-600/40 border-purple-500 text-white shadow-lg shadow-purple-500/20'
                : 'bg-white/[0.03] border-white/10 text-gray-400 hover:text-white hover:bg-white/[0.08]'
            }`}
          >
            {icon}
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
};
