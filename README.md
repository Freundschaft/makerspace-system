# Makerspace System
A Next.js 15 App Router project for managing makerspace operations, centralizing team records, bicycle rentals, and repair workflows behind Google-based SSO.

## Features
- Secure Google authentication enforced via NextAuth middleware with protected dashboards
- Team directory with data tables, inline actions, and API endpoints for CRUD operations
- Bicycle rental log capturing signatures, statuses, and quick-entry shortcuts
- Bicycle repair intake tracking problem types, parts usage, timelines, and status updates

## Prerequisites
- Node.js 20+ and npm 10+
- MySQL 8 (or compatible) instance and connection string
- Google OAuth client credentials configured for NextAuth

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create `.env.local` with the required secrets:
   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/makerspace"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="generate-a-long-random-secret"
   GOOGLE_CLIENT_ID="...apps.googleusercontent.com"
   GOOGLE_CLIENT_SECRET="..."
   ```
3. Apply database migrations and seed baseline data:
   ```bash
   npx prisma migrate dev
   npm run prisma:seed
   ```
4. Launch the dev server:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

## Development Scripts
- `npm run dev` - start the Turbopack dev server with hot reload
- `npm run build` - generate an optimized production build
- `npm run start` - serve the compiled build (useful for staging checks)
- `npm run lint` - run ESLint with the Next.js config (`-- --fix` to autofix)
- `npm run prisma:seed` - populate lookup data such as bicycle problem types

## Architecture Notes
- Uses the Next.js App Router with server components and route handlers in `app/`
- Prisma handles all persistence; generated client lives in `generated/prisma`
- Authentication flows through NextAuth + Google and is enforced via `middleware.ts`
- UI follows TailwindCSS + shadcn patterns, centralized within `components/`

## Directory Overview
- `app/` - routes, API handlers, and feature-specific React components
- `components/` - shared layout/navigation primitives and UI kit extensions
- `data/` - static fixtures consumed by the UI
- `lib/` - Prisma client bootstrap and cross-cutting utilities
- `prisma/` - schema, migrations, and the seeding script
- `public/` - static assets served as-is

## Data & Testing
The seed script loads default bicycle problem types and can be extended for demo data. Automated UI tests are not yet in place; rely on `npm run lint`, `npm run build`, and manual walkthroughs of login, team, rental, and repair flows until a test suite is introduced.

## Contributing
Follow the conventions in `AGENTS.md` for style, commits, and pull requests. Keep PRs focused, document schema changes, and include screenshots or screen recordings when tweaking UI flows.
