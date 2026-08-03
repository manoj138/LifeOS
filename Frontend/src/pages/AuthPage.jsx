import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Tabs } from '../components/ui/Tabs';

export const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [email, setEmail] = useState('manoj@lifeos.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Manoj Kumar');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app/dashboard');
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-extrabold text-white tracking-tight">
          {activeTab === 'login' ? 'Welcome back to LifeOS AI' : 'Create your LifeOS AI Account'}
        </h2>
        <p className="text-sm text-gray-400">
          {activeTab === 'login'
            ? 'Sign in to access your AI coach, daily planner & learning roadmap.'
            : 'Start your personal career & wellness journey today.'}
        </p>
      </div>

      {/* Auth Toggle Tabs */}
      <div className="flex justify-center">
        <Tabs
          tabs={[
            { id: 'login', label: 'Sign In' },
            { id: 'register', label: 'Create Account' }
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {activeTab === 'register' && (
          <Input
            label="Full Name"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            leftIcon={<User className="w-4 h-4 text-gray-400" />}
            required
          />
        )}

        <Input
          label="Email Address"
          type="email"
          placeholder="name@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          leftIcon={<Mail className="w-4 h-4 text-gray-400" />}
          required
        />

        <Input
          label="Password"
          type="password"
          placeholder="••••••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          leftIcon={<Lock className="w-4 h-4 text-gray-400" />}
          required
        />

        {activeTab === 'login' && (
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-white/10 bg-white/5 accent-purple-500" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-purple-400 hover:text-purple-300 transition-colors">
              Forgot password?
            </a>
          </div>
        )}

        <Button
          type="submit"
          variant="primary"
          className="w-full py-3"
          isLoading={isLoading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {activeTab === 'login' ? 'Sign In to Dashboard' : 'Get Started Free'}
        </Button>
      </form>

      {/* Social Logins Divider */}
      <div className="relative flex items-center justify-center my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-white/10" />
        </div>
        <span className="relative px-3 bg-[#121218] text-xs text-gray-500 uppercase tracking-widest">
          Or continue with
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="glass"
          size="sm"
          onClick={() => navigate('/app/dashboard')}
          leftIcon={<Github className="w-4 h-4" />}
        >
          GitHub
        </Button>

        <Button
          variant="glass"
          size="sm"
          onClick={() => navigate('/app/dashboard')}
          leftIcon={<Chrome className="w-4 h-4 text-rose-400" />}
        >
          Google
        </Button>
      </div>
    </div>
  );
};
