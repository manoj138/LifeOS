import React, { useState } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Bot, Sparkles } from 'lucide-react';

export const LottieAnimation = ({
  src,
  autoplay = true,
  loop = true,
  className = 'w-24 h-24',
  style,
  fallbackIcon = null,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        {fallbackIcon || (
          <div className="w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 animate-pulse">
            <Bot className="w-8 h-8" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center overflow-hidden ${className}`} style={style}>
      <DotLottieReact
        src={src}
        autoplay={autoplay}
        loop={loop}
        onError={() => setHasError(true)}
        className="w-full h-full object-contain"
        {...props}
      />
    </div>
  );
};

export default LottieAnimation;
