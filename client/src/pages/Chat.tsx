import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ChatHeader } from '@/components/chat/ChatHeader';
import { ChatSidebar } from '@/components/chat/ChatSidebar';
import { ChatBubble } from '@/components/chat/ChatBubble';
import { MessageInput } from '@/components/chat/MessageInput';
import { TypingIndicator } from '@/components/chat/TypingIndicator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useChat } from '@/hooks/useChat';
import { useWebSocket } from '@/hooks/useWebSocket';

export default function Chat() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { messages, sendMessage, editMessage, loading } = useChat();
  
  const isConnected = true; // Simplified without WebSocket for better stability

  // Theme management
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initialTheme = savedTheme || systemTheme;
    
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    await sendMessage(content);
  };

  const handleEditMessage = async (id: number, content: string) => {
    await editMessage(id, content);
  };

  return (
    <div className="flex h-screen max-w-7xl mx-auto bg-white dark:bg-gray-900 shadow-2xl">
      <ChatSidebar 
        isOpen={sidebarOpen} 
        onToggleTheme={toggleTheme}
        isDark={theme === 'dark'}
      />
      
      <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900" 
           style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23${theme === 'dark' ? 'ffffff' : '000000'}' fill-opacity='${theme === 'dark' ? '0.05' : '0.03'}'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
           }}>
        
        <ChatHeader
          onToggleTheme={toggleTheme}
          isDark={theme === 'dark'}
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showBackButton={!sidebarOpen}
        />
        
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                onEdit={handleEditMessage}
              />
            ))}
            
            <AnimatePresence>
              <TypingIndicator isVisible={isTyping} />
            </AnimatePresence>
            
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        <MessageInput
          onSendMessage={handleSendMessage}
          disabled={loading || !isConnected}
        />
      </div>
    </div>
  );
}
