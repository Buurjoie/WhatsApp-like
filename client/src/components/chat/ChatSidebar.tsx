import React from 'react';
import { MessageCircle, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ChatSidebarProps {
  isOpen: boolean;
  onToggleTheme?: () => void;
  isDark?: boolean;
}

export function ChatSidebar({ isOpen, onToggleTheme, isDark }: ChatSidebarProps) {
  if (!isOpen) return null;

  return (
    <div className="hidden lg:flex lg:w-1/3 flex-col bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-600">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
            <MessageCircle className="w-6 h-6 text-white" />
          </div>
          <span className="font-medium text-gray-800 dark:text-gray-100">Chats</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <MoreVertical className="w-5 h-5" />
          </Button>
        </div>
      </div>
      
      {/* Chat List */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-2 space-y-1">
          {/* Active Chat */}
          <div className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700 cursor-pointer">
            <div className="relative">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-medium text-gray-800 dark:text-gray-100 truncate">Assistant Bot</h3>
                <span className="text-xs text-gray-500">12:34</span>
              </div>
              <p className="text-sm text-gray-500 truncate">Hello! How can I help you today?</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
