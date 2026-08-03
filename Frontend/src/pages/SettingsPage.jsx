import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Settings, Cpu, User, Bell, Key, Sparkles, Check, Volume2, ShieldCheck, Globe, Play, Lock, Target, RefreshCw, Briefcase, Award } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { useVoiceGuider } from '../context/VoiceGuiderContext';
import { useUser } from '../context/UserContext';
import { AudioSpectrum } from '../components/ui/AudioSpectrum';

export const SettingsPage = () => {
  const navigate = useNavigate();
  const { user, preferences, resetOnboarding, clearAllLocalState } = useUser();
  const [selectedModel, setSelectedModel] = useState('gpt4o');

  const handleReRunOnboarding = () => {
    resetOnboarding();
    navigate('/onboarding');
  };

  const handleClearStateAndRegisterNewUser = () => {
    clearAllLocalState();
    navigate('/onboarding');
  };



  // Voice Context
  const {
    userName,
    setUserName,
    aiName,
    setAiName,
    isHandsFreeEnabled,
    setIsHandsFreeEnabled,
    pinCode,
    setPinCode,
    language,
    setLanguage,
    isMuted,
    setIsMuted,
    speechRate,
    setSpeechRate,
    reminderIntervalMins,
    setReminderIntervalMins,
    isSpeaking,
    speakGreetingAndBriefing,
    lockApp
  } = useVoiceGuider();

  const [newPinInput, setNewPinInput] = useState(pinCode);
  const [pinSaved, setPinSaved] = useState(false);

  const handleSavePin = (e) => {
    e.preventDefault();
    if (newPinInput.length >= 4) {
      setPinCode(newPinInput);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 2000);
    }
  };

  const models = [
    { id: 'gpt4o', name: 'OpenAI GPT-4o', desc: 'Best for complex MERN code refactoring & system design.', badge: 'Recommended' },
    { id: 'claude35', name: 'Anthropic Claude 3.5 Sonnet', desc: 'Superior for nuanced UI/UX & English conversation drills.', badge: 'Popular' },
    { id: 'gemini15', name: 'Google Gemini 1.5 Pro', desc: 'Ultra long 1M token context for codebase analysis.', badge: 'Fast' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="System Configuration"
        title="Settings, AI Voice & PIN Security"
        subtitle="Manage your profile, AI voice guider language (English/Marathi), PIN code, and notification rules."
      />

      {/* User Onboarding & Career Profile Overview */}
      <GlassCard className="p-6 border-purple-500/40 bg-gradient-to-r from-slate-900 via-purple-950/40 to-slate-900">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Target className="w-3.5 h-3.5 text-purple-400" />
              <span>Personalized Onboarding Active</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              {user?.name || 'Manoj Kumar'} • {preferences?.targetRole || 'Full-Stack Web Developer'}
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              Level: <span className="text-purple-300 font-semibold">{preferences?.careerLevel}</span> • Daily Target: <span className="text-cyan-300 font-semibold">{preferences?.dailyHours} hrs/day</span> • Fitness: <span className="text-rose-300 font-semibold">{preferences?.fitnessGoal}</span> • AI Coach: <span className="text-amber-300 font-semibold">{preferences?.aiPersona}</span>
            </p>
          </div>

          <Button
            variant="primary"
            onClick={handleReRunOnboarding}
            leftIcon={<RefreshCw className="w-4 h-4" />}
            className="shrink-0 bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-600/30 text-xs"
          >
            Re-run Onboarding Setup
          </Button>
        </div>
      </GlassCard>




      {/* Top Banner: AI Voice Guider Overview */}
      <GlassCard className="p-6 border-purple-500/30 bg-gradient-to-r from-purple-900/20 via-indigo-900/20 to-cyan-900/20 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-xs font-semibold text-purple-300">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>AI Voice Assistant Active</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">
              AI Voice Guider & Daily Briefing Engine
            </h2>
            <p className="text-xs text-gray-300 leading-relaxed">
              When you log in with your PIN, your AI assistant greets you (e.g., <span className="text-purple-300 italic">"Hi Manoj, what's up dude!"</span> / <span className="text-purple-300 italic">"नमस्कार मनोज! काय चाललंय मित्रा?"</span>) and gives a full briefing of your pending tasks.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <Button
              variant="primary"
              onClick={() => speakGreetingAndBriefing()}
              leftIcon={<Play className="w-4 h-4 fill-white" />}
              className="w-full sm:w-auto shadow-[0_0_20px_rgba(168,85,247,0.4)]"
            >
              Test Voice Briefing
            </Button>
            <Button
              variant="glass"
              onClick={lockApp}
              leftIcon={<Lock className="w-4 h-4 text-purple-400" />}
              className="w-full sm:w-auto"
            >
              Lock & Test PIN
            </Button>
          </div>
        </div>

        {isSpeaking && (
          <div className="mt-4 pt-4 border-t border-white/10">
            <AudioSpectrum isActive={true} barCount={24} />
          </div>
        )}
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Voice & Security Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Voice & Language Preferences */}
          <GlassCard className="p-6 space-y-6">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Volume2 className="w-5 h-5 text-cyan-400" />
              AI Voice Guider Language & Custom Wake Name
            </h3>

            {/* AI Custom Name (Wake Word) Input */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-2">
              <Input
                label="AI Assistant Wake Name (हाक मारावयाचे नाव)"
                placeholder="e.g. LifeOS, Jarvis, Anya, सखी"
                value={aiName}
                onChange={(e) => setAiName(e.target.value)}
              />
              <div className="flex flex-col justify-end">
                <p className="text-xs text-gray-400 bg-white/[0.03] border border-white/10 rounded-xl p-3">
                  Call your AI assistant by saying <span className="text-purple-300 font-bold font-mono">"Hey {aiName}"</span> or <span className="text-purple-300 font-bold font-mono">"{aiName}"</span> in Marathi or English.
                </p>
              </div>
            </div>

            {/* Hands-Free Always-On Mode Toggle */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/30 to-purple-950/30 border border-emerald-500/30 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-white text-sm">Hands-Free Always-On Voice Mode (कोणत्याही बटणावर क्लिक न करता)</h4>
                  <Badge variant="neon">Hands-Free</Badge>
                </div>
                <p className="text-xs text-gray-300">
                  Just say <span className="text-emerald-300 font-bold">"Hey {aiName}"</span> or <span className="text-emerald-300 font-bold">"{aiName}"</span> out loud into your mic anytime. No button click required!
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsHandsFreeEnabled(prev => !prev)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                  isHandsFreeEnabled ? 'bg-emerald-500' : 'bg-white/20'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isHandsFreeEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>

            {/* Language Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-purple-400" />
                Select Voice Language (भाषा निवडा)
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div
                  onClick={() => setLanguage('en')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    language === 'en'
                      ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">English Voice</h4>
                    <p className="text-xs text-gray-400 mt-1">"Hi Manoj, what's up dude..."</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${language === 'en' ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20'}`}>
                    {language === 'en' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>

                <div
                  onClick={() => setLanguage('mr')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    language === 'mr'
                      ? 'bg-purple-600/20 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.06]'
                  }`}
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">मराठी व्हॉईस (Marathi)</h4>
                    <p className="text-xs text-gray-400 mt-1">"नमस्कार मनोज! काय चाललंय मित्रा..."</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${language === 'mr' ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20'}`}>
                    {language === 'mr' && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </div>
            </div>

            {/* Periodic Reminders Slider & Mute */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300">
                  Periodic Voice Reminders (Every {reminderIntervalMins} Mins)
                </label>
                <select
                  value={reminderIntervalMins}
                  onChange={(e) => setReminderIntervalMins(Number(e.target.value))}
                  className="w-full bg-white/[0.05] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value={15} className="bg-[#12121a]">Every 15 minutes</option>
                  <option value={30} className="bg-[#12121a]">Every 30 minutes (Default)</option>
                  <option value={60} className="bg-[#12121a]">Every 60 minutes</option>
                  <option value={0} className="bg-[#12121a]">Disabled (Silent)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-gray-300">Speech Rate / Speed</label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="0.7"
                    max="1.3"
                    step="0.05"
                    value={speechRate}
                    onChange={(e) => setSpeechRate(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                  <span className="text-xs font-mono text-purple-400 font-bold w-12">{speechRate.toFixed(2)}x</span>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Security PIN Code Settings */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-purple-400" />
              Security PIN Code Configuration
            </h3>
            <p className="text-xs text-gray-400">Change your unlock PIN code. Default is <code className="text-purple-300">1234</code>.</p>

            <form onSubmit={handleSavePin} className="flex items-center gap-4">
              <div className="flex-1 max-w-xs">
                <Input
                  label="New Security PIN"
                  type="password"
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  maxLength={6}
                />
              </div>

              <div className="pt-6">
                <Button type="submit" variant="primary">
                  {pinSaved ? 'Saved PIN!' : 'Update PIN'}
                </Button>
              </div>
            </form>
          </GlassCard>

          {/* AI Model Selection Card */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Active AI Intelligence Model
            </h3>
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
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${isSelected ? 'bg-purple-500 border-purple-500 text-white' : 'border-white/20'}`}>
                      {isSelected && <Check className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>
        </div>

        {/* Right Col: User Profile & API Keys */}
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400" />
              User Profile
            </h3>
            <Input
              label="Display Name (Used in Voice Greeting)"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input label="Email Address" defaultValue="manoj@lifeos.ai" />
          </GlassCard>

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
