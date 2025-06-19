import React from 'react';
import { ArrowLeft, Search, MoreVertical, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatHeaderProps {
  onToggleTheme?: () => void;
  isDark?: boolean;
  onToggleSidebar?: () => void;
  showBackButton?: boolean;
}

export function ChatHeader({ onToggleTheme, isDark, onToggleSidebar, showBackButton }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
      <div className="flex items-center space-x-3">
        {showBackButton && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            className="lg:hidden"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
        )}
        
        <div className="relative">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
            </svg>
          </div>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
        </div>
        
        <div>
          <h2 className="font-medium text-gray-800 dark:text-gray-100">Assistant Bot</h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <Search className="w-5 h-5" />
        </Button>
        
        {onToggleTheme && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggleTheme}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        )}
        
        <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
