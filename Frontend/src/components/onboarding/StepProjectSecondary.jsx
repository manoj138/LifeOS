import React from 'react';
import { Code, Sparkles, Github, Linkedin, Terminal } from 'lucide-react';
import { Input } from '../ui/Input';

export const StepProjectSecondary = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 6 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Secondary Project & Coding Handles</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Add your secondary project and professional coding profiles to complete your developer resume.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-3 backdrop-blur-xl shadow-lg">
          <h4 className="text-[11px] font-bold text-cyan-300 uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            Secondary Portfolio Project
          </h4>
          
          <Input
            label="Project 2 Title"
            placeholder="e.g. LifeOS AI Teleprompter & Personal Learning Studio"
            value={formData.project2Name || ''}
            onChange={(e) => updateFormData({ project2Name: e.target.value })}
            leftIcon={<Code className="w-4 h-4 text-cyan-400" />}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-300">Project 2 Description & Tech Stack</label>
            <textarea
              rows={2}
              placeholder="Brief description and technologies used (e.g. React, Web Speech API, Tailwind, Express)..."
              value={formData.project2Desc || ''}
              onChange={(e) => updateFormData({ project2Desc: e.target.value, project2TechStack: e.target.value })}
              className="w-full bg-slate-950 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300 placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 space-y-3 backdrop-blur-xl shadow-lg">
          <h4 className="text-[11px] font-bold text-purple-300 uppercase tracking-widest">Developer & Coding Handles (Optional)</h4>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Input
              label="LeetCode Username"
              placeholder="e.g. manoj_123"
              value={formData.leetcodeHandle || ''}
              onChange={(e) => updateFormData({ leetcodeHandle: e.target.value })}
              leftIcon={<Terminal className="w-4 h-4 text-amber-400" />}
            />
            <Input
              label="GitHub Handle"
              placeholder="e.g. manojdev"
              value={formData.githubHandle || ''}
              onChange={(e) => updateFormData({ githubHandle: e.target.value })}
              leftIcon={<Github className="w-4 h-4 text-purple-400" />}
            />
            <Input
              label="LinkedIn URL"
              placeholder="e.g. linkedin.com/in/manoj"
              value={formData.linkedinUrl || ''}
              onChange={(e) => updateFormData({ linkedinUrl: e.target.value })}
              leftIcon={<Linkedin className="w-4 h-4 text-blue-400" />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
