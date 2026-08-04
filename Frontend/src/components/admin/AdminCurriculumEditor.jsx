import React, { useState, useEffect } from 'react';
import { BookOpen, Edit3, Save, Sparkles, Check, Code2, Layers, Server, Binary, Terminal, CheckCircle2, RefreshCw, AlertCircle, Trash2, ListOrdered, CheckSquare, PlusCircle } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { apiService } from '../../services/api';

const ICON_MAP = {
  Code2,
  Layers,
  Terminal,
  Server,
  Binary,
  BookOpen,
  Sparkles,
};

export const AdminCurriculumEditor = () => {
  const [editorMode, setEditorMode] = useState('bulk_ai'); // 'editor' | 'bulk_ai'
  const [selectedModule, setSelectedModule] = useState('js');
  const [modulesList, setModulesList] = useState([]);
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);
  const [isLoadingTopics, setIsLoadingTopics] = useState(false);

  // Add Module Modal State
  const [isAddingModule, setIsAddingModule] = useState(false);
  const [newModuleTitle, setNewModuleTitle] = useState('');
  const [newModuleId, setNewModuleId] = useState('');

  // Bulk Generator State
  const [bulkInput, setBulkInput] = useState(
    '1. Variables, Scope & Temporal Dead Zone (TDZ)\n2. Closures, Lexical Scope & Private Variables\n3. Promises, Async/Await & Event Loop Architecture'
  );
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [bulkStatusMessage, setBulkStatusMessage] = useState('');
  const [generationProgress, setGenerationProgress] = useState({ current: 0, total: 0, percent: 0 });

  const fetchModules = async () => {
    const res = await apiService.getRoadmapModules();
    if (res?.success && Array.isArray(res.data)) {
      setModulesList(res.data);
      if (res.data.length > 0 && !res.data.find(m => m.id === selectedModule)) {
        setSelectedModule(res.data[0].id);
      }
    } else {
      setModulesList([]);
    }
  };

  const handleCreateModule = async (e) => {
    e.preventDefault();
    if (!newModuleTitle.trim()) return;
    const res = await apiService.createRoadmapModule({
      id: newModuleId.trim() || undefined,
      title: newModuleTitle.trim(),
      order: modulesList.length + 1,
    });
    if (res?.success) {
      setNewModuleTitle('');
      setNewModuleId('');
      setIsAddingModule(false);
      await fetchModules();
      if (res.data?.id) setSelectedModule(res.data.id);
    }
  };

  const handleDeleteModule = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete module "${title}" and all its topics?`)) {
      await apiService.deleteRoadmapModule(id);
      await fetchModules();
      if (selectedModule === id) setSelectedModule('js');
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  const [formData, setFormData] = useState({
    title: '',
    level: 'Beginner',
    conceptExplanation: '',
    codeSnippet: '',
    projectApplication: '',
    taskTitle: '',
    taskDescription: '',
    starterCode: '',
    solutionCriteria: '',
  });

  const handleSelectTopic = (topic) => {
    if (!topic) return;
    setSelectedTopicId(topic.id);
    setFormData({
      title: topic.title || '',
      level: topic.level || 'Beginner',
      conceptExplanation: topic.conceptExplanation || '',
      codeSnippet: topic.codeSnippet || '',
      projectApplication: topic.projectApplication || '',
      taskTitle: topic.taskTitle || '',
      taskDescription: topic.taskDescription || '',
      starterCode: topic.starterCode || '',
      solutionCriteria: topic.solutionCriteria || '',
    });
  };

  const fetchTopics = async () => {
    setIsLoadingTopics(true);
    const res = await apiService.getCurriculumTopics(selectedModule);
    setIsLoadingTopics(false);
    if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
      setTopics(res.data);
      const match = res.data.find(t => t.id === selectedTopicId) || res.data[0];
      setSelectedTopicId(match.id);
      handleSelectTopic(match);
    } else {
      setTopics([]);
      setSelectedTopicId(null);
      setFormData({
        title: '',
        level: 'Beginner',
        conceptExplanation: '',
        codeSnippet: '',
        projectApplication: '',
        taskTitle: '',
        taskDescription: '',
        starterCode: '',
        solutionCriteria: '',
      });
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedModule]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!selectedTopicId) {
      if (!formData.title.trim()) {
        alert('Please enter a topic title before saving.');
        return;
      }
      const res = await apiService.generateSingleTopicWithAI({
        moduleId: selectedModule,
        topicName: formData.title.trim(),
        level: formData.level || 'Beginner',
      });
      if (res?.success) {
        setIsSaved(true);
        await fetchTopics();
        setTimeout(() => setIsSaved(false), 2500);
      } else {
        alert(res?.message || 'Error saving new topic');
      }
      return;
    }

    const res = await apiService.updateCurriculumTopic(selectedTopicId, formData);
    if (res?.success) {
      setIsSaved(true);
      await fetchTopics();
      setTimeout(() => setIsSaved(false), 2500);
    } else {
      alert(res?.message || 'Error updating topic');
    }
  };

  const handleDeleteTopic = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await apiService.deleteCurriculumTopic(id);
      await fetchTopics();
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkInput.trim()) return;

    const topicLines = bulkInput
      .split('\n')
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

    if (topicLines.length === 0) return;

    setIsAiGenerating(true);
    setGenerationProgress({ current: 0, total: topicLines.length, percent: 0 });

    const BATCH_SIZE = 10;
    const totalBatches = Math.ceil(topicLines.length / BATCH_SIZE);
    let successfullyGenerated = 0;

    for (let b = 0; b < totalBatches; b++) {
      const batchTopics = topicLines.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE);
      const batchNum = b + 1;

      setBulkStatusMessage(
        `⚡ Processing Batch ${batchNum} of ${totalBatches} (${successfullyGenerated}/${topicLines.length} topics ready)...`
      );

      const res = await apiService.bulkGenerateSequence({
        moduleId: selectedModule,
        level: targetLevel,
        topicTitles: batchTopics,
      });

      if (res?.success) {
        successfullyGenerated += res.data?.length || batchTopics.length;
        const currentPercent = Math.min(100, Math.round((successfullyGenerated / topicLines.length) * 100));
        setGenerationProgress({
          current: successfullyGenerated,
          total: topicLines.length,
          percent: currentPercent,
        });
        await fetchTopics();
      } else {
        console.warn(`Batch ${batchNum} failed to generate cleanly, continuing with next batch...`);
      }
    }

    setIsAiGenerating(false);

    if (successfullyGenerated > 0) {
      setBulkStatusMessage(
        `✅ Successfully generated & published ${successfullyGenerated} / ${topicLines.length} topics directly to database!`
      );
    } else {
      setBulkStatusMessage('⚠️ Error generating topics. Please check backend connection.');
    }
  };

  const filteredTopics = topics.filter((t) => t.moduleId === selectedModule);

  return (
    <div className="space-y-6">
      {/* Header & Mode Switches */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            Curriculum Content & AI Generator Console
          </h3>
          <p className="text-xs text-gray-400">
            Manage roadmap modules, bulk-generate sequence topics with AI, and assign chapter-wise practical tasks.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={editorMode === 'bulk_ai' ? 'glow' : 'glass'}
            size="sm"
            onClick={() => setEditorMode('bulk_ai')}
            leftIcon={<ListOrdered className="w-4 h-4 text-cyan-400" />}
          >
            ⚡ Sequence-Based Bulk AI Generator
          </Button>
          <Button
            variant={editorMode === 'editor' ? 'glow' : 'glass'}
            size="sm"
            onClick={() => setEditorMode('editor')}
            leftIcon={<Edit3 className="w-4 h-4 text-purple-400" />}
          >
            ✏️ Manual Topic Editor
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module Selector & Topic List Sidebar */}
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roadmap Module</label>
              <button
                type="button"
                onClick={() => setIsAddingModule(!isAddingModule)}
                className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-all"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>Add Module</span>
              </button>
            </div>

            {/* Add New Module Form Modal/Inline */}
            {isAddingModule && (
              <form onSubmit={handleCreateModule} className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/40 space-y-2 animate-fadeIn">
                <h5 className="text-xs font-bold text-purple-300">New Roadmap Module</h5>
                <input
                  type="text"
                  placeholder="Module Title (e.g. 6. Python & AI)"
                  value={newModuleTitle}
                  onChange={(e) => setNewModuleTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-white/15 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-purple-400"
                  required
                />
                <input
                  type="text"
                  placeholder="Module ID (optional, e.g. python)"
                  value={newModuleId}
                  onChange={(e) => setNewModuleId(e.target.value)}
                  className="w-full bg-slate-950 border border-white/10 rounded-lg p-2 text-xs text-gray-300 focus:outline-none focus:border-purple-400"
                />
                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setIsAddingModule(false)}
                    className="text-xs text-gray-400 hover:text-white px-2 py-1"
                  >
                    Cancel
                  </button>
                  <Button type="submit" variant="glow" size="sm" className="px-3 py-1 text-xs">
                    Save Module
                  </Button>
                </div>
              </form>
            )}

            <div className="space-y-1">
              {modulesList.length === 0 ? (
                <div className="p-3.5 rounded-xl border border-dashed border-purple-500/30 bg-purple-950/20 text-xs text-purple-300 text-center space-y-1">
                  <p className="font-semibold">No Roadmap Modules created yet.</p>
                  <p className="text-[10px] text-gray-400">Click <strong className="text-purple-300">+ Add Module</strong> above to start!</p>
                </div>
              ) : (
                modulesList.map((m) => {
                  const IconComponent = ICON_MAP[m.iconName] || Code2;
                  const isSelected = selectedModule === m.id;

                  return (
                    <div key={m.id} className="flex items-center gap-1 group">
                      <button
                        type="button"
                        onClick={() => setSelectedModule(m.id)}
                        className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all ${
                          isSelected
                            ? 'bg-purple-900/40 border-purple-500 text-white shadow-md'
                            : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate pr-1">
                          <IconComponent className="w-4 h-4 text-purple-400 shrink-0" />
                          <span className="truncate">{m.title}</span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteModule(m.id, m.title)}
                        className="p-2 rounded-xl text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all shrink-0"
                        title="Delete module"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Existing Topics ({filteredTopics.length})</label>
              <Badge variant="purple">{selectedModule.toUpperCase()}</Badge>
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {isLoadingTopics ? (
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 text-center flex items-center justify-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-purple-400" />
                  <span>Loading DB topics...</span>
                </div>
              ) : filteredTopics.length === 0 ? (
                <div className="p-3 rounded-xl border border-white/10 bg-white/5 text-xs text-gray-400 text-center">
                  No topics in database yet for this module.
                </div>
              ) : (
                filteredTopics.map((t, idx) => (
                  <div key={t.id} className="flex items-center gap-1 group">
                    <button
                      type="button"
                      onClick={() => {
                        setEditorMode('editor');
                        handleSelectTopic(t);
                      }}
                      className={`w-full p-2 rounded-xl text-left border text-xs transition-all flex items-center justify-between ${
                        selectedTopicId === t.id && editorMode === 'editor'
                          ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                          : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                      }`}
                    >
                      <span className="truncate">{idx + 1}. {t.title}</span>
                      {t.taskTitle && <CheckSquare className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTopic(t.id, t.title)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-rose-400 hover:bg-rose-500/10 opacity-0 group-hover:opacity-100 transition-all"
                      title="Delete topic"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Mode 1: Sequence-Based Bulk AI Generator */}
        {editorMode === 'bulk_ai' && (
          <div className="lg:col-span-3 space-y-6 animate-fadeIn">
            <GlassCard className="p-6 space-y-5 border-cyan-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-base font-bold text-white flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-cyan-400" />
                    Sequence-Based Bulk AI Curriculum Generator
                  </h4>
                  <p className="text-xs text-gray-400">
                    Paste chapter names in order. AI will generate deep theory, working code, and practical tasks for each topic!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400">Target Level:</span>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Paste Chapter Sequence List (One topic per line):
                </label>
                <textarea
                  rows={6}
                  value={bulkInput}
                  onChange={(e) => setBulkInput(e.target.value)}
                  placeholder="1. Variables & Scope&#10;2. Closures & Lexical Environment&#10;3. Promises & Async/Await"
                  className="w-full bg-slate-950 border border-cyan-500/30 rounded-xl p-3 text-xs font-mono text-cyan-200 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {bulkStatusMessage && (
                <div className="space-y-2">
                  <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-medium text-purple-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span>{bulkStatusMessage}</span>
                    </div>
                    {isAiGenerating && (
                      <span className="font-bold text-cyan-300">{generationProgress.percent}%</span>
                    )}
                  </div>
                  {isAiGenerating && (
                    <div className="w-full bg-slate-900 rounded-full h-2 overflow-hidden border border-white/10">
                      <div
                        className="bg-gradient-to-r from-cyan-500 to-purple-500 h-full transition-all duration-300 ease-out"
                        style={{ width: `${Math.max(5, generationProgress.percent)}%` }}
                      />
                    </div>
                  )}
                </div>
              )}

              <div className="flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-xs text-gray-400">
                  🔒 AI credit protection: Data saves directly to SQLite database for 1-time consumption.
                </span>

                <Button
                  variant="glow"
                  size="md"
                  onClick={handleBulkGenerate}
                  isLoading={isAiGenerating}
                  leftIcon={<Sparkles className="w-4 h-4 text-cyan-300" />}
                  className="bg-gradient-to-r from-cyan-600 to-purple-600 px-6 py-2.5"
                >
                  {isAiGenerating ? 'Generating Curriculum Sequence...' : 'Generate & Publish Sequence with AI'}
                </Button>
              </div>
            </GlassCard>
          </div>
        )}

        {/* Right Section: Mode 2: Manual Topic Editor */}
        {editorMode === 'editor' && (
          <div className="lg:col-span-3 space-y-6 animate-fadeIn">
            <form onSubmit={handleSave} className="space-y-5">
              <GlassCard className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="purple">Topic ID: {selectedTopicId}</Badge>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Difficulty Level:</span>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="bg-slate-900 border border-white/15 rounded-lg px-2.5 py-1 text-xs text-white"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <Input
                  label="Topic Title & Header"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Concept Theory Explanation (Markdown & Step-by-Step Breakdown)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.conceptExplanation}
                    onChange={(e) => setFormData({ ...formData, conceptExplanation: e.target.value })}
                    className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs font-mono text-gray-200 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-gray-300">
                    Executable Code Snippet Template
                  </label>
                  <textarea
                    rows={4}
                    value={formData.codeSnippet}
                    onChange={(e) => setFormData({ ...formData, codeSnippet: e.target.value })}
                    className="w-full bg-slate-950 border border-purple-500/30 rounded-xl p-3 text-xs font-mono text-cyan-300 focus:outline-none focus:border-purple-500"
                  />
                </div>

                <Input
                  label="Real-World Project Application Context"
                  value={formData.projectApplication}
                  onChange={(e) => setFormData({ ...formData, projectApplication: e.target.value })}
                />

                <div className="border-t border-white/10 pt-4 space-y-3">
                  <h5 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                    <CheckSquare className="w-4 h-4" /> Chapter Practical Task & Solution Rules
                  </h5>

                  <Input
                    label="Chapter Task Title"
                    value={formData.taskTitle}
                    onChange={(e) => setFormData({ ...formData, taskTitle: e.target.value })}
                  />

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300">
                      Task Description & Student Assignment Instructions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.taskDescription}
                      onChange={(e) => setFormData({ ...formData, taskDescription: e.target.value })}
                      className="w-full bg-slate-900 border border-white/15 rounded-xl p-3 text-xs text-gray-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-medium text-gray-300">
                      Starter Code Boilerplate for Task
                    </label>
                    <textarea
                      rows={3}
                      value={formData.starterCode}
                      onChange={(e) => setFormData({ ...formData, starterCode: e.target.value })}
                      className="w-full bg-slate-950 border border-emerald-500/30 rounded-xl p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-emerald-400"
                    />
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-white/10">
                  {isSaved ? (
                    <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                      <CheckCircle2 className="w-4 h-4" /> Topic & Task Updated in SQLite Database!
                    </span>
                  ) : (
                    <span className="text-xs text-gray-400">Syncs directly with database.sqlite</span>
                  )}

                  <Button
                    type="submit"
                    variant="primary"
                    leftIcon={<Save className="w-4 h-4" />}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-2.5"
                  >
                    Save Topic & Task Changes
                  </Button>
                </div>
              </GlassCard>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
