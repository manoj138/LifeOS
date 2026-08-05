import React from 'react';

/**
 * Lightweight, beautiful Markdown renderer component for curriculum concept deep-dives.
 * Converts ### headings, **bold**, `code`, • bullet lists, and 💡 pro tips into styled React elements.
 */
export const FormattedMarkdown = ({ content, className = '' }) => {
  if (!content) return null;

  const parseInline = (text) => {
    if (!text) return null;
    const parts = [];
    const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g;
    let match;
    let lastIdx = 0;
    let key = 0;

    const str = String(text);
    while ((match = regex.exec(str)) !== null) {
      if (match.index > lastIdx) {
        parts.push(str.substring(lastIdx, match.index));
      }
      const token = match[0];
      if (token.startsWith('**') && token.endsWith('**')) {
        parts.push(
          <strong key={key++} className="font-bold text-white drop-shadow-sm">
            {token.slice(2, -2)}
          </strong>
        );
      } else if (token.startsWith('`') && token.endsWith('`')) {
        parts.push(
          <code key={key++} className="px-1.5 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-mono text-[11px] border border-purple-500/30">
            {token.slice(1, -1)}
          </code>
        );
      }
      lastIdx = regex.lastIndex;
    }
    if (lastIdx < str.length) {
      parts.push(str.substring(lastIdx));
    }

    return parts.length > 0 ? parts : text;
  };

  const lines = String(content).split('\n');

  return (
    <div className={`space-y-3 font-sans text-xs leading-relaxed text-gray-200 ${className}`}>
      {lines.map((line, idx) => {
        const trimmed = line.trim();
        if (!trimmed) return <div key={idx} className="h-0.5" />;

        // Headings (###, ##, #)
        if (trimmed.startsWith('### ')) {
          return (
            <h3 key={idx} className="text-xs sm:text-sm font-bold text-cyan-300 pt-3 pb-1 border-b border-cyan-500/20 flex items-center gap-2 tracking-wide">
              {parseInline(trimmed.replace(/^###\s+/, ''))}
            </h3>
          );
        }
        if (trimmed.startsWith('## ')) {
          return (
            <h2 key={idx} className="text-sm sm:text-base font-extrabold text-purple-300 pt-4 pb-1 border-b border-purple-500/20">
              {parseInline(trimmed.replace(/^##\s+/, ''))}
            </h2>
          );
        }
        if (trimmed.startsWith('# ')) {
          return (
            <h1 key={idx} className="text-base sm:text-lg font-black text-white pt-4 pb-1">
              {parseInline(trimmed.replace(/^#\s+/, ''))}
            </h1>
          );
        }

        // Bullet Lists (•, -, *)
        if (trimmed.startsWith('• ') || trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
          const bulletText = trimmed.replace(/^[•\-*]\s+/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 py-0.5 group">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 mt-1.5 shadow-[0_0_8px_rgba(192,132,252,0.8)] group-hover:scale-125 transition-transform" />
              <div className="flex-1 text-gray-200 leading-relaxed">{parseInline(bulletText)}</div>
            </div>
          );
        }

        // Pro Tip / Callout Box
        if (trimmed.includes('💡') || trimmed.startsWith('Pro Tip:')) {
          return (
            <div key={idx} className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-200 my-2 flex items-start gap-2.5 shadow-sm">
              <div className="flex-1 leading-relaxed">{parseInline(trimmed)}</div>
            </div>
          );
        }

        // Regular Paragraph
        return (
          <p key={idx} className="text-gray-300 leading-relaxed">
            {parseInline(trimmed)}
          </p>
        );
      })}
    </div>
  );
};
