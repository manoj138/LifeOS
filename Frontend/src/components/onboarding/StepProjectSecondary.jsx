import React from 'react';
import { Code, Sparkles, Code2, Layers, Link as LinkIcon, FileText, Plus, Trash2 } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

export const StepProjectSecondary = ({ formData, updateFormData }) => {
  // Ensure secondaryProjects array is initialized
  const secondaryProjects = Array.isArray(formData.secondaryProjects) && formData.secondaryProjects.length > 0
    ? formData.secondaryProjects
    : [
        {
          id: 'proj_2',
          title: formData.project2Name || 'LifeOS AI Teleprompter & Learning Studio',
          tagline: formData.project2Tagline || 'AI Speech Coach & Autonomous Teleprompter',
          desc: formData.project2Desc || 'AI-assisted speech coach, voice command interpreter & autonomous learning dashboard.',
          techStack: formData.project2TechStack || 'React, Web Speech API, Express, SQLite',
          link: formData.project2Link || 'https://github.com/user/lifeos-ai'
        }
      ];

  const handleUpdateProject = (index, field, value) => {
    const updated = [...secondaryProjects];
    updated[index] = { ...updated[index], [field]: value };
    
    // Sync with formData
    const syncData = { secondaryProjects: updated };
    if (index === 0) {
      if (field === 'title') syncData.project2Name = value;
      if (field === 'desc') syncData.project2Desc = value;
      if (field === 'techStack') syncData.project2TechStack = value;
      if (field === 'link') syncData.project2Link = value;
      if (field === 'tagline') syncData.project2Tagline = value;
    }
    updateFormData(syncData);
  };

  const handleAddProject = () => {
    const newProjNum = secondaryProjects.length + 2;
    const newProj = {
      id: `proj_${Date.now()}`,
      title: `Portfolio Project #${newProjNum}`,
      tagline: 'Scalable Full-Stack Application',
      desc: 'Technical architecture, core APIs, and challenges solved.',
      techStack: 'React, Node.js, Express, PostgreSQL',
      link: 'https://github.com/user/project-repo'
    };
    const updated = [...secondaryProjects, newProj];
    updateFormData({ secondaryProjects: updated });
  };

  const handleRemoveProject = (index) => {
    if (secondaryProjects.length <= 1) return;
    const updated = secondaryProjects.filter((_, i) => i !== index);
    const syncData = { secondaryProjects: updated };
    if (updated[0]) {
      syncData.project2Name = updated[0].title;
      syncData.project2Desc = updated[0].desc;
      syncData.project2TechStack = updated[0].techStack;
      syncData.project2Link = updated[0].link;
      syncData.project2Tagline = updated[0].tagline;
    }
    updateFormData(syncData);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> Step 6 of 10
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Secondary Portfolio Applications</h2>
        <p className="text-xs sm:text-sm text-gray-400 max-w-md mx-auto leading-relaxed">
          Add secondary projects to showcase your engineering breadth. You can add multiple projects!
        </p>
      </div>

      <div className="space-y-5 max-w-xl mx-auto">
        {secondaryProjects.map((proj, idx) => (
          <div
            key={proj.id || idx}
            className="p-5 rounded-3xl bg-slate-900/90 border border-cyan-500/30 space-y-4 backdrop-blur-2xl shadow-xl relative transition-all duration-300 hover:border-cyan-500/50"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h4 className="text-xs font-extrabold text-cyan-300 uppercase tracking-widest flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                Secondary Portfolio Project #{idx + 2}
              </h4>

              {secondaryProjects.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProject(idx)}
                  className="p-1.5 rounded-xl bg-white/5 hover:bg-rose-500/20 text-gray-400 hover:text-rose-400 border border-white/10 transition-colors"
                  title="Remove Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <Input
              label="Project Title"
              placeholder="e.g. LifeOS AI Teleprompter & Personal Learning Studio"
              value={proj.title || ''}
              onChange={(e) => handleUpdateProject(idx, 'title', e.target.value)}
              leftIcon={<Code2 className="w-4 h-4 text-cyan-400" />}
            />

            <Input
              label="Project Tagline / Hook"
              placeholder="e.g. AI Speech Coach & Autonomous Teleprompter"
              value={proj.tagline || ''}
              onChange={(e) => handleUpdateProject(idx, 'tagline', e.target.value)}
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
                value={proj.desc || ''}
                onChange={(e) => handleUpdateProject(idx, 'desc', e.target.value)}
                className="w-full bg-slate-950 border border-white/15 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300 placeholder:text-gray-500"
              />
            </div>

            <Input
              label="Tech Stack (Frontend, Backend, Database, Cloud)"
              placeholder="e.g. React, Web Speech API, Express, SQLite, Docker"
              value={proj.techStack || ''}
              onChange={(e) => handleUpdateProject(idx, 'techStack', e.target.value)}
              leftIcon={<Layers className="w-4 h-4 text-purple-400" />}
            />

            <Input
              label="GitHub / Live Demo URL (Optional)"
              placeholder="e.g. https://github.com/username/project-repo"
              value={proj.link || ''}
              onChange={(e) => handleUpdateProject(idx, 'link', e.target.value)}
              leftIcon={<LinkIcon className="w-4 h-4 text-emerald-400" />}
            />
          </div>
        ))}

        <div className="flex justify-center pt-2">
          <Button
            type="button"
            variant="glass"
            onClick={handleAddProject}
            leftIcon={<Plus className="w-4 h-4 text-cyan-400" />}
            className="w-full sm:w-auto"
          >
            + Add Another Secondary Project
          </Button>
        </div>
      </div>
    </div>
  );
};
