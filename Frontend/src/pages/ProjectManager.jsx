import React, { useState } from 'react';
import { FolderKanban, Plus, MoreHorizontal } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const ProjectManager = () => {
  const [columns, setColumns] = useState([
    {
      title: "Backlog",
      color: "border-gray-500/30",
      cards: []
    },
    {
      title: "In Progress",
      color: "border-purple-500/30",
      cards: []
    },
    {
      title: "Completed",
      color: "border-emerald-500/30",
      cards: []
    }
  ]);

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Sprint & Agile Matrix"
        title="Project Manager & Kanban Board"
        subtitle="Manage engineering projects, sprint backlog items, and architectural releases."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            New Project Task
          </Button>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((col, idx) => (
          <div key={idx} className="space-y-4">
            <div className={`p-4 rounded-2xl bg-white/[0.02] border ${col.color} flex items-center justify-between`}>
              <span className="font-bold text-sm text-white tracking-tight">{col.title}</span>
              <span className="text-xs font-mono bg-white/10 px-2 py-0.5 rounded text-gray-300">
                {col.cards.length}
              </span>
            </div>

            <div className="space-y-3">
              {col.cards.length === 0 ? (
                <div className="p-8 text-center border border-dashed border-white/10 rounded-2xl bg-white/[0.01] space-y-2">
                  <FolderKanban className="w-8 h-8 text-gray-500 mx-auto" />
                  <p className="text-xs font-medium text-gray-400">No tasks in {col.title}</p>
                </div>
              ) : (
                col.cards.map((card, cIdx) => (
                  <GlassCard key={cIdx} className="p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge variant={card.priority === 'Urgent' ? 'rose' : card.priority === 'High' ? 'amber' : 'purple'}>
                        {card.priority}
                      </Badge>
                      <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
                    </div>

                    <h4 className="text-sm font-bold text-white tracking-tight">{card.title}</h4>

                    <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
                      <span className="font-mono">{card.tag}</span>
                    </div>
                  </GlassCard>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
