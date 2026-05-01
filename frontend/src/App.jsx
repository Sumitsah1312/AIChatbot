import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import Loader from './components/Loader';
import ThemeToggle from './components/ThemeToggle';
import { sendMessage } from './services/api';
import { Bot, Trash2, Sparkles } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');
  
  const messagesEndRef = useRef(null);
  const sessionIdRef = useRef(`session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text) => {
    const userMessage = { id: Date.now(), text, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const data = await sendMessage(sessionIdRef.current, text);
      const botMessage = { id: Date.now() + 1, text: data.response, isBot: true };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      setError("Connection lost. Please check your API endpoint.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    sessionIdRef.current = `session-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setMessages([{ id: 1, text: "Hello! I'm your AI assistant. How can I help you today?", isBot: true }]);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 dark:bg-[#0b0f1a] transition-colors overflow-hidden font-sans selection:bg-blue-500/20">
      {/* Premium Header */}
      <header className="sticky top-0 flex items-center justify-between px-8 py-4 bg-white/80 dark:bg-[#111827]/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800/50 z-20">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-500/20 rotate-3">
              <Sparkles size={24} />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-white dark:border-[#111827] rounded-full"></div>
          </div>
          <div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 leading-tight">
              Genni AI
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.1em]">
              Next-Gen Assistant
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={clearChat}
            className="group flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all active:scale-95"
            title="Clear Chat"
          >
            <Trash2 size={18} className="group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-semibold hidden md:block">Reset</span>
          </button>
          <div className="w-px h-6 bg-slate-200 dark:bg-slate-800"></div>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </header>

      {/* Main Chat Area */}
      <main className="flex-grow overflow-y-auto px-4 md:px-8 py-10 scrollbar-hide">
        <div className="max-w-4xl mx-auto space-y-2">
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg.text} isBot={msg.isBot} />
          ))}
          
          {isLoading && <Loader />}
          
          {error && (
            <div className="max-w-md mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-medium text-center backdrop-blur-sm animate-in fade-in zoom-in duration-300">
              {error}
            </div>
          )}
          
          <div ref={messagesEndRef} className="h-24" />
        </div>
      </main>

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 p-4 md:p-8 bg-gradient-to-t from-slate-50 via-slate-50/80 to-transparent dark:from-[#0b0f1a] dark:via-[#0b0f1a]/80 pointer-events-none">
        <div className="max-w-4xl mx-auto pointer-events-auto">
          <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
