import{i as g,r as s,j as e,B as p,T as y}from"./index-DG3z8QK4.js";import{C as f}from"./check-Cj5S2ql4.js";import{C as v}from"./copy-DmdoW9Ot.js";import{P as j}from"./play-DGVVIGV2.js";const w=[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M10 12.5 8 15l2 2.5",key:"1tg20x"}],["path",{d:"m14 12.5 2 2.5-2 2.5",key:"yinavb"}]],b=g("file-code",w),S=({initialFiles:a=[{name:"server.js",lang:"javascript",code:`// MERN Microservices Express Gateway
import express from 'express';
import { createClient } from 'redis';

const app = express();
const redis = createClient({ url: 'redis://localhost:6379' });

app.get('/api/v1/health', async (req, res) => {
  const isHealthy = await redis.ping();
  res.json({ status: 'active', redis: isHealthy, timestamp: Date.now() });
});

app.listen(3000, () => console.log('🚀 Gateway active on port 3000'));`},{name:"RateLimiter.ts",lang:"typescript",code:`export class SlidingWindowRateLimiter {
  constructor(private redisClient: any, private limit: number = 100) {}

  async isAllowed(ip: string): Promise<boolean> {
    const key = \`rate_limit:\${ip}\`;
    const count = await this.redisClient.incr(key);
    if (count === 1) await this.redisClient.expire(key, 60);
    return count <= this.limit;
  }
}`}]})=>{const[i,m]=s.useState(0),[o,n]=s.useState(!1),[x,c]=s.useState(!1),[l,d]=s.useState(null),h=()=>{c(!0),d(null),setTimeout(()=>{c(!1),d({success:!0,logs:["[INFO] Compiling ES6 Modules...","[SUCCESS] Node.js v22.4 runtime initialized.","🚀 Gateway active on port 3000","GET /api/v1/health -> 200 OK (3ms)"]})},1e3)},u=()=>{navigator.clipboard.writeText(a[i].code),n(!0),setTimeout(()=>n(!1),2e3)};return e.jsxs("div",{className:"rounded-3xl bg-[#0a0a0f] border border-white/15 overflow-hidden shadow-2xl font-mono text-xs",children:[e.jsxs("div",{className:"flex items-center justify-between px-4 py-2.5 bg-[#12121c] border-b border-white/10",children:[e.jsx("div",{className:"flex items-center gap-1.5 overflow-x-auto",children:a.map((r,t)=>e.jsxs("button",{onClick:()=>m(t),className:`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors font-medium ${i===t?"bg-white/10 text-cyan-300 border border-white/10":"text-gray-400 hover:text-gray-200 hover:bg-white/5"}`,children:[e.jsx(b,{className:"w-3.5 h-3.5 text-purple-400"}),e.jsx("span",{children:r.name})]},t))}),e.jsxs("div",{className:"flex items-center gap-2 font-sans",children:[e.jsx(p,{size:"xs",variant:"ghost",onClick:u,leftIcon:o?e.jsx(f,{className:"w-3.5 h-3.5 text-emerald-400"}):e.jsx(v,{className:"w-3.5 h-3.5"}),children:o?"Copied":"Copy"}),e.jsx(p,{size:"xs",variant:"primary",onClick:h,isLoading:x,leftIcon:e.jsx(j,{className:"w-3.5 h-3.5"}),children:"Run Code"})]})]}),e.jsx("div",{className:"p-4 bg-[#09090d] text-gray-200 leading-relaxed overflow-x-auto max-h-80",children:e.jsx("pre",{children:e.jsx("code",{children:a[i].code})})}),l&&e.jsxs("div",{className:"p-4 bg-[#050508] border-t border-white/10 space-y-2",children:[e.jsxs("div",{className:"flex items-center justify-between text-[11px] font-bold text-gray-400",children:[e.jsxs("span",{className:"flex items-center gap-1 text-emerald-400",children:[e.jsx(y,{className:"w-3.5 h-3.5"})," Output Console"]}),e.jsx("span",{children:"Exit Code: 0"})]}),e.jsx("div",{className:"space-y-1 text-gray-300",children:l.logs.map((r,t)=>e.jsx("p",{className:"text-[11px] font-mono",children:r},t))})]})]})};export{S as C};
