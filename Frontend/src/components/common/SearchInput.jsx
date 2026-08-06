import React from 'react';
import { Search, X } from 'lucide-react';

export const SearchInput = ({
  placeholder = "Search...",
  value = "",
  onChange,
  onClear,
  shortcut = "/",
  className = ""
}) => {
  return (
    <div className={`relative flex items-center group ${className}`}>
      <Search className="w-4 h-4 text-gray-400 absolute left-3.5 group-focus-within:text-purple-400 transition-colors pointer-events-none" />

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full pl-10 pr-10 py-2.5 bg-slate-900/90 border border-white/15 focus:border-purple-500 rounded-xl outline-none text-xs text-gray-200 placeholder:text-gray-500 focus:bg-slate-950 transition-all shadow-inner"
      />

      {value ? (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-3 p-1 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcut ? (
        <span className="absolute right-3 px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-gray-500 pointer-events-none select-none">
          {shortcut}
        </span>
      ) : null}
    </div>
  );
};

export default SearchInput;
