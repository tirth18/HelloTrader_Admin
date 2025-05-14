import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  SelectChangeEvent
} from '@mui/material';

interface SendNotificationDialogProps {
  open: boolean;
  onClose: () => void;
  onSend: (data: NotificationFormData) => void;
}

export interface NotificationFormData {
  title: string;
  message: string;
  priority: string;
  type: string;
}

const SendNotificationDialog: React.FC<SendNotificationDialogProps> = ({
  open,
  onClose,
  onSend
}) => {
  const [formData, setFormData] = useState<NotificationFormData>({
    title: '',
    message: '',
    priority: 'medium',
    type: 'system'
  });

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.title.trim() || !formData.message.trim()) {
      return; // Don't submit if required fields are empty
    }
    
    const dataToSend = { ...formData };
    onSend(dataToSend);
    
    // Reset form
    setFormData({
      title: '',
      message: '',
      priority: 'medium',
      type: 'system'
    });
  }, [formData, onSend]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="send-notification-dialog-title"
    >
      <DialogTitle id="send-notification-dialog-title">
        Send Notification
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                name="title"
                label="Title"
                fullWidth
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                name="message"
                label="Message"
                fullWidth
                multiline
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="notification-type-label">Type</InputLabel>
                <Select
                  labelId="notification-type-label"
                  name="type"
                  value={formData.type}
                  label="Type"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="market">Market Update</MenuItem>
                  <MenuItem value="trade">Trade Alert</MenuItem>
                  <MenuItem value="system">System Message</MenuItem>
                  <MenuItem value="security">Security Alert</MenuItem>
                  <MenuItem value="compliance">Compliance Update</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="notification-priority-label">Priority</InputLabel>
                <Select
                  labelId="notification-priority-label"
                  name="priority"
                  value={formData.priority}
                  label="Priority"
                  onChange={handleSelectChange}
                >
                  <MenuItem value="low">Low</MenuItem>
                  <MenuItem value="medium">Medium</MenuItem>
                  <MenuItem value="high">High</MenuItem>
                  <MenuItem value="critical">Critical</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            This notification will be sent to all active users on the platform.
          </Typography>
        </Box>
      </DialogContent>
      
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
          disabled={!formData.title.trim() || !formData.message.trim()}
        >
          Send Notification
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SendNotificationDialog; 