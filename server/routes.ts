import type { Express, Request } from "express";
import express from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertItemSchema, insertUserSchema } from "@shared/schema";
import multer, { type MulterError } from "multer";
import path from "path";
import fs from "fs";

// Setup multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

interface MulterRequest extends Request {
  file?: Express.Multer.File;
}

const upload = multer({
  dest: uploadDir,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve uploaded images
  app.use('/uploads', express.static(uploadDir));

  // User routes
  app.get("/api/users", async (req, res) => {
    try {
      const users = await storage.getUsers();
      res.json(users);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.post("/api/users", async (req, res) => {
    try {
      const validatedData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByEmail(validatedData.email);
      if (existingUser) {
        return res.status(400).json({ message: "User with this email already exists" });
      }
      
      const user = await storage.createUser(validatedData);
      res.status(201).json(user);
    } catch (error: any) {
      console.error('Error creating user:', error);
      if (error?.name === 'ZodError') {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  // Get all items
  app.get("/api/items", async (req, res) => {
    try {
      const { search, type, category } = req.query;
      
      let items;
      if (search) {
        items = await storage.searchItems(search as string);
      } else if (type || category) {
        items = await storage.filterItems(type as string, category as string);
      } else {
        items = await storage.getItems();
      }
      
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: "Failed to fetch items" });
    }
  });

  // Get single item
  app.get("/api/items/:id", async (req, res) => {
    try {
      const item = await storage.getItem(req.params.id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      console.error('Error fetching item:', error);
      res.status(500).json({ message: "Failed to fetch item" });
    }
  });

  // Create new item
  app.post("/api/items", upload.single('image'), async (req: MulterRequest, res) => {
    try {
      const itemData = req.body;
      
      // Add image URL if file was uploaded
      if (req.file) {
        itemData.imageUrl = `/uploads/${req.file.filename}`;
      }

      const validatedData = insertItemSchema.parse(itemData);
      const item = await storage.createItem(validatedData);
      
      res.status(201).json(item);
    } catch (error: any) {
      console.error('Error creating item:', error);
      if (error?.name === 'ZodError') {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create item" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
