import { z } from "zod";

// User schemas
export const insertUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  studentId: z.string().optional(),
  hostelRoom: z.string().optional(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

export type User = InsertUser & {
  id: string;
  createdAt: string;
};

// Item schemas
export const insertItemSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  category: z.enum(["electronics", "clothing", "accessories", "books", "keys", "other"]),
  location: z.string().min(1, "Location is required"),
  contact: z.string().min(1, "Contact information is required"),
  type: z.enum(["lost", "found"]),
  imageUrl: z.string().optional(),
  userId: z.string(), // Reference to user who posted
});

export type InsertItem = z.infer<typeof insertItemSchema>;

export type Item = InsertItem & {
  id: string;
  createdAt: string;
  user?: User; // Optional user info for display
};
