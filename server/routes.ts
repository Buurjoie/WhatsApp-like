import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema, updateMessageSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);

  // REST API routes
  app.get("/api/messages", async (req, res) => {
    try {
      const messages = await storage.getMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  app.post("/api/messages", async (req, res) => {
    try {
      const messageData = insertMessageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);

      // Generate bot response for user messages
      if (messageData.type === "sent") {
        setTimeout(async () => {
          const botResponse = generateBotResponse(messageData.content);
          await storage.createMessage({
            content: botResponse,
            type: "received",
            status: "read"
          });
        }, 1500 + Math.random() * 1000);
      }

      res.json(message);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid message data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to create message" });
      }
    }
  });

  app.put("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const updateData = updateMessageSchema.parse({ ...req.body, id });
      const updatedMessage = await storage.updateMessage(updateData);
      
      if (!updatedMessage) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json(updatedMessage);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: "Invalid update data", details: error.errors });
      } else {
        res.status(500).json({ error: "Failed to update message" });
      }
    }
  });

  app.delete("/api/messages/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deleteMessage(id);
      
      if (!deleted) {
        return res.status(404).json({ error: "Message not found" });
      }

      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete message" });
    }
  });



  return httpServer;
}

function generateBotResponse(userMessage: string): string {
  const responses = [
    "That's a great question! Let me help you with that.",
    "I understand what you're looking for. Here's what I can tell you:",
    "Thanks for asking! I'd be happy to assist you with this.",
    "Great! Here's some information that might help:",
    "I can definitely help you with that. Let me explain:",
    "I see what you mean. Here's my perspective on that:",
    "That's an interesting point. Let me share some insights:",
    "I appreciate you bringing this up. Here's what I think:",
  ];

  // Simple keyword-based responses
  const lowerMessage = userMessage.toLowerCase();
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
    return "Hello! Nice to meet you. How can I assist you today?";
  }
  
  if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
    return "I'd be happy to help you with pricing information. Our services are competitively priced and we offer various packages to suit different needs.";
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! I can assist you with questions, provide information, and guide you through our services. What specific area would you like help with?";
  }
  
  if (lowerMessage.includes('thank')) {
    return "You're very welcome! I'm glad I could help. Is there anything else you'd like to know?";
  }

  // Return a random response for other messages
  return responses[Math.floor(Math.random() * responses.length)];
}
