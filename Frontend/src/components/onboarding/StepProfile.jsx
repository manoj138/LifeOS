import React from 'react';
import { User, Target, Briefcase, Sparkles, Code2, Server, Layout, Database } from 'lucide-react';
import { Input } from '../ui/Input';

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

const CAREER_LEVELS = [
  'Student / Beginner (0 Experience)',
  'Fresher / Job Seeker',
  'Intermediate (1-3 yrs experience)',
  'Senior Specialist (4+ yrs experience)',
];

export const StepProfile = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 1 of 5
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Your Profile & Target Role</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Tell us about yourself so LifeOS can curate your personal roadmap and dashboard widgets.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <Input
          label="Your Full Name"
          placeholder="e.g. Manoj Kumar"
          value={formData.name || ''}
          onChange={(e) => updateFormData({ name: e.target.value })}
          leftIcon={<User className="w-4 h-4 text-purple-400" />}
          required
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-medium text-gray-300">Current Career Level</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {CAREER_LEVELS.map((level) => {
              const isSelected = formData.careerLevel === level;
              return (
                <button
                  type="button"
                  key={level}
                  onClick={() => updateFormData({ careerLevel: level })}
                  className={`p-3 rounded-xl text-left border text-xs font-medium transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-purple-600/20 border-purple-500 text-white shadow-lg shadow-purple-500/10 ring-1 ring-purple-500'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200'
                  }`}
                >
                  <span>{level}</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-purple-400"></span>}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Education Degree & Background"
            placeholder="e.g. B.E. Computer Science / MCA"
            value={formData.education || ''}
            onChange={(e) => updateFormData({ education: e.target.value })}
            leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          />
          <Input
            label="Current Location"
            placeholder="e.g. Pune, India"
            value={formData.location || ''}
            onChange={(e) => updateFormData({ location: e.target.value })}
            leftIcon={<Target className="w-4 h-4 text-amber-400" />}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Key Portfolio Project #1"
            placeholder="e.g. E-Commerce Platform with Stripe & Coupon Engine"
            value={formData.project1 || ''}
            onChange={(e) => updateFormData({ project1: e.target.value })}
            leftIcon={<Briefcase className="w-4 h-4 text-purple-400" />}
          />
          <Input
            label="Key Portfolio Project #2"
            placeholder="e.g. LifeOS AI Teleprompter & Learning Studio"
            value={formData.project2 || ''}
            onChange={(e) => updateFormData({ project2: e.target.value })}
            leftIcon={<Code2 className="w-4 h-4 text-emerald-400" />}
          />
        </div>

        <div className="space-y-2 pt-2">
          <label className="block text-xs font-medium text-gray-300 flex items-center gap-2">
            <Target className="w-4 h-4 text-purple-400" />
            Select Your Primary Target Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TARGET_ROLES.map((role) => {
              const Icon = role.icon;
              const isSelected = formData.targetRole === role.id;
              return (
                <div
                  key={role.id}
                  onClick={() => updateFormData({ targetRole: role.id })}
                  className={`relative p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-gradient-to-br from-purple-900/40 to-slate-900 border-purple-500/80 shadow-xl shadow-purple-950/40 ring-1 ring-purple-500'
                      : 'bg-slate-900/60 border-white/10 hover:border-white/25 hover:bg-slate-900/90'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2.5 rounded-xl bg-gradient-to-br ${role.color} text-white shadow-md`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-sm font-bold text-white">{role.title}</h4>
                      <p className="text-xs text-gray-400 leading-relaxed">{role.desc}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
