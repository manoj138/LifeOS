import React, { useState, useEffect } from 'react';
import { Dumbbell, Flame, Heart, Zap, Plus, Target, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { ProgressRing } from '../components/ui/ProgressRing';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

export const FitnessPage = () => {
  const { preferences } = useUser();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchLogs = async () => {
      setLoading(true);
      const res = await apiService.getFitnessLogs();
      if (isMounted) {
        if (res?.success && Array.isArray(res.data)) {
          setLogs(res.data);
        } else {
          setLogs([]);
        }
        setLoading(false);
      }
    };
    fetchLogs();
    return () => { isMounted = false; };
  }, []);

  const totalCalories = logs.reduce((sum, item) => sum + (item.caloriesBurned || 0), 0);
  const totalWater = logs.reduce((sum, item) => sum + (item.waterIntakeLiters || 0), 0);
  const avgRecovery = logs.length > 0
    ? Math.round(logs.reduce((sum, item) => sum + (item.recoveryScore || 0), 0) / logs.length)
    : 0;

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge={`Fitness Objective: ${preferences?.fitnessGoal || 'Build Muscle'}`}
        title="Fitness & Recovery Tracker"
        subtitle={`Routine Tailored for ${preferences?.workoutType || 'Gym Weightlifting'} • Track daily macro calories, hydration, and sleep recovery scores.`}
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
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">{totalCalories} kcal</div>
            <span className="text-xs text-emerald-400 font-medium">Daily Log Target</span>
          </div>
          <Flame className="w-8 h-8 text-rose-500" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Water Intake</span>
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">{totalWater.toFixed(1)} / 3.5 L</div>
            <span className="text-xs text-cyan-400 font-medium">{Math.min(100, Math.round((totalWater / 3.5) * 100))}% Reached</span>
          </div>
          <Zap className="w-8 h-8 text-cyan-400" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Recovery Score</span>
            <div className="text-2xl font-extrabold text-emerald-400 tracking-tight mt-1">{avgRecovery} / 100</div>
            <span className="text-xs text-gray-400">Sleep & Hydration Metric</span>
          </div>
          <Heart className="w-8 h-8 text-emerald-400" />
        </GlassCard>

        <GlassCard className="p-6 flex items-center justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Weekly Workouts</span>
            <div className="text-2xl font-extrabold text-white tracking-tight mt-1">{logs.length} Sessions</div>
            <span className="text-xs text-purple-400 font-medium">{preferences?.workoutType || 'Weightlifting'}</span>
          </div>
          <Dumbbell className="w-8 h-8 text-purple-400" />
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <GlassCard className="p-6 space-y-4 lg:col-span-2">
          <h3 className="text-lg font-bold text-white tracking-tight">Today's Workout Routine & Fitness Logs</h3>
          {logs.length === 0 ? (
            <div className="p-8 text-center border border-white/10 rounded-xl bg-white/5 space-y-2">
              <Dumbbell className="w-8 h-8 text-purple-400 mx-auto" />
              <p className="text-sm font-bold text-white">No Workouts Logged Today</p>
              <p className="text-xs text-gray-400">Click "Log Workout Session" above to add your exercise sets and macros.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {logs.map((log, idx) => (
                <div key={log.id || idx} className="p-4 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-sm">
                  <div>
                    <h4 className="font-bold text-white">{log.workoutName || 'Strength Training Session'}</h4>
                    <span className="text-xs text-gray-400">{log.notes || 'Workout Session Logged'}</span>
                  </div>
                  <Badge variant="emerald">{log.caloriesBurned || 0} kcal</Badge>
                </div>
              ))}
            </div>
          )}
        </GlassCard>

        <GlassCard className="p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-base font-bold text-white tracking-tight mb-4">Daily Calorie Target</h3>
          <ProgressRing progress={totalCalories > 0 ? Math.min(100, Math.round((totalCalories / 2500) * 100)) : 0} size={150} strokeWidth={12} />
          <p className="text-xs text-gray-400 mt-4">{totalCalories} / 2,500 kcal Burned Today</p>
        </GlassCard>
      </div>
    </div>
  );
};

