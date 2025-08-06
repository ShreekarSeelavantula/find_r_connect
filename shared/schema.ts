import { z } from "zod";

export const insertItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["electronics", "clothing", "accessories", "books", "keys", "other"]),
  location: z.string().min(1, "Location is required"),
  contact: z.string().min(1, "Contact information is required"),
  type: z.enum(["lost", "found"]),
  imageUrl: z.string().optional(),
});

export type InsertItem = z.infer<typeof insertItemSchema>;

export type Item = InsertItem & {
  id: string;
  createdAt: string;
};
