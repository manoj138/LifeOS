import React from 'react';

export const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  name, 
  className = '', 
  icon: Icon,
  leftIcon,
  rightIcon, 
  iconPosition = 'left', 
  error,
  helperText,
  ...props 
}) => {
  const hasError = Boolean(error);
  const renderLeftIcon = leftIcon || (Icon && iconPosition === 'left' ? <Icon className="w-4 h-4" /> : null);
  const renderRightIcon = rightIcon || (Icon && iconPosition === 'right' ? <Icon className="w-4 h-4" /> : null);

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className={`text-xs font-semibold tracking-tight transition-colors duration-200 ${
          hasError ? 'text-rose-400' : 'text-gray-300'
        }`}>
          {label}
        </label>
      )}
      
      <div className="relative group flex items-center">
        {renderLeftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200 pointer-events-none">
            {renderLeftIcon}
          </div>
        )}
        
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full px-3.5 py-2.5 bg-slate-900 border rounded-xl outline-none transition-all duration-200 text-xs text-gray-100 placeholder:text-gray-500 focus:bg-slate-950 ${
            renderLeftIcon ? 'pl-10' : ''
          } ${
            renderRightIcon ? 'pr-10' : ''
          } ${
            hasError 
              ? 'border-rose-500/80 focus:border-rose-500 focus:ring-1 focus:ring-rose-500/30' 
              : 'border-white/15 hover:border-white/25 focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30'
          }`}
          {...props}
        />

        {renderRightIcon && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-purple-400 transition-colors duration-200 pointer-events-none">
            {renderRightIcon}
          </div>
        )}
      </div>

      {hasError ? (
        <p className="text-[11px] font-medium text-rose-400 mt-0.5 animate-fadeIn">
          {error}
        </p>
      ) : helperText ? (
        <p className="text-[11px] text-gray-400 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
};

export default Input;

