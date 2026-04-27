import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Paperclip, Plus } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[28px] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-end gap-3 bg-white dark:bg-[#1e293b] p-3 rounded-[26px] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-200 dark:border-slate-700/50 transition-all"
      >
        <button
          type="button"
          className="flex-shrink-0 p-3 text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-500/10 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          rows={1}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Message Antigravity..."
          disabled={isLoading}
          className="flex-grow bg-transparent text-slate-800 dark:text-slate-100 py-3 focus:outline-none resize-none text-[15px] max-h-40 scrollbar-hide placeholder:text-slate-400 dark:placeholder:text-slate-500"
        />
        
        <button
          type="submit"
          disabled={!input.trim() || isLoading}
          className={`flex-shrink-0 p-3 rounded-2xl transition-all duration-300 ${
            input.trim() && !isLoading
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30 scale-100 hover:scale-105 active:scale-95'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400 scale-95 opacity-50 cursor-not-allowed'
          }`}
        >
          {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
        </button>
      </form>
      <div className="mt-3 flex justify-center gap-6 text-[10px] font-medium text-slate-400 uppercase tracking-widest">
        <span>AI Generated Content</span>
        <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full my-auto"></span>
        <span>Secure Session</span>
      </div>
    </div>
  );
};

export default ChatInput;
