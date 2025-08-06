import { type Item, type InsertItem, type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const ITEMS_FILE = path.join(process.cwd(), "lostfound.json");
const USERS_FILE = path.join(process.cwd(), "users.json");

interface DatabaseData {
  users: User[];
  items: Item[];
}

export interface IStorage {
  // User operations
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Item operations
  getItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  searchItems(query: string): Promise<Item[]>;
  filterItems(type?: string, category?: string): Promise<Item[]>;
}

export class JsonStorage implements IStorage {
  private async ensureDataFiles(): Promise<void> {
    // Ensure items file exists
    try {
      await fs.access(ITEMS_FILE);
    } catch {
      await fs.writeFile(ITEMS_FILE, JSON.stringify([]));
    }
    
    // Ensure users file exists
    try {
      await fs.access(USERS_FILE);
    } catch {
      await fs.writeFile(USERS_FILE, JSON.stringify([]));
    }
  }

  private async readItems(): Promise<Item[]> {
    await this.ensureDataFiles();
    const data = await fs.readFile(ITEMS_FILE, "utf-8");
    return JSON.parse(data);
  }

  private async writeItems(items: Item[]): Promise<void> {
    await fs.writeFile(ITEMS_FILE, JSON.stringify(items, null, 2));
  }

  private async readUsers(): Promise<User[]> {
    await this.ensureDataFiles();
    const data = await fs.readFile(USERS_FILE, "utf-8");
    return JSON.parse(data);
  }

  private async writeUsers(users: User[]): Promise<void> {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  }

  // User methods
  async getUsers(): Promise<User[]> {
    return await this.readUsers();
  }

  async getUser(id: string): Promise<User | undefined> {
    const users = await this.readUsers();
    return users.find(user => user.id === id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const users = await this.readUsers();
    return users.find(user => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const users = await this.readUsers();
    const user: User = {
      ...insertUser,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    await this.writeUsers(users);
    return user;
  }

  // Item methods  
  async getItems(): Promise<Item[]> {
    const items = await this.readItems();
    const users = await this.readUsers();
    
    // Attach user info to items
    const itemsWithUsers = items.map(item => {
      const user = users.find(u => u.id === item.userId);
      return { ...item, user };
    });
    
    return itemsWithUsers.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getItem(id: string): Promise<Item | undefined> {
    const items = await this.readItems();
    const users = await this.readUsers();
    const item = items.find(item => item.id === id);
    
    if (item) {
      const user = users.find(u => u.id === item.userId);
      return { ...item, user };
    }
    return undefined;
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const items = await this.readItems();
    const users = await this.readUsers();
    
    const item: Item = {
      ...insertItem,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    items.push(item);
    await this.writeItems(items);
    
    // Return with user info
    const user = users.find(u => u.id === item.userId);
    return { ...item, user };
  }

  async searchItems(query: string): Promise<Item[]> {
    const items = await this.getItems();
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.location.toLowerCase().includes(lowerQuery)
    );
  }

  async filterItems(type?: string, category?: string): Promise<Item[]> {
    const items = await this.getItems();
    return items.filter(item => {
      const matchesType = !type || item.type === type;
      const matchesCategory = !category || item.category === category;
      return matchesType && matchesCategory;
    });
  }
}

export const storage = new JsonStorage();
