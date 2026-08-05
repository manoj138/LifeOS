import React from 'react';
import { GraduationCap, Building2, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';
import { Input } from '../ui/Input';

const DEGREES = [
  'B.E. / B.Tech Computer Science',
  'B.E. / B.Tech IT / AI & DS',
  'MCA / Master of Computer Applications',
  'BCA / B.Sc Computer Science',
  'Diploma in Computer Engineering',
  'Other / Self-Taught Developer',
];

export const StepAcademicCredentials = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 2 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Academic & College Background</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Specify your degree discipline and institution to build your interview candidate profile.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            Highest Degree & Discipline
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {DEGREES.map((deg) => {
              const isSelected = (formData.degree || 'B.E. / B.Tech Computer Science') === deg;
              return (
                <button
                  type="button"
                  key={deg}
                  onClick={() => updateFormData({ degree: deg })}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all duration-300 flex items-center justify-between group hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-purple-950/60 border-purple-500 text-white ring-1 ring-purple-500/70 shadow-lg shadow-purple-950/40'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <span className="line-clamp-1">{deg}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 animate-pop-check" />}
                </button>
              );
            })}
          </div>
        </div>

        <Input
          label="College / University Name"
          placeholder="e.g. COEP Technological University / Pune University"
          value={formData.collegeName || ''}
          onChange={(e) => updateFormData({ collegeName: e.target.value })}
          leftIcon={<Building2 className="w-4 h-4 text-cyan-400" />}
          required
        />

        <Input
          label="College Campus City"
          placeholder="e.g. Pune, Mumbai, Bangalore"
          value={formData.collegeCity || ''}
          onChange={(e) => updateFormData({ collegeCity: e.target.value })}
          leftIcon={<MapPin className="w-4 h-4 text-emerald-400" />}
        />
      </div>
    </div>
  );
};
