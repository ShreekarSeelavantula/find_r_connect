import { type Item, type InsertItem } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from "fs/promises";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "lostfound.json");

export interface IStorage {
  getItems(): Promise<Item[]>;
  getItem(id: string): Promise<Item | undefined>;
  createItem(item: InsertItem): Promise<Item>;
  searchItems(query: string): Promise<Item[]>;
  filterItems(type?: string, category?: string): Promise<Item[]>;
}

export class JsonStorage implements IStorage {
  private async ensureDataFile(): Promise<void> {
    try {
      await fs.access(DATA_FILE);
    } catch {
      await fs.writeFile(DATA_FILE, JSON.stringify([]));
    }
  }

  private async readData(): Promise<Item[]> {
    await this.ensureDataFile();
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  }

  private async writeData(items: Item[]): Promise<void> {
    await fs.writeFile(DATA_FILE, JSON.stringify(items, null, 2));
  }

  async getItems(): Promise<Item[]> {
    const items = await this.readData();
    return items.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getItem(id: string): Promise<Item | undefined> {
    const items = await this.readData();
    return items.find(item => item.id === id);
  }

  async createItem(insertItem: InsertItem): Promise<Item> {
    const items = await this.readData();
    const item: Item = {
      ...insertItem,
      id: randomUUID(),
      createdAt: new Date().toISOString(),
    };
    items.push(item);
    await this.writeData(items);
    return item;
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
