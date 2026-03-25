import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, MapPin, Github, Linkedin, Twitter, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Reveal } from '../components/Reveal';
// emailjs import removed as we switched to Formspree

const FloatingInput = ({ label, type = "text", value, onChange, required = false, isTextArea = false }: any) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value && value.length > 0;

  return (
    <div className="relative group">
      <motion.label
        initial={false}
        animate={{
          y: (isFocused || hasValue) ? -24 : 12,
          x: (isFocused || hasValue) ? 0 : 16,
          scale: (isFocused || hasValue) ? 0.8 : 1,
          color: isFocused ? "var(--color-primary)" : "rgba(255, 255, 255, 0.4)"
        }}
        className="absolute left-0 top-0 pointer-events-none text-[10px] uppercase tracking-widest font-bold z-10"
      >
        {label}
      </motion.label>
      {isTextArea ? (
        <textarea
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={4}
          className="w-full bg-white/5 border-b border-white/10 p-4 pt-6 focus:border-primary outline-none transition-all duration-300 resize-none glass group-hover:bg-white/10"
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-white/5 border-b border-white/10 p-4 pt-6 focus:border-primary outline-none transition-all duration-300 glass group-hover:bg-white/10"
        />
      )}
      <motion.div 
        initial={false}
        animate={{ width: isFocused ? "100%" : "0%" }}
        className="absolute bottom-0 left-0 h-0.5 bg-primary z-20"
      />
    </div>
  );
};

export const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    try {
      // Proxying through our own server to avoid client-side fetch issues (AdBlockers, etc.)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        const errorMessage = data.error || data.message || 'Failed to send message';
        console.error('Formspree Errors:', data);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Formspree Error:', error);
      setStatus('error');
      // You could potentially set a specific error message in state here to show in the UI
    } finally {
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-32 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Reveal>
            <div className="flex items-center gap-2 text-primary text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4">
              <Mail size={14} />
              <span>Contact</span>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tighter mb-6 sm:mb-8 uppercase leading-[0.9]">
              Let's Build <br /><span className="text-primary glow-text">The Future</span>
            </h2>
          </Reveal>
          <Reveal delay={0.4}>
            <p className="text-white/50 text-base sm:text-lg mb-8 sm:mb-12 max-w-md font-light leading-relaxed">
              Have a groundbreaking idea or a complex problem to solve? 
              I'm ready to help you architect the next generation of digital solutions.
            </p>
          </Reveal>

          <div className="space-y-6 sm:space-y-10 mb-10 sm:mb-12">
            {[
              { icon: <Mail size={20} />, label: "Email", value: "shamimahmadahnaf@gmail.com" },
              { icon: <MapPin size={20} />, label: "Location", value: "Dhaka, Bangladesh" }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (i * 0.1) }}
                viewport={{ once: true }}
                className="flex items-center gap-4 sm:gap-6 group"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 glass flex items-center justify-center text-primary group-hover:glow-border transition-all duration-500 rounded-xl border border-white/5">
                  {item.icon}
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/30 font-bold mb-1">{item.label}</div>
                  <div className="text-base sm:text-xl font-medium group-hover:text-primary transition-colors duration-300 truncate">{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: <Github size={20} />, href: "https://github.com/shamim-ahmad-ahnaf", label: "GitHub" },
              { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/shamim-ahmad-772484331", label: "LinkedIn" },
              { icon: <Twitter size={20} />, href: "https://x.com/AhnafM7674", label: "Twitter" }
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
                whileHover={{ y: -5, scale: 1.1 }}
                className="w-10 h-10 sm:w-12 sm:h-12 glass flex items-center justify-center text-white/40 hover:text-primary hover:glow-border transition-all duration-300 rounded-full border border-white/5"
                title={social.label}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative mt-12 lg:mt-0"
        >
          <div className="absolute -inset-4 bg-primary/5 blur-3xl rounded-full -z-10" />
          
          <form
            className="glass p-6 sm:p-8 md:p-12 space-y-8 sm:space-y-10 border border-white/5 hover:border-primary/20 transition-all duration-700 rounded-3xl shadow-2xl relative overflow-hidden"
            onSubmit={handleSubmit}
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-6 sm:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-primary/30"
                  >
                    <CheckCircle2 size={32} />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 uppercase tracking-tight">Transmission Received</h3>
                  <p className="text-white/50 text-xs sm:text-sm">Your message has been successfully sent through the neural network. I'll get back to you soon.</p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-primary hover:underline"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : status === 'error' ? (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background/90 backdrop-blur-sm p-6 sm:p-12 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', damping: 12 }}
                    className="w-16 h-16 sm:w-20 sm:h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-4 sm:mb-6 border border-red-500/30"
                  >
                    <AlertCircle size={32} />
                  </motion.div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2 uppercase tracking-tight text-red-500">Transmission Failed</h3>
                  <p className="text-white/50 text-xs sm:text-sm">Something went wrong. Please check your EmailJS configuration or try again later.</p>
                  <motion.button
                    onClick={() => setStatus('idle')}
                    className="mt-6 sm:mt-8 text-[10px] sm:text-xs font-bold uppercase tracking-widest text-red-500 hover:underline"
                  >
                    Try again
                  </motion.button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <div className="grid sm:grid-cols-2 gap-8 sm:gap-10">
              <FloatingInput 
                label="Your Name" 
                value={formState.name} 
                onChange={(val: string) => setFormState({ ...formState, name: val })} 
                required 
              />
              <FloatingInput 
                label="Your Email" 
                type="email" 
                value={formState.email} 
                onChange={(val: string) => setFormState({ ...formState, email: val })} 
                required 
              />
            </div>
            
            <FloatingInput 
              label="Your Message" 
              isTextArea 
              value={formState.message} 
              onChange={(val: string) => setFormState({ ...formState, message: val })} 
              required 
            />

            <motion.button
              disabled={status === 'loading'}
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(57, 255, 20, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-primary text-black font-black uppercase tracking-[0.2em] py-5 sm:py-6 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 rounded-xl text-xs sm:text-sm"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Initiate Transmission <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
