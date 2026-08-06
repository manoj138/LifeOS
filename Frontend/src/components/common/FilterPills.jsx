import React from 'react';

export const FilterPills = ({
  options = [],
  activeValue,
  onSelect,
  onDelete,
  label = "Filter:",
  className = ''
}) => {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {label && (
        <span className="text-xs font-semibold text-gray-400 select-none mr-1">
          {label}
        </span>
      )}

      {options.map((opt) => {
        const isObj = typeof opt === 'object' && opt !== null;
        const key = isObj ? opt.value : opt;
        const displayLabel = isObj ? opt.label : opt;
        const count = isObj ? opt.count : undefined;
        const isSelected = String(activeValue).toLowerCase() === String(key).toLowerCase();

        return (
          <div
            key={key}
            onClick={() => onSelect && onSelect(key)}
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer select-none border ${
              isSelected
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-purple-400/40 shadow-lg shadow-purple-500/20 font-bold'
                : 'bg-slate-900/80 text-gray-400 hover:text-white border-white/10 hover:border-white/20'
            }`}
          >
            <span>{displayLabel}</span>

            {count !== undefined && (
              <span className={`px-1.5 py-0.2 text-[10px] rounded-full font-mono ${
                isSelected ? 'bg-white/20 text-white' : 'bg-white/5 text-gray-400'
              }`}>
                {count}
              </span>
            )}

            {onDelete && key !== 'all' && key !== 'All' && (
              <button
                type="button"
                title={`Delete ${displayLabel}`}
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(key, displayLabel);
                }}
                className="ml-1 text-gray-400 hover:text-rose-400 p-0.5 rounded transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FilterPills;
