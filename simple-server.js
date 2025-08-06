import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { randomUUID } from 'crypto';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('.'));

// Setup multer for file uploads
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + '-' + Math.round(Math.random() * 1E9) + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files allowed'));
        }
    }
});

// Data files
const ITEMS_FILE = path.join(__dirname, 'lostfound.json');
const USERS_FILE = path.join(__dirname, 'users.json');

// Helper functions
function readJSON(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

function writeJSON(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

function getItems() {
    const items = readJSON(ITEMS_FILE);
    const users = readJSON(USERS_FILE);
    
    // Attach user info to items
    return items.map(item => {
        const user = users.find(u => u.id === item.userId);
        return { ...item, user };
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function getUsers() {
    return readJSON(USERS_FILE);
}

// Routes

// Serve the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Get all items
app.get('/api/items', (req, res) => {
    try {
        const items = getItems();
        const { search, type, category } = req.query;
        
        let filteredItems = items;
        
        if (search) {
            const searchTerm = search.toLowerCase();
            filteredItems = filteredItems.filter(item =>
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm)
            );
        }
        
        if (type) {
            filteredItems = filteredItems.filter(item => item.type === type);
        }
        
        if (category) {
            filteredItems = filteredItems.filter(item => item.category === category);
        }
        
        res.json(filteredItems);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch items' });
    }
});

// Get single item
app.get('/api/items/:id', (req, res) => {
    try {
        const items = getItems();
        const item = items.find(item => item.id === req.params.id);
        
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch item' });
    }
});

// Create new item
app.post('/api/items', upload.single('image'), (req, res) => {
    try {
        const items = readJSON(ITEMS_FILE);
        const users = readJSON(USERS_FILE);
        
        // Create or find user
        let user = users.find(u => u.email === req.body.userEmail);
        if (!user) {
            user = {
                id: randomUUID(),
                name: req.body.userName,
                email: req.body.userEmail,
                room: req.body.userRoom || '',
                phone: req.body.userPhone || '',
                createdAt: new Date().toISOString()
            };
            users.push(user);
            writeJSON(USERS_FILE, users);
        }
        
        // Create item
        const item = {
            id: randomUUID(),
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            location: req.body.location,
            contact: req.body.contact,
            type: req.body.type,
            userId: user.id,
            imageUrl: req.file ? `/uploads/${req.file.filename}` : '',
            createdAt: new Date().toISOString()
        };
        
        items.push(item);
        writeJSON(ITEMS_FILE, items);
        
        // Return item with user info
        res.status(201).json({ ...item, user });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Failed to create item' });
    }
});

// Get all users
app.get('/api/users', (req, res) => {
    try {
        const users = getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch users' });
    }
});

// Create new user
app.post('/api/users', (req, res) => {
    try {
        const users = readJSON(USERS_FILE);
        
        // Check if user exists
        const existingUser = users.find(u => u.email === req.body.email);
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = {
            id: randomUUID(),
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone || '',
            studentId: req.body.studentId || '',
            room: req.body.hostelRoom || '',
            createdAt: new Date().toISOString()
        };
        
        users.push(user);
        writeJSON(USERS_FILE, users);
        
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Lost & Found Portal running on http://localhost:${PORT}`);
    console.log('Features:');
    console.log('- HTML/CSS/JavaScript frontend');
    console.log('- Simple Express backend');
    console.log('- JSON file storage');
    console.log('- Image upload support');
    console.log('- User account system');
});