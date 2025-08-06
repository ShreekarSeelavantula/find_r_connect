# Overview

This is a Lost & Found Portal - a full-stack web application for managing lost and found items. Users can post items they've lost or found, search through existing items, and contact item owners. The application features image upload capabilities, filtering by category and type, and a responsive UI built with modern web technologies.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **UI Library**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

## Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **API Pattern**: RESTful API with JSON responses
- **File Uploads**: Multer middleware for handling image uploads
- **Development**: Hot module replacement via Vite integration in development mode

## Data Storage
- **Database**: Configured for PostgreSQL via Drizzle ORM
- **ORM**: Drizzle ORM with Zod schema validation
- **Fallback Storage**: JSON file-based storage implementation for development
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Migrations**: Drizzle Kit for database schema management

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