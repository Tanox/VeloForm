# Veloform Bike Configurator

[中文版本 (Chinese Version)](./README.md)

Veloform is an advanced bicycle configurator built with Next.js, Tailwind CSS, and powered by Firebase. It allows users to browse and customize configuration lists for different types of bicycles, including Road, Mountain (MTB), and Folding bikes.

## Features

- **Minimalist Dark UI**: Modern dark-themed design with smooth transitions and crisp typography.
- **Real-time Price & Weight Calculation**: Dynamically calculates and displays total build cost and estimated weight.
- **Configuration Cloud Sync**: Deeply integrated with Firebase Firestore to securely save your unique builds.
- **Bike Categorization**: Seamlessly switch between Road, MTB, and Folding bike presets.
- **Fully Responsive**: Mobile-first approach with uncompromising desktop aesthetics.

## Tech Stack

This project uses the following technology stack:

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | v14.1.0 | App Router architecture, React Server Components |
| React | v18.2.0 | UI component library |
| Zustand | v4.5.0 | Lightweight state management |
| Tailwind CSS | v3.4.0 | Styling framework |
| Firebase | v10.0.0 | Firestore database and Auth authentication |
| Framer Motion | v10.16.4 | Animation effects |
| Lucide React | v0.294.0 | Icon library |

## Directory Structure

```
src/
├── app/                          # App Router route files
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── components/                   # UI components
│   ├── configurator/             # Configurator components
│   ├── layout/                   # Layout components
│   └── ui/                      # General UI components
├── lib/                          # Utility library
│   ├── store/                    # Zustand state management
│   ├── firebase-service/         # Firebase services
│   ├── utils/                    # Utility functions
│   ├── constants/                # Constant definitions
│   └── mock-data/                # Mock data
├── types/                        # TypeScript type definitions
└── ...
```

For detailed development guidelines, see [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md).

## Local Development

Ensure you have your Firebase environment variables set (reference `.env.example`), then run:

```bash
npm install
npm run dev
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run test` | Run unit tests |
| `npm run test:coverage` | Run tests with coverage report |

## Project Guidelines

For development conventions, branch and commit rules, testing requirements, and documentation policy, see [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md).

## Version

Currently running version **v3.4.0**.