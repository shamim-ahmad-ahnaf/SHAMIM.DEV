import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Cpu, Sun, Moon, Download, ChevronRight } from 'lucide-react';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.classList.toggle('light');
  };

  const handleResumeDownload = () => {
    // Simulate a resume download
    const link = document.createElement('a');
    link.href = '#'; // Placeholder for actual PDF
    link.download = 'Alex_Chen_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    alert('Resume download initiated (simulated).');
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.a 
          href="#" 
          className="flex items-center gap-2 text-xl font-bold tracking-tighter group"
          whileHover={{ scale: 1.05 }}
        >
          <Cpu className="text-primary w-6 h-6 group-hover:glow-text transition-all" />
          <span className="group-hover:glow-text transition-all">SHAMIM<span className="text-primary">.</span>DEV</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.5 }}
              whileHover={{ y: -2, color: "var(--color-primary)", textShadow: "0 0 8px rgba(57, 255, 20, 0.4)" }}
              className="text-sm font-medium opacity-70 hover:opacity-100 transition-all uppercase tracking-widest"
            >
              {link.name}
            </motion.a>
          ))}
          
          <div className="flex items-center gap-4 ml-4">
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 glass rounded-full flex items-center justify-center text-primary border border-primary/20"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </motion.button>

            <motion.button 
              onClick={handleResumeDownload}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.05, backgroundColor: "var(--color-primary)", color: "black", boxShadow: "0 0 20px rgba(57, 255, 20, 0.4)" }}
              whileTap={{ scale: 0.95 }}
              className="neon-border px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all flex items-center gap-2"
            >
              Resume <Download size={14} />
            </motion.button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button onClick={toggleTheme} className="text-primary">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button className="text-white" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60] md:hidden"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-background/95 backdrop-blur-xl z-[70] md:hidden border-l border-white/10 p-10 flex flex-col shadow-2xl"
            >
              <div className="flex justify-between items-center mb-16">
                <div className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                  <Cpu className="text-primary w-6 h-6" />
                  <span>NEON<span className="text-primary">.</span>AI</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex flex-col gap-8">
                {navLinks.map((link, i) => (
                  <motion.a 
                    key={link.name} 
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * i }}
                    className="text-2xl font-bold uppercase tracking-widest hover:text-primary transition-colors flex items-center justify-between group"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                    <ChevronRight size={20} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all text-primary" />
                  </motion.a>
                ))}
              </div>

              <div className="mt-auto pt-10 border-t border-white/10 space-y-6">
                <button 
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between text-sm font-bold uppercase tracking-widest text-white/60 hover:text-white transition-colors"
                >
                  Appearance
                  <div className="flex items-center gap-2 text-primary">
                    {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                    <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </div>
                </button>

                <motion.button 
                  onClick={handleResumeDownload}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-black font-black uppercase tracking-widest py-5 rounded-xl flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(57,255,20,0.3)]"
                >
                  Resume <Download size={18} />
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
