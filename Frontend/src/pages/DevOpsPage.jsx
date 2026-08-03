import React from 'react';
import { Server, Activity, ShieldCheck, Cpu, HardDrive, RefreshCw, Terminal, CheckCircle2 } from 'lucide-react';
import { SectionHeader } from '../components/common/SectionHeader';
import { TiltCard } from '../components/ui/TiltCard';
import { LiveTerminal } from '../components/ui/LiveTerminal';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';

export const DevOpsPage = () => {
  const vpsMetrics = [
    { label: "Hostinger VPS IP", value: "185.220.101.42", status: "Active" },
    { label: "CloudPanel Control", value: "v2.4 (Docker ready)", status: "Running" },
    { label: "CPU Utilization", value: "12%", status: "Optimal" },
    { label: "RAM Allocated", value: "2.2 GB / 8.0 GB", status: "Healthy" },
  ];

  return (
    <div className="space-y-8 pb-12">
      <SectionHeader
        badge="Cloud & Server Infrastructure"
        title="Hostinger VPS & CloudPanel Control"
        subtitle="Monitor live server health, Docker containers, Nginx reverse proxy, and SSL certificates."
        actions={
          <Button variant="primary" leftIcon={<RefreshCw className="w-4 h-4" />}>
            Restart Nginx Proxy
          </Button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {vpsMetrics.map((m, idx) => (
          <TiltCard key={idx} className="p-6">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">{m.label}</span>
            <div className="text-xl font-extrabold text-white tracking-tight mt-2 font-mono">{m.value}</div>
            <Badge variant="emerald" className="mt-3">{m.status}</Badge>
          </TiltCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <LiveTerminal title="Hostinger VPS Command Terminal Stream" />
        </div>

        <div className="space-y-6">
          <TiltCard className="p-6 space-y-4">
            <h4 className="text-sm font-bold text-white tracking-tight">SSL & Domain Security</h4>
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Let's Encrypt Wildcard SSL Active</span>
            </div>
          </TiltCard>
        </div>
      </div>
    </div>
  );
};
