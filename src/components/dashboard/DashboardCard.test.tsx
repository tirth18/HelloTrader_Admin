import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, createTheme } from '@mui/material';
import DashboardCard from './DashboardCard';

const theme = createTheme();

describe('DashboardCard', () => {
  it('renders with basic props', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardCard title="Test Title">
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with loading state', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardCard title="Test Title" loading>
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders with error state', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardCard
          title="Test Title"
          error="Test Error"
        >
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    expect(screen.getByText('Test Error')).toBeInTheDocument();
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('applies custom styles', () => {
    const customStyles = {
      backgroundColor: 'red',
      padding: '20px'
    };

    render(
      <ThemeProvider theme={theme}>
        <DashboardCard
          title="Test Title"
          sx={customStyles}
        >
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    const card = screen.getByTestId('dashboard-card');
    expect(card).toHaveStyle(customStyles);
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    
    render(
      <ThemeProvider theme={theme}>
        <DashboardCard
          title="Test Title"
          onClick={handleClick}
        >
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    const card = screen.getByTestId('dashboard-card');
    card.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies different elevation levels', () => {
    render(
      <ThemeProvider theme={theme}>
        <DashboardCard title="Test Title" elevation={2}>
          <div>Test Content</div>
        </DashboardCard>
      </ThemeProvider>
    );

    const card = screen.getByTestId('dashboard-card');
    expect(card).toHaveClass('MuiPaper-elevation2');
  });
}); 