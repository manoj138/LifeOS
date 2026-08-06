import React from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import { SectionHeader } from '../components/common/SectionHeader';

export const LoadingStatePage = () => {
  return (
    <div className="space-y-8 pb-12 text-center">
      <div className="py-6 flex flex-col items-center justify-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/20 border border-purple-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-xl shadow-purple-500/10 animate-pulse">
          <Bot className="w-12 h-12 text-cyan-400" />
        </div>
        <SectionHeader
          badge="Loading State"
          title="Synthesizing AI Workspace..."
          subtitle="Optimizing MERN stack roadmaps & neural network parameters."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32 w-full rounded-2xl" />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Skeleton className="h-96 lg:col-span-2 rounded-3xl" />
        <Skeleton className="h-96 rounded-3xl" />
      </div>
    </div>
  );
};
