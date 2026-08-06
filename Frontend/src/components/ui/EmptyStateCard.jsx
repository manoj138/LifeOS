import React from 'react';
import { Sparkles, BookOpen } from 'lucide-react';
import { Button } from './Button';
import { LottieAnimation } from './LottieAnimation';

export const EmptyStateCard = ({
  icon,
  lottieSrc,
  title = 'No Data Found',
  description = 'There are no records matching your request.',
  actionLabel,
  onAction,
  className = ''
}) => {
  return (
    <div className={`p-8 rounded-2xl bg-white/[0.02] border border-white/10 text-center space-y-4 ${className}`}>
      {lottieSrc ? (
        <LottieAnimation
          src={lottieSrc}
          className="w-28 h-28 mx-auto"
          fallbackIcon={icon || <BookOpen className="w-7 h-7 text-purple-400" />}
        />
      ) : (
        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mx-auto text-purple-400">
          {icon || <BookOpen className="w-7 h-7" />}
        </div>
      )}
      <div className="space-y-1 max-w-sm mx-auto">
        <h4 className="text-base font-bold text-white">{title}</h4>
        <p className="text-xs text-gray-400 leading-relaxed">{description}</p>
      </div>
      {actionLabel && onAction && (
        <div className="pt-2">
          <Button size="sm" variant="primary" onClick={onAction} leftIcon={<Sparkles className="w-3.5 h-3.5" />}>
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
};
