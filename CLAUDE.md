# Kakao Map Components - Development Guide

## Commands
```bash
# Build all packages
pnpm build
# Development mode
pnpm dev
# Lint all packages
pnpm lint
# Format code
pnpm format
# Type checking
pnpm check-types
# Run all tests
pnpm test

# Package specific (kakao-map-components)
pnpm --filter kakao-map-components build
pnpm --filter kakao-map-components serve
pnpm --filter kakao-map-components cy:open  # Cypress tests UI
```

## Code Style
- **Components**: Web Components using Lit with kebab-case element names
- **TypeScript**: Strict mode, explicit typing, ES2020 features
- **Naming**: PascalCase for classes/interfaces, camelCase for functions/variables, UPPER_SNAKE_CASE for constants
- **Imports**: Group external libs first, then internal modules
- **Error Handling**: Use explicit error types (e.g., `LoaderError`), proper try/catch in async functions
- **Formatting**: Uses Prettier, auto-formatted via pre-commit hooks

This is a Turborepo monorepo with PNPM as package manager.