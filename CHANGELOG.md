# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [4.0.0]

### Added

- Added complete i18n system with EN/ZH-CN translations for all pages and components
- Added new FAQ page (`/faq`) with shadcn/ui Accordion component
- Added new About page (`/about`) with brand introduction and statistics
- Added language switch button in Navbar with Globe icon
- Added `useReducedMotion` hook support for accessibility
- Added global animation constants (`ANIMATION_DURATION = 0.3s`) in `lib/animation.ts`
- Added smooth scroll navigation between sections
- Added `sections/` directory with Hero, Features, Pricing, and Cta components
- Added `Footer` component with i18n translations

### Changed

- Upgraded project version to v4.0.0
- Refactored all hardcoded Chinese text to use `useTranslation()` hook
- Unified animation duration to 300ms across all components
- Updated Navbar with language switcher and smooth scroll navigation
- Updated Hero section with i18n and proper animation timing
- Updated Features section with 6 feature cards using i18n
- Updated Pricing section with 3 pricing plans using i18n
- Updated Cta section with i18n translations
- Updated Footer with i18n for all categories and links
- Updated i18n type definitions to support array translations
- Updated Translations interface with hero, features, pricing, cta, footer modules

### Fixed

- Fixed animation duration exceeding design specification (>300ms)
- Fixed i18n array type compatibility issues
- Fixed README_EN.md still referencing Firebase (migrated to Supabase)

## [3.9.0]

### Added

- Added client-side input validation (email format + password length) for auth flows
- Added login rate limiting (5 attempts / 60s lockout) to mitigate brute-force attacks
- Added HTTPS URL validation and placeholder detection for Supabase env vars
- Added fetch timeout (30s) for Supabase client to prevent hanging requests
- Added i18n keys for home page bike-type selector section (EN/ZH-CN)

### Changed

- Upgraded Next.js from 14.1.0 to 14.2.35 (fixes 28 security advisories)
- Upgraded eslint-config-next from 14.1.0 to 14.2.35
- Unified version numbers across codebase to 3.9.0 (constants, Navbar, README, SPEC)
- Navbar now sources version from centralized APP_CONSTANTS instead of hardcoding
- Footer copyright year now dynamic (getFullYear) instead of hardcoded 2024
- CSP now removes 'unsafe-eval' in production (dev-only requirement)
- X-Frame-Options changed from DENY to SAMEORIGIN to align with frame-src
- Sanitized auth error messages to avoid leaking user existence
- Google OAuth now sets explicit redirectTo callback URL

### Refactored

- Split component-details.ts (349 lines) into per-category modules under data/details/
- Split constants.ts by extracting default component configs into defaults.ts

### Fixed

- Fixed version mismatch: Navbar showed v3.7.0, constants had 3.8.0
- Fixed SPEC.md/README_EN.md still referencing Firebase (migrated to Supabase)
- Fixed supabase.ts isSupabaseConfigured() not checking anon key placeholder

## [3.5.0]

### Added

- Added Footer component with version number display
- Added complete light/dark mode theming support
- Added CSS variables for theming system
- Added dark mode gradient mesh background

### Changed

- Updated Tailwind config with darkMode: 'class' for next-themes compatibility
- Refactored color system to use CSS variables for theme switching
- Updated gradient-mesh and noise-bg utilities for light mode compatibility
- Updated Navbar styling for better dark mode support
- Updated providers.tsx to use next-themes ThemeProvider
- Updated openspec documentation to reflect latest changes

### Fixed

- Fixed light/dark mode toggle not working properly
- Fixed color inconsistencies between light and dark modes

## [3.4.1]

### Added

- Added component detail modal with i18n support
- Added new translation keys for component details and reviews
- Created modular data structure in `src/lib/data/` directory

### Changed

- Refactored `mock-data.ts` into modular structure:
  - `src/lib/data/component-details.ts` - Detailed component information
  - `src/lib/data/component-alternatives.ts` - Component alternatives
  - `src/lib/data/index.ts` - Exports
- Updated `ComponentDetailModal.tsx` to use i18n translations
- Updated `BuildList.tsx` to use i18n translations
- Fixed TypeScript type issues in `firebase-service.ts` (replaced `any` with proper types)
- Updated `README.md` and `README_EN.md` directory structure documentation
- Updated `openspec/SPEC.md` to reflect current project structure
- Updated `openspec/PROJECT_GUIDELINES.md` (removed Angular references)
- Updated `openspec/architecture/data-flow.md` (removed Angular references)
- Updated UI component inventory in `openspec/SPEC.md`

### Fixed

- Removed hardcoded English text from `ComponentDetailModal.tsx`
- Added missing i18n translation keys for component detail page
- Fixed `any` type usage in `firebase-service.ts` for better type safety

## [3.4.0]

### Changed

- Unified version numbers across all code files to v3.4.0.
- Simplified file header format from "重构版本 vX.Y.Z" to "vX.Y.Z".
- Updated package.json version to 3.4.0.
- Updated APP_INFO version constant to 3.4.0.

## [3.3.0]

### Changed

- Restructured project to feature-based architecture.
- Moved core services to `src/app/core/services/`.
- Moved state management to `src/app/core/stores/`.
- Moved models to `src/app/core/models/`.
- Moved constants to `src/app/core/constants/`.
- Created feature modules for configurator and navbar.
- Added backward-compatible alias files for old import paths.

## [3.2.0]

### Added

- New SVG logo and favicon with bicycle frame geometry design.
- Component selector modal dialog for editing bike parts.
- Notification system with toast-style notifications.
- Confirm dialog service for user confirmation prompts.
- Loading indicator component for async operations.
- ConfigStore and ConfigService for centralized state management.
- Routing system with /config/:id route for sharing builds.
- Enhanced type definitions with complete JSDoc comments.

## [3.1.1]

### Fixed

- Synchronized version numbers across SPEC.md and index.html title tag.

## [3.1.0]

### Added

- Created `app.constants.ts` to separate logic from default data arrays.
- Implemented language toggle within navigation UI.

## [3.0.0]

### Added

- Integrated Three.js 3D model visualizer in the preview component replacing the SVG mock.
- Full Firebase configurations library: save, view, edit, and delete functions.
- Centralized component database via Firestore instead of local constants.

## [2.0.0]

### Changed

- Refactored components to fully embrace Angular v21 Zoneless pattern.
- Extracted strings to i18n service supporting English and Chinese.
- Injected semantic DOM IDs for core containers matching conventions.
- Included comprehensive JSON-LD structure in document header.
- Updated to latest architectural specification standard.

## [1.0.0]

### Added

- Initial setup of Veloform Bike Configurator.
- Firebase integration for cloud configurations sync.
- Tailwind CSS Sophisticated Dark themed interface.
- Responsive layout with Sidebar, Preview Canvas, and Configuration List.
- Support for Road, MTB, and Fold categories.
