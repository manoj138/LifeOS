import React, { useState, useEffect } from 'react';
import { BookOpen, Edit3, Save, Sparkles, Check, Code2, Layers, Server, Binary, Terminal, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';
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
};

export const AdminCurriculumEditor = () => {
  const [selectedModule, setSelectedModule] = useState('js');
  const [topics, setTopics] = useState([DEFAULT_TOPIC]);
  const [selectedTopicId, setSelectedTopicId] = useState('js-0');
  const [isSaved, setIsSaved] = useState(false);
  const [isAiGenerating, setIsAiGenerating] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const fetchTopics = async () => {
      const res = await apiService.getCurriculumTopics(selectedModule);
      if (isMounted && res?.success && res.data && res.data.length > 0) {
        setTopics(res.data);
        setSelectedTopicId(res.data[0].id);
        setFormData({
          title: res.data[0].title || '',
          level: res.data[0].level || 'Beginner',
          conceptExplanation: res.data[0].conceptExplanation || '',
          codeSnippet: res.data[0].codeSnippet || '',
          projectApplication: res.data[0].projectApplication || '',
        });
      }
    };
    fetchTopics();
    return () => { isMounted = false; };
  }, [selectedModule]);

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0] || DEFAULT_TOPIC;

  const [formData, setFormData] = useState({
    title: currentTopic.title,
    level: currentTopic.level,
    conceptExplanation: currentTopic.conceptExplanation,
    codeSnippet: currentTopic.codeSnippet,
    projectApplication: currentTopic.projectApplication,
  });

  const handleSelectTopic = (topic) => {
    setSelectedTopicId(topic.id);
    setFormData({
      title: topic.title || '',
      level: topic.level || 'Beginner',
      conceptExplanation: topic.conceptExplanation || '',
      codeSnippet: topic.codeSnippet || '',
      projectApplication: topic.projectApplication || '',
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaved(true);
    await apiService.updateCurriculumTopic(selectedTopicId, formData);
    setTimeout(() => setIsSaved(false), 2500);
  };

  const filteredTopics = topics.filter((t) => t.moduleId === selectedModule);

  return (

    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-purple-400" />
            Curriculum Data & Code Sandbox Editor
          </h3>
          <p className="text-xs text-gray-400">
            Curate, edit theory explanations, working code snippets, and quiz questions in real-time.
          </p>
        </div>


        <div className="flex items-center gap-2">

          <Button
            variant="glass"
            size="sm"
            onClick={async () => {
              const res = await apiService.seedCurriculum();
              if (res.success) {
                alert(`✅ Smart Seeder: ${res.data?.inserted || 0} missing topics inserted, ${res.data?.preserved || 0} existing topics preserved untouched.`);
              }
            }}
            leftIcon={<RefreshCw className="w-4 h-4 text-purple-400" />}
          >
            Sync Missing Topics
          </Button>

          <Button
            variant="glow"
            size="sm"
            onClick={handleAiPolish}
            isLoading={isAiGenerating}
            leftIcon={<Sparkles className="w-4 h-4 text-cyan-400" />}
          >
            Enhance Explanation with AI
          </Button>
        </div>
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Module & Topic Sidebar Selector */}
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
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Select Topic to Edit</label>
            <div className="space-y-1 max-h-60 overflow-y-auto pr-1">
              {filteredTopics.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleSelectTopic(t)}
                  className={`w-full p-2 rounded-xl text-left border text-xs transition-all ${
                    selectedTopicId === t.id
                      ? 'bg-purple-600/30 border-purple-500 text-white font-bold'
                      : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                  }`}
                >
                  {t.title}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rich Topic Editor Form */}
        <div className="lg:col-span-3 space-y-6">
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

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                {isSaved ? (
                  <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4" /> Topic Updated in SQLite Database!
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
                  Save Topic Changes
                </Button>
              </div>
            </GlassCard>
          </form>
        </div>
      </div>
    </div>
  );
};
