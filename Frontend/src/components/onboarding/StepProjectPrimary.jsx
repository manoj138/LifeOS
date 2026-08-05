import React from 'react';
import { Code2, Sparkles, Layers, Link as LinkIcon, FileText } from 'lucide-react';
import { Input } from '../ui/Input';

export const StepProjectPrimary = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 5 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Primary Showcase Portfolio Project</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Describe your flagship project. AI will generate deep system design & architecture questions based on this!
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <Input
          label="Primary Project Title"
          placeholder="e.g. E-Commerce Platform with Stripe & Coupon Engine"
          value={formData.project1Name || ''}
          onChange={(e) => updateFormData({ project1Name: e.target.value })}
          leftIcon={<Code2 className="w-4 h-4 text-purple-400" />}
          required
        />

        <Input
          label="Project Tagline / Hook"
          placeholder="e.g. Scalable Full-Stack E-Commerce Engine handling real-time payments"
          value={formData.project1Tagline || ''}
          onChange={(e) => updateFormData({ project1Tagline: e.target.value })}
          leftIcon={<Sparkles className="w-4 h-4 text-amber-400" />}
        />

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-gray-300 flex items-center gap-2">
            <FileText className="w-4 h-4 text-indigo-400" />
            Detailed Project Description & Key Features
          </label>
          <textarea
            rows={3}
            placeholder="Describe what the project does, key technical architecture, databases, APIs, and challenges solved..."
            value={formData.project1Desc || ''}
            onChange={(e) => updateFormData({ project1Desc: e.target.value })}
            className="w-full bg-slate-900/90 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/40 transition-all duration-300 placeholder:text-gray-500"
          />
        </div>

        <Input
          label="Tech Stack (Frontend, Backend, Database, Cloud)"
          placeholder="e.g. React.js, Node.js, Express, MongoDB, Redis, Docker"
          value={formData.project1TechStack || ''}
          onChange={(e) => updateFormData({ project1TechStack: e.target.value })}
          leftIcon={<Layers className="w-4 h-4 text-cyan-400" />}
          required
        />

        <Input
          label="GitHub / Live Demo URL (Optional)"
          placeholder="e.g. https://github.com/username/project-repo"
          value={formData.project1Link || ''}
          onChange={(e) => updateFormData({ project1Link: e.target.value })}
          leftIcon={<LinkIcon className="w-4 h-4 text-emerald-400" />}
        />
      </div>
    </div>
  );
};
