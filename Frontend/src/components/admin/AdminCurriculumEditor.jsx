import React, { useState, useEffect } from 'react';
import { BookOpen, Edit3, Save, Sparkles, Check, Code2, Layers, Server, Binary, Terminal, CheckCircle2, RefreshCw, AlertCircle, Trash2, ListOrdered, CheckSquare, PlusCircle } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { Input } from '../ui/Input';
import { apiService } from '../../services/api';

const MODULES = [
  { id: 'js', label: '1. JavaScript (ES6+)', icon: Code2 },
  { id: 'react', label: '2. React.js', icon: Layers },
  { id: 'node', label: '3. Node.js', icon: Terminal },
  { id: 'devops', label: '4. DevOps & Cloud VPS', icon: Server },
  { id: 'dsa', label: '5. DSA Master Studio', icon: Binary },
];

const DEFAULT_TOPIC = {
  id: 'js-0',
  moduleId: 'js',
  title: '1.1 Variables, Scope & Temporal Dead Zone (TDZ)',
  topicName: 'Variables & TDZ',
  level: 'Beginner',
  conceptExplanation: 'In JavaScript, var, let, and const handle scope differently. let and const exist in the Temporal Dead Zone (TDZ) before declaration.',
  codeSnippet: '// Temporal Dead Zone Example\nconsole.log(a); // ReferenceError: Cannot access "a" before initialization\nlet a = 10;',
  projectApplication: 'Used across all React component state declarations and immutability controls.',
  taskTitle: 'Chapter Task: Fix Temporal Dead Zone Bug',
  taskDescription: 'Refactor the given variable declarations to prevent TDZ reference errors.',
  starterCode: 'console.log(myVar);\nlet myVar = "Hello World";',
  solutionCriteria: 'Declare variable before console logging.',
};

export const AdminCurriculumEditor = () => {
  const [editorMode, setEditorMode] = useState('bulk_ai'); // 'editor' | 'bulk_ai'
  const [selectedModule, setSelectedModule] = useState('js');
  const [topics, setTopics] = useState([DEFAULT_TOPIC]);
  const [selectedTopicId, setSelectedTopicId] = useState('js-0');
  const [isSaved, setIsSaved] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  // Bulk Generator State
  const [bulkInput, setBulkInput] = useState(
    '1. Variables, Scope & Temporal Dead Zone (TDZ)\n2. Closures, Lexical Scope & Private Variables\n3. Promises, Async/Await & Event Loop Architecture'
  );
  const [targetLevel, setTargetLevel] = useState('Beginner');
  const [bulkStatusMessage, setBulkStatusMessage] = useState('');

  const fetchTopics = async () => {
    const res = await apiService.getCurriculumTopics(selectedModule);
    if (res?.success && res.data && res.data.length > 0) {
      setTopics(res.data);
      if (!res.data.find(t => t.id === selectedTopicId)) {
        setSelectedTopicId(res.data[0].id);
        handleSelectTopic(res.data[0]);
      }
    } else {
      setTopics([DEFAULT_TOPIC]);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedModule]);

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0] || DEFAULT_TOPIC;

  const [formData, setFormData] = useState({
    title: currentTopic.title,
    level: currentTopic.level,
    conceptExplanation: currentTopic.conceptExplanation,
    codeSnippet: currentTopic.codeSnippet,
    projectApplication: currentTopic.projectApplication,
    taskTitle: currentTopic.taskTitle || '',
    taskDescription: currentTopic.taskDescription || '',
    starterCode: currentTopic.starterCode || '',
    solutionCriteria: currentTopic.solutionCriteria || '',
  });

  const handleSelectTopic = (topic) => {
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

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaved(true);
    await apiService.updateCurriculumTopic(selectedTopicId, formData);
    await fetchTopics();
    setTimeout(() => setIsSaved(false), 2500);
  };

  const handleDeleteTopic = async (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await apiService.deleteCurriculumTopic(id);
      await fetchTopics();
    }
  };

  const handleBulkGenerate = async () => {
    if (!bulkInput.trim()) return;
    setIsAiGenerating(true);
    setBulkStatusMessage('Generating sequenced topics with deep theory, code examples & chapter tasks...');

    const topicLines = bulkInput
      .split('\n')
      .map((line) => line.replace(/^\d+[\.\)]\s*/, '').trim())
      .filter(Boolean);

    const res = await apiService.bulkGenerateSequence({
      moduleId: selectedModule,
      level: targetLevel,
      topicTitles: topicLines,
    });

    setIsAiGenerating(false);

    if (res?.success) {
      setBulkStatusMessage(`✅ Successfully generated & published ${res.data?.length || topicLines.length} topics directly to database!`);
      await fetchTopics();
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
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Roadmap Module</label>
            <div className="space-y-1">
              {MODULES.map((m) => {
                const Icon = m.icon;
                const isSelected = selectedModule === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModule(m.id)}
                    className={`w-full p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all ${
                      isSelected
                        ? 'bg-purple-900/40 border-purple-500 text-white shadow-md'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Existing Topics ({filteredTopics.length})</label>
              <Badge variant="purple">{selectedModule.toUpperCase()}</Badge>
            </div>
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
              {filteredTopics.map((t, idx) => (
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
              ))}
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
                <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs font-medium text-purple-200 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{bulkStatusMessage}</span>
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
