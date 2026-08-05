import React from 'react';
import { Briefcase, Building, Clock, Code, Sparkles, CheckCircle } from 'lucide-react';
import { Input } from '../ui/Input';

export const StepWorkExperience = ({ formData, updateFormData }) => {
  const hasExp = (formData.hasExperience || 'No') === 'Yes';

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 4 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Work & Internship History</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Share your professional background so AI can tailor interview questions to your industry experience.
        </p>
      </div>

      <div className="space-y-5 max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="block text-xs font-medium text-gray-300">Do you have prior Internship or Job Experience?</label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => updateFormData({ hasExperience: 'No', experienceType: 'Fresher' })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                !hasExp
                  ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-500 shadow-md'
                  : 'bg-slate-900/60 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">No (Fresher / Student)</span>
                {!hasExp && <CheckCircle className="w-4 h-4 text-purple-400" />}
              </div>
              <p className="text-xs text-gray-400 mt-1">Focusing on personal projects, DSA, and core fundamentals.</p>
            </button>

            <button
              type="button"
              onClick={() => updateFormData({ hasExperience: 'Yes', experienceType: 'Experienced' })}
              className={`p-4 rounded-2xl border text-left transition-all ${
                hasExp
                  ? 'bg-purple-900/40 border-purple-500 text-white ring-1 ring-purple-500 shadow-md'
                  : 'bg-slate-900/60 border-white/10 text-gray-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-white">Yes (Internship / Job)</span>
                {hasExp && <CheckCircle className="w-4 h-4 text-purple-400" />}
              </div>
              <p className="text-xs text-gray-400 mt-1">Worked at a startup, IT firm, or completed technical internships.</p>
            </button>
          </div>
        </div>

        {hasExp && (
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-purple-500/30 space-y-3 animate-fadeIn">
            <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Experience Breakdown</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Company / Firm Name"
                placeholder="e.g. Infosys, Tech Startup, Freelance"
                value={formData.companyName || ''}
                onChange={(e) => updateFormData({ companyName: e.target.value })}
                leftIcon={<Building className="w-4 h-4 text-purple-400" />}
              />
              <Input
                label="Designation / Role"
                placeholder="e.g. Full-Stack Developer Intern"
                value={formData.experienceRole || ''}
                onChange={(e) => updateFormData({ experienceRole: e.target.value })}
                leftIcon={<Briefcase className="w-4 h-4 text-indigo-400" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Input
                label="Duration (Months / Years)"
                placeholder="e.g. 6 Months / 1 Year"
                value={formData.experienceDuration || ''}
                onChange={(e) => updateFormData({ experienceDuration: e.target.value })}
                leftIcon={<Clock className="w-4 h-4 text-cyan-400" />}
              />
              <Input
                label="Primary Tech Stack Used"
                placeholder="e.g. React, Node.js, PostgreSQL"
                value={formData.companyTechStack || ''}
                onChange={(e) => updateFormData({ companyTechStack: e.target.value })}
                leftIcon={<Code className="w-4 h-4 text-emerald-400" />}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
