import React from 'react';
import { Code2, Cpu, CheckCircle2, Play, ArrowRight, Sparkles, Terminal } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const DSAPage = () => {
  const dsaProblems = [
    { id: 1, title: 'LRU Cache Implementation', difficulty: 'Medium', topic: 'Hash Map & Doubly Linked List', status: 'Solved' },
    { id: 2, title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees & BFS/DFS', status: 'In Progress' },
    { id: 3, title: 'Trapping Rain Water', difficulty: 'Hard', topic: 'Two Pointers & Stack', status: 'Solved' },
    { id: 4, title: 'Course Schedule II (Topological Sort)', difficulty: 'Medium', topic: 'Graphs & DAG', status: 'Solved' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Algorithmic Mastery"
        title="DSA Practice & Visualizer"
        subtitle="Master LeetCode patterns, data structures, and space-time complexity analysis."
        actions={
          <Button variant="primary" leftIcon={<Sparkles className="w-4 h-4" />}>
            AI Problem Generator
          </Button>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {dsaProblems.map((prob) => (
            <GlassCard key={prob.id} className="p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300">
                  <Code2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">{prob.title}</h3>
                  <span className="text-xs text-gray-400 font-mono">{prob.topic}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={prob.difficulty === 'Hard' ? 'rose' : 'amber'}>
                  {prob.difficulty}
                </Badge>
                <Badge variant={prob.status === 'Solved' ? 'emerald' : 'cyan'}>
                  {prob.status}
                </Badge>
              </div>
            </GlassCard>
          ))}
        </div>

        <GlassCard className="p-6 space-y-4">
          <div className="flex items-center gap-2 text-cyan-300 font-bold text-sm">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span>Complexity Analysis Assistant</span>
          </div>
          <div className="p-4 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-gray-300 space-y-2">
            <p><strong className="text-purple-400">Time Complexity:</strong> O(1) average for get() & put()</p>
            <p><strong className="text-cyan-400">Space Complexity:</strong> O(capacity) for hashmap storage</p>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};
