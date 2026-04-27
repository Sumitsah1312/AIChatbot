import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

const ChatMessage = ({ message, isBot }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      className={`flex w-full mb-8 ${isBot ? 'justify-start' : 'justify-end'}`}
    >
      <div className={`flex items-end gap-3 max-w-[85%] md:max-w-[70%] ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className={`flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center shadow-lg ${
          isBot 
            ? 'bg-gradient-to-tr from-slate-800 to-slate-700 text-white' 
            : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
        }`}>
          {isBot ? <Sparkles size={16} /> : <User size={16} />}
        </div>
        
        <div className={`relative px-5 py-3.5 rounded-[22px] shadow-sm transition-all ${
          isBot 
            ? 'bg-white dark:bg-[#1e293b] text-slate-700 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700/50 rounded-bl-none' 
            : 'bg-blue-600 dark:bg-blue-600 text-white shadow-blue-500/10 rounded-br-none font-medium'
        }`}>
          <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{message}</p>
          
          {/* Subtle bubble tail/indicator could be added here but keeping it clean for now */}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;
