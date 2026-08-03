import React from 'react';
import { Dumbbell, Flame, Heart, Zap, Plus } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';

export const FitnessPage = () => {
  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Physical Optimization"
        title="Fitness & Recovery Tracker"
        subtitle="Log workouts, track daily macro calories, hydration, and sleep recovery scores."
        actions={
          <Button variant="primary" leftIcon={<Plus className="w-4 h-4" />}>
            Log Workout Session
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Calories Burned</span>
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">680 kcal</div>
            <span className="text-xs text-emerald-400 font-medium">Goal: 750 kcal</span>
          </div>
          <Flame className="w-8 h-8 text-rose-500" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Water Intake</span>
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">2.8 / 3.5 L</div>
            <span className="text-xs text-cyan-400 font-medium">80% Reached</span>
          </div>
          <Zap className="w-8 h-8 text-cyan-400" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Recovery Score</span>
            <div className="text-2xl font-extrabold text-emerald-400 tracking-tight mt-1">92 / 100</div>
            <span className="text-xs text-gray-400">7.8 hrs Sleep</span>
          </div>
          <Heart className="w-8 h-8 text-emerald-400" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Weekly Workouts</span>
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">5 Sessions</div>
            <span className="text-xs text-purple-400 font-medium">Hypertrophy Plan</span>
          </div>
          <Dumbbell className="w-8 h-8 text-purple-400" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="p-6 space-y-4 lg:col-span-2">
          <h3 className="text-lg font-bold text-white tracking-tight">Today's Hypertrophy Workout Routine</h3>
          <div className="space-y-3">
            {[
              { exercise: "Barbell Bench Press", sets: "4 Sets • 8-10 Reps", weight: "85 kg", done: true },
              { exercise: "Incline Dumbbell Flyes", sets: "3 Sets • 12 Reps", weight: "24 kg", done: true },
              { exercise: "Weighted Dips", sets: "3 Sets • 10 Reps", weight: "+15 kg", done: false },
              { exercise: "Tricep Rope Pushdowns", sets: "4 Sets • 15 Reps", weight: "32 kg", done: false },
            ].map((ex, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-sm">
                <div>
                  <h4 className="font-bold text-white">{ex.exercise}</h4>
                  <span className="text-xs text-gray-400">{ex.sets}</span>
                </div>
                <Badge variant={ex.done ? 'emerald' : 'glass'}>{ex.weight}</Badge>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-base font-bold text-white tracking-tight mb-4">Daily Calorie Target</h3>
          <ProgressRing progress={82} size={150} strokeWidth={12} />
          <p className="text-xs text-gray-400 mt-4">2,150 / 2,600 kcal Consumed (165g Protein)</p>
        </GlassCard>
      </div>
    </div>
  );
};
