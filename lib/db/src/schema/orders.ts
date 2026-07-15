import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ordersTable = pgTable("orders", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // 'bulk' | 'catering'
  customerName: text("customer_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  eventDate: text("event_date").notNull(),
  eventLocation: text("event_location"),
  guestCount: integer("guest_count"),
  notes: text("notes"),
  status: text("status").notNull().default("pending"), // 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertOrderSchema = createInsertSchema(ordersTable).omit({ id: true, createdAt: true });
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof ordersTable.$inferSelect;
