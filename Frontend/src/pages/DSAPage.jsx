import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Code2, Cpu, CheckCircle2, Play, ArrowRight, Sparkles, Terminal, HelpCircle, Eye, EyeOff } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { CodeEditor } from '../components/ui/CodeEditor';
import { DifficultyBadge } from '../components/ui/DifficultyBadge';

export const DSAPage = () => {
  const [searchParams] = useSearchParams();
  const initialTopic = searchParams.get('topic') || 'All';
  const initialDiff = searchParams.get('difficulty') || 'All';

  const { userProgress, toggleSolvedDsa } = useUser();
  const [selectedDifficulty, setSelectedDifficulty] = useState(initialDiff);
  const [selectedTopicFilter, setSelectedTopicFilter] = useState(initialTopic);
  const [activeProblem, setActiveProblem] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [dynamicDsaTopics, setDynamicDsaTopics] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDsaTopics = async () => {
      const res = await apiService.getCurriculumTopics('dsa');
      if (isMounted && res?.success && res.data && res.data.length > 0) {
        setDynamicDsaTopics(res.data);
      }
    };
    fetchDsaTopics();
    return () => { isMounted = false; };
  }, []);


  const problems = [
    {
      id: 0,
      title: "LRU Cache (Least Recently Used Cache)",
      difficulty: "Medium",
      topic: "Hash Map & Doubly Linked List",
      timeLimit: "O(1) get and put",
      description: "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache. Implement get(key) and put(key, value) in O(1) time complexity.",
      hint: "Use a Hash Map for O(1) key-node lookups paired with a Doubly Linked List to maintain node usage order.",
      solutionCode: `class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
    this.head = new Node(0, 0);
    this.tail = new Node(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._remove(node);
    this._add(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) this._remove(this.map.get(key));
    const newNode = new Node(key, value);
    this._add(newNode);
    this.map.set(key, newNode);
    if (this.map.size > this.capacity) {
      const lru = this.head.next;
      this._remove(lru);
      this.map.delete(lru.key);
    }
  }

  _remove(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _add(node) {
    node.prev = this.tail.prev;
    node.next = this.tail;
    this.tail.prev.next = node;
    this.tail.prev = node;
  }
}`,
      starterCode: `class LRUCache {
  constructor(capacity) {
    // Write your code here
  }

  get(key) {
    // Return value or -1
  }

  put(key, value) {
    // Insert or update key
  }
}`
    },
    {
      id: 1,
      title: "Trapping Rain Water",
      difficulty: "Hard",
      topic: "Two Pointers & Stack",
      timeLimit: "O(N) Time, O(1) Space",
      description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
      hint: "Maintain two pointers (left & right) along with maxLeft and maxRight heights.",
      solutionCode: `function trap(height) {
  let left = 0, right = height.length - 1;
  let leftMax = 0, rightMax = 0;
  let totalWater = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) leftMax = height[left];
      else totalWater += leftMax - height[left];
      left++;
    } else {
      if (height[right] >= rightMax) rightMax = height[right];
      else totalWater += rightMax - height[right];
      right--;
    }
  }
  return totalWater;
}`,
      starterCode: `function trap(height) {
  // Implement Two Pointer logic
}`
    }
  ];

  const currentProblem = problems[activeProblem];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Algorithmic Mastery Studio"
        title="DSA Guided Practice & Visualizer"
        subtitle="Master LeetCode patterns step-by-step with guided hints, complexity breakdowns, and live code evaluation."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Problem List */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-2xl bg-[#0f0f15] border border-white/10 space-y-3">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-4 h-4 text-amber-400" />
              LeetCode Problem Bank
            </h3>

            <div className="space-y-2">
              {problems.map((p, idx) => (
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
                  <span className="text-[10px] text-gray-400 font-mono">{p.topic}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Problem Description + Guided Hints + Code Sandbox */}
        <div className="lg:col-span-8 space-y-6">
          <TiltCard className="p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-white/10">
              <div>
                <span className="text-xs text-amber-400 font-mono font-bold uppercase">
                  [{currentProblem.topic}]
                </span>
                <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
                  {currentProblem.title}
                </h2>
              </div>
              <Badge variant={currentProblem.difficulty === 'Hard' ? 'rose' : 'amber'}>
                Target: {currentProblem.timeLimit}
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
                Problem Code Workspace
              </h3>
              <span className="text-xs text-gray-400">Write & Test Code</span>
            </div>

            <CodeEditor
              initialFiles={[
                {
                  name: "solution.js",
                  lang: "javascript",
                  code: showSolution ? currentProblem.solutionCode : currentProblem.starterCode
                }
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
