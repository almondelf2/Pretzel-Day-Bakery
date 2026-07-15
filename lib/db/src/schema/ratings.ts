import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";
import { menuItemsTable } from "./menuItems";

export const ratingsTable = pgTable("ratings", {
  id: serial("id").primaryKey(),
  menuItemId: integer("menu_item_id").notNull().references(() => menuItemsTable.id),
  rating: integer("rating").notNull(),
  comment: text("comment"),
  customerName: text("customer_name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertRatingSchema = createInsertSchema(ratingsTable).omit({ id: true, createdAt: true });
export type InsertRating = z.infer<typeof insertRatingSchema>;
export type Rating = typeof ratingsTable.$inferSelect;
