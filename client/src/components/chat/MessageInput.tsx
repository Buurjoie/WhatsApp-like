import React, { useState, useRef, useEffect } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { autoResizeTextarea } from '@/lib/utils';

interface MessageInputProps {
  onSendMessage: (content: string) => void;
  disabled?: boolean;
}

export function MessageInput({ onSendMessage, disabled }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage || disabled) return;

    onSendMessage(trimmedMessage);
    setMessage('');
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    autoResizeTextarea(e.target);
  };

  useEffect(() => {
    if (textareaRef.current) {
      autoResizeTextarea(textareaRef.current);
    }
  }, [message]);

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-600">
      <div className="flex items-end space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 flex-shrink-0"
        >
          <Paperclip className="w-5 h-5" />
        </Button>
        
        <div className="flex-1 relative">
          <div className="flex items-end bg-white dark:bg-gray-700 rounded-full border border-gray-200 dark:border-gray-600 focus-within:border-green-500 transition-colors">
            <textarea
              ref={textareaRef}
              rows={1}
              value={message}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Type a message..."
              disabled={disabled}
              className="flex-1 px-4 py-3 bg-transparent text-gray-800 dark:text-gray-100 placeholder-gray-500 resize-none border-none outline-none rounded-full max-h-32"
              style={{ minHeight: '44px' }}
            />
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mr-2"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <Button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="p-3 bg-green-500 hover:bg-green-600 text-white rounded-full flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
