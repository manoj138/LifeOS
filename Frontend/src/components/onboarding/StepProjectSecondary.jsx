import React from 'react';
import { Code, Sparkles, Layers, Github, Linkedin, Terminal } from 'lucide-react';
import { Input } from '../ui/Input';

export const StepProjectSecondary = ({ formData, updateFormData }) => {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-400 border border-purple-500/20">
          <Sparkles className="w-3.5 h-3.5" /> Step 6 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Secondary Project & Coding Handles</h2>
        <p className="text-sm text-gray-400 max-w-md mx-auto">
          Add your secondary project and professional coding profiles to complete your developer resume.
        </p>
      </div>

      <div className="space-y-4 max-w-xl mx-auto">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 space-y-3">
          <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Secondary Portfolio Project</h4>
          
          <Input
            label="Project 2 Title"
            placeholder="e.g. LifeOS AI Teleprompter & Personal Learning Studio"
            value={formData.project2Name || ''}
            onChange={(e) => updateFormData({ project2Name: e.target.value })}
            leftIcon={<Code className="w-4 h-4 text-cyan-400" />}
          />

          <div className="space-y-1.5">
            <label className="block text-xs font-medium text-gray-300">Project 2 Description & Tech Stack</label>
            <textarea
              rows={2}
              placeholder="Brief description and technologies used (e.g. React, Web Speech API, Tailwind, Express)..."
              value={formData.project2Desc || ''}
              onChange={(e) => updateFormData({ project2Desc: e.target.value, project2TechStack: e.target.value })}
              className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 placeholder:text-gray-500"
            />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 space-y-3">
          <h4 className="text-xs font-bold text-purple-300 uppercase tracking-wider">Developer & Coding Handles (Optional)</h4>
          
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
