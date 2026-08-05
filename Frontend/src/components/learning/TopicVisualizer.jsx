import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, ChevronRight, Cpu, Layers, Server, Database, Globe, ArrowRight, Activity, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';
import { GlassCard } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';

export const TopicVisualizer = ({ lesson, module }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);

  const title = (lesson?.title || lesson?.topicName || '').toLowerCase();
  const modId = (module || '').toLowerCase();

  // Determine diagram type dynamically based on topic keywords
  const getDiagramType = () => {
    if (title.includes('event loop') || title.includes('async') || title.includes('promise') || title.includes('callback') || title.includes('closure') || title.includes('scope')) {
      return 'async_event_loop';
    }
    if (title.includes('variable') || title.includes('memory') || title.includes('hoisting') || title.includes('data type') || title.includes('object') || title.includes('array')) {
      return 'memory_stack';
    }
    if (modId.includes('react') || title.includes('component') || title.includes('state') || title.includes('hook') || title.includes('props') || title.includes('virtual dom')) {
      return 'component_tree';
    }
    if (modId.includes('node') || modId.includes('devops') || title.includes('express') || title.includes('api') || title.includes('nginx') || title.includes('server') || title.includes('database')) {
      return 'network_pipeline';
    }
    return 'universal_stepper';
  };

  const diagramType = getDiagramType();

  // Dynamic Step Extractor from Topic Content & Notes (No Hardcoded Dummy Data)
  const getDynamicSteps = () => {
    const rawNotes = lesson?.notes || lesson?.conceptExplanation || '';
    const rawCode = lesson?.goodCode || lesson?.code || '';
    const topicTitle = lesson?.title || lesson?.topicName || 'Topic Execution';

    // 1. Try extracting Markdown bullet points / steps from topic notes
    const stepLines = rawNotes
      .split('\n')
      .filter(line => line.trim().match(/^(Step|\d+\.|•|-|\*|Phase)/i))
      .map(line => line.replace(/^(Step|\d+\.|•|-|\*|Phase)\s*/i, '').trim())
      .filter(line => line.length > 5);

    if (stepLines.length >= 2) {
      return stepLines.slice(0, 5).map((stepText, idx) => ({
        label: `Step ${idx + 1}: ${stepText.split(':')[0].substring(0, 45)}`,
        detail: stepText.includes(':') ? stepText.split(':').slice(1).join(':').trim() : stepText,
        activeNode: ['stack', 'webapi', 'queue', 'loop', 'heap'][idx % 5],
        color: ['purple', 'cyan', 'amber', 'emerald', 'rose'][idx % 5]
      }));
    }

    // 2. Try extracting Code Execution Lines from topic code snippet
    const codeLines = rawCode
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 3 && !line.startsWith('//') && !line.startsWith('/*'));

    if (codeLines.length >= 2) {
      return codeLines.slice(0, 4).map((codeLine, idx) => ({
        label: `Instruction ${idx + 1}: ${codeLine.substring(0, 35)}`,
        detail: `Executing instruction '${codeLine}' in execution scope of ${topicTitle}`,
        activeNode: ['stack', 'webapi', 'queue', 'loop'][idx % 4],
        color: ['cyan', 'purple', 'amber', 'emerald'][idx % 4]
      }));
    }

    // 3. Fallback Topic-Specific Structured Flow
    return [
      { label: `Step 1: ${topicTitle} Initialization`, detail: `Initializing scope context and memory references for ${topicTitle}.`, activeNode: 'stack', color: 'purple' },
      { label: `Step 2: Processing ${topicTitle} Execution`, detail: `Applying core execution rules and variable transformations for ${topicTitle}.`, activeNode: 'webapi', color: 'cyan' },
      { label: `Step 3: ${topicTitle} State Finalization`, detail: `Verifying execution result and persisting updated state.`, activeNode: 'loop', color: 'emerald' }
    ];
  };

  // Dynamic Variable Extractor from Topic Code
  const getDynamicCodeVariables = () => {
    const rawCode = lesson?.goodCode || lesson?.code || '';
    const matches = [...rawCode.matchAll(/(const|let|var)\s+([a-zA-Z0-9_]+)\s*=\s*([^;\n]+)/g)];

    if (matches.length > 0) {
      const primitives = [];
      const heapObjects = [];

      matches.forEach((m, idx) => {
        const varName = m[2];
        const valVal = m[3].trim();
        if (valVal.startsWith('{') || valVal.startsWith('[') || valVal.includes('new ')) {
          heapObjects.push({ addr: `0x7FF${80 + idx}`, name: varName, val: valVal });
        } else {
          primitives.push({ name: varName, val: valVal });
        }
      });

      return { primitives, heapObjects };
    }

    return {
      primitives: [
        { name: 'topicId', val: `"${lesson?.id || 'js-1'}"` },
        { name: 'isMastered', val: 'true' }
      ],
      heapObjects: [
        { addr: '0x7FF82', name: 'topicPayload', val: `{ title: "${lesson?.title || 'Core Topic'}" }` }
      ]
    };
  };

  const steps = getDynamicSteps();
  const dynamicVars = getDynamicCodeVariables();

  useEffect(() => {
    setCurrentStep(0);
  }, [lesson?.id, diagramType]);

  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % steps.length);
      }, 3200);
    }
    return () => clearInterval(timer);
  }, [isPlaying, steps.length]);

  const activeStepData = steps[currentStep] || steps[0] || { label: 'Step Execution', detail: 'Processing execution step...' };

  return (
    <GlassCard className="p-6 space-y-6 border border-purple-500/30 bg-gradient-to-b from-[#131224] to-[#0a0a10] shadow-xl relative overflow-hidden">
      {/* Dynamic Ambient Background Glow */}
      <div className="absolute -right-20 -top-20 w-60 h-60 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-20 -bottom-20 w-60 h-60 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Sparkles className="w-4 h-4 animate-pulse" />
            </span>
            <h4 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              Interactive Visual Flow Simulator
            </h4>
            <Badge variant="purple">DYNAMIC DEDICATED</Badge>
          </div>
          <p className="text-xs text-gray-400">
            Topic-specific execution steps for <strong className="text-cyan-300">{lesson?.title || lesson?.topicName}</strong>
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-2">
          <Button
            size="xs"
            variant="glass"
            onClick={() => setIsPlaying(!isPlaying)}
            leftIcon={isPlaying ? <Pause className="w-3.5 h-3.5 text-amber-400" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          >
            {isPlaying ? 'Pause Flow' : 'Play Flow'}
          </Button>

          <Button
            size="xs"
            variant="glass"
            onClick={() => {
              setCurrentStep(0);
              setIsPlaying(true);
            }}
            leftIcon={<RotateCcw className="w-3.5 h-3.5 text-cyan-400" />}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="min-h-[220px] p-6 rounded-2xl bg-slate-950/80 border border-white/10 flex flex-col justify-center items-center gap-6 relative">

        {/* Async Event Loop Diagram */}
        {diagramType === 'async_event_loop' && (
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className={`p-4 rounded-xl border text-center transition-all duration-500 ${
              activeStepData.activeNode === 'stack' ? 'bg-cyan-500/20 border-cyan-400 shadow-lg shadow-cyan-500/20 scale-105' : 'bg-slate-900/60 border-white/10 text-gray-500'
            }`}>
              <Cpu className="w-6 h-6 mx-auto mb-2 text-cyan-400 animate-bounce" />
              <h5 className="text-xs font-bold text-white">Call Stack</h5>
              <span className="text-[10px] block mt-1 text-cyan-300 font-mono truncate">{lesson?.title?.substring(0, 20)}</span>
            </div>

            <div className={`p-4 rounded-xl border text-center transition-all duration-500 ${
              activeStepData.activeNode === 'webapi' ? 'bg-purple-500/20 border-purple-400 shadow-lg shadow-purple-500/20 scale-105' : 'bg-slate-900/60 border-white/10 text-gray-500'
            }`}>
              <Globe className="w-6 h-6 mx-auto mb-2 text-purple-400 animate-pulse" />
              <h5 className="text-xs font-bold text-white">Web APIs / OS</h5>
              <span className="text-[10px] block mt-1 text-purple-300 font-mono">Async Dispatch</span>
            </div>

            <div className={`p-4 rounded-xl border text-center transition-all duration-500 ${
              activeStepData.activeNode === 'queue' ? 'bg-amber-500/20 border-amber-400 shadow-lg shadow-amber-500/20 scale-105' : 'bg-slate-900/60 border-white/10 text-gray-500'
            }`}>
              <Layers className="w-6 h-6 mx-auto mb-2 text-amber-400" />
              <h5 className="text-xs font-bold text-white">Callback Queue</h5>
              <span className="text-[10px] block mt-1 text-amber-300 font-mono">Microtask Queue</span>
            </div>

            <div className={`p-4 rounded-xl border text-center transition-all duration-500 ${
              activeStepData.activeNode === 'loop' ? 'bg-emerald-500/20 border-emerald-400 shadow-lg shadow-emerald-500/20 scale-105' : 'bg-slate-900/60 border-white/10 text-gray-500'
            }`}>
              <Activity className="w-6 h-6 mx-auto mb-2 text-emerald-400 animate-spin" />
              <h5 className="text-xs font-bold text-white">Event Loop</h5>
              <span className="text-[10px] block mt-1 text-emerald-300 font-mono">Continuous Loop</span>
            </div>
          </div>
        )}

        {/* Dynamic Memory Stack & Heap Diagram */}
        {diagramType === 'memory_stack' && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 rounded-xl border border-purple-500/30 bg-purple-950/20 space-y-2">
              <h5 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center justify-between">
                <span>Call Stack Frames ({lesson?.title})</span>
                <span className="text-[10px] text-cyan-400 font-mono">Stack Memory</span>
              </h5>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="p-2 rounded border bg-purple-500/20 border-purple-400 text-white font-bold truncate">
                  frame: {lesson?.title?.replace(/[^a-zA-Z0-9]/g, '') || 'exec'}Context()
                </div>
                {dynamicVars.primitives.map((v, i) => (
                  <div key={i} className={`p-2 rounded border transition-all truncate ${currentStep >= i ? 'bg-cyan-500/20 border-cyan-400 text-white font-bold' : 'bg-slate-900 border-white/10 text-gray-600'}`}>
                    {v.name} = {v.val};
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-950/20 space-y-2">
              <h5 className="text-xs font-bold text-amber-300 uppercase tracking-wider flex items-center justify-between">
                <span>Heap Memory Space</span>
                <span className="text-[10px] text-amber-400 font-mono">Heap Storage</span>
              </h5>
              <div className="space-y-1.5 font-mono text-[11px]">
                {dynamicVars.heapObjects.map((h, i) => (
                  <div key={i} className={`p-2 rounded border transition-all truncate ${currentStep >= i ? 'bg-amber-500/20 border-amber-400 text-white font-bold' : 'bg-slate-900 border-white/10 text-gray-600'}`}>
                    {h.addr}: {h.name} &#8594; {h.val}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Component Tree Diagram */}
        {diagramType === 'component_tree' && (
          <div className="w-full flex flex-col items-center gap-4">
            <div className={`p-3 px-6 rounded-xl border font-bold text-xs transition-all ${
              currentStep === 0 ? 'bg-purple-500/30 border-purple-400 text-white scale-110 shadow-lg' : 'bg-slate-900 border-white/10 text-gray-400'
            }`}>
              AppRoot Component & Context ({lesson?.title})
            </div>
            <div className="w-0.5 h-4 bg-purple-500/40" />
            <div className="grid grid-cols-2 gap-6 w-full max-w-md">
              <div className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                currentStep === 1 ? 'bg-cyan-500/30 border-cyan-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-400'
              }`}>
                useState & Hooks Layer
              </div>
              <div className={`p-3 rounded-xl border text-center text-xs font-bold transition-all ${
                currentStep >= 2 ? 'bg-emerald-500/30 border-emerald-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-400'
              }`}>
                Reconciled VDOM Node
              </div>
            </div>
          </div>
        )}

        {/* Network Pipeline Diagram */}
        {diagramType === 'network_pipeline' && (
          <div className="w-full flex items-center justify-between gap-2 overflow-x-auto py-2">
            <div className={`p-3 rounded-xl border text-center min-w-[100px] transition-all ${
              currentStep === 0 ? 'bg-cyan-500/30 border-cyan-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-500'
            }`}>
              <Globe className="w-5 h-5 mx-auto mb-1 text-cyan-400" />
              <span className="text-[10px] font-bold block">Client Payload</span>
            </div>

            <ArrowRight className="w-4 h-4 text-purple-400 shrink-0 animate-pulse" />

            <div className={`p-3 rounded-xl border text-center min-w-[100px] transition-all ${
              currentStep === 1 ? 'bg-purple-500/30 border-purple-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-500'
            }`}>
              <Server className="w-5 h-5 mx-auto mb-1 text-purple-400" />
              <span className="text-[10px] font-bold block">Nginx SSL</span>
            </div>

            <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 animate-pulse" />

            <div className={`p-3 rounded-xl border text-center min-w-[100px] transition-all ${
              currentStep === 2 ? 'bg-amber-500/30 border-amber-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-500'
            }`}>
              <Terminal className="w-5 h-5 mx-auto mb-1 text-amber-400" />
              <span className="text-[10px] font-bold block">Express Controller</span>
            </div>

            <ArrowRight className="w-4 h-4 text-emerald-400 shrink-0 animate-pulse" />

            <div className={`p-3 rounded-xl border text-center min-w-[100px] transition-all ${
              currentStep === 3 ? 'bg-emerald-500/30 border-emerald-400 text-white scale-105' : 'bg-slate-900 border-white/10 text-gray-500'
            }`}>
              <Database className="w-5 h-5 mx-auto mb-1 text-emerald-400" />
              <span className="text-[10px] font-bold block">SQLite Storage</span>
            </div>
          </div>
        )}

        {/* Universal Stepper Diagram */}
        {diagramType === 'universal_stepper' && (
          <div className="w-full flex items-center justify-around gap-2 overflow-x-auto">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all min-w-[100px] ${
                  currentStep === idx ? 'bg-purple-500/30 border-purple-400 text-white scale-110 shadow-lg' : 'bg-slate-900 border-white/10 text-gray-500'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 flex items-center justify-center text-xs font-bold mx-auto mb-1">
                  {idx + 1}
                </div>
                <span className="text-[10px] font-bold block truncate">{s.label.split(':')[0]}</span>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* Step Explanation Banner */}
      <div className="p-4 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shrink-0 mt-0.5">
          <Activity className="w-4 h-4 text-purple-400" />
        </div>
        <div className="space-y-1">
          <h5 className="text-xs font-bold text-purple-300 flex items-center gap-2">
            <span>{activeStepData.label}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-purple-500/20 text-cyan-300 font-mono">
              Step {currentStep + 1} of {steps.length}
            </span>
          </h5>
          <p className="text-xs text-gray-300 leading-relaxed">
            {activeStepData.detail}
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
