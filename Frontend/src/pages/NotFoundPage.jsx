import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#09090b] flex flex-col items-center justify-center p-6 text-center">
      <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-0.5 shadow-2xl shadow-purple-500/40 mb-6 flex items-center justify-center">
        <div className="w-full h-full bg-[#0c0c10] rounded-[22px] flex items-center justify-center">
          <Bot className="w-10 h-10 text-cyan-400 animate-pulse" />
        </div>
      </div>

      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 tracking-tight">
        404
      </h1>
      <h2 className="text-2xl font-bold text-white tracking-tight mt-2">
        Coordinates Lost in Hyperspace
      </h2>
      <p className="text-sm text-gray-400 max-w-md mt-2 mb-8">
        The requested feature route does not exist or has been relocated by LifeOS AI.
      </p>

      <Button variant="primary" size="lg" onClick={() => navigate('/app/dashboard')} leftIcon={<ArrowLeft className="w-5 h-5" />}>
        Return to Dashboard
      </Button>
    </div>
  );
};
