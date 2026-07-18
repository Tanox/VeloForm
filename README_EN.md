# Veloform Bike Configurator

[中文版本 (Chinese Version)](./README.md) | [Project Specs](./openspec/README.md) | [Prototype Guide](./openspec/prototype-guide.md)

---

## Overview

Veloform is an advanced bicycle configurator built with Next.js, Tailwind CSS, and powered by Supabase. It allows users to browse and customize configuration lists for different types of bicycles, including Road, Mountain (MTB), and Folding bikes.

**Production URL**: [https://veloform.app](https://veloform.app)  
**Repository**: [https://github.com/sutchan/Veloform](https://github.com/sutchan/Veloform)

---

## Core Features

- **Industrial Luxury Design**: Minimalist and restrained with generous whitespace, clear visual hierarchy, and a single Burnt Sienna brand color, paired with SF Pro fonts
- **Dual Theme Support**: Support for both dark and light themes with unified design consistency
- **Real-time Price & Weight Calculation**: Dynamically calculates and displays total build cost and estimated weight
- **Configuration Cloud Sync**: Deeply integrated with Supabase Postgres and Row Level Security to securely save your unique builds
- **Bike Categorization**: Seamlessly switch between Road, MTB, and Folding bike presets
- **Fully Responsive**: Mobile-first approach with uncompromising desktop aesthetics
- **Bilingual Support**: Built-in EN/ZH-CN i18n system with one-click language switching
- **Config Library Management**: Save, load, and share your custom configurations
- **Smooth Animations**: Micro-interactions powered by Framer Motion for natural and delightful user experience
- **Performance Optimized**: Selective state subscription to avoid unnecessary re-renders

---

## Tech Stack

For complete tech stack documentation, see [Architecture Overview](./openspec/architecture/overview.md).

| Technology    | Version  | Purpose                                          |
| ------------- | -------- | ------------------------------------------------ |
| Next.js       | v14.1.0  | App Router architecture, React Server Components |
| React         | v18.2.0  | UI component library                             |
| Zustand       | v4.5.0   | Lightweight state management                     |
| Tailwind CSS  | v3.4.0   | Styling framework                                |
| Supabase      | v2.45.0  | Postgres database and Row Level Security         |
| Framer Motion | v10.16.4 | Animation effects                                |
| Lucide React  | v0.294.0 | Icon library                                     |

---

## Directory Structure

```
src/
├── app/                          # App Router route files
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home/Configurator page
│   ├── providers.tsx             # Global providers
│   ├── globals.css               # Global styles
│   └── library/
│       └── page.tsx              # Configuration library page
├── components/                   # UI components
│   ├── configurator/             # Configurator components
│   │   ├── BikeTypeSelector.tsx  # Bike type selector
│   │   ├── BuildList.tsx         # Component list
│   │   ├── ComponentDetailModal.tsx  # Component detail modal
│   │   ├── ComponentSelector.tsx # Component selector
│   │   ├── CostBreakdownChart.tsx    # Cost breakdown chart
│   │   ├── RecommendedConfigs.tsx    # Recommended configs
│   │   ├── ShareModal.tsx        # Share modal
│   │   └── SummaryPanel.tsx      # Summary panel
│   ├── layout/                   # Layout components
│   │   └── Navbar.tsx            # Navigation bar
│   └── ui/                       # General UI components
│       ├── Button.tsx            # Button
│       ├── Card.tsx              # Card
│       ├── ErrorBoundary.tsx     # Error boundary
│       ├── Modal.tsx             # Modal
│       ├── OnboardingGuide.tsx   # Onboarding guide
│       ├── SupportModal.tsx      # Support modal
│       ├── ThemeToggle.tsx       # Theme toggle
│       └── Toast.tsx             # Toast notification
├── lib/                          # Utility library
│   ├── auth.ts                   # Supabase auth service
│   ├── constants.ts              # App constants
│   ├── env.ts                    # Environment variable validation
│   ├── supabase-service.ts       # Supabase data service
│   ├── supabase.ts               # Supabase client configuration
│   ├── stores/                   # Zustand state management
│   ├── utils.ts                  # Utility functions
│   ├── toast.ts                  # Toast notifications
│   ├── recommended-configs.ts    # Recommended configurations
│   ├── data/                     # Modular data
│   │   ├── index.ts
│   │   ├── component-details/    # Component detail data (modularized)
│   │   └── component-alternatives.ts
│   └── i18n/                     # Internationalization
│       ├── index.ts
│       ├── en.ts
│       └── zh-CN.ts
└── types/                        # TypeScript type definitions
    └── index.ts                  # Enhanced type definitions (including component specs)
```

For detailed development guidelines, see [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md).

---

## Quick Start

### Prerequisites

- Node.js >= 18.x
- npm or pnpm
- Supabase project (for Postgres database + Row Level Security)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/sutchan/Veloform.git
   cd Veloform
   ```

2. **Install dependencies**:

   ```bash
   npm install
   # or using pnpm
   pnpm install
   ```

3. **Configure environment variables**:

   ```bash
   cp .env.example .env
   # Edit .env and fill in your Supabase URL and anon key
   ```

4. **Start development server**:

   ```bash
   npm run dev
   ```

5. **Open the app**:
   Visit `http://localhost:3000` in your browser

### Supabase Configuration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Create a new project
3. In the SQL Editor, run all migration scripts under `supabase/migrations/`
4. Enable Email/Password and Google OAuth in **Authentication**
5. Get the Web App configuration (URL and anon key) from Project Settings
6. Copy the values to your `.env` file

---

## Available Scripts

| Command                 | Description                          |
| ----------------------- | ------------------------------------ |
| `npm run dev`           | Start development server (port 3000) |
| `npm run build`         | Build for production                 |
| `npm run start`         | Start production server              |
| `npm run lint`          | Run ESLint                           |
| `npm run test`          | Run unit tests                       |
| `npm run test:coverage` | Run tests with coverage report       |

---

## Project Guidelines

For development conventions, branch and commit rules, testing requirements, and documentation policy, see:

- **[openspec/README.md](./openspec/README.md)** - Specifications index (start here)
- **[openspec/PROJECT_GUIDELINES.md](./openspec/PROJECT_GUIDELINES.md)** - Project development guidelines
- **[openspec/design/ui-design-system.md](./openspec/design/ui-design-system.md)** - UI Design System
- **[openspec/prototype-guide.md](./openspec/prototype-guide.md)** - Prototype documentation
- **[openspec/design/design-review.md](./openspec/design/design-review.md)** - Design Review &amp; Optimization Suggestions

---

## Deployment

This project supports the following deployment platforms:

- **Vercel**: Recommended platform, zero-config automatic deployment
- **EdgeOne Pages**: Tencent Cloud edge deployment solution

For deployment guides, see [Environment Configuration](./openspec/deployment/environments.md).

---

## Contributing

Contributions are welcome! Please submit Issues and Pull Requests.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

Before submitting, please ensure:

- All tests pass (`npm run test`)
- Lint checks pass (`npm run lint`)
- Follow the [coding standards](./openspec/development/coding-standards.md)

---

## License

MIT License

---

## Version

Current version: **v4.2.0**
Last updated: 2026-07-18

For detailed changelog, see [CHANGELOG.md](./CHANGELOG.md).
