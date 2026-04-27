import React from 'react';
import { motion } from 'framer-motion';

const Loader = () => {
  return (
    <div className="flex items-center space-x-1.5 p-4 bg-white dark:bg-[#1e293b] rounded-2xl rounded-bl-none w-fit shadow-sm border border-slate-200/50 dark:border-slate-700/50 mb-8 ml-11">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-1.5 bg-blue-500/60 dark:bg-blue-400/60 rounded-full"
          animate={{ 
            y: [0, -6, 0],
            opacity: [0.4, 1, 0.4]
          }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            delay: i * 0.15,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

export default Loader;
