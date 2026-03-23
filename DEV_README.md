# Development Guidelines

This document outlines the coding standards, conventions, and best practices used in the Kali Linux Portfolio project.

## Table of Contents

- [Code Style](#code-style)
- [Component Architecture](#component-architecture)
- [Styling Conventions](#styling-conventions)
- [TypeScript Guidelines](#typescript-guidelines)
- [Git Workflow](#git-workflow)
- [Testing](#testing)
- [Performance](#performance)

## Code Style

### General Formatting

- **Indentation**: 2 spaces (no tabs)
- **Line endings**: LF (Unix-style)
- **Semicolons**: Required
- **Quotes**: Double quotes for strings and JSX attributes
- **Max line length**: 80 characters
- **Arrow function parentheses**: Omit when possible (`avoid`)
- **Trailing commas**: Only for ES5+ objects/arrays
- **Bracket spacing**: Enabled

### ESLint Rules

The project enforces the following ESLint rules:

```javascript
{
  "camelcase": "error",                    // Enforce camelCase naming
  "no-duplicate-imports": "error",         // Prevent duplicate imports
  "@typescript-eslint/no-unused-vars": "error", // Prevent unused variables
  "linebreak-style": ["warn", "unix"],     // Enforce Unix line endings
  "react-refresh/only-export-components": [
    "warn", 
    { "allowConstantExport": true }        // Allow constant exports
  ],
  "react/react-in-jsx-scope": "off",       // Not required in React 19+
  "react/no-unescaped-entities": 0,        // Allow unescaped entities
  "react/prop-types": 0,                   // Disable prop-types (using TypeScript)
  "no-undef": "off"                        // Disable no-undef (React 19+)
}
```

### Prettier Configuration

```json
{
  "arrowParens": "avoid",
  "semi": true,
  "tabWidth": 2,
  "printWidth": 80,
  "singleQuote": false,
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "endOfLine": "lf"
}
```

### Naming Conventions

- **Components**: PascalCase (`ThemeSwitcher`, `TerminalWindow`)
- **Functions**: camelCase (`handleThemeChange`, `initializeWindows`)
- **Variables**: camelCase (`isVisible`, `themeLoaded`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_WIDTH`, `DEFAULT_THEME`)
- **Files**: kebab-case for non-components (`theme-switcher.tsx`), PascalCase for components (`ThemeSwitcher.tsx`)

### Import Organization

```typescript
// 1. External libraries
import React, { useState } from "react";
import styled from "styled-components";

// 2. Internal types
import type { ThemeSwitcherProps } from "../types/window";

// 3. Internal hooks
import { useTheme } from "../hooks/useTheme";

// 4. Internal utilities
import { themeSwitcher } from "../utils/theme";

// 5. Internal components
import { ThemeButton } from "./ThemeButton";
```

## Component Architecture

### Component Structure

```typescript
// 1. Imports
import React from "react";

// 2. Styled components (if any)
const Container = styled.div``;

// 3. Component definition
const MyComponent: React.FC<MyComponentProps> = ({ prop1, prop2 }) => {
  // 4. State and hooks
  const [state, setState] = useState(initialValue);
  const { data } = useCustomHook();

  // 5. Event handlers
  const handleClick = () => {
    // handler logic
  };

  // 6. Render
  return (
    <Container>
      {/* JSX content */}
    </Container>
  );
};

export default MyComponent;
```

### Props Interface Naming

- Use descriptive names ending with `Props`
- Group related props in interfaces
- Use optional props (`?`) for non-required properties

```typescript
interface MyComponentProps {
  title: string;
  isVisible?: boolean;
  onClick?: (event: React.MouseEvent) => void;
}
```

## Git Workflow

### Branch Naming

commit-msg hook will validate commit messages. 

- **Feature branches**: `feature/description` (e.g., `feature/theme-switcher`)
- **Bug fixes**: `fix/issue-description` (e.g., `fix/react-warning`)

**Examples:**
```
Feature: add dark mode toggle
Fix: resolve React prop warning
Docs: update development guidelines
```

**Types:**
- `Feat`: New feature
- `Fix`: Bug fix
- `Docs`: Documentation changes
- `Style`: Code formatting (no logic changes)
- `Refactor`: Code restructuring
- `Test`: Adding or updating tests
- `Chore`: Maintenance tasks

### Pull Request Guidelines

1. **Create descriptive PR titles** using conventional commit format
2. **Reference issues** when applicable (`Closes #123`)
3. **Include a clear description** of changes
4. **Add screenshots** for UI changes
5. **Ensure tests pass** before submitting

## Testing

TODO: Not implemented yet.

### Test Structure

- **Unit tests**: `src/test/` directory
- **Component tests**: Co-located with components (`Component.test.tsx`)
- **Integration tests**: `src/test/integration/`



## Performance

### Best Practices

1. **Use memoization** for expensive calculations:
   ```typescript
   const expensiveValue = useMemo(() => {
     return calculateExpensiveValue(props.data);
   }, [props.data]);
   ```

2. **Implement proper state management**:
   ```typescript
   const [state, setState] = useState(initialState);
   
   // Use functional updates for state that depends on previous state
   const increment = () => {
     setState(prev => prev + 1);
   };
   ```

3. **Avoid inline object/function creation** in render:
   ```typescript
   // Avoid
   <Component style={{ margin: 10 }} onClick={() => doSomething()} />
   
   // Better
   const style = useMemo(() => ({ margin: 10 }), []);
   const handleClick = useCallback(() => doSomething(), []);
   <Component style={style} onClick={handleClick} />
   ```

4. **Use virtualization** for long lists
5. **Optimize images** and assets
6. **Implement lazy loading** for non-critical components

### Code Splitting

```typescript
import { lazy, Suspense } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## Security

### Best Practices

1. **Sanitize user input** before rendering
2. **Use HTTPS** for all external requests
3. **Avoid inline scripts** and styles
4. **Implement proper error handling**
5. **Use environment variables** for sensitive data

### Content Security Policy

Ensure all external resources comply with the project's CSP headers.

## Accessibility

### ARIA Labels

Always provide meaningful ARIA labels for interactive elements:

```typescript
<button 
  aria-label={`Switch to ${themeName} theme`}
  title={`Switch to ${themeName} theme`}
>
  {themeName}
</button>
```

### Keyboard Navigation

Ensure all interactive elements are keyboard accessible:

```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    handleClick();
  }
};

<button onKeyDown={handleKeyDown}>
  Click me
</button>
```

## Environment Setup

### Required Tools

- Node.js (version specified in `.nvmrc`)
- pnpm(or npm)
- Git
- VSCodium/VSCode with recommended extensions

### Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Run tests
pnpm test

# Run linting
pnpm run format

```

## Troubleshooting

### Common Issues

1. **React prop warnings**: Use `$` prefix for styled component props
2. **TypeScript errors**: Check type definitions and imports
3. **Styling issues**: Verify styled-components syntax and prop usage
4. **Performance problems**: Check for unnecessary re-renders and expensive calculations

### Getting Help

- Check the [main README](README.md) for project overview
- Review existing issues and discussions
- Consult the [styled-components documentation](https://styled-components.com/docs)

---

**Note**: This document is a living document and should be updated as the project evolves and new best practices are established.