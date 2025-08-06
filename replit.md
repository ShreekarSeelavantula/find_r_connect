# Overview

This is a Lost & Found Portal - a campus/hostel web application for managing lost and found items using simple HTML, CSS, and JavaScript with a minimal Express.js backend. Users can post items they've lost or found, search through existing items, and contact item owners. The application features image upload capabilities, filtering by category and type, and stores data in JSON files for simplicity.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Technology**: Pure HTML, CSS, and JavaScript (no frameworks)
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **JavaScript**: ES6+ features for DOM manipulation and API interactions
- **UI Components**: Custom modal dialogs, grid layouts, and form validation
- **Responsive**: Mobile-first design with flexible grid system

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: JavaScript (ES modules)
- **API Pattern**: RESTful API with JSON responses
- **File Uploads**: Multer middleware for handling image uploads
- **Static Files**: Express static middleware for serving uploads and assets

## Data Storage
- **Primary Storage**: JSON files (lostfound.json, users.json)
- **File Location**: Root directory for easy access and modification
- **Data Format**: Structured JSON arrays with linked user relationships
- **Backup**: No database dependencies - files are easily readable and portable

## File Storage
- **Image Uploads**: Local file system storage in `/uploads` directory
- **File Serving**: Express static middleware for serving uploaded images
- **File Validation**: Image-only uploads with 5MB size limit

## Schema Design
The application uses two main schemas:

**User Schema:**
- Basic info: name, email, phone (optional)
- Student details: studentId, hostelRoom (optional)
- Unique identification and timestamp tracking

**Item Schema:**
- Basic info: title, description, category, location, contact
- Type differentiation: "lost" or "found" items
- User association: userId field linking to user accounts
- Optional image support with URL storage
- Timestamp tracking for creation date

## Authentication & Security
- **File Upload Security**: MIME type validation for images only
- **Input Validation**: Zod schemas for type-safe data validation
- **Error Handling**: Centralized error middleware with proper HTTP status codes

## Development Environment
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Build Process**: Separate build steps for client (Vite) and server (esbuild)
- **Development Server**: Integrated Vite dev server with Express backend
- **TypeScript**: Strict type checking with path aliases for clean imports

# External Dependencies

## Core Framework Dependencies
- **@vitejs/plugin-react**: React support for Vite
- **express**: Web application framework
- **wouter**: Lightweight React router
- **@tanstack/react-query**: Server state management

## UI & Styling
- **@radix-ui/***: Comprehensive set of unstyled UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating type-safe component variants
- **lucide-react**: Icon library

## Database & Validation
- **drizzle-orm**: TypeScript ORM
- **drizzle-kit**: Database toolkit and migration manager
- **@neondatabase/serverless**: Neon database driver
- **zod**: Schema validation library
- **drizzle-zod**: Integration between Drizzle and Zod

## File Handling
- **multer**: Middleware for handling multipart/form-data (file uploads)

## Form Management
- **react-hook-form**: Performant forms with easy validation
- **@hookform/resolvers**: Validation resolvers for React Hook Form

## Development Tools
- **tsx**: TypeScript execution environment
- **esbuild**: Fast JavaScript bundler
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Replit-specific development tooling

## Date Utilities
- **date-fns**: Modern JavaScript date utility library

## Additional UI Components
- **cmdk**: Command palette component
- **embla-carousel-react**: Carousel component library