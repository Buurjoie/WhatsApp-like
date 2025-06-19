import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import type { Message, InsertMessage } from '@shared/schema';

export function useChat() {
  const queryClient = useQueryClient();

  const { data: messages = [], isLoading } = useQuery<Message[]>({
    queryKey: ['/api/messages'],
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (content: string) => {
      const messageData: InsertMessage = {
        content,
        type: 'sent',
        status: 'sent',
      };
      const response = await apiRequest('POST', '/api/messages', messageData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
  });

  const editMessageMutation = useMutation({
    mutationFn: async ({ id, content }: { id: number; content: string }) => {
      const response = await apiRequest('PUT', `/api/messages/${id}`, {
        content,
        isEdited: true,
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/messages'] });
    },
  });

  const sendMessage = useCallback(async (content: string) => {
    return sendMessageMutation.mutateAsync(content);
  }, [sendMessageMutation]);

  const editMessage = useCallback(async (id: number, content: string) => {
    return editMessageMutation.mutateAsync({ id, content });
  }, [editMessageMutation]);

  return {
    messages,
    loading: isLoading || sendMessageMutation.isPending || editMessageMutation.isPending,
    sendMessage,
    editMessage,
  };
}
