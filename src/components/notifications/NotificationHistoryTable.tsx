import React, { useState, useCallback } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert
} from '@mui/material';
import { format } from 'date-fns';
import SendNotificationDialog, { NotificationFormData } from './SendNotificationDialog';

interface NotificationHistoryProps {
  notifications: NotificationHistoryItem[];
  onSendNotification?: (data: NotificationFormData) => Promise<boolean>;
}

export interface NotificationHistoryItem {
  id: number;
  title: string;
  message: string;
  delivered_at: string;
}

const NotificationHistoryTable: React.FC<NotificationHistoryProps> = ({ 
  notifications,
  onSendNotification 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChangePage = useCallback((event: unknown, newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeRowsPerPage = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }, []);

  const formatDateTime = useCallback((dateTimeStr: string) => {
    try {
      const date = new Date(dateTimeStr);
      return format(date, 'yyyy-MM-dd HH:mm:ss');
    } catch (error) {
      return dateTimeStr;
    }
  }, []);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  const handleSendNotification = useCallback(async (data: NotificationFormData) => {
    if (onSendNotification) {
      try {
        const success = await onSendNotification(data);
        if (success) {
          setSuccessMessage('Notification sent successfully');
          setDialogOpen(false);
        } else {
          setErrorMessage('Failed to send notification');
        }
      } catch (error) {
        setErrorMessage('An error occurred while sending the notification');
        console.error(error);
      }
    } else {
      // Mock success for demo if no callback is provided
      setSuccessMessage('Notification sent successfully');
      setDialogOpen(false);
    }
  }, [onSendNotification]);

  const handleCloseSnackbar = useCallback(() => {
    setSuccessMessage(null);
    setErrorMessage(null);
  }, []);

  return (
    <>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Notification History</Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleOpenDialog}
          >
            Send Notification
          </Button>
        </Box>
        
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="notification history table">
            <TableHead>
              <TableRow>
                <TableCell width="30%">Title</TableCell>
                <TableCell width="50%">Message</TableCell>
                <TableCell width="20%" align="right">Delivered at</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notifications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((notification) => (
                  <TableRow hover key={notification.id}>
                    <TableCell>{notification.title}</TableCell>
                    <TableCell>{notification.message || '-'}</TableCell>
                    <TableCell align="right">{formatDateTime(notification.delivered_at)}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={notifications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <SendNotificationDialog 
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSend={handleSendNotification}
      />

      <Snackbar open={!!successMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {successMessage}
        </Alert>
      </Snackbar>

      <Snackbar open={!!errorMessage} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NotificationHistoryTable; 