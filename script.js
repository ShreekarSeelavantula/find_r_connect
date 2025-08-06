// Lost & Found Portal JavaScript

class LostFoundPortal {
    constructor() {
        this.items = [];
        this.users = [];
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.displayItems();
    }

    async loadData() {
        try {
            // Load items
            const itemsResponse = await fetch('/api/items');
            if (itemsResponse.ok) {
                this.items = await itemsResponse.json();
            }
            
            // Load users
            const usersResponse = await fetch('/api/users');
            if (usersResponse.ok) {
                this.users = await usersResponse.json();
            }
        } catch (error) {
            console.error('Error loading data:', error);
            // Load sample data if API fails
            this.loadSampleData();
        }
    }

    loadSampleData() {
        this.users = [
            {
                id: "user1",
                name: "Alex Johnson",
                email: "alex.j@student.edu",
                room: "H1-201",
                phone: "+1234567890"
            },
            {
                id: "user2", 
                name: "Sarah Chen",
                email: "sarah.chen@student.edu",
                room: "H2-105",
                phone: "+1234567891"
            },
            {
                id: "user3",
                name: "Mike Rodriguez", 
                email: "mike.r@student.edu",
                room: "H1-315",
                phone: "+1234567892"
            }
        ];

        this.items = [
            {
                id: "item1",
                title: "iPhone 13 Pro",
                description: "Black iPhone 13 Pro with a cracked screen protector. Last seen in the library study area.",
                category: "electronics",
                location: "Main Library - Study Hall",
                contact: "alex.j@student.edu",
                type: "lost",
                userId: "user1",
                imageUrl: "/uploads/sample-phone.svg",
                createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: "item2",
                title: "Blue Adidas Backpack",
                description: "Found a blue Adidas backpack with some textbooks inside. Contains a chemistry notebook with the name 'Emma' on it.",
                category: "accessories",
                location: "Chemistry Building - Room 204", 
                contact: "sarah.chen@student.edu",
                type: "found",
                userId: "user2",
                imageUrl: "/uploads/sample-backpack.svg",
                createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
            },
            {
                id: "item3",
                title: "Silver MacBook Pro",
                description: "13-inch MacBook Pro with stickers on it. Found it in the cafeteria after lunch rush.",
                category: "electronics",
                location: "Student Cafeteria - Table 12",
                contact: "mike.r@student.edu", 
                type: "found",
                userId: "user3",
                imageUrl: "/uploads/sample-laptop.svg",
                createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString()
            },
            {
                id: "item4",
                title: "Black Leather Wallet",
                description: "Lost my black leather wallet with student ID and some cash. Please contact if found!",
                category: "accessories",
                location: "Basketball Court",
                contact: "alex.j@student.edu",
                type: "lost", 
                userId: "user1",
                imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmMGYwZjAiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PHJlY3QgeD0iNjAiIHk9IjUwIiB3aWR0aD0iODAiIGhlaWdodD0iNTAiIHJ4PSI0IiBmaWxsPSIjMzMzIiBzdHJva2U9IiMwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjxyZWN0IHg9IjY1IiB5PSI1NSIgd2lkdGg9IjcwIiBoZWlnaHQ9IjQwIiByeD0iMiIgZmlsbD0iIzU1NSIvPjx0ZXh0IHg9IjEwMCIgeT0iMTI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTAiIGZpbGw9IiM2NjYiPkJsYWNrIFdhbGxldDwvdGV4dD48L3N2Zz4=",
                createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
            },
            {
                id: "item5", 
                title: "Room Keys",
                description: "Found a set of keys with a red keychain near the main entrance. Has room number H2-210 tag.",
                category: "keys",
                location: "Main Entrance",
                contact: "sarah.chen@student.edu",
                type: "found",
                userId: "user2", 
                imageUrl: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDIwMCAxNTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIxNTAiIGZpbGw9IiNmMGYwZjAiIHN0cm9rZT0iI2RkZCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSI2MCIgcj0iMTUiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmNDQ0NCIgc3Ryb2tlLXdpZHRoPSIzIi8+PHJlY3QgeD0iODUiIHk9IjU3IiB3aWR0aD0iNDAiIGhlaWdodD0iNiIgZmlsbD0iI2ZmNDQ0NCIvPjxyZWN0IHg9IjEyMCIgeT0iNTQiIHdpZHRoPSI1IiBoZWlnaHQ9IjEyIiBmaWxsPSIjZmY0NDQ0Ii8+PGNpcmNsZSBjeD0iMTEwIiBjeT0iODAiIHI9IjEyIiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjQ0NDQiIHN0cm9rZS13aWR0aD0iMyIvPjxyZWN0IHg9IjEyMiIgeT0iNzciIHdpZHRoPSIzMCIgaGVpZ2h0PSI2IiBmaWxsPSIjZmY0NDQ0Ii8+PHJlY3QgeD0iMTQ3IiB5PSI3NCIgd2lkdGg9IjUiIGhlaWdodD0iMTIiIGZpbGw9IiNmZjQ0NDQiLz48dGV4dCB4PSIxMDAiIHk9IjEyNSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIiBmaWxsPSIjNjY2Ij5Sb29tIEtleXM8L3RleHQ+PC9zdmc+",
                createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
            }
        ];
    }

