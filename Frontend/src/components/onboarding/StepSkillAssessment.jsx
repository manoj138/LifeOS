import React from 'react';
import { Sparkles, Code2, Server, MessageSquare, AlertTriangle, CheckCircle2 } from 'lucide-react';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced'];

const DSA_WEAK_OPTIONS = ['Dynamic Programming', 'Graphs & BFS/DFS', 'Trees & Binary Search', 'Arrays & Two Pointers', 'Recursion & Backtracking'];
const DEVOPS_WEAK_OPTIONS = ['Docker Containers', 'CI/CD Pipelines (GitHub Actions)', 'Kubernetes Clusters', 'AWS EC2 & S3 Deployment', 'Nginx & Load Balancing'];

export const StepSkillAssessment = ({ formData, updateFormData }) => {
  const skillLevels = formData.skillLevels || { dsa: 'Intermediate', devops: 'Beginner', english: 'Intermediate' };
  const weakDsa = formData.weakDsaTopics || ['Dynamic Programming', 'Graphs & BFS/DFS'];
  const weakDevops = formData.weakDevopsTopics || ['Kubernetes Clusters', 'CI/CD Pipelines (GitHub Actions)'];

  const setSkill = (key, val) => {
    updateFormData({ skillLevels: { ...skillLevels, [key]: val } });
  };

  const toggleWeakTopic = (key, topic) => {
    const current = key === 'dsa' ? weakDsa : weakDevops;
    const updated = current.includes(topic)
      ? current.filter((t) => t !== topic)
      : [...current, topic];
    
    if (key === 'dsa') updateFormData({ weakDsaTopics: updated });
    else updateFormData({ weakDevopsTopics: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" /> Step 8 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Technical Skills & Weak Topics</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Calibrate topic difficulty and specify areas where you need the most AI guidance.
        </p>
      </div>

      <div className="space-y-5 max-w-xl mx-auto">
        {/* Skill Rating Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* DSA */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-indigo-500/30 space-y-2.5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-300">
              <Code2 className="w-4 h-4 text-indigo-400" />
              <span>DSA Level</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('dsa', lvl)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    skillLevels.dsa === lvl
                      ? 'bg-indigo-600/40 border-indigo-500 text-white font-bold ring-1 ring-indigo-400 shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* DevOps */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2.5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300">
              <Server className="w-4 h-4 text-cyan-400" />
              <span>DevOps Level</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('devops', lvl)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    skillLevels.devops === lvl
                      ? 'bg-cyan-600/40 border-cyan-500 text-white font-bold ring-1 ring-cyan-400 shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* English */}
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2.5 backdrop-blur-xl shadow-lg">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
              <MessageSquare className="w-4 h-4 text-amber-400" />
              <span>English Level</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {SKILL_LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setSkill('english', lvl)}
                  className={`py-2 px-2.5 rounded-xl text-[11px] font-medium border text-center transition-all duration-300 hover:scale-[1.02] active:scale-95 ${
                    skillLevels.english === lvl
                      ? 'bg-amber-600/40 border-amber-500 text-white font-bold ring-1 ring-amber-400 shadow-md'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Weak Topics Tag Selector */}
        <div className="p-4.5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 backdrop-blur-xl shadow-xl">
          <div className="flex items-center gap-2 text-xs font-bold text-rose-400">
            <AlertTriangle className="w-4 h-4 animate-bounce" />
            <span>Select Weak Topics (AI will generate targeted drills)</span>
          </div>

          <div className="space-y-2">
            <div className="text-[11px] font-semibold text-gray-300">Weak DSA Topics:</div>
            <div className="flex flex-wrap gap-2">
              {DSA_WEAK_OPTIONS.map((topic) => {
                const isSelected = weakDsa.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleWeakTopic('dsa', topic)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-indigo-950/80 border-indigo-500 text-indigo-200 font-semibold ring-1 ring-indigo-500 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span>{topic}</span>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-indigo-400 animate-pop-check" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="text-[11px] font-semibold text-gray-300">Weak DevOps Topics:</div>
            <div className="flex flex-wrap gap-2">
              {DEVOPS_WEAK_OPTIONS.map((topic) => {
                const isSelected = weakDevops.includes(topic);
                return (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => toggleWeakTopic('devops', topic)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-medium border transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-cyan-950/80 border-cyan-500 text-cyan-200 font-semibold ring-1 ring-cyan-500 shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    <span>{topic}</span>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-cyan-400 animate-pop-check" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
