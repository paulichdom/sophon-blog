# Sophon: Generative AI Blogging Platform

Sophon is a modern React frontend application for a generative AI-powered blogging platform. The application is built with Vite, TypeScript, Mantine UI components, TanStack Router, and comprehensive testing with Vitest. It connects to a separate NestJS backend API (paulichdom/sophon-api).

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Bootstrap, Build, and Test the Repository

**CRITICAL: Use Node.js v22.11.0 as specified in .nvmrc. Current environment may have different version.**

1. **Install dependencies:**
   ```bash
   npm install
   ```
   - Takes ~35 seconds
   - Will show 6 vulnerabilities (3 low, 1 moderate, 1 high, 1 critical) - this is normal
   - Do NOT run `npm audit fix` automatically as it may break compatibility

2. **Build the application:**
   ```bash
   npm run build
   ```
   - **NEVER CANCEL** - Takes ~20 seconds. Set timeout to 60+ seconds.
   - Runs TypeScript compilation (`tsc`) then Vite production build
   - Outputs to `dist/` directory
   - Will show chunk size warnings for files >500KB - this is expected

3. **Run the full test suite:**
   ```bash
   npm test
   ```
   - **NEVER CANCEL** - Takes ~40 seconds total. Set timeout to 90+ seconds.
   - Runs: `typecheck` → `prettier` → `lint` → `vitest` → `build`
   - Must pass all steps for CI to succeed

4. **Run individual test commands:**
   ```bash
   npm run typecheck     # TypeScript type checking (~3 seconds)
   npm run prettier      # Check code formatting (~2 seconds)
   npm run lint          # ESLint + Stylelint (~5 seconds)
   npm run vitest        # Unit tests only (~6 seconds)
   npm run vitest:watch  # Interactive test watch mode
   ```

### Development Server

**ALWAYS run the bootstrapping steps first.**

1. **Start development server:**
   ```bash
   npm run dev
   ```
   - Starts on http://localhost:5173/
   - Takes <1 second to start
   - Includes hot module replacement
   - Route generation happens automatically

2. **Production preview:**
   ```bash
   npm run preview
   ```
   - Previews production build on http://localhost:4173/
   - Requires `npm run build` to be run first

### Storybook Development

1. **Start Storybook dev server:**
   ```bash
   npm run storybook
   ```
   - Starts on http://localhost:6006/
   - **WARNING**: No story files exist yet - will show warnings but still works
   - Takes ~1 second to start

2. **Build Storybook:**
   ```bash
   npm run storybook:build
   ```
   - **NEVER CANCEL** - Takes ~8 seconds. Set timeout to 30+ seconds.
   - Outputs to `storybook-static/` directory

## Validation

### Always Manually Validate Changes

1. **Code Quality Validation:**
   ```bash
   npm run prettier:write  # Auto-format code
   npm run lint           # Check for linting errors
   npm run typecheck      # Verify TypeScript types
   ```

2. **Application Functionality Testing:**
   - **ALWAYS start the dev server** after making changes: `npm run dev`
   - Navigate to http://localhost:5173/ to test the application
   - **Test key user flows:**
     - Homepage loads correctly
     - Navigation between pages works
     - Article editor functionality (if modified)
     - User authentication flow (if auth changes made)
     - Responsive design on different screen sizes

3. **Build Validation:**
   ```bash
   npm run build      # Ensure production build succeeds
   npm run preview    # Test production build locally
   ```

### Testing Strategy

- **Component Tests**: Located in `src/components/*/ComponentName.test.tsx`
- **Test Utilities**: Available in `test-utils/` directory with custom render function
- **Testing Libraries**: Vitest, @testing-library/react, @testing-library/user-event
- **Coverage**: Run `npm run vitest` to see test coverage
- **Watch Mode**: Use `npm run vitest:watch` for TDD development

### Pre-commit Requirements

**ALWAYS run these before committing or the CI (.github/workflows/npm_test.yml) will fail:**
```bash
npm run prettier:write  # Format code
npm test               # Full test suite
```

## Common Tasks

### Repository Structure

Key directories and files:
```
src/
├── components/        # React components (Article, Auth, Editor, etc.)
├── routes/           # TanStack Router route definitions
├── api/              # API client and query/mutation hooks
├── auth/             # Authentication state and utilities  
├── hooks/            # Custom React hooks
├── shared/           # Shared utilities and constants
├── types/            # TypeScript type definitions
└── theme.ts          # Mantine theme configuration

.github/
└── workflows/
    └── npm_test.yml  # CI pipeline (install → build → test)

Configuration files:
├── vite.config.mjs   # Vite build configuration
├── tsconfig.json     # TypeScript configuration
├── eslint.config.js  # ESLint configuration  
├── .prettierrc.mjs   # Prettier configuration
├── .stylelintrc.json # Stylelint configuration
└── vitest.setup.mjs  # Test environment setup
```

### Backend API Integration

- **API Client**: `src/shared/api.client.ts` - Axios-based client with auth interceptors
- **Environment Variables**: Requires `VITE_API_URL` to connect to backend
- **Backend Repository**: [paulichdom/sophon-api](https://github.com/paulichdom/sophon-api) (NestJS)
- **Authentication**: JWT-based with automatic token refresh
- **API Structure**: RESTful API for articles, comments, users, profiles

### Key Technologies

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite 6.2+ 
- **UI Library**: Mantine 8.1+ (components, forms, notifications)
- **Routing**: TanStack Router with file-based routing
- **State Management**: Zustand for auth state, TanStack Query for server state
- **Rich Text Editor**: TipTap for article editing
- **Testing**: Vitest + Testing Library
- **Styling**: CSS Modules + Mantine components
- **Code Quality**: ESLint, Prettier, Stylelint
- **Package Manager**: npm (not yarn)

### Frequent Command Reference

**Development:**
```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Production build (~20s, NEVER CANCEL)
npm run preview      # Preview production build
```

**Testing:**
```bash
npm test            # Full test suite (~40s, NEVER CANCEL)  
npm run vitest      # Unit tests only (~6s)
npm run vitest:watch # Watch mode for TDD
```

**Code Quality:**
```bash
npm run lint        # ESLint + Stylelint (~5s)
npm run prettier    # Check formatting
npm run prettier:write # Auto-format code
npm run typecheck   # TypeScript validation (~3s)
```

**Documentation/Storybook:**
```bash
npm run storybook         # Dev server (http://localhost:6006)
npm run storybook:build   # Build static Storybook (~8s)
```

### Troubleshooting

**Node.js Version Mismatch:**
- Project requires Node.js v22.11.0 (see .nvmrc)
- If using different version, some dependencies may not work correctly
- Commands should still work but build times may vary

**ESLint Warnings:**
- `.eslintignore` deprecation warning is expected - project uses modern config
- This does not affect functionality

**Build Chunk Size Warnings:**
- Large chunk warnings (>500KB) are expected for this app
- Does not affect functionality but could be optimized in future

**Storybook No Stories Warning:**
- Normal - project doesn't have Storybook stories configured yet
- Storybook still functions for component development

**Security Vulnerabilities:**
- npm audit shows 6 vulnerabilities - known issue with current dependencies  
- Do not run `npm audit fix` without testing as it may break compatibility
- Vulnerabilities are in dev dependencies and do not affect production

### Environment Setup

**Required Environment Variables:**
```bash
VITE_API_URL=<backend-api-url>  # Required for API connectivity
```

**Optional Environment Variables:**
```bash  
VITE_API_BASE_URL=<base-url>
VITE_API_VERSION=<version>
```

Create a `.env.local` file in the project root with your environment variables for local development.