import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import StatsCard from './StatsCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const theme = createTheme();

describe('StatsCard', () => {
  it('renders with basic props', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard title="Test Title" value="100" />
      </ThemeProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard title="Test Title" value="100" icon={<TrendingUpIcon />} />
      </ThemeProvider>
    );

    expect(screen.getByTestId('TrendingUpIcon')).toBeInTheDocument();
  });

  it('formats currency values', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard title="Revenue" value={1000} currency />
      </ThemeProvider>
    );

    expect(screen.getByText('₹1,000.00')).toBeInTheDocument();
  });

  it('formats percentage values', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard title="Growth" value={10} percentage />
      </ThemeProvider>
    );

    expect(screen.getByText('10%')).toBeInTheDocument();
  });

  it('shows positive change indicator', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard
          title="Growth"
          value={100}
          change={{ value: 10, isPositive: true }}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByTestId('TrendingUpIcon')).toBeInTheDocument();
  });

  it('shows negative change indicator', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard
          title="Growth"
          value={100}
          change={{ value: 10, isPositive: false }}
        />
      </ThemeProvider>
    );

    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByTestId('TrendingDownIcon')).toBeInTheDocument();
  });

  it('shows tooltip when provided', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard
          title="Growth"
          value={100}
          tooltip="This is a tooltip"
        />
      </ThemeProvider>
    );

    expect(screen.getByTestId('InfoIcon')).toBeInTheDocument();
  });

  it('applies different colors', () => {
    render(
      <ThemeProvider theme={theme}>
        <StatsCard title="Test" value="100" color="success" />
      </ThemeProvider>
    );

    const card = screen.getByTestId('stats-card');
    expect(card).toHaveStyle({ color: theme.palette.success.main });
  });
}); 