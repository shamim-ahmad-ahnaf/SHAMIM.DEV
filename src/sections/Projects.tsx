import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROJECTS } from '../constants';
import { ExternalLink, Github, Briefcase, X, ArrowRight, Filter } from 'lucide-react';
import { Reveal } from '../components/Reveal';
import { Project } from '../types';

export const Projects = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = ['All', 'Web', 'AI', 'Mobile', 'Blockchain'];

  const filteredProjects = useMemo(() => {
    if (activeCategory === 'All') return PROJECTS;
    return PROJECTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6 sm:gap-8">
        <div>
          <Reveal>
            <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <Briefcase size={14} />
              <span>Portfolio</span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter uppercase">
              Selected <span className="text-primary">Works</span>
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.4}>
          <p className="text-white/40 max-w-md text-xs sm:text-sm leading-relaxed">
            A collection of experimental projects exploring the intersection of 
            user experience and machine learning.
          </p>
        </Reveal>
      </div>

      {/* Filter Bar */}
      <Reveal delay={0.5}>
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <div className="flex items-center gap-2 text-white/30 mr-2 sm:mr-4">
            <Filter size={14} />
            <span className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold">Filter By:</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-6 py-2 text-[9px] sm:text-[10px] uppercase tracking-widest font-bold border transition-all duration-300 ${
                activeCategory === cat 
                  ? 'bg-primary text-background border-primary shadow-[0_0_15px_rgba(57,255,20,0.4)]' 
                  : 'bg-transparent text-white/40 border-white/10 hover:border-primary/50 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode='popLayout'>
          {filteredProjects.map((project, i) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -10 }}
              onClick={() => setSelectedProject(project)}
              className="group relative glass overflow-hidden border border-white/5 hover:border-primary/50 transition-all duration-500 cursor-pointer"
            >
              <div className="aspect-video overflow-hidden relative">
                <motion.img 
                  src={project.image} 
                  alt={project.title} 
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-background/80 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-widest text-primary font-bold">
                  {project.category}
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[8px] uppercase tracking-widest px-2 py-1 bg-white/5 text-white/40 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-2xl font-bold tracking-tighter mb-3 uppercase group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                
                <p className="text-white/50 text-xs leading-relaxed mb-8 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <motion.a 
                      href={project.github} 
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      whileHover={{ scale: 1.2, color: "var(--color-primary)" }}
                      className="text-white/30 transition-colors"
                    >
                      <Github size={18} />
                    </motion.a>
                    <motion.a 
                      href={project.live} 
                      onClick={(e) => e.stopPropagation()}
                      target="_blank"
                      whileHover={{ scale: 1.2, color: "var(--color-primary)" }}
                      className="text-white/30 transition-colors"
                    >
                      <ExternalLink size={18} />
                    </motion.a>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    View Details <ArrowRight size={12} />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-background/90 backdrop-blur-xl"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 z-10 p-2 bg-background/50 hover:bg-primary hover:text-background transition-all rounded-full text-white"
              >
                <X size={20} />
              </button>

              {/* Image Section */}
              <div className="w-full md:w-1/2 h-64 md:h-auto overflow-hidden">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content Section */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] uppercase tracking-widest font-bold border border-primary/20">
                    {selectedProject.category}
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <h3 className="text-4xl md:text-5xl font-bold tracking-tighter uppercase mb-6">
                  {selectedProject.title}
                </h3>

                <p className="text-white/60 text-sm leading-relaxed mb-8">
                  {selectedProject.longDescription || selectedProject.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {selectedProject.tags.map(tag => (
                    <span key={tag} className="text-[10px] uppercase tracking-widest px-3 py-1 bg-white/5 text-white/60 border border-white/10">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <a 
                    href={selectedProject.live} 
                    target="_blank"
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-primary text-background px-8 py-4 text-xs font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(57,255,20,0.4)] transition-all"
                  >
                    Live Preview <ExternalLink size={16} />
                  </a>
                  <a 
                    href={selectedProject.github} 
                    target="_blank"
                    className="flex-1 min-w-[160px] flex items-center justify-center gap-2 bg-white/5 text-white px-8 py-4 text-xs font-bold uppercase tracking-widest border border-white/10 hover:bg-white/10 transition-all"
                  >
                    Source Code <Github size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
