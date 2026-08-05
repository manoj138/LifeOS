import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchInput = ({
  value = '',
  onChange,
  onClear,
  placeholder = 'Search...',
  className = '',
  size = 'md'
}) => {
  const sizeClasses = {
    sm: 'py-1.5 pl-8 pr-7 text-[11px]',
    md: 'py-2 pl-9 pr-8 text-xs',
    lg: 'py-2.5 pl-10 pr-9 text-sm'
  };

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-4 h-4 left-3.5'
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      <Search className={`text-gray-400 absolute top-1/2 -translate-y-1/2 ${iconSizes[size] || iconSizes.md}`} />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full bg-white/[0.04] text-white placeholder:text-gray-500 rounded-xl border border-white/10 outline-none focus:border-purple-500/50 transition-all ${sizeClasses[size] || sizeClasses.md}`}
      />
      {value && onClear && (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white p-0.5 rounded-lg transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
