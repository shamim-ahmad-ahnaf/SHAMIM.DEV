import React from 'react';
import { motion } from 'motion/react';
import { Github, Twitter, Linkedin, Cpu, Facebook, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 sm:py-20 px-6 border-t border-white/5 relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 text-xl font-bold tracking-tighter cursor-pointer group"
        >
          <Cpu className="text-primary w-6 h-6 group-hover:glow-text transition-all" />
          <span className="group-hover:glow-text transition-all">SHAMIM<span className="text-primary">.</span>DEV</span>
        </motion.div>

        <div className="text-white/40 text-[8px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] font-medium text-center">
          © 2026 SHAMIM AHMAD. All Rights Reserved.
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          {[
            { icon: <Github size={18} />, href: "https://github.com/shamim-ahmad-ahnaf", label: "GitHub" },
            { icon: <Twitter size={18} />, href: "https://x.com/AhnafM7674", label: "Twitter" },
            { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/shamim-ahmad-772484331", label: "LinkedIn" },
            { icon: <Facebook size={18} />, href: "https://www.facebook.com/shamimahmadahnaf", label: "Facebook" },
            { icon: <Instagram size={18} />, href: "https://www.instagram.com/shamim_ahmad_ahnaf/", label: "Instagram" }
          ].map((social, i) => (
            <motion.a 
              key={i}
              href={social.href} 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -5, color: "var(--color-primary)", scale: 1.2 }}
              className="text-white/40 transition-all duration-300"
              title={social.label}
            >
              {social.icon}
            </motion.a>
          ))}
        </div>
      </div>
      
      {/* Subtle Background Accent */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  );
};
