# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
Next.js 15 App Router application for managing makerspace operations, including team directory, bicycle rentals, and bicycle repairs. Authentication is enforced via NextAuth with Google OAuth.

## Development Commands

### Essential Commands
- `npm run dev` - Start Turbopack dev server with hot reload
- `npm run build` - Build production bundle (run before releasing)
- `npm run lint` - Run ESLint with Next.js config; use `-- --fix` to autofix
- `npm run prisma:seed` - Populate database with seed data (problem types, etc.)

### Database Workflow
After modifying `prisma/schema.prisma`:
1. `npx prisma migrate dev --name <description>` - Create and apply migration
2. `npx prisma generate` - Regenerate the Prisma client
3. `npm run prisma:seed` - Reseed if needed

Note: `generated/prisma` is auto-generated; never edit manually.

## Architecture

### Authentication Flow
- NextAuth with Google OAuth provider configured in `app/api/auth/[...nextauth]/route.ts`
- Middleware (`middleware.ts`) protects all routes except `/login`, `/api`, static assets, and public files
- Uses JWT tokens for session management via `getToken()` from `next-auth/jwt`
- Unauthenticated users are redirected to `/login`; authenticated users at `/login` are redirected to `/`

### Database & ORM
- Prisma ORM with MySQL backend
- Client singleton in `lib/prisma.ts` prevents hot-reload connection exhaustion
- Generated client output: `generated/prisma` (via `prisma generate`)
- Schema defines: `User`, `TeamMember`, `BicycleRepair`, `BicycleRental`, `Part`, `RepairPart`, `ProblemType`
- Key enums: `RepairStatus`, `RentalStatus`, `TeamMemberStatus`

### Routing & Layout
- Next.js App Router: routes in `app/`, API handlers in `app/api/`
- Co-location: feature-specific components live beside their pages (e.g., `app/bicycles/repairs/columns.tsx`)
- Shared components: `components/` for layout primitives, `components/ui/` for shadcn-based UI kit
- Layout structure: `Layout` component wraps authenticated pages with `Header` + `Sidebar`
  - Sidebar is responsive: hidden on mobile by default, toggled via hamburger menu
  - Layout skips rendering for `/login` to show full-screen auth page

### Data Tables
- Built on `@tanstack/react-table` with sorting, filtering, and pagination
- Custom `DataTable` component (`components/ui/data-table.tsx`) provides:
  - Desktop: standard table view
  - Mobile: responsive card layout with images and badges
- Column definitions live in feature directories (e.g., `app/bicycles/repairs/columns.tsx`)

### File Uploads & Storage
- File upload component: `components/ui/file-upload.tsx`
- Files served via API route: `app/api/files/[...path]/route.ts`
- Photo paths stored in database (e.g., `BicycleRepair.photoPath`, `TeamMember.photoPath`)
- External file server URL configurable via `NEXT_PUBLIC_FILE_SERVER_URL` (defaults to `https://files.system.makerspace-lesvos.org`)

## Key Conventions

### Code Style
- TypeScript throughout; use Zod for runtime validation
- Component files: PascalCase (e.g., `TeamMemberForm.tsx`)
- Utilities/hooks: camelCase
- Route folders: kebab-case (e.g., `app/bicycles/repairs/`)
- Prefer Tailwind utility classes; reuse shadcn primitives from `components/ui/`

### Commit Style
- Imperative subjects (e.g., "add team list sorting", "fix repair status filter")
- Scope prefixes optional but helpful (e.g., "team: add email validation")
- Follow existing history pattern visible in recent commits

### Environment Variables
Required in `.env.local`:
- `DATABASE_URL` - MySQL connection string
- `NEXTAUTH_URL` - Application URL (e.g., `http://localhost:3000`)
- `NEXTAUTH_SECRET` - Random secret for NextAuth
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret

Optional:
- `NEXT_PUBLIC_FILE_SERVER_URL` - External file server base URL

## Feature Areas

### Team Management
- Routes: `app/team/`
- Model: `TeamMember` with status (ACTIVE/INACTIVE), department, legal status
- Form: `app/team/team-member-form.tsx` with photo upload and date fields
- API: `app/api/team/route.ts` for CRUD operations

### Bicycle Repairs
- Routes: `app/bicycles/repairs/`
- Model: `BicycleRepair` with problem types (JSON array), parts used (relation), status tracking
- Problem types seeded from `prisma/seed.ts` (stored in `ProblemType` table)
- Status flow: PENDING → IN_PROGRESS → WAITING_FOR_PARTS → COMPLETED → PICKED_UP (or CANCELLED)
- Multi-step form: problem selection, description, dates, photo upload

### Bicycle Rentals
- Routes: `app/bicycles/rentals/`
- Model: `BicycleRental` with renter details, dates, signature (data URL stored in TEXT field)
- Signature capture: `react-signature-canvas` integration
- Status: ACTIVE → RETURNED (or OVERDUE/CANCELLED)

## Testing Strategy
Automated tests not yet implemented. Current validation approach:
1. Run `npm run lint` to catch TypeScript and ESLint issues
2. Run `npm run build` to verify production build succeeds
3. Manual testing of flows: login, team CRUD, rental creation, repair intake
4. Capture manual test steps in PR descriptions for reviewer replication

When adding tests in the future, colocate `*.test.tsx` files beside features or under `__tests__/`.
