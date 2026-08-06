import React from 'react';
import { Bot } from 'lucide-react';
import { Skeleton } from '../components/ui/Skeleton';
import { SectionHeader } from '../components/common/SectionHeader';
import { LottieAnimation } from '../components/ui/LottieAnimation';

export const LoadingStatePage = () => {
  return (
    <div className="space-y-8 pb-12 text-center">
      <div className="py-6 flex flex-col items-center justify-center">
        <LottieAnimation
          src="https://assets2.lottiefiles.com/packages/lf20_mbe2aawl.json"
          className="w-44 h-44 mb-2"
          fallbackIcon={<Bot className="w-16 h-16 text-purple-400 animate-pulse" />}
        />
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
