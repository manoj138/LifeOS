import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, AlertTriangle, Info, CheckCircle2, X } from 'lucide-react';
import { Button } from '../ui/Button';

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = "Are you sure?", 
  message, 
  confirmText = "Yes, Proceed", 
  cancelText = "Cancel", 
  variant = "danger", // danger, warning, info, success
  isLoading = false 
}) => {
  if (!isOpen) return null;

  const variantStyles = {
    danger: {
      border: "border-red-500/40 shadow-[0_0_50px_rgba(239,68,68,0.25)]",
      glowBg: "bg-red-500/10",
      ringColor: "ring-red-500/30",
      iconColor: "text-red-400",
      badgeGradient: "from-red-600/30 to-rose-600/10",
      btnVariant: "danger"
    },
    warning: {
      border: "border-amber-500/40 shadow-[0_0_50px_rgba(245,158,11,0.25)]",
      glowBg: "bg-amber-500/10",
      ringColor: "ring-amber-500/30",
      iconColor: "text-amber-400",
      badgeGradient: "from-amber-600/30 to-yellow-600/10",
      btnVariant: "glow"
    },
    info: {
      border: "border-cyan-500/40 shadow-[0_0_50px_rgba(6,182,212,0.25)]",
      glowBg: "bg-cyan-500/10",
      ringColor: "ring-cyan-500/30",
      iconColor: "text-cyan-400",
      badgeGradient: "from-cyan-600/30 to-blue-600/10",
      btnVariant: "glow"
    },
    success: {
      border: "border-emerald-500/40 shadow-[0_0_50px_rgba(16,185,129,0.25)]",
      glowBg: "bg-emerald-500/10",
      ringColor: "ring-emerald-500/30",
      iconColor: "text-emerald-400",
      badgeGradient: "from-emerald-600/30 to-teal-600/10",
      btnVariant: "glow"
    }
  };

  const currentVariant = variantStyles[variant] || variantStyles.danger;

  const icons = {
    danger: <AlertCircle className="w-8 h-8 text-red-400 animate-bounce" />,
    warning: <AlertTriangle className="w-8 h-8 text-amber-400 animate-pulse" />,
    info: <Info className="w-8 h-8 text-cyan-400" />,
    success: <CheckCircle2 className="w-8 h-8 text-emerald-400" />
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Semi-transparent dark blur backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Ultra-luxurious glassmorphic modal box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`relative w-full max-w-md bg-[#0d0d14]/90 backdrop-blur-2xl rounded-3xl p-6 border ${currentVariant.border} z-10 space-y-5 overflow-hidden`}
        >
          {/* Top subtle glow light effect */}
          <div className={`absolute -top-24 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full ${currentVariant.glowBg} blur-3xl pointer-events-none`} />

          {/* Close X button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white p-1 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-3 pt-2">
            {/* Glowing Icon Badge with Pulsing Ring */}
            <div className={`relative p-4 rounded-2xl bg-gradient-to-b ${currentVariant.badgeGradient} border border-white/10 ring-8 ${currentVariant.ringColor}`}>
              <div className="absolute inset-0 rounded-2xl bg-white/5 animate-pulse" />
              {icons[variant]}
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white tracking-tight">
                {title}
              </h3>
              {message && (
                <p className="text-xs text-gray-300 leading-relaxed max-w-xs">
                  {message}
                </p>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <Button
              variant="glass"
              className="flex-1 text-xs"
              onClick={onClose}
              disabled={isLoading}
            >
              {cancelText}
            </Button>

            <Button
              variant={currentVariant.btnVariant}
              className="flex-1 text-xs"
              onClick={onConfirm}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : confirmText}
            </Button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmModal;
