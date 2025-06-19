# Replit.md

## Overview

This is a modern full-stack chat application built with React, Express.js, and TypeScript. The application features a WhatsApp-inspired chat interface with real-time messaging capabilities, message editing, and theme switching. It uses a clean architecture with separated client and server codebases, shared type definitions, and a component-based UI built with shadcn/ui.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom WhatsApp-inspired color scheme
- **State Management**: TanStack Query for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Animations**: Framer Motion for smooth transitions and micro-interactions
- **Real-time Communication**: WebSocket integration for live messaging

### Backend Architecture
- **Runtime**: Node.js 20 with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL (configured for Neon serverless)
- **ORM**: Drizzle ORM for type-safe database operations
- **WebSocket**: Native WebSocket Server for real-time features
- **Development**: tsx for TypeScript execution in development

### Data Storage
- **Primary Database**: PostgreSQL 16 (configured via environment variables)
- **Development Storage**: In-memory storage implementation for rapid development
- **Session Management**: connect-pg-simple for PostgreSQL session store
- **Migration System**: Drizzle Kit for database schema management

## Key Components

### Shared Schema (`shared/schema.ts`)
- Centralized type definitions using Zod for validation
- Message entity with support for sent/received types, editing, and status tracking
- WebSocket message types for real-time communication
- Type-safe insert and update schemas

### Chat Interface Components
- **ChatBubble**: Message display with editing capabilities and status indicators
- **ChatHeader**: App header with theme toggle and navigation controls
- **ChatSidebar**: Contact list and chat history (responsive design)
- **MessageInput**: Text input with auto-resize and emoji support
- **TypingIndicator**: Animated typing status display

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting multiple implementations
- **WebSocket Server**: Real-time message broadcasting and typing indicators
- **REST API**: CRUD operations for messages with validation

## Data Flow

1. **Message Creation**: Client sends message via REST API → Server validates and stores → WebSocket broadcasts to all clients
2. **Real-time Updates**: WebSocket server handles typing indicators, message status updates, and live message delivery
3. **Message Editing**: Client sends edit request → Server updates with timestamp → Broadcasts update via WebSocket
4. **Bot Responses**: Automatic bot responses triggered after user messages with simulated typing delays

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL serverless driver for production database
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Server state management and caching
- **framer-motion**: Animation library for smooth UI transitions
- **wouter**: Lightweight routing for React applications

### UI Dependencies
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **lucide-react**: Modern icon library

### Development Dependencies
- **tsx**: TypeScript execution for development server
- **esbuild**: Fast bundler for production server builds
- **@replit/vite-plugin-***: Replit-specific development plugins

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs server with tsx for hot reloading
- **Port**: 5000 (configured for Replit environment)
- **Hot Reload**: Vite HMR for client, tsx watch mode for server

### Production Build
- **Client Build**: Vite builds optimized React bundle to `dist/public`
- **Server Build**: esbuild bundles Express server to `dist/index.js`
- **Command**: `npm run build` followed by `npm run start`

### Deployment Configuration
- **Target**: Autoscale deployment on Replit
- **Database**: PostgreSQL 16 module with connection via DATABASE_URL
- **Static Assets**: Served from `dist/public` in production
- **Environment**: NODE_ENV-based configuration switching

## Changelog

Changelog:
- June 19, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.