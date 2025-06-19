import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  type: text("type", { enum: ["sent", "received"] }).notNull(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  isEdited: boolean("is_edited").default(false),
  editedAt: timestamp("edited_at"),
  status: text("status", { enum: ["sent", "delivered", "read"] }).default("sent"),
});

export const insertMessageSchema = createInsertSchema(messages).omit({
  id: true,
  timestamp: true,
  editedAt: true,
});

export const updateMessageSchema = createInsertSchema(messages).pick({
  content: true,
  isEdited: true,
}).extend({
  id: z.number(),
});

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type UpdateMessage = z.infer<typeof updateMessageSchema>;
export type Message = typeof messages.$inferSelect;

// WebSocket message types
export const wsMessageSchema = z.object({
  type: z.enum(["message", "typing", "stopTyping", "messageUpdate", "messageStatus"]),
  data: z.any(),
});

export type WSMessage = z.infer<typeof wsMessageSchema>;
