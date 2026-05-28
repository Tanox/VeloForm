# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
