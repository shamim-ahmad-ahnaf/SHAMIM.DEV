import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu } from 'lucide-react';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void, key?: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="relative flex flex-col items-center"
      >
        <div className="relative mb-12">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 border-2 border-primary/20 rounded-full"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-t-2 border-primary rounded-full shadow-[0_0_15px_var(--color-primary)]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Cpu className="text-primary w-8 h-8 animate-pulse" />
          </div>
        </div>

        <div className="w-64 h-1 bg-white/5 rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-primary shadow-[0_0_10px_var(--color-primary)]"
          />
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="text-[10px] uppercase tracking-[0.5em] text-primary font-black">
            Initializing Neural Network
          </div>
          <div className="text-[10px] font-mono text-white/30">
            {Math.round(progress)}% COMPLETE
          </div>
        </div>
      </motion.div>

      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-5 pointer-events-none overflow-hidden">
        <div className="absolute inset-0" style={{ 
          backgroundImage: 'radial-gradient(var(--color-primary) 1px, transparent 1px)', 
          backgroundSize: '40px 40px' 
        }} />
      </div>
    </div>
  );
};
