import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from './Button';

export const QuizCard = ({
  questionNumber,
  questionText,
  options = [],
  correctAnswer,
  explanation,
  onSelectOption,
  className = ''
}) => {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);

  const handleSelect = (idx) => {
    setSelectedIdx(idx);
    if (onSelectOption) onSelectOption(idx, idx === correctAnswer);
  };

  return (
    <div className={`rounded-3xl bg-[#0d0d14]/80 backdrop-blur-2xl border border-white/10 p-6 space-y-4 shadow-2xl relative overflow-hidden ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          {questionNumber && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono font-bold">
              Q{questionNumber}
            </span>
          )}
          <h4 className="text-sm sm:text-base font-bold text-white tracking-tight leading-relaxed">
            {questionText}
          </h4>
        </div>
      </div>

      <div className="space-y-2 pt-1">
        {options.map((opt, idx) => {
          const isSelected = selectedIdx === idx;
          const isCorrect = correctAnswer !== undefined && idx === correctAnswer;
          const showValidation = selectedIdx !== null;

          let btnStyles = "bg-slate-900/80 text-gray-300 border-white/10 hover:border-white/20";
          if (showValidation) {
            if (isCorrect) {
              btnStyles = "bg-emerald-500/15 text-emerald-300 border-emerald-500/40 font-bold";
            } else if (isSelected && !isCorrect) {
              btnStyles = "bg-rose-500/15 text-rose-300 border-rose-500/40 font-bold";
            }
          }

          return (
            <button
              key={idx}
              type="button"
              onClick={() => handleSelect(idx)}
              className={`w-full p-3 rounded-2xl border text-left text-xs sm:text-sm transition-all duration-200 flex items-center justify-between gap-3 ${btnStyles}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt}</span>
              </div>

              {showValidation && isCorrect && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              )}
              {showValidation && isSelected && !isCorrect && (
                <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {explanation && selectedIdx !== null && (
        <div className="pt-2 border-t border-white/10">
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showExplanation ? 'Hide Explanation' : 'View Explanation'}</span>
            {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showExplanation && (
            <div className="mt-2.5 p-3 rounded-2xl bg-purple-950/20 border border-purple-500/30 text-xs text-gray-300 leading-relaxed animate-fadeIn">
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizCard;
