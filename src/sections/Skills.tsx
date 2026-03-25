import React from 'react';
import { motion } from 'motion/react';
import { SKILLS } from '../constants';
import { Layers, Code, Database, Brain, Wrench, Cpu, Globe, Zap } from 'lucide-react';
import { Reveal } from '../components/Reveal';

interface CircularSkillProps {
  name: string;
  level: number;
  icon: any;
  key?: string;
}

const CircularSkill = ({ name, level, icon: Icon }: CircularSkillProps) => {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (level / 100) * circumference;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center group"
    >
      <div className="relative w-24 h-24 mb-4">
        <svg className="w-full h-full -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-white/5 fill-none"
            strokeWidth="4"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            className="stroke-primary fill-none"
            strokeWidth="4"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: offset }}
            transition={{ duration: 1.5, ease: "circOut" }}
            viewport={{ once: true }}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-primary group-hover:drop-shadow-[0_0_8px_rgba(57,255,20,0.6)] transition-all">
          <Icon size={24} />
        </div>
      </div>
      <span className="text-[10px] uppercase tracking-widest text-white/60 group-hover:text-primary transition-colors">{name}</span>
      <span className="text-xs font-bold mt-1">{level}%</span>
    </motion.div>
  );
};

export const Skills = () => {
  const categories = [
    { name: 'Frontend', icon: <Globe size={14} />, tech: <Code size={18} /> },
    { name: 'Backend', icon: <Database size={14} />, tech: <Zap size={18} /> },
    { name: 'AI/ML', icon: <Brain size={14} />, tech: <Cpu size={18} /> },
    { name: 'Tools', icon: <Wrench size={14} />, tech: <Layers size={18} /> }
  ];

  const coreSkills = SKILLS.filter(s => s.isCore);
  const otherSkills = SKILLS.filter(s => !s.isCore);

  const getIcon = (name: string) => {
    if (name.includes('React')) return Code;
    if (name.includes('TypeScript')) return Globe;
    if (name.includes('Node')) return Zap;
    if (name.includes('AI')) return Brain;
    return Cpu;
  };

  return (
    <section id="skills" className="py-20 sm:py-32 px-6 bg-white/[0.01] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-primary/5 blur-[120px] rounded-full -translate-y-1/2 -z-10" />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center text-center mb-16 sm:mb-24">
          <Reveal>
            <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <Layers size={14} />
              <span>Expertise</span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              Technical <span className="text-primary">Arsenal</span>
            </h2>
          </Reveal>
        </div>

        {/* Core Skills - Circular Indicators */}
        <div className="mb-20 sm:mb-32">
          <Reveal>
            <h3 className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-white/30 mb-8 sm:mb-12 text-center">Core Technologies</h3>
          </Reveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-12">
            {coreSkills.map((skill) => (
              <CircularSkill 
                key={skill.name} 
                name={skill.name} 
                level={skill.level} 
                icon={getIcon(skill.name)} 
              />
            ))}
          </div>
        </div>

        {/* Categories - Progress Bars */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, idx) => (
            <motion.div 
              key={cat.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 border-t border-white/10 group hover:border-primary/30 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8 border-b border-primary/10 pb-4 group-hover:border-primary/40 transition-colors">
                <h3 className="text-primary text-sm font-bold uppercase tracking-widest">
                  {cat.name}
                </h3>
                <div className="text-white/20 group-hover:text-primary transition-colors">
                  {cat.tech}
                </div>
              </div>
              
              <div className="space-y-8">
                {otherSkills.filter(s => s.category === cat.name).map((skill, sIdx) => (
                  <div key={skill.name} className="group/skill">
                    <div className="flex justify-between text-[10px] uppercase tracking-widest mb-3">
                      <span className="text-white/60 group-hover/skill:text-white transition-colors">{skill.name}</span>
                      <span className="text-primary font-bold">{skill.level}%</span>
                    </div>
                    <div className="h-1 w-full bg-white/5 overflow-hidden rounded-full">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1.5, delay: (idx * 0.1) + (sIdx * 0.1), ease: "circOut" }}
                        viewport={{ once: true }}
                        className="h-full bg-primary relative"
                      >
                        <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full blur-[4px] shadow-[0_0_10px_var(--color-primary)]" />
                      </motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
