'use client';

import React from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  Button,
  Divider,
  useTheme,
  alpha,
} from '@mui/material';
import {
  Security as SecurityIcon,
  LockOutlined as LockIcon,
  AccountCircle as AccountIcon,
  VpnKey as KeyIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const theme = useTheme();
  const router = useRouter();

  const settingsCategories = [
    {
      title: 'Account',
      icon: <AccountIcon fontSize="large" />,
      description: 'Manage your account details and profile information',
      color: theme.palette.primary.main,
      items: [
        {
          title: 'Profile Settings',
          icon: <AccountIcon />,
          description: 'Update your profile information and preferences',
          path: '/profile'
        },
        {
          title: 'Change Login Password',
          icon: <LockIcon />,
          description: 'Update your account login password',
          path: '/change-login-password'
        },
        {
          title: 'Change Transaction Password',
          icon: <KeyIcon />,
          description: 'Update your transaction authorization password',
          path: '/change-transaction-password'
        }
      ]
    },
    {
      title: 'Security',
      icon: <SecurityIcon fontSize="large" />,
      description: 'Configure security settings and authorization methods',
      color: theme.palette.success.main,
      items: [
        {
          title: 'Two Factor Authentication',
          icon: <SecurityIcon />,
          description: 'Configure 2FA for additional account security',
          path: '/two-factor-auth'
        },
        {
          title: 'Login History',
          icon: <LockIcon />,
          description: 'View your recent login activity',
          path: '/login-history'
        }
      ]
    },
    {
      title: 'Notifications',
      icon: <NotificationsIcon fontSize="large" />,
      description: 'Configure notification preferences and alerts',
      color: theme.palette.warning.main,
      items: [
        {
          title: 'Email Notifications',
          icon: <NotificationsIcon />,
          description: 'Configure email alert settings',
          path: '/email-notifications'
        },
        {
          title: 'System Notifications',
          icon: <BoltIcon />,
          description: 'Manage in-app notification settings',
          path: '/system-notifications'
        }
      ]
    },
    {
      title: 'Appearance',
      icon: <PaletteIcon fontSize="large" />,
      description: 'Customize the look and feel of your dashboard',
      color: theme.palette.info.main,
      items: [
        {
          title: 'Theme Settings',
          icon: <PaletteIcon />,
          description: 'Change theme, colors and appearance',
          path: '/theme-settings'
        },
        {
          title: 'Language Settings',
          icon: <LanguageIcon />,
          description: 'Select your preferred language',
          path: '/language-settings'
        }
      ]
    }
  ];

  const handleNavigate = (path: string) => {
    router.push(path);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
        System Settings
      </Typography>

      <Grid container spacing={3}>
        {settingsCategories.map((category) => (
          <Grid item xs={12} md={6} key={category.title}>
            <Paper 
              elevation={0} 
              sx={{ 
                mb: 3, 
                borderRadius: 2, 
                border: `1px solid ${alpha(category.color, 0.3)}`,
                overflow: 'hidden'
              }}
            >
              <Box sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                bgcolor: alpha(category.color, 0.05),
                borderBottom: `1px solid ${alpha(category.color, 0.2)}`
              }}>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  p: 1, 
                  borderRadius: '50%', 
                  mr: 2,
                  bgcolor: alpha(category.color, 0.1),
                  color: category.color
                }}>
                  {category.icon}
                </Box>
                <Box>
                  <Typography variant="h6" component="h2" sx={{ fontWeight: 600 }}>
                    {category.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {category.description}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                {category.items.map((item, index) => (
                  <React.Fragment key={item.title}>
                    {index > 0 && <Divider sx={{ my: 1.5 }} />}
                    <Card 
                      elevation={0} 
                      sx={{ 
                        bgcolor: 'transparent',
                        '&:hover': {
                          bgcolor: alpha(theme.palette.primary.main, 0.05)
                        }
                      }}
                    >
                      <CardActionArea onClick={() => handleNavigate(item.path)}>
                        <CardContent sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          p: 2,
                          '&:last-child': { pb: 2 } 
                        }}>
                          <Box sx={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            p: 1, 
                            borderRadius: '50%', 
                            mr: 2,
                            bgcolor: alpha(category.color, 0.1),
                            color: category.color
                          }}>
                            {item.icon}
                          </Box>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 500 }}>
                              {item.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {item.description}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </React.Fragment>
                ))}
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
} 