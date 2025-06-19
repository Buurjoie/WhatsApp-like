import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  isVisible: boolean;
}

export function TypingIndicator({ isVisible }: TypingIndicatorProps) {
  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex items-start space-x-2"
    >
      <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
        </svg>
      </div>
      
      <div className="max-w-xs lg:max-w-md">
        <div
          className="relative bg-white dark:bg-gray-700 px-4 py-3 rounded-lg shadow-sm"
          style={{
            borderTopLeftRadius: '4px',
            borderTopRightRadius: '12px',
          }}
        >
          {/* Message tail */}
          <div className="absolute top-0 left-[-6px] w-0 h-0 border-r-[6px] border-r-white dark:border-r-gray-700 border-l-0 border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent" />
          
          <div className="flex items-center space-x-1">
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
            />
            <motion.span
              className="w-2 h-2 bg-gray-400 rounded-full"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4,
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
