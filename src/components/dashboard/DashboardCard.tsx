'use client';

import React, { ReactNode } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Typography,
  useTheme,
  alpha,
  IconButton,
  CardProps,
  Divider,
  Skeleton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Refresh as RefreshIcon,
  GetApp as DownloadIcon,
  DeleteOutline as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

export interface DashboardCardAction {
  label: string;
  icon?: ReactNode;
  onClick: () => void;
  color?: 'primary' | 'secondary' | 'error' | 'warning' | 'info' | 'success';
  disabled?: boolean;
}

export interface DashboardCardProps extends Omit<CardProps, 'title'> {
  title?: string;
  subtitle?: string;
  icon?: ReactNode;
  actions?: DashboardCardAction[];
  onRefresh?: () => void;
  isLoading?: boolean;
  headerContent?: ReactNode;
  titleVariant?: 'h4' | 'h5' | 'h6' | 'subtitle1' | 'subtitle2';
  noPadding?: boolean;
  noBodyPadding?: boolean;
  minHeight?: number | string;
  maxHeight?: number | string;
  headerDivider?: boolean;
  border?: boolean;
  children: ReactNode;
  loading?: boolean;
  error?: string;
  onClick?: () => void;
  elevation?: number;
  sx?: any;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  subtitle,
  icon,
  actions,
  onRefresh,
  isLoading = false,
  headerContent,
  titleVariant = 'h6',
  noPadding = false,
  noBodyPadding = false,
  minHeight,
  maxHeight,
  headerDivider = false,
  border = true,
  children,
  loading = false,
  error,
  onClick,
  elevation = 1,
  ...rest
}) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const menuOpen = Boolean(anchorEl);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleActionClick = (action: DashboardCardAction) => {
    action.onClick();
    handleMenuClose();
  };

  return (
    <Card
      data-testid="dashboard-card"
      elevation={elevation}
      onClick={onClick}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.2s ease-in-out',
        '&:hover': onClick && {
          boxShadow: theme.shadows[elevation + 2],
        },
        borderRadius: theme.shape.borderRadius * 2,
        boxShadow: theme.palette.mode === 'light'
          ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
          : '0px 2px 4px rgba(0, 0, 0, 0.2)',
        border: border ? `1px solid ${alpha(theme.palette.divider, 0.1)}` : 'none',
        overflow: 'hidden',
        position: 'relative',
        ...(noPadding ? { padding: 0 } : {}),
        ...rest.sx,
      }}
      {...rest}
    >
      {/* Card header */}
      {(title || subtitle || icon || actions || onRefresh || headerContent) && (
        <>
          <CardHeader
            title={
              isLoading ? (
                <Skeleton width="50%" height={28} />
              ) : (
                title && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {icon && (
                      <Box 
                        sx={{ 
                          mr: 1.5, 
                          display: 'flex', 
                          alignItems: 'center',
                          color: theme.palette.primary.main 
                        }}
                      >
                        {icon}
                      </Box>
                    )}
                    <Typography variant={titleVariant} component="h2" fontWeight={600}>
                      {title}
                    </Typography>
                  </Box>
                )
              )
            }
            subheader={
              isLoading ? (
                <Skeleton width="25%" height={20} sx={{ mt: 1 }} />
              ) : (
                subtitle && (
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, opacity: 0.85 }}>
                    {subtitle}
                  </Typography>
                )
              )
            }
            action={
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {headerContent}
                
                {onRefresh && (
                  <IconButton 
                    size="small" 
                    onClick={onRefresh}
                    disabled={isLoading}
                    sx={{ 
                      ml: 1,
                      backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.08),
                      }
                    }}
                  >
                    <RefreshIcon fontSize="small" />
                  </IconButton>
                )}
                
                {actions && actions.length > 0 && (
                  <>
                    <IconButton
                      size="small"
                      aria-label="more options"
                      aria-controls="card-menu"
                      aria-haspopup="true"
                      onClick={handleMenuClick}
                      sx={{ 
                        ml: 1,
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.08),
                        }
                      }}
                    >
                      <MoreVertIcon fontSize="small" />
                    </IconButton>
                    
                    <Menu
                      id="card-menu"
                      anchorEl={anchorEl}
                      open={menuOpen}
                      onClose={handleMenuClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      PaperProps={{
                        elevation: 0,
                        sx: {
                          borderRadius: 2,
                          minWidth: 180,
                          overflow: 'visible',
                          boxShadow: theme.palette.mode === 'light'
                            ? '0px 5px 15px rgba(0, 0, 0, 0.08)'
                            : '0px 5px 15px rgba(0, 0, 0, 0.25)',
                          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          mt: 0.5,
                          '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            backgroundColor: theme.palette.background.paper,
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                            borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                            borderLeft: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                          },
                        },
                      }}
                    >
                      {actions.map((action, index) => (
                        <MenuItem
                          key={index}
                          onClick={() => handleActionClick(action)}
                          disabled={action.disabled}
                          sx={{ 
                            py: 1.25,
                            borderRadius: 1.5,
                            mx: 0.5,
                            '&:hover': {
                              backgroundColor: alpha(
                                action.color 
                                  ? theme.palette[action.color].main 
                                  : theme.palette.primary.main,
                                0.08
                              ),
                            }
                          }}
                        >
                          {action.icon && (
                            <ListItemIcon
                              sx={{
                                color: action.color 
                                  ? theme.palette[action.color].main 
                                  : theme.palette.primary.main,
                                minWidth: 36,
                              }}
                            >
                              {action.icon}
                            </ListItemIcon>
                          )}
                          <ListItemText
                            primary={action.label}
                            primaryTypographyProps={{
                              variant: 'body2',
                              fontWeight: 500,
                              color: action.color 
                                ? theme.palette[action.color].main 
                                : 'inherit',
                            }}
                          />
                        </MenuItem>
                      ))}
                    </Menu>
                  </>
                )}
              </Box>
            }
            sx={{
              p: noPadding ? 0 : 2,
              pb: noPadding || !headerDivider ? 0 : 1.5,
            }}
          />
          
          {headerDivider && <Divider sx={{ opacity: 0.6 }} />}
        </>
      )}

      {/* Card content */}
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: noBodyPadding || noPadding ? 0 : 2,
          pt: !title && !subtitle && !icon && !actions && !onRefresh && !headerContent && !noPadding && !noBodyPadding ? 2 : undefined,
          minHeight,
          maxHeight,
          overflow: 'auto',
          '&:last-child': {
            pb: noBodyPadding || noPadding ? 0 : 2,
          },
          ...(isLoading ? { position: 'relative', minHeight: '120px' } : {}),
        }}
      >
        {loading ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            minHeight={200}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          children
        )}
      </CardContent>
    </Card>
  );
};

export default DashboardCard; 