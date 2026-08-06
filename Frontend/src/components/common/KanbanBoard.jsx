import React from 'react';

export const KanbanBoard = ({
  columns = [], // Array of { id, title, badgeColor, items: [] }
  renderItem,
  onAddItem,
  className = ''
}) => {
  const badgeStyles = {
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    rose: "bg-rose-500/10 text-rose-400 border-rose-500/20"
  };

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 ${className}`}>
      {columns.map((col) => {
        const activeStyle = badgeStyles[col.badgeColor] || badgeStyles.purple;
        return (
          <div
            key={col.id}
            className="rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-5 space-y-4 shadow-2xl flex flex-col min-h-[400px]"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${activeStyle}`}>
                  {col.title}
                </span>
                <span className="text-xs font-mono text-gray-400">
                  ({col.items?.length || 0})
                </span>
              </div>

              {onAddItem && (
                <button
                  type="button"
                  onClick={() => onAddItem(col.id)}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors text-xs font-bold flex items-center gap-1"
                >
                  + Add
                </button>
              )}
            </div>

            {/* Column Items list */}
            <div className="space-y-3 flex-1 overflow-y-auto max-h-[600px] pr-1">
              {col.items && col.items.length > 0 ? (
                col.items.map((item, idx) => (
                  <React.Fragment key={item.id || idx}>
                    {renderItem(item, col.id)}
                  </React.Fragment>
                ))
              ) : (
                <div className="flex items-center justify-center h-32 rounded-2xl border border-dashed border-white/10 text-xs text-gray-500">
                  No items in {col.title}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default KanbanBoard;
