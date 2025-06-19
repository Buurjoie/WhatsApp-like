import { useEffect, useRef, useState, useCallback } from 'react';
import type { WSMessage } from '@shared/schema';

interface UseWebSocketOptions {
  onMessage?: (data: WSMessage) => void;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function useWebSocket({ onMessage, onConnect, onDisconnect }: UseWebSocketOptions = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const ws = useRef<WebSocket | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout>();
  const isConnecting = useRef(false);

  const connect = useCallback(() => {
    // Prevent multiple connection attempts
    if (isConnecting.current || (ws.current && ws.current.readyState !== WebSocket.CLOSED)) {
      return;
    }

    try {
      isConnecting.current = true;
      const protocol = window.location.protocol === "https:" ? "wss:" : "ws:";
      const wsUrl = `${protocol}//${window.location.host}/api/ws`;
      
      ws.current = new WebSocket(wsUrl);

      ws.current.onopen = () => {
        isConnecting.current = false;
        setIsConnected(true);
        onConnect?.();
        console.log('WebSocket connected');
      };

      ws.current.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data) as WSMessage;
          onMessage?.(data);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.current.onclose = (event) => {
        isConnecting.current = false;
        setIsConnected(false);
        onDisconnect?.();
        console.log('WebSocket disconnected:', event.code, event.reason);
        
        // Only attempt to reconnect if it wasn't a clean close and not already connecting
        if (event.code !== 1000 && !isConnecting.current) {
          reconnectTimeoutRef.current = setTimeout(() => {
            console.log('Attempting to reconnect WebSocket...');
            connect();
          }, 5000);
        }
      };

      ws.current.onerror = (error) => {
        isConnecting.current = false;
        console.error('WebSocket error:', error);
      };
    } catch (error) {
      console.error('Failed to connect to WebSocket:', error);
    }
  }, [onMessage, onConnect, onDisconnect]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (ws.current) {
      ws.current.close();
      ws.current = null;
    }
  }, []);

  const sendMessage = useCallback((message: WSMessage) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  }, []);

  useEffect(() => {
    connect();
    
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    isConnected,
    sendMessage,
    disconnect,
  };
}
