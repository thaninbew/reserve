# reserve

A modern property management platform for families and small property owners to centralize holdings, collaborate effectively, and maintain complete operational control.

## Overview

Reserve provides a unified system for managing property portfolios. Track multiple properties, organize documents, coordinate with family members, and maintain real-time visibility across your entire estate—all in one place.

## Core Features

- **Property Dashboard**: Portfolio overview with values, status, and key metrics
- **Interactive Map**: Visualize properties with color-coded markers and navigation
- **Document Management**: Centralize leases, deeds, insurance, and inspection logs
- **Family Collaboration**: Role-based access with property manager assignments
- **Activity Timeline**: Complete audit trail of all actions
- **Mobile-First**: On-site access for inspections and uploads

## Use Cases

- **Multi-Property Management**: Coordinate oversight across rental, vacation, and family properties
- **Family Portfolios**: Shared visibility and task assignment between family members
- **Estate Planning**: Maintain current records for seamless succession
- **Rental Operations**: Track leases, tenants, and property maintenance

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, shadcn/ui
- **State**: Zustand, React Query
- **Backend**: Prisma ORM, PostgreSQL, NextAuth.js
- **Storage**: Supabase
- **Maps**: Leaflet

See `tech_stack.md` for details.

## Getting Started
```bash
pnpm install
cp .env.example .env.local
pnpm prisma generate && pnpm prisma db push
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## Development Status

🚧 MVP in progress

**Post-MVP:**
- Rental & financial tracking
- Alerts & notifications
- Tenant portal
- GPS inspection logging

## License

Proprietary