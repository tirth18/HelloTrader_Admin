import React, { useState, useCallback, useMemo } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Chip,
  Alert,
  SelectChangeEvent,
  CircularProgress,
  styled,
  useTheme,
  alpha,
  Card,
  CardContent,
  Typography,
  IconButton,
  Divider
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import SendIcon from '@mui/icons-material/Send';
import ScheduleIcon from '@mui/icons-material/Schedule';
import { useNotifications } from '@/contexts/NotificationContext';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
  },
  '& .MuiSelect-icon': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
    },
    '&.Mui-focused': {
      backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.2)}`,
    }
  },
  '& .MuiInputLabel-root': {
    color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(22, 28, 36, 0.8)' : 'rgba(255, 255, 255, 0.8)',
  backdropFilter: 'blur(6px)',
  border: '1px solid',
  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.12)' : 'rgba(145, 158, 171, 0.12)',
  '&:hover': {
    boxShadow: theme.palette.mode === 'dark'
      ? '0 0 24px 0 rgba(0, 0, 0, 0.3)'
      : '0 0 24px 0 rgba(145, 158, 171, 0.1)',
  }
}));

const ChannelGroup = styled(FormGroup)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: theme.spacing(3),
  '& .MuiFormControlLabel-root': {
    marginRight: 0,
    '& .MuiCheckbox-root': {
      color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
      '&.Mui-checked': {
        color: theme.palette.primary.main,
      }
    }
  }
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: '8px 22px',
  borderRadius: theme.shape.borderRadius,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: 'none',
    backgroundColor: theme.palette.mode === 'dark' 
      ? alpha(theme.palette.primary.main, 0.8)
      : alpha(theme.palette.primary.main, 0.9),
  }
}));

interface UserOption {
  id: number;
  name: string;
  email: string;
}

interface CreateNotificationFormProps {
  userOptions: UserOption[];
  onSuccess?: () => void;
}

const CreateNotificationForm: React.FC<CreateNotificationFormProps> = ({ 
  userOptions,
  onSuccess
}) => {
  const { sendNotification } = useNotifications();
  const theme = useTheme();
  
  // Form state
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [notificationType, setNotificationType] = useState('system');
  const [priority, setPriority] = useState('medium');
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [isAllUsers, setIsAllUsers] = useState(false);
  const [scheduleDateTime, setScheduleDateTime] = useState<Date | null>(new Date());
  const [isScheduled, setIsScheduled] = useState(false);
  const [channels, setChannels] = useState({
    email: true,
    inApp: true,
    sms: false,
    push: false
  });
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate if form is valid
  const isFormValid = useMemo(() => {
    return (
      title.trim() !== '' && 
      message.trim() !== '' && 
      (selectedUsers.length > 0 || isAllUsers) &&
      (!isScheduled || scheduleDateTime !== null)
    );
  }, [title, message, selectedUsers, isAllUsers, isScheduled, scheduleDateTime]);
  
  // Handle form input changes
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }, []);
  
  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);
  
  const handleTypeChange = useCallback((e: SelectChangeEvent<string>) => {
    setNotificationType(e.target.value);
  }, []);
  
  const handlePriorityChange = useCallback((e: SelectChangeEvent<string>) => {
    setPriority(e.target.value);
  }, []);
  
  const handleChannelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setChannels(prev => ({
      ...prev,
      [name]: checked
    }));
  }, []);
  
  const handleScheduleToggle = useCallback(() => {
    setIsScheduled(prev => !prev);
  }, []);
  
  const handleDateTimeChange = useCallback((date: Date | null) => {
    setScheduleDateTime(date);
  }, []);
  
  // Handle user selection
  const handleAllUsersToggle = useCallback(() => {
    const newIsAllUsers = !isAllUsers;
    setIsAllUsers(newIsAllUsers);
    
    if (newIsAllUsers) {
      // Select all users
      setSelectedUsers(userOptions.map(user => user.id));
    } else {
      // Deselect all users
      setSelectedUsers([]);
    }
  }, [isAllUsers, userOptions]);
  
  const handleUserSelect = useCallback((e: SelectChangeEvent<number[]>) => {
    const selected = e.target.value as number[];
    setSelectedUsers(selected);
    
    // Update isAllUsers based on selection
    setIsAllUsers(selected.length === userOptions.length);
  }, [userOptions]);
  
  // Handle notification sending
  const handleSendNotification = useCallback(async () => {
    if (!isFormValid) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Get selected channels
      const selectedChannels = Object.keys(channels).filter(
        key => channels[key as keyof typeof channels]
      );
      
      // Create notification data
      const notificationData = {
        user_ids: selectedUsers,
        title,
        message,
        type: notificationType,
        priority,
        metadata: {
          channels: selectedChannels,
          scheduled: isScheduled,
          schedule_time: isScheduled ? scheduleDateTime?.toISOString() : null
        }
      };
      
      // Send notification
      await sendNotification(notificationData);
      
      // Reset form on success
      setTitle('');
      setMessage('');
      setNotificationType('system');
      setPriority('medium');
      setSelectedUsers([]);
      setIsAllUsers(false);
      setScheduleDateTime(new Date());
      setIsScheduled(false);
      setChannels({
        email: true,
        inApp: true,
        sms: false,
        push: false
      });
      
      // Show success message
      setSuccess(true);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess();
      }
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        if (setSuccess) { // Check if component is still mounted
          setSuccess(false);
        }
      }, 5000);
      
    } catch (err: any) {
      console.error('Error sending notification:', err);
      setError(err.response?.data?.detail || 'Failed to send notification');
    } finally {
      setLoading(false);
    }
  }, [
    isFormValid, 
    title, 
    message, 
    notificationType, 
    priority, 
    selectedUsers, 
    channels, 
    isScheduled, 
    scheduleDateTime, 
    sendNotification,
    onSuccess
  ]);
  
  // Generate user chips for display
  const selectedUserChips = useMemo(() => {
    if (isAllUsers) {
      return <Chip label="All Users" color="primary" sx={{ m: 0.5 }} />;
    }
    
    return selectedUsers.map(userId => {
      const user = userOptions.find(u => u.id === userId);
      return user ? (
        <Chip 
          key={user.id} 
          label={user.name} 
          color="primary" 
          variant="outlined"
          sx={{ m: 0.5 }} 
        />
      ) : null;
    });
  }, [selectedUsers, userOptions, isAllUsers]);
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <StyledCard>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                Notification Details
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Fill in the details of your notification
              </Typography>
            </Box>

            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Title"
                  value={title}
                  onChange={handleTitleChange}
                  required
                  error={title.trim() === ''}
                  helperText={title.trim() === '' ? 'Title is required' : ''}
                />
              </Grid>

              <Grid item xs={12}>
                <StyledTextField
                  fullWidth
                  label="Message"
                  value={message}
                  onChange={handleMessageChange}
                  multiline
                  rows={4}
                  required
                  error={message.trim() === ''}
                  helperText={message.trim() === '' ? 'Message is required' : ''}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledFormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    value={notificationType}
                    label="Type"
                    onChange={handleTypeChange}
                  >
                    <MenuItem value="system">System</MenuItem>
                    <MenuItem value="market">Market Update</MenuItem>
                    <MenuItem value="trade">Trade Alert</MenuItem>
                    <MenuItem value="security">Security Alert</MenuItem>
                    <MenuItem value="compliance">Compliance Update</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <StyledFormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priority}
                    label="Priority"
                    onChange={handlePriorityChange}
                  >
                    <MenuItem value="low">Low</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="critical">Critical</MenuItem>
                  </Select>
                </StyledFormControl>
              </Grid>
            </Grid>
          </CardContent>
        </StyledCard>
      </Grid>

      <Grid item xs={12}>
        <StyledCard>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom sx={{ color: 'text.primary' }}>
                Delivery Options
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Choose how you want to deliver your notification
              </Typography>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                Channels
              </Typography>
              <ChannelGroup>
                <FormControlLabel
                  control={<Checkbox checked={channels.inApp} onChange={handleChannelChange} name="inApp" />}
                  label="In-App"
                />
                <FormControlLabel
                  control={<Checkbox checked={channels.email} onChange={handleChannelChange} name="email" />}
                  label="Email"
                />
                <FormControlLabel
                  control={<Checkbox checked={channels.sms} onChange={handleChannelChange} name="sms" />}
                  label="SMS"
                />
                <FormControlLabel
                  control={<Checkbox checked={channels.push} onChange={handleChannelChange} name="push" />}
                  label="Push"
                />
              </ChannelGroup>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom sx={{ color: 'text.secondary', mb: 2 }}>
                Recipients
              </Typography>
              <FormControlLabel
                control={<Checkbox checked={isAllUsers} onChange={handleAllUsersToggle} />}
                label="Select All Users"
              />
              
              {!isAllUsers && (
                <StyledFormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Select Users</InputLabel>
                  <Select
                    multiple
                    value={selectedUsers}
                    onChange={handleUserSelect}
                    label="Select Users"
                    renderValue={(selected) => (
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {selected.map((value) => {
                          const user = userOptions.find(u => u.id === value);
                          return user ? (
                            <Chip
                              key={value}
                              label={user.name}
                              size="small"
                              sx={{
                                bgcolor: 'primary.main',
                                color: 'white',
                                '& .MuiChip-deleteIcon': {
                                  color: 'white',
                                  '&:hover': {
                                    color: 'white',
                                  },
                                },
                              }}
                            />
                          ) : null;
                        })}
                      </Box>
                    )}
                  >
                    {userOptions.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </MenuItem>
                    ))}
                  </Select>
                </StyledFormControl>
              )}
            </Box>

            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={<Checkbox checked={isScheduled} onChange={handleScheduleToggle} />}
                label="Schedule for Later"
              />
              
              {isScheduled && (
                <Box sx={{ mt: 2 }}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                      label="Schedule Time"
                      value={scheduleDateTime}
                      onChange={handleDateTimeChange}
                      slotProps={{
                        textField: {
                          fullWidth: true,
                          sx: {
                            '& .MuiOutlinedInput-root': {
                              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                            }
                          }
                        }
                      }}
                      minDateTime={new Date()}
                    />
                  </LocalizationProvider>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
              <StyledButton
                variant="contained"
                color="primary"
                startIcon={isScheduled ? <ScheduleIcon /> : <SendIcon />}
                onClick={handleSendNotification}
                disabled={loading || !isFormValid}
              >
                {loading ? (
                  <CircularProgress size={24} />
                ) : isScheduled ? (
                  'Schedule Notification'
                ) : (
                  'Send Notification'
                )}
              </StyledButton>

              <Button
                variant="outlined"
                onClick={() => {
                  setTitle('');
                  setMessage('');
                  setNotificationType('system');
                  setPriority('medium');
                  setSelectedUsers([]);
                  setIsAllUsers(false);
                  setScheduleDateTime(new Date());
                  setIsScheduled(false);
                  setChannels({
                    email: true,
                    inApp: true,
                    sms: false,
                    push: false
                  });
                  setError(null);
                }}
                disabled={loading}
                sx={{
                  borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.23)' : 'rgba(0, 0, 0, 0.23)',
                  color: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                  '&:hover': {
                    borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.4)',
                    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
                  }
                }}
              >
                Reset
              </Button>
            </Box>
          </CardContent>
        </StyledCard>
      </Grid>
    </Grid>
  );
};

export default CreateNotificationForm; 