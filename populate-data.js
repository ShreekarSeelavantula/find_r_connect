// Script to populate sample data for the Lost & Found Portal
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function generateId() {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

// Sample users data
const users = [
  {
    id: generateId(),
    name: "Alex Johnson",
    email: "alex.j@student.edu",
    phone: "+1234567890",
    studentId: "ST001",
    hostelRoom: "H1-201",
    createdAt: new Date().toISOString()
  },
  {
    id: generateId(),
    name: "Sarah Chen",
    email: "sarah.chen@student.edu",
    phone: "+1234567891",
    studentId: "ST002",
    hostelRoom: "H2-105",
    createdAt: new Date().toISOString()
  },
  {
    id: generateId(),
    name: "Mike Rodriguez",
    email: "mike.r@student.edu",
    phone: "+1234567892",
    studentId: "ST003",
    hostelRoom: "H1-315",
    createdAt: new Date().toISOString()
  }
];

// Sample items data
const items = [
  {
    id: generateId(),
    title: "iPhone 13 Pro",
    description: "Black iPhone 13 Pro with a cracked screen protector. Last seen in the library study area.",
    category: "electronics",
    location: "Main Library - Study Hall",
    contact: "alex.j@student.edu",
    type: "lost",
    userId: users[0].id,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
  },
  {
    id: generateId(),
    title: "Blue Adidas Backpack",
    description: "Found a blue Adidas backpack with some textbooks inside. Contains a chemistry notebook with the name 'Emma' on it.",
    category: "accessories",
    location: "Chemistry Building - Room 204",
    contact: "sarah.chen@student.edu",
    type: "found",
    userId: users[1].id,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() // 1 day ago
  },
  {
    id: generateId(),
    title: "Silver MacBook Pro",
    description: "13-inch MacBook Pro with stickers on it. Found it in the cafeteria after lunch rush.",
    category: "electronics",
    location: "Student Cafeteria - Table 12",
    contact: "mike.r@student.edu",
    type: "found",
    userId: users[2].id,
    createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
  },
  {
    id: generateId(),
    title: "Black Leather Wallet",
    description: "Lost my black leather wallet with student ID and some cash. Please contact if found!",
    category: "accessories",
    location: "Basketball Court",
    contact: "alex.j@student.edu",
    type: "lost",
    userId: users[0].id,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() // 3 hours ago
  },
  {
    id: generateId(),
    title: "Room Keys",
    description: "Found a set of keys with a red keychain near the main entrance. Has room number H2-210 tag.",
    category: "keys",
    location: "Main Entrance",
    contact: "sarah.chen@student.edu",
    type: "found",
    userId: users[1].id,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString() // 1 hour ago
  }
];

// Write data to files
fs.writeFileSync(path.join(__dirname, 'users.json'), JSON.stringify(users, null, 2));
fs.writeFileSync(path.join(__dirname, 'lostfound.json'), JSON.stringify(items, null, 2));

console.log('Sample data created successfully!');
console.log(`Created ${users.length} users and ${items.length} items`);