    bindEvents() {
        // Post Item Button
        document.getElementById('postItemBtn').addEventListener('click', () => {
            this.openPostModal();
        });

        // Search
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.filterItems();
        });
        
        document.getElementById('searchInput').addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                this.filterItems();
            }
        });

        // Filters
        document.getElementById('typeFilter').addEventListener('change', () => {
            this.filterItems();
        });
        
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.filterItems();
        });

        // Modal close buttons
        document.querySelectorAll('.close').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                e.target.closest('.modal').style.display = 'none';
            });
        });

        // Modal background close
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.style.display = 'none';
            }
        });

        // Post Item Form
        document.getElementById('postItemForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePostItem(e);
        });

        // Cancel button
        document.getElementById('cancelBtn').addEventListener('click', () => {
            this.closePostModal();
        });

        // Image upload
        document.getElementById('itemImage').addEventListener('change', (e) => {
            this.handleImageUpload(e);
        });

        // Image upload click
        document.getElementById('imagePreview').addEventListener('click', () => {
            document.getElementById('itemImage').click();
        });
    }

    displayItems(itemsToShow = null) {
        const items = itemsToShow || this.items;
        const grid = document.getElementById('itemsGrid');
        const noItems = document.getElementById('noItems');

        if (items.length === 0) {
            grid.style.display = 'none';
            noItems.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        noItems.style.display = 'none';

        grid.innerHTML = items.map(item => this.createItemCard(item)).join('');

        // Add click handlers to items
        grid.querySelectorAll('.item-card').forEach(card => {
            card.addEventListener('click', () => {
                const itemId = card.dataset.itemId;
                this.showItemDetail(itemId);
            });
        });
    }

    createItemCard(item) {
        const user = this.users.find(u => u.id === item.userId);
        const timeAgo = this.timeAgo(item.createdAt);
        
        return `
            <div class="item-card" data-item-id="${item.id}">
                <div class="item-image ${!item.imageUrl ? 'no-image' : ''}">
                    ${item.imageUrl ? 
                        `<img src="${item.imageUrl}" alt="${item.title}" onerror="this.parentElement.classList.add('no-image'); this.style.display='none'; this.parentElement.innerHTML += '📷';">` : 
                        '📷'
                    }
                    <div class="item-badge ${item.type}">${item.type.toUpperCase()}</div>
                </div>
                <div class="item-content">
                    <div class="item-title">${item.title}</div>
                    <div class="item-description">${item.description}</div>
                    <div class="item-meta">
                        <div class="item-location">
                            📍 ${item.location}
                        </div>
                        <div class="item-date">
                            🕒 ${timeAgo}
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    filterItems() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const typeFilter = document.getElementById('typeFilter').value;
        const categoryFilter = document.getElementById('categoryFilter').value;

        let filteredItems = this.items.filter(item => {
            const matchesSearch = !searchTerm || 
                item.title.toLowerCase().includes(searchTerm) ||
                item.description.toLowerCase().includes(searchTerm) ||
                item.location.toLowerCase().includes(searchTerm);
            
            const matchesType = !typeFilter || item.type === typeFilter;
            const matchesCategory = !categoryFilter || item.category === categoryFilter;

            return matchesSearch && matchesType && matchesCategory;
        });

        this.displayItems(filteredItems);
    }

    openPostModal() {
        document.getElementById('postItemModal').style.display = 'block';
    }

    closePostModal() {
        document.getElementById('postItemModal').style.display = 'none';
        document.getElementById('postItemForm').reset();
        document.getElementById('imagePreview').innerHTML = `
            <div class="upload-placeholder">
                <div class="camera-icon">📷</div>
                <p>Click to upload a photo</p>
                <p class="file-info">JPG, PNG up to 5MB</p>
            </div>
        `;
    }

    async handlePostItem(event) {
        const formData = new FormData(event.target);
        
        try {
            // Create user if doesn't exist
            let user = this.users.find(u => u.email === formData.get('userEmail'));
            if (!user) {
                user = {
                    id: 'user' + Date.now(),
                    name: formData.get('userName'),
                    email: formData.get('userEmail'),
                    room: formData.get('userRoom') || '',
                    createdAt: new Date().toISOString()
                };
                this.users.push(user);
            }

            // Create item
            const item = {
                id: 'item' + Date.now(),
                title: formData.get('title'),
                description: formData.get('description'),
                category: formData.get('category'),
                location: formData.get('location'),
                contact: formData.get('contact'),
                type: formData.get('type'),
                userId: user.id,
                imageUrl: this.uploadedImageUrl || '',
                createdAt: new Date().toISOString()
            };

            // Try to post to API
            try {
                const response = await fetch('/api/items', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const savedItem = await response.json();
                    this.items.unshift(savedItem);
                } else {
                    // If API fails, add to local array
                    this.items.unshift(item);
                }
            } catch (error) {
                // If API fails, add to local array
                this.items.unshift(item);
            }

            this.displayItems();
            this.closePostModal();
            this.showSuccess('Item posted successfully!');
            
        } catch (error) {
            console.error('Error posting item:', error);
            this.showError('Failed to post item. Please try again.');
        }
    }

    handleImageUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImageUrl = e.target.result;
                document.getElementById('imagePreview').innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <p>Click to change photo</p>
                `;
            };
            reader.readAsDataURL(file);
        }
    }

    showItemDetail(itemId) {
        const item = this.items.find(i => i.id === itemId);
        if (!item) return;

        const user = this.users.find(u => u.id === item.userId);
        const timeAgo = this.timeAgo(item.createdAt);

        const detailContent = `
            <div class="item-detail">
                ${item.imageUrl ? `<img src="${item.imageUrl}" alt="${item.title}" class="item-detail-image">` : ''}
                
                <div class="item-detail-badge ${item.type}">${item.type.toUpperCase()}</div>
                <h2 class="item-detail-title">${item.title}</h2>
                <p class="item-detail-description">${item.description}</p>
                
                <div class="item-detail-info">
                    <div class="info-item">
                        <h4>Category</h4>
                        <p>${this.capitalizeFirst(item.category)}</p>
                    </div>
                    <div class="info-item">
                        <h4>Location</h4>
                        <p>${item.location}</p>
                    </div>
                    <div class="info-item">
                        <h4>Posted</h4>
                        <p>🕒 ${timeAgo}</p>
                    </div>
                </div>

                ${user ? `
                    <div class="user-info">
                        <h4>Posted By</h4>
                        <p><strong>${user.name}</strong></p>
                        <p>${user.email}</p>
                        ${user.room ? `<p>Room: ${user.room}</p>` : ''}
                    </div>
                ` : ''}

                <div class="contact-section">
                    <h4>Contact Information</h4>
                    <p>${item.contact}</p>
                    <button class="contact-btn" onclick="window.location.href='${item.contact.includes('@') ? 'mailto:' + item.contact : 'tel:' + item.contact}'">
                        📧 Contact Owner
                    </button>
                </div>
            </div>
        `;

        document.getElementById('itemDetailContent').innerHTML = detailContent;
        document.getElementById('itemDetailModal').style.display = 'block';
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showMessage(message, type) {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            z-index: 10000;
            font-weight: 500;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            animation: slideInRight 0.3s ease;
        `;

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }

    timeAgo(dateString) {
        const now = new Date();
        const date = new Date(dateString);
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));

        if (diffHours < 24) {
            if (diffHours === 1) return '1 hour ago';
            return `${diffHours} hours ago`;
        }
        if (diffDays === 1) return '1 day ago';
        if (diffDays < 7) return `${diffDays} days ago`;
        return date.toLocaleDateString();
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Add CSS animations for toast
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the portal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new LostFoundPortal();
});