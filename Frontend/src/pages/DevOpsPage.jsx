import React, { useState, useEffect } from 'react';
import { Server, Activity, ShieldCheck, Cpu, HardDrive, RefreshCw, Terminal, CheckCircle2, BookOpen, ExternalLink, Copy, Check, LockKeyhole, Layers, ArrowRight, Zap, Globe, Key, Settings, MousePointerClick, ShieldAlert, FileText, LayoutGrid } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { LaserBorder } from '../components/ui/LaserBorder';
import { apiService } from '../services/api';

export const DevOpsPage = () => {
  const [activeTab, setActiveTab] = useState('hpanel'); // 'hpanel' | 'tutorial' | 'terminal'
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [copiedIdx, setCopiedIdx] = useState(null);
  const [dynamicDevOpsTopics, setDynamicDevOpsTopics] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDevOpsTopics = async () => {
      const res = await apiService.getDevopsSteps();
      if (isMounted && res?.success && Array.isArray(res.data) && res.data.length > 0) {
        setDynamicDevOpsTopics(res.data);
      }
    };
    fetchDevOpsTopics();
    return () => { isMounted = false; };
  }, []);

  // Hostinger Web hPanel Click-by-Click Guide Steps
  const hPanelSteps = [
    {
      step: "Step A",
      title: "1. Buy VPS Hosting on Hostinger.com",
      action: "Go to Hostinger.com -> VPS Hosting -> Select KVM 1 or KVM 2 Plan",
      detail: "Hostinger VPS is a Linux Virtual Machine in the Cloud with dedicated CPU, RAM, and a Static IP Address. Choose Ubuntu 22.04 LTS 64-bit as your Operating System.",
      targetClick: "Hostinger Home -> VPS -> Select KVM Plan -> OS: Ubuntu 22.04"
    },
    {
      step: "Step B",
      step: "Step B",
      title: "2. Set Root SSH Password & Server Location",
      action: "Hostinger Setup Wizard -> Set Root Password -> Select Server Location (e.g. India / Singapore / Europe)",
      detail: "Create a strong root password (e.g. `RootPass123!#`). This password will be used to log into your VPS terminal via SSH.",
      targetClick: "Setup Wizard -> Root Password -> Finish Setup"
    },
    {
      step: "Step C",
      title: "3. Copy VPS IP Address from hPanel Dashboard",
      action: "Log in to hPanel -> Click 'VPS' in top navbar -> Select your VPS -> Copy IP Address",
      detail: "On the VPS Overview page, locate the 'IP Address' field (e.g. `185.220.101.42`). You will use this IP to connect via SSH terminal and configure DNS.",
      targetClick: "hPanel Dashboard -> VPS Overview -> Copy Public IP"
    },
    {
      step: "Step D",
      title: "4. Domain DNS A Record Mapping (Hostinger / GoDaddy)",
      action: "hPanel -> Domains -> DNS / Nameservers -> Manage DNS Records -> Add A Record",
      detail: "Map your domain name (e.g. `yourdomain.com`) to your Hostinger VPS IP Address. Add two A Records: `@ -> VPS IP` and `www -> VPS IP`.",
      targetClick: "Domains -> Manage DNS -> Add Record -> Type: A -> Name: @ -> Points to: VPS IP"
    }
  ];

  const defaultDeploymentSteps = [
    {
      step: 'Step 1',
      stepNumber: 1,
      title: 'Hostinger VPS SSH & Terminal Connection',
      desc: 'Purchase an Ubuntu 22.04 LTS VPS on Hostinger. Open your terminal or PuTTY and connect to root credentials. Enable UFW firewall rules for SSH (22), HTTP (80), HTTPS (443), and CloudPanel (8443).',
      command: 'ssh root@<YOUR_HOSTINGER_VPS_IP>',
      notes: 'Ensure UFW allows ports 22, 80, 443, and 8443 before proceeding.',
      category: 'Server Connection'
    },
    {
      step: 'Step 2',
      stepNumber: 2,
      title: 'One-Click CloudPanel 2.x Installation',
      desc: 'Execute the official CloudPanel installer script on Ubuntu 22.04. CloudPanel installs Nginx, Node.js, MySQL/MariaDB, and PHP in a lightweight, high-performance architecture.',
      command: 'curl -sS https://installer.cloudpanel.io/ce/v2/install.sh -o install.sh && sudo bash install.sh',
      notes: 'After installation completes, navigate to https://<YOUR_VPS_IP>:8443 in your browser and create your Admin credentials.',
      category: 'Control Panel'
    },
    {
      step: 'Step 3',
      stepNumber: 3,
      title: 'Node.js MERN Site Creation & Git Repository Clone',
      desc: 'In CloudPanel Dashboard, click "Add Site" -> "Node.js Site". Set Domain Name and Node version (18/20). SSH into your VPS as the site user and clone your MERN GitHub project repository into the htdocs folder.',
      command: 'cd /home/cloudpanel/htdocs/yourdomain.com && git clone https://github.com/user/mern-app.git . && npm install',
      notes: 'Create your production .env file with DATABASE_URL, JWT_SECRET, and PORT variables.',
      category: 'MERN Codebase'
    },
    {
      step: 'Step 4',
      stepNumber: 4,
      title: 'PM2 Process Manager Setup & Auto-Restart',
      desc: 'Install PM2 globally or run via npx to keep your Express/Node.js backend running 24/7 in background cluster mode with automatic crash recovery.',
      command: 'npx pm2 start index.js --name "mern-backend" && npx pm2 save && npx pm2 startup',
      notes: 'Use pm2 logs to view real-time server console logs and pm2 status for memory usage.',
      category: 'Process Manager'
    },
    {
      step: 'Step 5',
      stepNumber: 5,
      title: 'Nginx Reverse Proxy & Port 80/443 Routing',
      desc: 'Configure Nginx reverse proxy to forward incoming HTTPS requests on port 80/443 directly to your internal Node.js backend port (e.g. 5000 or 3000).',
      command: 'sudo nginx -t && sudo systemctl reload nginx',
      notes: 'Nginx handles SSL termination, static asset caching, and WebSocket connections efficiently.',
      category: 'Nginx Proxy'
    },
    {
      step: 'Step 6',
      stepNumber: 6,
      title: "Free Let's Encrypt SSL Certificate & HTTPS Encryption",
      desc: "Issue a free 1-click Let's Encrypt SSL certificate inside CloudPanel SSL tab or using Certbot CLI to secure all web traffic with HTTPS.",
      command: 'sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com',
      notes: 'CloudPanel automatically handles Certbot cron jobs to renew SSL certificates every 90 days.',
      category: 'Security & SSL'
    }
  ];

  const setupSteps = (dynamicDevOpsTopics && dynamicDevOpsTopics.length > 0) ? dynamicDevOpsTopics : defaultDeploymentSteps;
  const currentStep = setupSteps[activeStepIdx] || setupSteps[0];

  const handleCopyCommand = (cmdText, idx) => {
    navigator.clipboard.writeText(cmdText);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Guided Cloud Tutorial & Infrastructure Studio"
        title="Hostinger VPS & CloudPanel Mastery"
        subtitle="Learn what Hostinger VPS is, navigate hPanel dashboard step-by-step, and deploy your MERN SaaS with Nginx, SSL, PM2, and Docker."
        actions={
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              variant={activeTab === 'hpanel' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('hpanel')}
              leftIcon={<Globe className="w-4 h-4 text-cyan-400" />}
            >
              Hostinger hPanel Web Guide
            </Button>
            <Button
              variant={activeTab === 'tutorial' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('tutorial')}
              leftIcon={<BookOpen className="w-4 h-4 text-purple-400" />}
            >
              6-Step Terminal Deployment
            </Button>
          </div>
        }
      />

      {/* TAB 1: Hostinger Web hPanel Click-by-Click Guide */}
      {activeTab === 'hpanel' && (
        <div className="space-y-8">
          {/* Hostinger Fundamentals Overview Banner */}
          <LaserBorder className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="cyan">Hostinger VPS Fundamentals</Badge>
              <span className="text-xs text-purple-300 font-mono font-bold uppercase">What is Hostinger VPS?</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight leading-snug">
              🌐 What is Hostinger VPS (Virtual Private Server)?
            </h2>

            <p className="text-sm text-gray-300 leading-relaxed font-sans max-w-4xl">
              <strong>Hostinger VPS</strong> is a dedicated Virtual Private Server running Ubuntu 22.04 LTS Linux in the cloud. 
              Unlike shared web hosting, a VPS grants <strong>Dedicated CPU Cores, RAM, Full Root SSH Access</strong>, and a <strong>Static Public IP Address</strong> to run your React Frontend, Express Backend (PM2), and CloudPanel 24/7 in production.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider block">1. Dedicated Hardware</span>
                <p className="text-xs text-white font-semibold">1 to 8 KVM vCPU Cores & Dedicated RAM</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block">2. Root SSH Access</span>
                <p className="text-xs text-white font-semibold">Full Admin Control via Terminal & Linux CLI</p>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 space-y-1">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider block">3. Static Public IP</span>
                <p className="text-xs text-white font-semibold">Static IP Address for Domain DNS Mapping</p>
              </div>
            </div>
          </LaserBorder>

          {/* Hostinger Website Dashboard Click-by-Click Guide */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <MousePointerClick className="w-5 h-5 text-cyan-400" />
                Hostinger Website Dashboard (hPanel) Step-by-Step Navigation Guide
              </h3>
              <Badge variant="purple">Start-to-End Guide</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {hPanelSteps.map((step, idx) => (
                <TiltCard key={idx} className="p-6 space-y-4 border border-white/10 bg-[#12121a]">
                  <div className="flex items-center justify-between">
                    <Badge variant="cyan">{step.step}</Badge>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight">{step.title}</h4>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-200 font-semibold space-y-1">
                    <span className="text-[10px] font-mono uppercase text-cyan-400 block">Hostinger Menu Path to Click:</span>
                    <p className="flex items-center gap-1.5">
                      <MousePointerClick className="w-3.5 h-3.5 shrink-0" />
                      <span>{step.targetClick}</span>
                    </p>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed font-sans">{step.detail}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Action Call to Jump to Terminal Guide */}
          <LaserBorder className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <h4 className="text-base font-bold text-white tracking-tight">Ready to connect via SSH Terminal?</h4>
              <p className="text-xs text-gray-400">Now that you have your Hostinger VPS IP & Root Password, proceed to the 6-Step Terminal Deployment tutorial.</p>
            </div>
            <Button
              variant="glow"
              onClick={() => setActiveTab('tutorial')}
              rightIcon={<ArrowRight className="w-4 h-4 text-emerald-400" />}
            >
              Start 6-Step Terminal Guide →
            </Button>
          </LaserBorder>
        </div>
      )}

      {/* TAB 2: 6-Step Terminal Deployment */}
      {activeTab === 'tutorial' && (
        <div className="space-y-8">
          {/* Guided Deployment Stepper Bar */}
          <LaserBorder className="p-6">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 flex-wrap gap-2">
              <div className="space-y-1">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Zap className="w-4 h-4 text-amber-400" /> Hostinger VPS Production Roadmap
                </span>
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Step {activeStepIdx + 1} of {setupSteps.length}: {currentStep.title}
                </h2>
              </div>
              <Badge variant="cyan">{currentStep.category || 'Production Step'}</Badge>
            </div>

            {/* Stepper Navigation Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-4">
              {setupSteps.map((s, idx) => {
                const isActive = idx === activeStepIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveStepIdx(idx)}
                    className={`p-2.5 rounded-xl text-left transition-all border flex flex-col justify-between gap-1.5 ${
                      isActive
                        ? 'bg-gradient-to-br from-purple-600/30 to-blue-600/30 border-purple-500 text-white font-bold shadow-lg shadow-purple-500/10'
                        : 'bg-white/[0.03] border-white/10 text-gray-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-[10px] font-mono font-bold uppercase text-cyan-400">Step {idx + 1}</span>
                      <CheckCircle2 className={`w-3.5 h-3.5 ${isActive ? 'text-emerald-400' : 'text-gray-600'}`} />
                    </div>
                    <span className="text-xs truncate font-medium">{s.title.split(' ')[0]} {s.title.split(' ')[1] || ''}</span>
                  </button>
                );
              })}
            </div>
          </LaserBorder>

          {/* Active Step Reader Card */}
          <TiltCard className="p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="purple">Step {currentStep.stepNumber || activeStepIdx + 1}</Badge>
                  <span className="text-xs text-gray-400 font-mono">{currentStep.category}</span>
                </div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  {currentStep.title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="xs"
                  variant="ghost"
                  disabled={activeStepIdx === 0}
                  onClick={() => setActiveStepIdx(prev => Math.max(0, prev - 1))}
                >
                  ← Previous Step
                </Button>
                <Button
                  size="xs"
                  variant="primary"
                  disabled={activeStepIdx === setupSteps.length - 1}
                  onClick={() => setActiveStepIdx(prev => Math.min(setupSteps.length - 1, prev + 1))}
                  rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                >
                  Next Step
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-gray-300 leading-relaxed font-sans">
                {currentStep.desc}
              </p>

              {/* Terminal Command Box */}
              <div className="space-y-1.5">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-purple-400" /> Terminal Command to Run on Hostinger VPS:
                </span>
                <div className="p-4 rounded-xl bg-[#09090d] border border-white/15 font-mono text-xs text-purple-300 flex items-center justify-between gap-4 shadow-inner">
                  <code className="break-all">{currentStep.command}</code>
                  <button
                    type="button"
                    onClick={() => handleCopyCommand(currentStep.command, activeStepIdx)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-gray-200 transition-colors shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    {copiedIdx === activeStepIdx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Pro-Tip & Architecture Note */}
              {currentStep.notes && (
                <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/25 text-purple-200 text-xs leading-relaxed space-y-1">
                  <strong>💡 Pro-Tip / Architecture Note:</strong>
                  <p>{currentStep.notes}</p>
                </div>
              )}
            </div>
          </TiltCard>

          {/* Grid Overview of All 6 Steps */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white tracking-tight flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" /> Complete Deployment Checklist
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {setupSteps.map((s, i) => (
                <TiltCard key={i} className={`p-5 space-y-3 cursor-pointer transition-all ${i === activeStepIdx ? 'border-purple-500/60 bg-purple-950/20' : ''}`} onClick={() => setActiveStepIdx(i)}>
                  <div className="flex items-center justify-between">
                    <Badge variant={i === activeStepIdx ? 'purple' : 'glass'}>Step {i + 1}</Badge>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>

                  <h4 className="text-sm font-bold text-white tracking-tight">{s.title}</h4>
                  <p className="text-xs text-gray-400 line-clamp-2">{s.desc}</p>
                </TiltCard>
              ))}
            </div>
          </div>

          {/* Embedded Nginx Config Editor */}
          <div className="space-y-3 pt-4">
            <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              Nginx Reverse Proxy Config File (Hostinger VPS)
            </h3>

            <CodeEditor
              initialFiles={[
                {
                  name: "nginx.conf",
                  lang: "nginx",
                  code: `server {
    listen 80;
    server_name lifeos.ai www.lifeos.ai;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name lifeos.ai;

    ssl_certificate /etc/letsencrypt/live/lifeos.ai/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lifeos.ai/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
    }
}`
                }
              ]}
            />
          </div>
        </div>
      )}
    </div>
  );
};
