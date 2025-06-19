import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, CheckCheck, Edit2, X, Save } from 'lucide-react';
import { formatTime } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { Message } from '@shared/schema';

interface ChatBubbleProps {
  message: Message;
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
}

export function ChatBubble({ message, onEdit, onDelete }: ChatBubbleProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);
  const isSent = message.type === 'sent';

  const handleSaveEdit = () => {
    if (editContent.trim() && editContent !== message.content) {
      onEdit?.(message.id, editContent.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  const getStatusIcon = () => {
    if (message.type === 'received') return null;
    
    switch (message.status) {
      case 'sent':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="w-4 h-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="w-4 h-4 text-green-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex items-start space-x-2 ${isSent ? 'justify-end' : ''}`}
    >
      {!isSent && (
        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
        </div>
      )}
      
      <div className="max-w-xs lg:max-w-md group">
        <motion.div
          className={`relative px-4 py-2 rounded-lg shadow-sm ${
            isSent 
              ? 'bg-green-100 dark:bg-green-800 ml-auto' 
              : 'bg-white dark:bg-gray-700'
          } ${isEditing ? 'ring-2 ring-green-500' : ''}`}
          style={{
            borderTopRightRadius: isSent ? '4px' : '12px',
            borderTopLeftRadius: isSent ? '12px' : '4px',
          }}
          animate={isEditing ? { 
            boxShadow: "0 0 0 2px rgba(34, 197, 94, 0.5)" 
          } : {}}
        >
          {/* Message tail */}
          <div
            className={`absolute top-0 w-0 h-0 ${
              isSent
                ? 'right-[-6px] border-l-[6px] border-l-green-100 dark:border-l-green-800 border-r-0'
                : 'left-[-6px] border-r-[6px] border-r-white dark:border-r-gray-700 border-l-0'
            } border-t-[6px] border-b-[6px] border-t-transparent border-b-transparent`}
          />

          {isEditing && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center space-x-2 mb-2"
            >
              <Edit2 className="w-4 h-4 text-green-500" />
              <span className="text-xs text-green-500 font-medium">Editing...</span>
            </motion.div>
          )}

          {isEditing ? (
            <div className="space-y-2">
              <Input
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-transparent border-none outline-none p-0 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSaveEdit();
                  } else if (e.key === 'Escape') {
                    handleCancelEdit();
                  }
                }}
                autoFocus
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleSaveEdit}
                    className="text-xs text-green-500 hover:text-green-600 p-0 h-auto"
                  >
                    <Save className="w-3 h-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleCancelEdit}
                    className="text-xs text-gray-500 hover:text-gray-600 p-0 h-auto"
                  >
                    <X className="w-3 h-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <p className={`text-sm ${isSent ? 'text-gray-800 dark:text-white' : 'text-gray-800 dark:text-gray-100'}`}>
                {message.content}
              </p>
              
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className={`text-xs ${isSent ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500'}`}>
                  {formatTime(message.timestamp)}
                </span>
                {message.isEdited && (
                  <span className={`text-xs ${isSent ? 'text-gray-600 dark:text-gray-300' : 'text-gray-500'}`}>
                    edited
                  </span>
                )}
                {getStatusIcon()}
              </div>
            </>
          )}

          {/* Edit button for sent messages */}
          {isSent && !isEditing && (
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="absolute -top-8 right-0 opacity-0 group-hover:opacity-100 transition-opacity p-1 h-6 w-6"
            >
              <Edit2 className="w-3 h-3" />
            </Button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}
