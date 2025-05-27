# Component Documentation

## Overview
This document provides detailed information about the components used in the HelloTrader application.

## Core Components

### DashboardCard
A versatile card component for displaying content in a consistent manner.

#### Props
- `title`: string - The title of the card
- `subtitle`: string - Optional subtitle
- `icon`: ReactNode - Optional icon to display
- `actions`: DashboardCardAction[] - Optional array of actions
- `onRefresh`: () => void - Optional refresh callback
- `isLoading`: boolean - Loading state
- `headerContent`: ReactNode - Optional header content
- `titleVariant`: 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2' - Title variant
- `noPadding`: boolean - Remove padding
- `noBodyPadding`: boolean - Remove body padding
- `minHeight`: number | string - Minimum height
- `maxHeight`: number | string - Maximum height
- `headerDivider`: boolean - Show divider after header
- `border`: boolean - Show border
- `children`: ReactNode - Card content

#### Usage
```tsx
<DashboardCard
  title="Card Title"
  subtitle="Card Subtitle"
  icon={<Icon />}
  actions={[
    {
      label: 'Action',
      onClick: () => {},
    },
  ]}
>
  <Content />
</DashboardCard>
```

### StatsCard
A card component for displaying statistics with optional change indicators.

#### Props
- `title`: string - The title of the stat
- `value`: number | string - The value to display
- `icon`: ReactNode - Optional icon
- `change`: { value: number; isPositive: boolean } - Optional change indicator
- `subtitle`: string - Optional subtitle
- `currency`: boolean - Format as currency
- `percentage`: boolean - Format as percentage
- `color`: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' - Color variant
- `tooltip`: string - Optional tooltip text

#### Usage
```tsx
<StatsCard
  title="Total Revenue"
  value={1000}
  icon={<Icon />}
  change={{ value: 10, isPositive: true }}
  currency
/>
```

### ErrorBoundary
A component to catch JavaScript errors anywhere in the component tree.

#### Props
- `children`: ReactNode - The child components to wrap

#### Usage
```tsx
<ErrorBoundary>
  <Component />
</ErrorBoundary>
```

### Loading
A loading indicator component with animations.

#### Props
- `message`: string - Loading message
- `fullScreen`: boolean - Show as full screen overlay
- `size`: number - Size of the loading indicator

#### Usage
```tsx
<Loading message="Loading data..." fullScreen />
```

## Accessibility Notes
- All interactive elements have proper ARIA labels
- Color contrast meets WCAG 2.1 standards
- Keyboard navigation is supported
- Focus states are clearly visible
- Error messages are announced to screen readers

## Performance Considerations
- Components use React.memo where appropriate
- Heavy computations are memoized
- Images are lazy loaded
- Animations use transform for better performance

## Testing
Each component should have:
- Unit tests for functionality
- Accessibility tests
- Visual regression tests
- Performance tests

## Best Practices
1. Use theme values for colors, spacing, and typography
2. Implement proper loading states
3. Handle errors gracefully
4. Provide proper TypeScript types
5. Document all props and their types
6. Follow accessibility guidelines
7. Optimize for performance
8. Use consistent animations 