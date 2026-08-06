import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Code2, Cpu, CheckCircle2, Play, ArrowRight, Sparkles, Terminal, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { CodeEditor } from '../components/ui/CodeEditor';
import { DifficultyBadge } from '../components/ui/DifficultyBadge';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { useUser } from '../context/UserContext';
import { apiService } from '../services/api';

export const DSAPage = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'All';
  const initialDiff = searchParams.get('difficulty') || 'All';

  const { userProgress, toggleSolvedDsa } = useUser();
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDiff);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState(initialTopic);
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState('All');
  const [activeProblem, setActiveProblem] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [dynamicDsaTopics, setDynamicDsaTopics] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDsaTopics = async () => {
      const res = await apiService.getDsaProblems();
      if (isMounted && res?.success && Array.isArray(res.data)) {
        setDynamicDsaTopics(res.data);
      }
    };
    fetchDsaTopics();
    return () => { isMounted = false; };
  }, []);

  const allProblems = dynamicDsaTopics || [];
  const availableLanguages = Array.from(new Set([
    'javascript', 'python', 'java', 'c', 'cpp',
    ...allProblems.map(p => (p.language || 'javascript').toLowerCase())
  ])).filter(Boolean);

  const filteredProblems = allProblems.filter((p) => {
    if (selectedLanguageFilter.toLowerCase() === 'all') return true;
    return (p.language || 'javascript').toLowerCase() === selectedLanguageFilter.toLowerCase();
  });

  const currentProblem = filteredProblems[activeProblem] || filteredProblems[0] || null;

  const getLangExtension = (lang) => {
    const l = (lang || 'javascript').toLowerCase();
    if (l === 'python' || l === 'py') return { ext: 'py', mode: 'python' };
    if (l === 'java') return { ext: 'java', mode: 'java' };
    if (l === 'c') return { ext: 'c', mode: 'c' };
    if (l === 'cpp' || l === 'c++') return { ext: 'cpp', mode: 'cpp' };
    if (l === 'go' || l === 'golang') return { ext: 'go', mode: 'go' };
    if (l === 'rust' || l === 'rs') return { ext: 'rs', mode: 'rust' };
    if (l === 'typescript' || l === 'ts') return { ext: 'ts', mode: 'typescript' };
    if (l === 'csharp' || l === 'c#') return { ext: 'cs', mode: 'csharp' };
    if (l === 'ruby' || l === 'rb') return { ext: 'rb', mode: 'ruby' };
    if (l === 'kotlin' || l === 'kt') return { ext: 'kt', mode: 'kotlin' };
    if (l === 'swift') return { ext: 'swift', mode: 'swift' };
    if (l === 'php') return { ext: 'php', mode: 'php' };
    return { ext: 'js', mode: 'javascript' };
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Algorithmic Mastery Studio"
        title="DSA Guided Practice & Visualizer"
        subtitle="Master LeetCode patterns in JavaScript, Python, Java, C, C++, and custom languages with guided hints and live code evaluation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Problem List & Language Filter */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                LeetCode Problem Bank
              </h3>
              <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                {filteredProblems.length} Problems
              </span>
            </div>

            {/* DSA Language Selector Pills */}
            <div className="space-y-1.5 border-t border-b border-white/10 py-3">
              <span className="text-[11px] font-semibold text-gray-400 block">DSA Language Focus:</span>
              <div className="flex flex-wrap gap-1.5">
                {['All', ...availableLanguages].map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setSelectedLanguageFilter(lang);
                      setActiveProblem(0);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-all uppercase ${
                      selectedLanguageFilter.toLowerCase() === lang.toLowerCase()
                        ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                        : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {lang === 'All' ? 'All' : lang === 'javascript' ? 'JS' : lang}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
              {filteredProblems.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => {
                    setActiveProblem(idx);
                    setShowHint(false);
                    setShowSolution(false);
                  }}
                  className={`w-full text-left p-3.5 rounded-xl text-xs transition-all border ${
                    activeProblem === idx
                      ? 'bg-gradient-to-r from-amber-500/20 to-purple-500/20 border-amber-500/50 text-white font-bold'
                      : 'bg-white/[0.03] border-white/10 text-gray-300 hover:bg-white/[0.06]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold">{p.title}</span>
                    <DifficultyBadge level={p.difficulty === 'Hard' ? 'Advanced' : p.difficulty === 'Medium' ? 'Intermediate' : 'Beginner'} />
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-[10px] text-gray-400 font-mono">{p.topic}</span>
                    <span className="text-[9px] uppercase font-bold text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded">
                      {p.language || 'JS'}
                    </span>
                  </div>
                </button>
              ))}

              {filteredProblems.length === 0 && (
                <div className="p-4 text-center text-xs text-gray-400">
                  No problems found for language <span className="text-amber-400 font-bold">{selectedLanguageFilter}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Problem Description + Guided Hints + Code Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          {currentProblem ? (
            <>
              <TiltCard className="p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-amber-400 font-mono font-bold uppercase">
                        [{currentProblem.topic || 'DSA'}]
                      </span>
                      <Badge variant="purple">
                        {(currentProblem.language || 'javascript').toUpperCase()}
                      </Badge>
                    </div>
                    <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                      {currentProblem.title}
                    </h2>
                  </div>
                  <Badge variant={currentProblem.difficulty === 'Hard' ? 'rose' : 'amber'}>
                    Target: {currentProblem.timeLimit || '20m'}
                  </Badge>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed font-sans">
                  {currentProblem.description}
                </p>

                {/* Guided Actions (Hint & Solution Toggles) */}
                <div className="flex items-center gap-3 pt-2">
                  <Button
                    size="xs"
                    variant="glass"
                    onClick={() => setShowHint(!showHint)}
                    leftIcon={<HelpCircle className="w-3.5 h-3.5 text-cyan-400" />}
                  >
                    {showHint ? "Hide AI Hint" : "Need a Hint?"}
                  </Button>

                  <Button
                    size="xs"
                    variant="ghost"
                    onClick={() => setShowSolution(!showSolution)}
                    leftIcon={showSolution ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  >
                    {showSolution ? "Hide Solution" : "View Full Solution"}
                  </Button>
                </div>

                {/* AI Hint Box */}
                {showHint && (
                  <div className="p-3.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-200">
                    💡 <strong>AI Hint:</strong> {currentProblem.hint}
                  </div>
                )}
              </TiltCard>

              {/* Code Editor Sandbox */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-cyan-400" />
                    Problem Code Workspace ({ (currentProblem.language || 'javascript').toUpperCase() })
                  </h3>
                  <span className="text-xs text-gray-400">Write & Test Code</span>
                </div>

                {(() => {
                  const langConfig = getLangExtension(currentProblem.language);
                  return (
                    <CodeEditor
                      key={currentProblem.id || activeProblem}
                      initialFiles={[
                        {
                          name: `solution.${langConfig.ext}`,
                          lang: langConfig.mode,
                          code: showSolution ? (currentProblem.solutionCode || '// Solution code') : (currentProblem.starterCode || '// Starter code')
                        }
                      ]}
                    />
                  );
                })()}
              </div>
            </>
          ) : (
            <TiltCard className="p-8 text-center space-y-3">
              <p className="text-gray-400 text-sm">Loading DSA problems or no problems available...</p>
            </TiltCard>
          )}
        </div>
      </div>
    </div>
  );
};
