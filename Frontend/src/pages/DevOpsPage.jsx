import React, { useState, useEffect } from 'react';
import { Server, Activity, ShieldCheck, Cpu, HardDrive, RefreshCw, Terminal, CheckCircle2, BookOpen, ExternalLink } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { CodeEditor } from '../components/ui/CodeEditor';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { apiService } from '../services/api';

export const DevOpsPage = () => {
  const [activeTab, setActiveTab] = useState('tutorial');
  const [dynamicDevOpsTopics, setDynamicDevOpsTopics] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchDevOpsTopics = async () => {
      const res = await apiService.getDevopsSteps();
      if (isMounted && res?.success && Array.isArray(res.data)) {
        setDynamicDevOpsTopics(res.data);
      }
    };
    fetchDevOpsTopics();
    return () => { isMounted = false; };
  }, []);

  const setupSteps = dynamicDevOpsTopics || [];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Guided Cloud Tutorial & Infrastructure"
        title="Hostinger VPS & CloudPanel Mastery"
        subtitle="Follow step-by-step tutorials to deploy your MERN SaaS on Hostinger VPS with Nginx, SSL, and Docker."
        actions={
          <div className="flex items-center gap-2">
            <Button
              variant={activeTab === 'tutorial' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('tutorial')}
              leftIcon={<BookOpen className="w-4 h-4" />}
            >
              Step-by-Step Guide
            </Button>
            <Button
              variant={activeTab === 'terminal' ? 'primary' : 'glass'}
              size="sm"
              onClick={() => setActiveTab('terminal')}
              leftIcon={<Terminal className="w-4 h-4" />}
            >
              Live Terminal Monitor
            </Button>
          </div>
        }
      />

      {activeTab === 'tutorial' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {setupSteps.map((s, i) => (
              <TiltCard key={i} className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="cyan">{s.step}</Badge>
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                </div>

                <h3 className="text-base font-bold text-white tracking-tight">{s.title}</h3>
                <p className="text-xs text-gray-300 leading-relaxed">{s.desc}</p>

                <div className="p-2.5 rounded-xl bg-black/60 border border-white/10 font-mono text-xs text-purple-300 flex items-center justify-between">
                  <code>{s.command}</code>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Embedded Nginx Config Editor */}
          <div className="space-y-2">
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
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <LiveTerminal title="Hostinger VPS Server Stream (185.220.101.42)" />
          </div>

          <div className="space-y-6">
            <TiltCard className="p-6 space-y-4">
              <h4 className="text-sm font-bold text-white tracking-tight">SSL & Hostinger Status</h4>
              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>CloudPanel v2.4 Active & Secured</span>
              </div>
            </TiltCard>
          </div>
        </div>
      )}
    </div>
  );
};
