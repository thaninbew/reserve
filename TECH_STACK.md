# Core Framework
Frontend Framework: Next.js 15.5+
Runtime: Node.js 20+
Language: TypeScript 5.3+

# Styling & UI
CSS Framework: Tailwind CSS 3.4+
Component Library: shadcn/ui (Radix UI primitives)
Icons: Lucide React

# State Management
Global State: Zustand 4.5+
Server State: React Query (TanStack Query) 5.x
Form State: React Hook Form 7.50+
Validation: Zod 3.22+

# Backend & Database
Database: PostgreSQL 15+ (via Supabase)
ORM: Prisma 5.x
Authentication: NextAuth.js v5 (Auth.js)
File Storage: Supabase Storage
API Layer: Next.js App Router API Routes

# Maps & Location
Maps Library: Leaflet 1.9+
React Integration: React-Leaflet 4.2+
Geocoding: TBD

# Development Tools
Package Manager: pnpm 8+
Linting: ESLint 8+ with Next.js config
Formatting: Prettier 3+
Git Hooks: Husky + lint-staged

# Deployment & Hosting
TBD - likely Vercel or Supabase Hosting


{
  "name": "reserve",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "db:generate": "prisma generate",
    "db:push": "prisma db push",
    "db:migrate": "prisma migrate dev",
    "db:studio": "prisma studio",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"**/*.{ts,tsx,md,json}\"",
    "postinstall": "prisma generate"
  },
  "dependencies": {
    "next": "^15.5.0",
    "react": "^19.0.0",
    "react-dom": "^19.0.0",
    
    "next-auth": "^5.0.0-beta.25",
    "bcryptjs": "^2.4.3",
    "@auth/prisma-adapter": "^2.7.4",
    
    "prisma": "^5.22.0",
    "@prisma/client": "^5.22.0",
    
    "@supabase/supabase-js": "^2.47.10",
    
    "zustand": "^5.0.2",
    "@tanstack/react-query": "^5.62.8",
    "react-hook-form": "^7.54.2",
    "@hookform/resolvers": "^3.9.1",
    "zod": "^3.23.8",
    
    "@radix-ui/react-accordion": "^1.2.2",
    "@radix-ui/react-alert-dialog": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.2",
    "@radix-ui/react-checkbox": "^1.1.3",
    "@radix-ui/react-dialog": "^1.1.4",
    "@radix-ui/react-dropdown-menu": "^2.1.4",
    "@radix-ui/react-label": "^2.1.1",
    "@radix-ui/react-popover": "^1.1.4",
    "@radix-ui/react-select": "^2.1.4",
    "@radix-ui/react-separator": "^1.1.1",
    "@radix-ui/react-slot": "^1.1.1",
    "@radix-ui/react-tabs": "^1.1.1",
    "@radix-ui/react-toast": "^1.2.4",
    "@radix-ui/react-tooltip": "^1.1.5",
    
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    
    "leaflet": "^1.9.4",
    "react-leaflet": "^4.2.1",
    
    "lucide-react": "^0.468.0",
    "date-fns": "^4.1.0",
    "react-dropzone": "^14.3.5",
    
    "sonner": "^1.7.1"
  },
  "devDependencies": {
    "@types/node": "^22.10.2",
    "@types/react": "^19.0.1",
    "@types/react-dom": "^19.0.2",
    "@types/bcryptjs": "^2.4.6",
    "@types/leaflet": "^1.9.14",
    
    "typescript": "^5.7.2",
    "eslint": "^8.57.1",
    "eslint-config-next": "^15.5.0",
    "prettier": "^3.4.2",
    "prettier-plugin-tailwindcss": "^0.6.9",
    
    "tailwindcss": "^3.4.17",
    "postcss": "^8.4.49",
    "autoprefixer": "^10.4.20",
    
    "@tailwindcss/typography": "^0.5.15",
    "@tailwindcss/forms": "^0.5.9"
  },
  "engines": {
    "node": ">=20.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

---

## **Project Structure with Zustand**
```
reserve/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── properties/
│   │   │   ├── page.tsx
│   │   │   ├── [id]/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── overview/page.tsx
│   │   │   │   ├── documents/page.tsx
│   │   │   │   ├── timeline/page.tsx
│   │   │   │   └── layout.tsx
│   │   │   └── new/
│   │   │       └── page.tsx
│   │   ├── settings/
│   │   │   ├── page.tsx
│   │   │   ├── family/page.tsx
│   │   │   └── users/page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   ├── auth/
│   │   │   └── [...nextauth]/
│   │   │       └── route.ts
│   │   ├── properties/
│   │   │   ├── route.ts
│   │   │   └── [id]/
│   │   │       ├── route.ts
│   │   │       ├── photos/route.ts
│   │   │       └── documents/route.ts
│   │   ├── upload/
│   │   │   └── route.ts
│   │   └── stats/
│   │       └── route.ts
│   │
│   ├── providers.tsx              # React Query + Auth providers
│   ├── layout.tsx
│   ├── globals.css
│   └── page.tsx
│
├── components/
│   ├── ui/                        # shadcn components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── form.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── table.tsx
│   │   └── ...
│   │
│   ├── properties/
│   │   ├── property-card.tsx
│   │   ├── property-form.tsx
│   │   ├── property-stats.tsx
│   │   ├── property-filters.tsx
│   │   └── property-status-badge.tsx
│   │
│   ├── map/
│   │   ├── property-map.tsx
│   │   ├── property-marker.tsx
│   │   └── map-popup.tsx
│   │
│   ├── documents/
│   │   ├── document-list.tsx
│   │   ├── document-upload.tsx
│   │   └── document-card.tsx
│   │
│   ├── timeline/
│   │   ├── activity-feed.tsx
│   │   └── activity-item.tsx
│   │
│   └── layout/
│       ├── header.tsx
│       ├── sidebar.tsx
│       └── mobile-nav.tsx
│
├── lib/
│   ├── prisma.ts
│   ├── auth.ts
│   ├── supabase.ts
│   ├── utils.ts
│   ├── validations/
│   │   ├── property.ts
│   │   ├── user.ts
│   │   └── document.ts
│   └── actions/
│       ├── properties.ts
│       ├── documents.ts
│       └── users.ts
│
├── store/                         # Zustand stores
│   ├── use-filter-store.ts        # Property filters
│   ├── use-map-store.ts           # Map state
│   ├── use-property-store.ts      # Selected properties
│   └── use-ui-store.ts            # UI state (sidebar, modals)
│
├── hooks/
│   ├── use-properties.ts          # React Query hooks
│   ├── use-documents.ts
│   ├── use-user.ts
│   └── use-toast.ts
│
├── types/
│   ├── index.ts
│   └── api.ts
│
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
│
├── public/
│   ├── images/
│   └── icons/
│
├── .env.local
├── .env.example
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── components.json              # shadcn config
└── package.json