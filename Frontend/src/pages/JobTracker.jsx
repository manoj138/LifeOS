import React, { useState, useEffect } from 'react';
import { Briefcase, Building, DollarSign, MapPin, Plus, ExternalLink, Globe, Copy, Check, Sparkles, Send, FileText, CheckCircle2, ShieldCheck, Zap, Layers, Target } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { GlassCard } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { TiltCard } from '../components/ui/TiltCard';
import { LaserBorder } from '../components/ui/LaserBorder';
import { apiService } from '../services/api';
import { useUser } from '../context/UserContext';

export const JobTracker = () => {
  const { user, preferences } = useUser();

  const [activeTab, setActiveTab] = useState('job_strategy'); // 'job_strategy' | 'freelancing'
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedProposal, setCopiedProposal] = useState(false);

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [stage, setStage] = useState('Applied');
  const [location, setLocation] = useState('Remote');
  const [salary, setSalary] = useState('');

  const handleAddJob = (e) => {
    e.preventDefault();
    if (!company.trim() || !role.trim()) return;

    const newJob = {
      id: `j_${Date.now()}`,
      company: company.trim(),
      role: role.trim(),
      stage,
      location: location.trim() || 'Remote',
      salary: salary.trim() || 'Competitive',
      date: new Date().toISOString().split('T')[0],
    };

    setJobs([newJob, ...jobs]);
    setCompany('');
    setRole('');
    setSalary('');
    setIsModalOpen(false);
  };

  // 1-Click Copy Handlers
  const handleCopyColdEmail = () => {
    const text = `Hi [Recipient Name],\n\nI noticed you are scaling [Company Name] and building high-performance web products. As a Full-Stack Developer specializing in MERN Stack, Docker, and Hostinger VPS deployment, I recently built a production SaaS featuring real-time WebSockets and automated deployment.\n\nLive Demo: https://yourdomain.com\nGitHub Repository: https://github.com/yourusername/project-repo\n\nI would love to contribute to your engineering roadmap. Do you have 10 minutes for a quick chat this week?\n\nBest regards,\n${user?.name || 'Manoj'}`;
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyProposal = () => {
    const text = `Hi [Client Name],\n\nI reviewed your project requirements for building [Feature / Application Name]. I have built similar production MERN stack web applications with responsive Tailwind CSS frontend and scalable Express Node.js backends.\n\nHere is a live demo of my recent work: https://yourdomain.com\n\nI can deliver your complete project within 7 days, including 50% upfront milestone deployment and 100% clean source code handoff. Let's connect to discuss your exact requirements!\n\nBest regards,\n${user?.name || 'Manoj'}`;
    navigator.clipboard.writeText(text);
    setCopiedProposal(true);
    setTimeout(() => setCopiedProposal(false), 2000);
  };

  const topJobPortals = [
    {
      name: 'LinkedIn Jobs',
      badge: 'High Response Rate',
      desc: 'Best for direct messaging Tech Recruiters, Engineering Managers, and Founders via InMail.',
      url: 'https://linkedin.com/jobs'
    },
    {
      name: 'Instahyre',
      badge: 'Product Startups',
      desc: 'Fast-track applications for top Indian product startups with direct founder visibility.',
      url: 'https://instahyre.com'
    },
    {
      name: 'Wellfound (AngelList)',
      badge: 'Remote USD Roles',
      desc: 'Best for landing US/EU Remote SaaS Startup developer positions ($40k-$120k USD).',
      url: 'https://wellfound.com'
    },
    {
      name: 'Naukri.com',
      badge: 'Volume Calls',
      desc: 'Best for high-volume recruiter calls across Indian IT service & product companies.',
      url: 'https://naukri.com'
    }
  ];

  const freelancingPlatforms = [
    {
      name: 'Upwork',
      badge: 'US/EU High Pay',
      desc: 'Top platform for long-term contract roles ($25-$75/hr for Full-Stack MERN developers).',
      url: 'https://upwork.com'
    },
    {
      name: 'LinkedIn Direct Outreach',
      badge: 'Direct Client DMs',
      desc: 'Send personalized DMs to agency owners, startup founders, and local business owners.',
      url: 'https://linkedin.com'
    },
    {
      name: 'Fiverr Pro',
      badge: 'Fixed-Price Gigs',
      desc: 'Offer fixed-price package gigs (e.g. "Build MERN Web App in 5 Days" for $500-$1500).',
      url: 'https://fiverr.com'
    },
    {
      name: 'X (Twitter) Tech Community',
      badge: 'Inbound Inquiries',
      desc: 'Post daily #BuildInPublic code demos & project videos to attract inbound client DMs.',
      url: 'https://x.com'
    }
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Career & Freelancing Studio"
        title="Job Applications & Freelancing Mastery"
        subtitle="Learn where and how to apply for full-time developer jobs, land high-paying freelancing clients, and manage your hiring pipeline."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={activeTab === 'job_strategy' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('job_strategy')}
              leftIcon={<Briefcase className="w-4 h-4 text-cyan-400" />}
            >
              🚀 Full-Time Job Strategy
            </Button>
            <Button
              variant={activeTab === 'freelancing' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('freelancing')}
              leftIcon={<Globe className="w-4 h-4 text-purple-400" />}
            >
              💼 Freelancing & Client Outreach
            </Button>
          </div>
        }
      />

      {/* TAB 1: Full-Time Job Strategy & Pipeline Tracker */}
      {activeTab === 'job_strategy' && (
        <div className="space-y-8">
          {/* Top Job Portals Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Globe className="w-5 h-5 text-cyan-400" />
                Top 4 Platforms: Where to Apply for Developer Jobs
              </h3>
              <Badge variant="cyan">Proven Hiring Portals</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {topJobPortals.map((p, idx) => (
                <TiltCard key={idx} className="p-5 space-y-3 border border-white/10 bg-[#12121a]">
                  <div className="flex items-center justify-between">
                    <Badge variant="purple">{p.badge}</Badge>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{p.name}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{p.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Cold Outreach Email Template & ATS Checklist */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: 1-Click Copy Cold Email Template */}
            <div className="lg:col-span-7 space-y-4">
              <TiltCard className="p-6 space-y-4 border border-cyan-500/30 bg-gradient-to-br from-blue-950/40 via-[#14141b]/80 to-purple-950/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-cyan-400" /> Cold Email / LinkedIn DM Pitch Template
                  </span>
                  <Button
                    size="xs"
                    variant="glow"
                    onClick={handleCopyColdEmail}
                    leftIcon={copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copiedEmail ? 'Copied!' : 'Copy Template 📋'}
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-[#09090d] border border-white/15 font-mono text-xs text-purple-200 space-y-2 leading-relaxed">
                  <p>Hi [Recipient Name],</p>
                  <p>I noticed you are scaling [Company Name] and building high-performance web products. As a Full-Stack Developer specializing in MERN Stack, Docker, and Hostinger VPS deployment, I recently built a production SaaS featuring real-time WebSockets and automated deployment.</p>
                  <p>Live Demo: https://yourdomain.com<br />GitHub Repository: https://github.com/yourusername/project-repo</p>
                  <p>I would love to contribute to your engineering roadmap. Do you have 10 minutes for a quick chat this week?</p>
                </div>

                <p className="text-[11px] text-gray-400 italic">
                  💡 <strong>How to use:</strong> Send this message directly to Founders & Engineering Managers on LinkedIn or via email for a 3x higher response rate.
                </p>
              </TiltCard>
            </div>

            {/* Right: ATS Resume Checklist */}
            <div className="lg:col-span-5 space-y-4">
              <TiltCard className="p-6 space-y-4 border border-purple-500/30 bg-purple-950/20">
                <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-3">
                  <FileText className="w-4 h-4 text-purple-400" /> ATS Resume Optimization Checklist
                </span>

                <div className="space-y-2.5 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Clickable Demo & Code Links:</strong> Put Live Vercel/VPS Demo URLs & GitHub links right below your name header.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Quantifiable Metric Bullet Points:</strong> Use numbers like "Optimized MongoDB queries, reducing latency by 45%".</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Single Column Clean Layout:</strong> Avoid 2-column graphics that break ATS resume parser software.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Core Tech Keywords:</strong> React.js, Express, Node.js, REST APIs, Docker, Nginx, Hostinger VPS, Git.</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Freelancing & Client Outreach Mastery */}
      {activeTab === 'freelancing' && (
        <div className="space-y-8">
          {/* Top Freelancing Platforms Overview */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
                <Globe className="w-5 h-5 text-purple-400" />
                Where to Find High-Paying Freelance Clients
              </h3>
              <Badge variant="purple">Client Sourcing Channels</Badge>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {freelancingPlatforms.map((p, idx) => (
                <TiltCard key={idx} className="p-5 space-y-3 border border-white/10 bg-[#12121a]">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan">{p.badge}</Badge>
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400 transition-colors">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{p.name}</h4>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{p.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Client Proposal Pitch Template & Pricing Rules */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: 1-Click Copy Client Proposal Pitch Template */}
            <div className="lg:col-span-7 space-y-4">
              <TiltCard className="p-6 space-y-4 border border-purple-500/30 bg-gradient-to-br from-purple-950/40 via-[#14141b]/80 to-blue-950/40">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Send className="w-4 h-4 text-purple-400" /> Winning Upwork & Client Proposal Pitch Template
                  </span>
                  <Button
                    size="xs"
                    variant="glow"
                    onClick={handleCopyProposal}
                    leftIcon={copiedProposal ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  >
                    {copiedProposal ? 'Copied!' : 'Copy Proposal 📋'}
                  </Button>
                </div>

                <div className="p-4 rounded-xl bg-[#09090d] border border-white/15 font-mono text-xs text-purple-200 space-y-2 leading-relaxed">
                  <p>Hi [Client Name],</p>
                  <p>I reviewed your project requirements for building [Feature / Application Name]. I have built similar production MERN stack web applications with responsive Tailwind CSS frontend and scalable Express Node.js backends.</p>
                  <p>Here is a live demo of my recent work: https://yourdomain.com</p>
                  <p>I can deliver your complete project within 7 days, including 50% upfront milestone deployment and 100% clean source code handoff. Let's connect to discuss your exact requirements!</p>
                </div>

                <p className="text-[11px] text-gray-400 italic">
                  💡 <strong>How to use:</strong> Use this proposal template on Upwork or in cold LinkedIn DMs to agency owners for a 4x higher win rate.
                </p>
              </TiltCard>
            </div>

            {/* Right: Pricing & Payment Milestones */}
            <div className="lg:col-span-5 space-y-4">
              <TiltCard className="p-6 space-y-4 border border-cyan-500/30 bg-blue-950/20">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 border-b border-white/10 pb-3">
                  <DollarSign className="w-4 h-4 text-emerald-400" /> Client Pricing & Payment Milestone Rules
                </span>

                <div className="space-y-2.5 text-xs text-gray-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>50% Upfront Advance Deposit:</strong> Always collect a 50% deposit before writing line 1 of project code.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Milestone Demo Walkthroughs:</strong> Share short 2-minute Loom video demos at every project milestone.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Final Payment & Handoff:</strong> Hand over full GitHub repository access and Hostinger VPS deployment after receiving final 50% payment.</span>
                  </div>

                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Standard Rate:</strong> $25 - $50 / hour or $500 - $1,500 per complete MERN Web App project.</span>
                  </div>
                </div>
              </TiltCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
