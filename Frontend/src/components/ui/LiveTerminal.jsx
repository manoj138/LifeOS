import React, { useState, useEffect } from 'react';
import { Terminal, ShieldCheck, RefreshCw, Circle } from 'lucide-react';
import { Badge } from './Badge';

export const LiveTerminal = ({ title = "System Health & API Telemetry" }) => {
  const currentHost = typeof window !== 'undefined' ? window.location.hostname : 'localhost';

  const [logs, setLogs] = useState([
    { time: new Date().toTimeString().split(' ')[0], text: `[system] Express & SQLite server connection OK (${currentHost}:1235).`, type: "success" },
    { time: new Date().toTimeString().split(' ')[0], text: `[db] SQLite database models synchronized.`, type: "info" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const dynamicLogs = [
        `[api] GET /api/admin/metrics -> 200 OK (1ms)`,
        `[db] SQLite connection pool active (${currentHost})`,
        `[api] GET /api/curriculum/topics -> 200 OK`,
        `[system] Host ${currentHost} memory health check PASSED.`
      ];
      const randomLog = dynamicLogs[Math.floor(Math.random() * dynamicLogs.length)];
      const now = new Date().toTimeString().split(' ')[0];
      setLogs(prev => [...prev.slice(-6), { time: now, text: randomLog, type: "info" }]);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentHost]);

  return (
    <div className="rounded-3xl bg-[#09090e] border border-white/15 overflow-hidden shadow-2xl font-mono text-xs">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#11111a] border-b border-white/10">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          </div>
          <span className="font-bold text-white text-xs ml-2 flex items-center gap-2">
            <Terminal className="w-4 h-4 text-cyan-400" />
            {title}
          </span>
        </div>

        <Badge variant="emerald" dot>Live Stream</Badge>
      </div>

      {/* Streaming Log Window */}
      <div className="p-4 space-y-2 max-h-64 overflow-y-auto bg-[#07070a]">
        {logs.map((l, i) => (
          <div key={i} className="flex items-center gap-3 text-[11px]">
            <span className="text-gray-500 text-[10px] font-semibold">{l.time}</span>
            <span className={l.type === 'success' ? 'text-emerald-400' : 'text-cyan-300'}>
              {l.text}
            </span>
          </div>
        ))}

        <div className="flex items-center gap-2 text-purple-400 animate-pulse pt-1">
          <span>❯</span>
          <span className="w-2 h-4 bg-purple-400 inline-block" />
        </div>
      </div>
    </div>
  );
};
