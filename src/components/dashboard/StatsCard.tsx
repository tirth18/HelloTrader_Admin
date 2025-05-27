'use client';

import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  useTheme,
  alpha,
  Tooltip,
  IconButton,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
  change?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: string;
  currency?: boolean;
  percentage?: boolean;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info';
  tooltip?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  change,
  subtitle,
  currency = false,
  percentage = false,
  color = 'primary',
  tooltip,
}) => {
  const theme = useTheme();

  const formatValue = (val: number | string) => {
    if (typeof val === 'number') {
      if (currency) {
        return new Intl.NumberFormat('en-IN', {
          style: 'currency',
          currency: 'INR',
        }).format(val);
      }
      if (percentage) {
        return `${val}%`;
      }
    }
    return val;
  };

  return (
    <Card
      data-testid="stats-card"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        color: theme.palette[color].main,
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                p: 1,
                borderRadius: 1,
                backgroundColor: theme.palette[color].light,
                color: theme.palette[color].main,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>
        <Typography variant="h3" component="div" gutterBottom>
          {formatValue(value)}
        </Typography>
        {subtitle && (
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {change && (
          <Box display="flex" alignItems="center" mt={1}>
            {change.isPositive ? (
              <TrendingUpIcon color="success" data-testid="TrendingUpIcon" />
            ) : (
              <TrendingDownIcon color="error" data-testid="TrendingDownIcon" />
            )}
            <Typography
              variant="body2"
              color={change.isPositive ? 'success.main' : 'error.main'}
              ml={0.5}
            >
              {change.value}%
            </Typography>
          </Box>
        )}
        {tooltip && (
          <Tooltip title={tooltip}>
            <InfoIcon 
              data-testid="InfoIcon"
              sx={{ 
                position: 'absolute', 
                top: 8, 
                right: 8, 
                fontSize: 16,
                color: 'text.secondary'
              }} 
            />
          </Tooltip>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard; 