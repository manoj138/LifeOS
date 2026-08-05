import React from 'react';
import { Target, Code2, Server, Layout, Database, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

const TARGET_ROLES = [
  {
    id: 'Full-Stack Web Developer',
    title: 'Full-Stack Web Developer',
    desc: 'Master React, Node.js, System Architecture & Full-Stack Projects.',
    icon: Code2,
    color: 'from-purple-500 to-indigo-600',
  },
  {
    id: 'DevOps & Cloud Engineer',
    title: 'DevOps & Cloud Engineer',
    desc: 'Master Docker, Kubernetes, CI/CD Pipelines & AWS Infrastructure.',
    icon: Server,
    color: 'from-blue-500 to-cyan-600',
  },
  {
    id: 'Frontend Architect',
    title: 'Frontend Architect',
    desc: 'Master UI/UX Systems, Advanced Web Performance & Modern Frameworks.',
    icon: Layout,
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'Backend & Data Engineer',
    title: 'Backend & Data Engineer',
    desc: 'Master Scalable Microservices, High-Performance Databases & Distributed Systems.',
    icon: Database,
    color: 'from-amber-500 to-orange-600',
  },
];

const COMPANY_TIERS = [
  'High-Growth Product Startups (Series A-C)',
  'FAANG / Big Tech Multinationals',
  'Mid-Sized Software Product Companies',
  'IT Consulting & Enterprise Services',
];

export const StepTargetSpecialization = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 7 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Target Role & Dream Companies</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Choose your primary target engineering role and company tier to align your learning path.
        </p>
      </div>

      <div className="space-y-6 max-w-xl mx-auto">
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            Primary Target Role Specialization
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TARGET_ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = (formData.targetRole || 'Full-Stack Web Developer') === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => updateFormData({ targetRole: role.id })}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-950/70 to-slate-900 border-purple-500 shadow-xl shadow-purple-950/50 ring-2 ring-purple-500/60'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/25 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2.5 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-md flex-shrink-0`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1 pr-4">
                      <h4 className="text-xs sm:text-sm font-bold text-white flex items-center justify-between">
                        <span>{role.title}</span>
                      </h4>
                      <p className="text-[11px] text-gray-400 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="absolute top-3 right-3">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 animate-pop-check" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-cyan-400" />
            Target Company Tier & Culture
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {COMPANY_TIERS.map((tier) => {
              const isSelected = (formData.targetCompanyTier || 'High-Growth Product Startups (Series A-C)') === tier;
              return (
                <button
                  type="button"
                  key={tier}
                  onClick={() => updateFormData({ targetCompanyTier: tier })}
                  className={`p-3.5 rounded-xl text-left border text-xs font-medium transition-all duration-300 flex items-center justify-between hover:scale-[1.02] active:scale-95 ${
                    isSelected
                      ? 'bg-cyan-950/60 border-cyan-500 text-white ring-1 ring-cyan-500 shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200 hover:bg-white/10'
                  }`}
                >
                  <span className="line-clamp-1">{tier}</span>
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-cyan-400 animate-pop-check flex-shrink-0" />}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
