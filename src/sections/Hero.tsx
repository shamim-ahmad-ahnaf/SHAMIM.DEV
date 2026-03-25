import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Terminal, Github, Linkedin, Twitter } from 'lucide-react';

const Typewriter = ({ texts, delay = 150, pause = 2000 }: { texts: string[], delay?: number, pause?: number }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = texts[currentTextIndex];
      
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText.length === 0) {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? delay / 2 : delay);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentTextIndex, texts, delay, pause]);

  return (
    <span className="inline-block min-w-[20px]">
      {currentText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-1 h-8 md:h-12 bg-primary ml-1 align-middle"
      />
    </span>
  );
};

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center px-6 py-20 overflow-hidden bg-transparent">
      {/* Main Content */}
      <div className="relative z-10 text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary/30 text-[8px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.3em] text-primary mb-8 sm:mb-10 glow-border"
        >
          <Terminal size={12} className="animate-pulse" />
          <span>Protocol: Creative_Intelligence_v2</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="text-white/40 text-lg md:text-2xl font-mono mb-4 tracking-tight">
            Hello, I am <span className="text-white font-bold glow-text">SHAMIM AHMAD</span>
          </h2>
          
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] sm:leading-[0.85] mb-8 uppercase">
            I build <br />
            <span className="neon-text glow-text">
              <Typewriter 
                texts={["Web Applications", "React Interfaces", "Backend Systems", "Digital Experiences"]} 
              />
            </span>
          </h1>

          <p className="text-base md:text-xl text-white/50 max-w-2xl mx-auto mb-10 sm:mb-12 font-light leading-relaxed">
            Passionate Web Developer specializing in React and Node.js. 
            Bridging the gap between Madrasa education and modern technology 
            to create impactful digital solutions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(57, 255, 20, 0.3)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto bg-primary text-black px-8 sm:px-10 py-4 font-black uppercase tracking-widest text-xs sm:text-sm flex items-center justify-center gap-3 group"
            >
              View Projects 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(57, 255, 20, 0.1)" }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto neon-border px-8 sm:px-10 py-4 font-black uppercase tracking-widest text-xs sm:text-sm text-center"
            >
              Contact Me
            </motion.a>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 text-white/30">
            {[
              { icon: <Github size={20} />, href: "https://github.com/shamim-ahmad-ahnaf" },
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shamim-ahmad-772484331" },
              { icon: <Twitter size={20} />, href: "https://x.com/AhnafM7674" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, color: "var(--color-primary)" }}
                className="transition-colors"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
      
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 z-30"
      >
        <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-bold">Scroll</span>
        <div className="w-px h-16 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>

      {/* Corner Accents */}
      <div className="absolute top-10 left-10 w-20 h-20 border-t border-l border-primary/20 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-20 h-20 border-b border-r border-primary/20 pointer-events-none" />
    </section>
  );
};
