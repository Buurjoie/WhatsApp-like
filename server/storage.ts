import { messages, type Message, type InsertMessage, type UpdateMessage } from "@shared/schema";

export interface IStorage {
  getMessages(): Promise<Message[]>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessage(update: UpdateMessage): Promise<Message | undefined>;
  deleteMessage(id: number): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private messages: Map<number, Message>;
  private currentId: number;

  constructor() {
    this.messages = new Map();
    this.currentId = 1;
    
    // Add initial bot message
    this.createMessage({
      content: "Hello! I'm your assistant chatbot. How can I help you today?",
      type: "received",
      status: "read"
    });
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values()).sort((a, b) => 
      new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentId++;
    const message: Message = {
      ...insertMessage,
      id,
      timestamp: new Date(),
      isEdited: false,
      editedAt: null,
    };
    this.messages.set(id, message);
    return message;
  }

  async updateMessage(update: UpdateMessage): Promise<Message | undefined> {
    const existingMessage = this.messages.get(update.id);
    if (!existingMessage) return undefined;

    const updatedMessage: Message = {
      ...existingMessage,
      content: update.content,
      isEdited: update.isEdited ?? true,
      editedAt: new Date(),
    };
    
    this.messages.set(update.id, updatedMessage);
    return updatedMessage;
  }

  async deleteMessage(id: number): Promise<boolean> {
    return this.messages.delete(id);
  }
}

export const storage = new MemStorage();
