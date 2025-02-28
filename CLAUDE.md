# CLAUDE.md for kakao-map-components

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Build the library
- `npm run preview` - Preview the build

## Lint Commands

- `npx eslint ./src/**/*.{js,ts} --fix` - Lint and fix code
- `npx prettier --write ./src/**/*.{js,ts}` - Format code

## Code Style Guidelines

- Use TypeScript with strict typing
- Follow LitElement patterns for web components
- Use decorators (@property, @state, @customElement) for component properties
- Use 2 spaces for indentation
- Use named exports for components
- Include JSDoc comments for components (properties, events, slots)
- Prefix component names with "kakao-"
- Organize imports: external libs first, then internal imports
- Error handling: use try/catch with specific error types
- Follow singleton pattern for critical components (see KakaoApiLoader)
- Use async/await or Promise chaining for asynchronous operations
- Use constants file for reusable values
