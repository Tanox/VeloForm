# Veloform Bike Configurator

[中文版本 (Chinese Version)](./README.md)

<<<<<<< HEAD
Veloform is an advanced bicycle configurator built with Next.js, Tailwind CSS, and powered by Firebase. It allows users to browse and customize configuration lists for different types of bicycles, including Road, Mountain (MTB), and Folding bikes.

## Features

- **Minimalist Dark UI**: Modern dark-themed design with smooth transitions and crisp typography.
- **Real-time Price & Weight Calculation**: Dynamically calculates and displays total build cost and estimated weight.
- **Configuration Cloud Sync**: Deeply integrated with Firebase Firestore to securely save your unique builds.
- **Bike Categorization**: Seamlessly switch between Road, MTB, and Folding bike presets.
- **Fully Responsive**: Mobile-first approach with uncompromising desktop aesthetics.
=======
Veloform is an advanced, sophisticated bicycle configurator application built with Next.js, Tailwind CSS, and powered by Firebase. It allows users to browse and customize configurations for different types of bicycles, including Road, Mountain (MTB), and Folding bikes.

## Features

- **Sophisticated UI**: Dark-themed, modern interface heavily reliant on smooth transitions and crisp typography.
- **Real-time Price & Weight**: Live calculation of total build cost and estimated weight.
- **Configuration Sync**: Fully integrated with Firebase Firestore to save and sync your builds.
- **Categorization**: Switch seamlessly between Road, MTB, and Fold presets.
- **Responsive Design**: Designed with mobile-first adaptivity but desktop-class aesthetics.
>>>>>>> origin/main

## Architecture

This project is built using:
- **Next.js (v14.1.0)**: App Router architecture with React Server Components.
- **React (v18.2.0)**: UI component library with client-side interactivity.
- **Zustand (v4.5.0)**: Lightweight state management library.
- **Tailwind CSS (v3.4.0)**: For all layout, typography, and interactive state stylings.
<<<<<<< HEAD
- **Firebase**: Uses the `firebase` npm package to manage Firestore database and Auth authentication.
- **Framer Motion**: Smooth animation effects.
- **EdgeOne & Vercel**: Ready for edge deployment workflow (integrated in UI).
=======
- **Firebase**: Uses Firestore and Auth via the `firebase` npm package.
- **Framer Motion**: Smooth animation effects.
- **EdgeOne & Vercel**: Ready for edge deployment logic (simulated in UI).
>>>>>>> origin/main

## Local Development

Ensure you have your Firebase environment variables set (reference `.env.example`), then run:

```bash
npm install
npm run dev
```

## Project Guidelines

<<<<<<< HEAD
For development conventions, branch and commit rules, testing requirements, and documentation policy, see [openspec/PROJECT_GUIDELINES.md](openspec/PROJECT_GUIDELINES.md).

## Directory Structure
=======
For development conventions, branch rules, testing strategy, and documentation policy, see `openspec/PROJECT_GUIDELINES.md`.

## Structure
>>>>>>> origin/main

- `src/`
  - `app/`: Next.js App Router files
  - `components/`: UI components (configurator, layout, general UI)
  - `lib/`: Utility functions, state management, Firebase configuration
  - `types/`: TypeScript type definitions

## Versioning

Currently running version **v3.4.0**.
