# Makerspace System

Makerspace System is an open source operations platform for community workshops, repair spaces, and volunteer-led organizations.

It was built to replace fragmented spreadsheets, Airtable bases, paper forms, and chat-based coordination with one practical system for the daily work of running a makerspace: managing people, intake, repairs, rentals, and workshop activity.

While it is used at Makerspace Lesvos, the project is intentionally generic enough to help other community workshops, bike kitchens, repair cafes, fabrication labs, and small nonprofits that need lightweight internal operations software without enterprise complexity.

## Why this exists

Many grassroots spaces run critical operations on top of tools that were never designed for the job:

- member and volunteer records scattered across spreadsheets
- intake information collected on paper or in chat
- repair tracking split across several databases because of plan limits
- no reliable way to see who is active, present, or responsible for what
- ad hoc processes for permissions, training, compliance, and handover

Makerspace System brings those workflows together in one application with a shared data model and role-based access.

## What it does

The platform currently supports:

- team directory and personnel records
- Google SSO and Google Workspace-linked account management
- bicycle repair intake, tracking, editing, and bulk actions
- bicycle rental management with signatures and return workflows
- electronics repair intake and tracking
- carpentry and house project tracking
- operational dashboards and reports
- attendance and presence planning for team members
- Airtable import tooling for migrating historical operational data

## Why it can help the wider community

This project is useful beyond one organization because the underlying problems are shared widely across community infrastructure projects:

- repair spaces need clear intake and status tracking
- distributed volunteer teams need simple people management
- small organizations need a way to preserve operational memory
- teams moving off proprietary tools need migration paths
- mission-driven groups need software that matches constrained budgets and low admin overhead

Open sourcing this system makes it easier for similar organizations to:

- self-host their operations tooling
- adapt the workflows to local realities
- avoid vendor lock-in
- reuse data structures for repairs, members, and attendance
- start from a working operational baseline instead of building from scratch

## Stack

- Next.js 15 App Router
- TypeScript
- Prisma
- MySQL
- NextAuth
- Tailwind CSS
- shadcn/ui

## Key features

### Team operations

- team member profiles with contact, status, compliance, and training fields
- role management and Google Workspace integration
- presence calendar for planning who is in the space
- filtering, bulk actions, and paginated views

### Repair and rental workflows

- bicycle repairs with status tracking, owner details, and repair timelines
- electronics repairs with category handling and bulk updates
- bicycle rentals with signatures, status changes, and return handling
- editable received/created dates for backfilled records

### Reporting and administration

- dashboard summaries for major operational areas
- weekly, monthly, yearly, and all-time reports
- bulk actions across operational lists
- import utilities for historical Airtable data

## Project structure

- `app/` routes, API handlers, and feature-scoped server/client components
- `components/` shared UI, layout, and reusable primitives
- `data/` static fixtures used by the app
- `lib/` cross-cutting utilities, auth helpers, i18n, and Prisma access
- `prisma/` schema, migrations, and seed scripts
- `generated/prisma/` generated Prisma client output
- `public/` static assets
- `scripts/` operational scripts such as Airtable import and database cleanup

## Getting started

### Prerequisites

- Node.js 20+
- npm 10+
- MySQL 8+ or compatible
- Google OAuth credentials for NextAuth

### Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create your environment file:

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
   npx prisma generate
   npm run prisma:seed
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:3000`

## Useful commands

- `npm run dev` start the local development server
- `npm run build` create a production build
- `npm run start` serve the built app
- `npm run lint` run ESLint
- `npm run prisma:seed` seed baseline lookup data
- `npm run import:airtable -- --modules=team,electronics,rentals,carpentry,bicycle-repairs` dry-run Airtable imports
- `npm run db:clear-imported -- --write` clear imported operational data while keeping admin accounts

## Data migration

The repository includes Airtable import tooling to help organizations migrate off fragmented Airtable setups, including historical multi-base operational datasets.

That matters because many community organizations outgrow Airtable structure, hit record limits, or end up splitting one workflow across several bases. This project includes migration support specifically to reduce that barrier.

## Current status

This is an actively developed internal operations system that is being generalized through real-world use. The codebase is already useful in practice, but it is still evolving.

Areas that are especially valuable for future open source work include:

- better onboarding and installation documentation
- stronger automated test coverage
- more configurable workflow modules
- additional import/export tooling
- clearer deployment recipes for self-hosting

## Contributing

Contributions are welcome, especially from people working on:

- community workshop management
- repair tracking
- self-hosted nonprofit tooling
- data migration from legacy operational systems
- accessibility, localization, and deployment improvements

Before contributing, check [`AGENTS.md`](./AGENTS.md) for repository conventions around structure, commits, and editing workflow.

## License

No license file is currently included in this repository. If you are preparing this project for wider open source adoption or grant review, adding an explicit license should be a next step.
