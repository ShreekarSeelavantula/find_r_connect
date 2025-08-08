# FindRConnect - Lost & Found Portal

A modern web application for managing lost and found items on campus/hostel premises. Built with React, TypeScript, Express.js, and Drizzle ORM.

## Features

- 🎯 **Lost & Found Management**: Post and search for lost or found items
- 📸 **Image Upload**: Support for item images with drag-and-drop
- 🔍 **Advanced Search**: Filter by category, type, and location
- 👥 **User Management**: Create and manage user accounts
- 📱 **Responsive Design**: Mobile-first approach with modern UI
- 🔒 **Type Safety**: Full TypeScript support with Zod validation

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Radix UI** for accessible components
- **React Query** for server state management
- **React Hook Form** for form handling

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **Drizzle ORM** for database operations
- **Neon Database** (PostgreSQL) for data storage
- **Multer** for file uploads

## Deployment to Render

This project is configured for deployment on Render with both frontend and backend services.

### Prerequisites

1. **GitHub Repository**: Push your code to a GitHub repository
2. **Database**: Set up a Neon PostgreSQL database (or any PostgreSQL database)
3. **Render Account**: Sign up at [render.com](https://render.com)

### Environment Variables

#### Backend Environment Variables
Set these in your Render backend service:

```bash
NODE_ENV=production
DATABASE_URL=your_postgresql_connection_string
FRONTEND_URL=https://your-frontend-service.onrender.com
```

#### Frontend Environment Variables
Set these in your Render frontend service:

```bash
VITE_API_URL=https://your-backend-service.onrender.com
```

### Deployment Steps

#### Option 1: Using render.yaml (Recommended)

1. **Push to GitHub**: Ensure your code is pushed to GitHub
2. **Connect to Render**: 
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
3. **Deploy**: Render will automatically detect the `render.yaml` file and create both services

#### Option 2: Manual Deployment

##### Backend Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `findrconnect-backend`
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build:server`
   - **Start Command**: `npm start`
   - **Environment**: Node
   - **Plan**: Free

##### Frontend Service
1. Click "New +" → "Static Site"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `findrconnect-frontend`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Plan**: Free

### Post-Deployment

1. **Update URLs**: After deployment, update the environment variables with the actual URLs
2. **Test**: Verify that the frontend can communicate with the backend
3. **Database**: Ensure your database is properly configured and accessible

## Local Development

### Prerequisites
- Node.js 18+
- npm or yarn
- PostgreSQL database (or Neon database)

### Setup

1. **Clone the repository**:
   ```bash
   git clone <your-repo-url>
   cd FindRConnect
   ```

2. **Install dependencies**:
   ```bash
   npm install
   cd client && npm install && cd ..
   ```

3. **Environment variables**:
   Create a `.env` file in the root directory:
   ```bash
   DATABASE_URL=your_database_connection_string
   NODE_ENV=development
   ```

4. **Database setup**:
   ```bash
   npm run db:push
   ```

5. **Start development server**:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
FindRConnect/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Utilities and configurations
│   │   └── hooks/         # Custom React hooks
│   ├── package.json
│   └── vite.config.ts
├── server/                # Backend Express application
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   ├── db.ts             # Database connection
│   └── index.ts          # Server entry point
├── shared/               # Shared types and schemas
│   └── schema.ts
├── uploads/              # File uploads directory
├── render.yaml           # Render deployment configuration
└── package.json
```

## API Endpoints

### Items
- `GET /api/items` - Get all items (with optional search/filter)
- `GET /api/items/:id` - Get specific item
- `POST /api/items` - Create new item (with image upload)

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
