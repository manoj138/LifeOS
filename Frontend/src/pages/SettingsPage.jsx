import React, { useState } from 'react';
import { Settings, Cpu, User, Bell, Key, Sparkles, Check } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';

export const SettingsPage = () => {
  const [selectedModel, setSelectedModel] = useState('gpt4o');

  const models = [
    { id: 'gpt4o', name: 'OpenAI GPT-4o', desc: 'Best for complex MERN code refactoring & system design.', badge: 'Recommended' },
    { id: 'claude35', name: 'Anthropic Claude 3.5 Sonnet', desc: 'Superior for nuanced UI/UX & English conversation drills.', badge: 'Popular' },
    { id: 'gemini15', name: 'Google Gemini 1.5 Pro', desc: 'Ultra long 1M token context for codebase analysis.', badge: 'Fast' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="System Configuration"
        title="Settings & AI Model Preferences"
        subtitle="Manage your profile, API keys, AI model selection, and notification rules."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: AI Model Selector */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Active AI Intelligence Model
            </h3>
            <p className="text-xs text-gray-400">Select which AI LLM powers your voice mock interviews, MERN code reviews, and daily planning.</p>

            <div className="space-y-3 pt-2">
              {models.map((m) => {
                const isSelected = selectedModel === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setSelectedModel(m.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-purple-500/60 shadow-lg'
                        : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white text-sm">{m.name}</span>
                        <Badge variant="neon">{m.badge}</Badge>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">{m.desc}</p>
                    </div>

                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <User className="w-5 h-5 text-purple-400" />
              Profile & Account Info
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input label="Full Name" defaultValue="Manoj Kumar" />
              <Input label="Email" defaultValue="manoj@lifeos.ai" />
            </div>

            <Button variant="primary" className="mt-2">
              Save Profile Changes
            </Button>
          </GlassCard>
        </div>

        {/* Right Col: Hostinger / API Keys */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Key className="w-4 h-4 text-amber-400" />
              API Key Management
            </h3>
            <Input label="OpenAI API Key" type="password" defaultValue="sk-proj-••••••••••••" />
            <Input label="Hostinger API Token" type="password" defaultValue="hostinger-••••••••••••" />
            <Button size="sm" variant="glass" className="w-full">
              Update API Keys
            </Button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
