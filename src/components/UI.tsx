import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useCursor } from '../hooks/useCursor';

export const CursorGlow = () => {
  const { x, y } = useCursor();
  return (
    <div
      className="pointer-events-none fixed z-[9999] mix-blend-screen"
      style={{
        left: x - 150,
        top: y - 150,
        width: 300,
        height: 300,
        background: 'radial-gradient(circle, rgba(34,197,94,0.08) 0%, transparent 70%)',
        transition: 'left 0.1s ease, top 0.1s ease',
      }}
    />
  );
};

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return p + Math.random() * 12;
      });
    }, 80);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[9998] bg-bg flex flex-col items-center justify-center gap-8"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center gap-3"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 rounded-xl bg-accent/20 border border-accent/40 flex items-center justify-center"
        >
          <span className="material-icons text-accent text-2xl" style={{fontFamily:'Material Icons'}}>bolt</span>
        </motion.div>
        <span className="font-display text-4xl tracking-wider text-white">EQUINOX</span>
      </motion.div>

      {/* Progress bar */}
      <div className="w-64 h-px bg-white/5 rounded-full overflow-hidden relative">
        <motion.div
          className="h-full bg-accent rounded-full"
          style={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
        {/* Loader sweep */}
        <div className="absolute inset-0 loader-bar opacity-60" />
      </div>

      <div className="text-xs text-muted tracking-widest uppercase">
        {progress < 30 ? 'Initializing...' : progress < 60 ? 'Loading Programs...' : progress < 90 ? 'Syncing AI Coach...' : 'Ready'}
      </div>
    </motion.div>
  );
};
