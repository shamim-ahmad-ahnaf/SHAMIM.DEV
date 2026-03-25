import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot, User, Sparkles, ChevronRight } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
}

const PREDEFINED_RESPONSES: Record<string, string> = {
  "skills": "I'm proficient in Frontend (React, Next.js, JavaScript, Tailwind CSS), Backend (Node.js, Express.js, MongoDB), and Firebase. I also have strong English communication skills.",
  "projects": "I've worked on several projects like 'SHAMIM-CHAT' (Real-time chat), 'Attendance-Pro' (Management system), and 'NoorTime' (Islamic utility). Check out the Projects section for more details!",
  "contact": "You can reach me via the contact form below or email me directly at shamimahmadahnaf@gmail.com. I'm also active on LinkedIn and GitHub!",
  "hire": "I'm currently available for freelance projects and full-time roles. Let's build something amazing together! You can find my contact details in the Contact section.",
  "about": "I'm Shamim Ahmad, a Web Developer who transitioned from a Madrasa background (Dawah '23) to modern tech. I'm passionate about building impactful digital solutions.",
  "default": "I'm not sure about that, but I can tell you about my skills, projects, or how to contact me. Try one of the suggestions below!"
};

const SUGGESTIONS = [
  { label: "Tell me about your skills", key: "skills" },
  { label: "Show me your projects", key: "projects" },
  { label: "How can I contact you?", key: "contact" },
  { label: "Are you available for hire?", key: "hire" }
];

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerText = text.toLowerCase();
      let responseText = PREDEFINED_RESPONSES.default;

      if (lowerText.includes('skill')) responseText = PREDEFINED_RESPONSES.skills;
      else if (lowerText.includes('project')) responseText = PREDEFINED_RESPONSES.projects;
      else if (lowerText.includes('contact') || lowerText.includes('email')) responseText = PREDEFINED_RESPONSES.contact;
      else if (lowerText.includes('hire') || lowerText.includes('work')) responseText = PREDEFINED_RESPONSES.hire;
      else if (lowerText.includes('about') || lowerText.includes('who')) responseText = PREDEFINED_RESPONSES.about;

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (key: string, label: string) => {
    handleSend(label);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-primary text-background rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(57,255,20,0.4)] group"
      >
        <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full animate-ping opacity-50" />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-0 right-0 sm:bottom-28 sm:right-8 z-[100] w-full sm:w-[450px] h-[100dvh] sm:h-[750px] sm:max-h-[85vh] bg-[#0a0a0a]/95 backdrop-blur-2xl border-t sm:border border-white/10 flex flex-col overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] sm:rounded-2xl"
          >
            {/* Header */}
            <div className="p-5 sm:p-6 bg-[#111] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary border border-primary/30">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-widest">AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                    <span className="text-[10px] text-primary font-bold uppercase tracking-tight">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/40 hover:text-white"
              >
                <X size={24} className="sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 custom-scrollbar">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, x: msg.sender === 'bot' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${msg.sender === 'bot' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      msg.sender === 'bot' ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-white/10 text-white border border-white/20'
                    }`}>
                      {msg.sender === 'bot' ? <Bot size={14} /> : <User size={14} />}
                    </div>
                    <div className={`p-3 sm:p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'bot' 
                        ? 'bg-white/5 text-white/80 rounded-tl-none' 
                        : 'bg-primary text-background font-medium rounded-tr-none shadow-[0_0_15px_rgba(57,255,20,0.2)]'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-primary/20 flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none flex gap-1">
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.2 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: 0.4 }} className="w-1.5 h-1.5 bg-primary rounded-full" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            <div className="px-5 sm:px-6 pb-4 flex flex-wrap gap-2 bg-transparent relative z-10">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s.key}
                  onClick={() => handleSuggestion(s.key, s.label)}
                  className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 bg-white/5 border border-white/10 rounded-full hover:border-primary/50 hover:text-primary transition-all flex items-center gap-1.5 group whitespace-nowrap"
                >
                  <Sparkles size={10} className="group-hover:text-primary" />
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-5 sm:p-6 border-t border-white/10 bg-black/40 backdrop-blur-md pb-8 sm:pb-6">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 text-xs sm:text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:bg-primary/10 rounded-lg transition-all disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="mt-3 flex items-center justify-center gap-1.5 text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-white/20 font-bold">
                Powered by <span className="text-primary/50">Neon AI Core</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
