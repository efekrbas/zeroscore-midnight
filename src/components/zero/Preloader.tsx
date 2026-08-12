import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Preloader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide preloader after 2.2 seconds for a premium feel
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#02040a]"
        >
          {/* Logo container with pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative mb-8 size-28 rounded-3xl bg-primary/5 p-5 border border-primary/10 shadow-[0_0_60px_rgba(6,182,212,0.15)]"
          >
            <img 
              src="/logo.svg" 
              alt="ZeroScore Logo" 
              className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]" 
            />
          </motion.div>
          
          {/* Progress Bar Container */}
          <div className="w-56 h-1 overflow-hidden rounded-full bg-white/5 relative">
            {/* Glow under progress bar */}
            <motion.div
              initial={{ width: "0%", opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="absolute inset-0 bg-emerald-500 blur-sm opacity-50"
            />
            {/* Actual progress bar */}
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.8, ease: "easeInOut" }}
              className="relative h-full bg-gradient-to-r from-emerald-300 via-emerald-400 to-emerald-600 rounded-full"
            />
          </div>
          
          {/* Text */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-8 flex items-center gap-1.5 text-xs font-semibold tracking-[0.25em] text-muted-foreground uppercase"
          >
            Initializing Protocol <span className="flex gap-0.5 text-primary">
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}>.</motion.span>
              <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }}>.</motion.span>
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
