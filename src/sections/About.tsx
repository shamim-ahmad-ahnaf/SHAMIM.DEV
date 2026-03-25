import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Code, Zap, Globe, GraduationCap, Briefcase, Calendar } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { TIMELINE } from '../constants';

export const About = () => {
  const [activeTab, setActiveTab] = useState<'bio' | 'timeline'>('bio');
  const [hoveredTimelineIndex, setHoveredTimelineIndex] = useState<number | null>(null);

  const stats = [
    { icon: <Code size={20} />, label: "Experience", value: "1+ Year" },
    { icon: <Zap size={20} />, label: "Projects", value: "25+" },
    { icon: <Globe size={20} />, label: "Focus", value: "Web Dev" },
  ];

  return (
    <section id="about" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* Left Side: Image & Stats */}
        <div className="space-y-12 lg:sticky lg:top-32">
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative group"
          >
            <div className="aspect-square glass neon-border p-3 sm:p-4 relative overflow-hidden">
              <motion.img 
                src="https://picsum.photos/seed/profile/800/800" 
                alt="Profile" 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-primary/20 blur-3xl -z-10" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                viewport={{ once: true }}
                whileHover={{ y: -5, borderColor: "var(--color-primary)", boxShadow: "0 0 20px rgba(57, 255, 20, 0.1)" }}
                className="glass p-4 sm:p-6 border-l-2 border-primary/30 transition-all duration-300"
              >
                <div className="text-primary mb-2">{stat.icon}</div>
                <div className="text-xl sm:text-2xl font-bold tracking-tighter">{stat.value}</div>
                <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Interactive Content */}
        <div className="min-h-[500px] lg:min-h-[600px]">
          <div className="flex gap-6 sm:gap-8 mb-8 sm:mb-12 border-b border-white/10 overflow-x-auto scrollbar-hide">
            {['bio', 'timeline'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`pb-4 text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] transition-all relative whitespace-nowrap ${
                  activeTab === tab ? 'text-primary' : 'text-white/40 hover:text-white'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 w-full h-px bg-primary"
                  />
                )}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'bio' ? (
              <motion.div
                key="bio"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Reveal>
                  <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
                    <User size={14} />
                    <span>About Me</span>
                  </div>
                </Reveal>
                
                <Reveal delay={0.2}>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6 sm:mb-8 uppercase">
                    From <span className="text-primary">Tradition</span> to <br className="hidden sm:block" /> Technology
                  </h2>
                </Reveal>

                <Reveal delay={0.3}>
                  <div className="space-y-4 sm:space-y-6 text-white/60 text-base sm:text-lg leading-relaxed font-light">
                    <p>
                      I am Shamim Ahmad, a dedicated Web Developer with a unique journey. 
                      After completing my Madrasa education (Dawah) in 2023, I decided to 
                      pursue my passion for technology and the English language.
                    </p>
                    <p>
                      Over the past year, I have immersed myself in the world of web 
                      development, mastering modern tools like React, JavaScript, and 
                      Node.js. My goal is to build clean, efficient, and user-friendly 
                      applications that solve real-world problems.
                    </p>
                    <p>
                      I believe that learning is a lifelong process, and I am constantly 
                      expanding my horizons to stay at the forefront of the ever-evolving 
                      tech landscape.
                    </p>
                  </div>
                </Reveal>
              </motion.div>
            ) : (
              <motion.div
                key="timeline"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6 sm:space-y-8 relative before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-px before:bg-white/10"
              >
                {TIMELINE.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onMouseEnter={() => setHoveredTimelineIndex(i)}
                    onMouseLeave={() => setHoveredTimelineIndex(null)}
                    className="relative pl-12 group cursor-default"
                  >
                    {/* Timeline Dot */}
                    <div className={`absolute left-0 top-1 w-10 h-10 glass rounded-full flex items-center justify-center border transition-all duration-300 z-10 ${
                      hoveredTimelineIndex === i ? 'border-primary text-primary scale-110' : 'border-white/10 text-white/40'
                    }`}>
                      {item.type === 'work' ? <Briefcase size={16} /> : <GraduationCap size={16} />}
                    </div>

                    <div className={`transition-all duration-300 ${hoveredTimelineIndex === i ? 'translate-x-2' : ''}`}>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-primary text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{item.year}</span>
                        <div className="h-px w-6 sm:w-8 bg-primary/20" />
                        <span className="text-white/40 text-[9px] sm:text-[10px] uppercase tracking-widest">{item.company}</span>
                      </div>
                      <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors ${hoveredTimelineIndex === i ? 'text-primary' : 'text-white'}`}>
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-white/50 mt-2 leading-relaxed max-w-md">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
