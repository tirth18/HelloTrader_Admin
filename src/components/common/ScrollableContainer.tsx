import React from 'react';
import { Box, BoxProps } from '@mui/material';
import { useScrollbar } from '@/hooks/useScrollbar';

interface ScrollableContainerProps extends Omit<BoxProps, 'ref'> {
  children: React.ReactNode;
  direction?: 'both' | 'vertical' | 'horizontal';
  forceVisible?: boolean;
  className?: string;
}

/**
 * A container component that ensures proper scrollbar functionality
 */
const ScrollableContainer: React.FC<ScrollableContainerProps> = ({
  children,
  direction = 'both',
  forceVisible = true,
  className = '',
  sx,
  ...boxProps
}) => {
  const scrollbarRef = useScrollbar(forceVisible, direction);

  return (
    <Box
      ref={scrollbarRef}
      className={`scrollable-content ${className}`}
      sx={{
        overflow: 'auto',
        scrollbarWidth: 'auto',
        height: '100%',
        width: '100%',
        ...sx,
      }}
      {...boxProps}
    >
      {children}
    </Box>
  );
};

export default ScrollableContainer; 