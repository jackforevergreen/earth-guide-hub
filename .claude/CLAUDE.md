# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Notes For Claude
- Write all plans, important context, and other docs to the markdown files in the claude directory
- Upon starting a new session in this codebase, always read through the files in the claude directory to get up to date

## Development Commands

- **Start development server**: `npm run dev` (runs on port 8080)
- **Build for production**: `npm run build`
- **Build for development**: `npm run build:dev`
- **Lint code**: `npm run lint`
- **Preview production build**: `npm run preview`

## Technology Stack

This is a React + TypeScript + Vite application using:
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS with custom animations
- **State Management**: React Query (@tanstack/react-query) for server state
- **Routing**: React Router DOM
- **Animation**: Framer Motion
- **Form Handling**: React Hook Form with Zod validation
- **Theming**: next-themes for dark/light mode support

## Project Architecture

### Component Structure
- **Landing Page Components**: Located in `/src/components/` - includes Hero, Community, AppShowcase, YouTubePromo, Offset, Newsletter, Footer
- **UI Components**: Pre-built shadcn/ui components in `/src/components/ui/`
- **Pages**: Main page components in `/src/pages/` (currently Index and NotFound)
- **Hooks**: Custom React hooks in `/src/hooks/`
- **Utils**: Utility functions in `/src/lib/utils.ts`

### Key Features
- **Forevergreen Landing Page**: A carbon offset/environmental sustainability focused website
- **Blog Section**: Static blog posts with engagement metrics (views, comments, likes)
- **Carbon Projects**: Showcases different environmental projects (afforestation, energy waste, flight offset, reforestation, hydroelectric)
- **Mobile App Promotion**: Features app store links and mockup displays
- **YouTube Integration**: Embedded promotional content
- **Newsletter Signup**: Email collection functionality
- **Partner Logos**: Displays trusted partner/payment provider logos

### Routing
- Single-page application with React Router
- Main route: `/` → Index page
- Catch-all route: `*` → NotFound page
- Add custom routes above the catch-all route in App.tsx

### Styling Conventions
- Uses Tailwind utility classes with custom animations (zoomSlow, fadeUp, stagger)
- Responsive design with mobile-first approach
- Consistent use of shadcn/ui design tokens
- Framer Motion animations for enhanced UX

### Assets
- Images stored in `/src/assets/` with organized subdirectories
- Logo assets in `/src/assets/logos/`
- Uses absolute imports with `@/` alias pointing to `/src/`

### Development Notes
- Port 8080 configured for development server
- Component tagging enabled in development mode via lovable-tagger
- TypeScript strict mode enabled
- ESLint configuration for React + TypeScript