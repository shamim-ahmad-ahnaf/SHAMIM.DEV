import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

export const Background = () => {
  const { scrollYProgress } = useScroll();
  
  // Parallax transforms for different layers
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -800]);

  // Generate stars once
  const stars = useMemo(() => {
    return [...Array(100)].map((_, i) => ({
      id: i,
      size: Math.random() * 2 + 1,
      top: Math.random() * 100 + '%',
      left: Math.random() * 100 + '%',
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.2,
    }));
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-background">
      {/* Layer 1: Distant Stars (Slowest) */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {stars.slice(0, 40).map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [star.opacity, star.opacity * 0.3, star.opacity] }}
            transition={{ duration: star.duration, repeat: Infinity, delay: star.delay }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              backgroundColor: 'white',
              borderRadius: '50%',
              filter: 'blur(1px)',
            }}
          />
        ))}
      </motion.div>

      {/* Layer 2: Mid-range Stars (Medium) */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {stars.slice(40, 70).map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [star.opacity, star.opacity * 0.5, star.opacity] }}
            transition={{ duration: star.duration * 0.8, repeat: Infinity, delay: star.delay }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size * 1.5,
              height: star.size * 1.5,
              backgroundColor: 'var(--color-primary)',
              borderRadius: '50%',
              filter: 'blur(1.5px)',
            }}
          />
        ))}
      </motion.div>

      {/* Layer 3: Close Stars (Fastest) */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {stars.slice(70, 100).map((star) => (
          <motion.div
            key={star.id}
            animate={{ opacity: [star.opacity, star.opacity * 0.2, star.opacity] }}
            transition={{ duration: star.duration * 1.2, repeat: Infinity, delay: star.delay }}
            style={{
              position: 'absolute',
              top: star.top,
              left: star.left,
              width: star.size * 2,
              height: star.size * 2,
              backgroundColor: 'white',
              borderRadius: '50%',
              filter: 'blur(2px)',
            }}
          />
        ))}
      </motion.div>

      {/* Animated Gradient Blobs */}
      <div className="absolute inset-0">
        <motion.div 
          animate={{ 
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            x: [0, -80, 0],
            y: [0, -100, 0],
            scale: [1.2, 1, 1.2],
            opacity: [0.05, 0.1, 0.05] 
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 blur-[120px] rounded-full" 
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.02, 0.05, 0.02] 
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white/5 blur-[150px] rounded-full" 
        />
      </div>

      {/* Vignette Effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,0.4)_100%)]" />
    </div>
  );
};
