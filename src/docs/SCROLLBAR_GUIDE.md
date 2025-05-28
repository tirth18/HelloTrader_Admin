# Scrollbar Implementation Guide

This guide explains how scrollbars are implemented across the application and how to ensure proper scrolling functionality in your components.

## Overview

The application now has comprehensive scrollbar support that works consistently across all pages, components, and themes (light/dark mode).

## What's Been Fixed

### 1. Global Scrollbar Styles

- Enhanced scrollbar styling for all elements
- Consistent appearance in light and dark modes
- Proper sizing (12px width/height) for better usability
- Smooth hover effects and transitions

### 2. Layout Components

- **DashboardLayout**: Fixed overflow issues that were preventing scrollbars
- **Main content areas**: Now properly scrollable
- **Container components**: Overflow set to 'auto' where appropriate

### 3. MUI Component Support

- **DataGrid**: Proper scrollbar styling and functionality
- **TableContainer**: Enhanced scrollbar support
- **Paper components**: Overflow issues resolved
- **All MUI containers**: Consistent scrollbar behavior

## How to Use

### Automatic Scrollbars

Most components now automatically show scrollbars when content overflows. No additional code is needed for:

- Tables (`MuiTableContainer-root`)
- Data grids (`MuiDataGrid-root`)
- Main content areas
- Page containers

### Manual Implementation

#### 1. Using the ScrollableContainer Component

```tsx
import ScrollableContainer from "@/components/common/ScrollableContainer";

function MyPage() {
  return (
    <ScrollableContainer direction="both" forceVisible={true}>
      {/* Your content here */}
    </ScrollableContainer>
  );
}
```

#### 2. Using the useScrollbar Hook

```tsx
import { useScrollbar } from "@/hooks/useScrollbar";

function MyComponent() {
  const scrollbarRef = useScrollbar(true, "vertical");

  return <div ref={scrollbarRef}>{/* Your scrollable content */}</div>;
}
```

#### 3. Using CSS Classes

```tsx
// For any element that needs forced scrollbars
<div className="force-scrollbar">
  {/* Content */}
</div>

// For page containers
<div className="page-container">
  {/* Page content */}
</div>

// For content areas
<div className="page-content">
  {/* Content */}
</div>
```

## CSS Classes Available

- `.scrollable-content`: Basic scrollable container
- `.page-container`: Full page container with scrolling
- `.page-content`: Content area with flex and scrolling
- `.force-scrollbar`: Forces scrollbar visibility

## Theme Support

Scrollbars automatically adapt to the current theme:

### Light Mode

- Track: `rgba(0, 0, 0, 0.05)`
- Thumb: `#cbd5e1`
- Thumb hover: `#94a3b8`

### Dark Mode

- Track: `rgba(255, 255, 255, 0.05)`
- Thumb: `#475569`
- Thumb hover: `#64748b`

## Browser Support

- **Webkit browsers** (Chrome, Safari, Edge): Full custom styling
- **Firefox**: Uses `scrollbar-width` and `scrollbar-color` properties
- **All browsers**: Functional scrolling guaranteed

## Best Practices

1. **Don't override global styles**: The global scrollbar styles are comprehensive
2. **Use provided components**: Prefer `ScrollableContainer` over custom implementations
3. **Test in both themes**: Ensure scrollbars work in light and dark modes
4. **Consider mobile**: Scrollbars are touch-friendly on mobile devices

## Troubleshooting

### Scrollbars Not Appearing

1. Check if parent container has `overflow: hidden`
2. Ensure content actually overflows the container
3. Verify the element has a defined height
4. Use the `force-scrollbar` class if needed

### Styling Issues

1. Check for conflicting CSS rules
2. Ensure theme context is properly set up
3. Verify the component is wrapped in the theme provider

### Performance

1. Scrollbars use hardware acceleration where possible
2. Transitions are optimized for smooth performance
3. No impact on page load times

## Examples

### Table with Scrolling

```tsx
<TableContainer
  component={Paper}
  sx={{ maxHeight: 400 }} // This will trigger scrollbars
>
  <Table>{/* Table content */}</Table>
</TableContainer>
```

### Data Grid with Scrolling

```tsx
<DataGrid
  rows={data}
  columns={columns}
  sx={{ height: 400 }} // This will trigger scrollbars
/>
```

### Custom Scrollable Area

```tsx
<ScrollableContainer direction="vertical" sx={{ height: 300 }}>
  {/* Long content that will scroll */}
</ScrollableContainer>
```

## Migration Notes

If you have existing custom scrollbar styles, they may be overridden by the global styles. This is intentional to ensure consistency. If you need custom styling for specific components, use the provided hooks and components instead of custom CSS.
