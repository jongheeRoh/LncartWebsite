# Art Academy Website - Replit.md

## Overview

This is a full-stack web application for an art academy (선과색미술학원) that specializes in art entrance exam preparation for middle school, high school, and university art programs. The application features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Framework**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query for server state management
- **Build Tool**: Vite for development and production builds
- **Styling**: CSS-in-JS with Tailwind CSS and custom CSS variables for theming

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM with PostgreSQL
- **Session Management**: Express sessions with PostgreSQL store
- **API Design**: RESTful API architecture
- **Development**: Hot reload with Vite middleware integration

### Database Architecture
- **Primary Database**: PostgreSQL (configured via Neon serverless)
- **ORM**: Drizzle ORM with type-safe schema definitions
- **Schema**: Three main entities - users, notices, and gallery items
- **Migrations**: Managed through Drizzle Kit

## Key Components

### Database Schema
1. **Users Table**: Handles authentication with username/password and admin roles
2. **Notices Table**: Content management for announcements with categories and timestamps
3. **Gallery Items Table**: Image gallery with metadata and categorization

### Frontend Components
1. **Layout Components**: Navbar and Footer for consistent site structure
2. **Page Components**: Home, About, Notices, Gallery, Admin, and educational content pages
3. **UI Components**: Complete shadcn/ui component library integration
4. **Form Management**: React Hook Form with Zod validation

### Backend Services
1. **Storage Layer**: Abstracted storage interface with in-memory fallback
2. **Route Handlers**: RESTful endpoints for CRUD operations
3. **Middleware**: Request logging, error handling, and static file serving
4. **Development Tools**: Vite integration for hot module replacement

## Data Flow

1. **Client Requests**: React components make API calls using TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Business Logic**: Storage services process data operations
4. **Database Layer**: Drizzle ORM executes type-safe database queries
5. **Response**: JSON responses sent back to client components
6. **State Updates**: TanStack Query manages cache invalidation and updates

## External Dependencies

### Core Dependencies
- **Database**: Neon serverless PostgreSQL for cloud database hosting
- **Authentication**: Express sessions with connect-pg-simple for session storage
- **Validation**: Zod for runtime type checking and form validation
- **UI Components**: Radix UI primitives for accessible component foundations
- **Development**: Replit-specific plugins for development environment integration

### Build Dependencies
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration
- **Vite**: Development server and build tool

## Deployment Strategy

### Development Environment
- **Platform**: Replit with PostgreSQL module enabled
- **Hot Reload**: Vite development server with middleware integration
- **Port Configuration**: Frontend served on port 5000 with proxy setup

### Production Build
1. **Frontend Build**: Vite builds React app to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Deployment**: Autoscale deployment target on Replit
4. **Static Assets**: Express serves built frontend assets

### Environment Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Sessions**: Secure session management with PostgreSQL store
- **Development**: Node environment detection for conditional features

## Recent Changes

- **June 26, 2025**: **예중입시정보 23개 완료** - 실제 웹사이트 https://lncart.modoo.at/?link=0stkad99 기반으로 23개 진짜 예중입시정보 생성 및 프론트엔드 표시 완료
- **June 26, 2025**: **API 페이지네이션 수정** - 기본 limit을 10에서 50으로 변경하여 전체 데이터 표시 가능
- **June 26, 2025**: Created direct data population scripts to bypass authentication issues and ensure immediate data availability
- **June 26, 2025**: Updated directions page with accurate Naver Map integration for 선과색미술학원 location
- **June 26, 2025**: **CRITICAL ISSUE RESOLVED** - Completely removed all sample/hardcoded data from entrance exam information pages
- **June 26, 2025**: Fixed middle-school.tsx and high-school.tsx pages to show empty state instead of fake announcements
- **June 26, 2025**: Enhanced rich text editor with font size controls, line spacing options, and video embedding capabilities for notices, gallery, and roadmap content
- **June 26, 2025**: **CRITICAL FIX** - Switched from in-memory storage to PostgreSQL database for persistent data storage
- **June 26, 2025**: Fixed notice popup functionality with proper template literal syntax  
- **June 26, 2025**: Added comprehensive database storage layer with automatic sample data initialization
- **June 26, 2025**: Added roadmap functionality with homepage buttons for 예중/예고 입시로드맵
- **June 26, 2025**: Created dedicated roadmap pages with rich content and file attachment support
- **June 26, 2025**: Converted entrance exam information pages to file attachment format
- **June 26, 2025**: Enhanced content management with roadmap editing in admin panel
- **June 26, 2025**: Enhanced content management with rich text editor and file attachments
- **June 26, 2025**: Added TipTap rich text editor with image embedding and formatting tools
- **June 26, 2025**: Implemented file upload system supporting PDF, JPG, HWP, and various formats
- **June 26, 2025**: Extended attachment functionality to notices and gallery items
- **June 26, 2025**: Added single admin authentication system with session management
- **December 25, 2025**: Added PostgreSQL database integration with Drizzle ORM
- **December 25, 2025**: Implemented admin panel with content management for notices and gallery
- **December 25, 2025**: Updated all sub-pages with academy signage hero images
- **December 25, 2025**: Added entrance exam information pages (예중/예고 입시정보)
- **December 25, 2025**: Applied academy contact information and address updates
- **December 25, 2025**: Integrated YouTube background video on homepage
- **June 24, 2025**: Initial setup

## User Preferences

```
Preferred communication style: Simple, everyday language.
```