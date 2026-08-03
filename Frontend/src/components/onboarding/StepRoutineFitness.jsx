import React from 'react';
import { Dumbbell, Flame, Heart, Sparkles, Moon, Sun, ShieldCheck } from 'lucide-react';

const FITNESS_GOALS = [
  { id: 'Build Muscle & Increase Energy', label: 'Build Muscle & Increase Energy', desc: 'Focus on progressive overload strength.' },
  { id: 'Fat Loss & Endurance', label: 'Fat Loss & Stamina', desc: 'Focus on cardio, HIIT & caloric deficit.' },
  { id: 'Flexibility & Mental Clarity', label: 'Mobility & Mental Clarity', desc: 'Focus on yoga, posture correction & breathing.' },
];

const WORKOUT_TYPES = [
  'Gym Weightlifting & Strength',
  'Home Bodyweight Calisthenics',
  'Outdoor Running & HIIT Cardio',
  'Light Daily Stretching & Walks',
];

export const StepRoutineFitness = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 4 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Fitness & Daily Energy Routine</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          High cognitive performance requires peak physical energy. Let's customize your fitness routine.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        {/* Fitness Goal */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 flex items-center gap-2">
            <Flame className="w-4 h-4 text-rose-400" />
            Primary Fitness Objective
          </label>
          <div className="space-y-2">
            {FITNESS_GOALS.map((goal) => {
              const isSelected = formData.fitnessGoal === goal.id;
              return (
                <div
                  key={goal.id}
                  onClick={() => updateFormData({ fitnessGoal: goal.id })}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-rose-950/40 border-rose-500 text-white ring-1 ring-rose-500'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div>
                    <h4 className="text-sm font-bold text-white">{goal.label}</h4>
                    <p className="text-xs text-gray-400">{goal.desc}</p>
                  </div>
                  {isSelected && <ShieldCheck className="w-5 h-5 text-rose-400" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Workout Style */}
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300 flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-purple-400" />
            Preferred Workout Style
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {WORKOUT_TYPES.map((type) => {
              const isSelected = formData.workoutType === type;
              return (
                <button
                  type="button"
                  key={type}
                  onClick={() => updateFormData({ workoutType: type })}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-purple-900/40 border-purple-500 text-white font-bold ring-1 ring-purple-500'
                      : 'bg-slate-900/60 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {type}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
