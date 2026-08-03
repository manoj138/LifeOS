import React, { useState } from 'react';
import { Play, Copy, Check, Terminal, FileCode, Sparkles, RefreshCw } from 'lucide-react';
import { Button } from './Button';
import { Badge } from './Badge';

export const CodeEditor = ({
  initialFiles = [
    { name: "server.js", lang: "javascript", code: `// MERN Microservices Express Gateway
import express from 'express';
import { createClient } from 'redis';

const app = express();
const redis = createClient({ url: 'redis://localhost:6379' });

app.get('/api/v1/health', async (req, res) => {
  const isHealthy = await redis.ping();
  res.json({ status: 'active', redis: isHealthy, timestamp: Date.now() });
});

app.listen(3000, () => console.log('🚀 Gateway active on port 3000'));` },
    { name: "RateLimiter.ts", lang: "typescript", code: `export class SlidingWindowRateLimiter {
  constructor(private redisClient: any, private limit: number = 100) {}

  async isAllowed(ip: string): Promise<boolean> {
    const key = \`rate_limit:\${ip}\`;
    const count = await this.redisClient.incr(key);
    if (count === 1) await this.redisClient.expire(key, 60);
    return count <= this.limit;
  }
}` }
  ]
}) => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [output, setOutput] = useState(null);

  const handleRun = () => {
    setIsRunning(true);
    setOutput(null);
    setTimeout(() => {
      setIsRunning(false);
      setOutput({
        success: true,
        logs: [
          "[INFO] Compiling ES6 Modules...",
          "[SUCCESS] Node.js v22.4 runtime initialized.",
          "🚀 Gateway active on port 3000",
          "GET /api/v1/health -> 200 OK (3ms)"
        ]
      });
    }, 1000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(initialFiles[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-3xl bg-[#0a0a0f] border border-white/15 overflow-hidden shadow-2xl font-mono text-xs">
      {/* Top File Tabs Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-[#12121c] border-b border-white/10">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {initialFiles.map((file, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors font-medium ${
                activeTab === idx
                  ? 'bg-white/10 text-cyan-300 border border-white/10'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-purple-400" />
              <span>{file.name}</span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 font-sans">
          <Button size="xs" variant="ghost" onClick={handleCopy} leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}>
            {copied ? 'Copied' : 'Copy'}
          </Button>

          <Button size="xs" variant="primary" onClick={handleRun} isLoading={isRunning} leftIcon={<Play className="w-3.5 h-3.5" />}>
            Run Code
          </Button>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-4 bg-[#09090d] text-gray-200 leading-relaxed overflow-x-auto max-h-80">
        <pre>
          <code>{initialFiles[activeTab].code}</code>
        </pre>
      </div>

      {/* Execution Output Console */}
      {output && (
        <div className="p-4 bg-[#050508] border-t border-white/10 space-y-2">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-400">
            <span className="flex items-center gap-1 text-emerald-400">
              <Terminal className="w-3.5 h-3.5" /> Output Console
            </span>
            <span>Exit Code: 0</span>
          </div>

          <div className="space-y-1 text-gray-300">
            {output.logs.map((log, i) => (
              <p key={i} className="text-[11px] font-mono">{log}</p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
