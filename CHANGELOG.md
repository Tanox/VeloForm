# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.8.0]
### Added
- Integrated shadcn/ui component library (v4.11.0) with gradient button variant
- Added complete Apple-style design system in globals.css with CSS variables
- Added text-gradient-brand utility class for brand gradient text
- Added touch-target utility class (44x44px minimum) for accessibility
- Added animation utilities: float, glow-pulse, gradient-shift, fadeIn, slideUp
- Added reduced-motion media query support for accessibility
- Added prototype design specification documents:
  - design-system-spec.md - Complete design token system
  - component-library.md - Component classification and usage rules
  - interaction-standards.md - Interaction patterns and feedback standards

### Changed
- Refactored button.tsx to use shadcn/ui with gradient variant support
- Updated tailwind.config.ts with complete CSS variable color system
- Updated globals.css with Apple HIG color palette and design tokens
- Updated BikeTypeSelector.tsx with enhanced interaction states and animations
- Updated BuildList.tsx and SummaryPanel.tsx to use shadcn Button components
- Updated Hero.tsx, Cta.tsx, Navbar.tsx to use consistent Button styling
- Updated Features.tsx and Pricing.tsx with proper aria-hidden attributes
- Updated i18n translations (zh-CN.ts, en.ts) with missing emptyState keys
- Updated README.md with shadcn/ui in tech stack and updated directory structure
- Updated package.json version to 3.8.0

### Fixed
- Fixed decorative elements missing aria-hidden attributes
- Fixed button touch targets to meet WCAG 2.1 44x44px minimum requirement
- Fixed aria-pressed attribute on role="tab" elements (removed unsupported attribute)
- Fixed missing i18n translation keys for configurator empty state
- Fixed inconsistent button styling across components

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
