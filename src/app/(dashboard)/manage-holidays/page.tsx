'use client';

import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  useTheme,
  alpha,
  Fade,
  Zoom,
  Card,
  CardContent,
} from '@mui/material';
import { 
  Add as AddIcon,
  Event as EventIcon,
  EventBusy as EventBusyIcon,
  CalendarToday as CalendarTodayIcon,
} from '@mui/icons-material';

interface Holiday {
  id: number;
  date: string;
  occasion: string;
}

export default function ManageHolidaysPage() {
  const theme = useTheme();
  const [holidays, setHolidays] = useState<Holiday[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [showExceptions, setShowExceptions] = useState(false);
  const [newHoliday, setNewHoliday] = useState({
    date: '',
    occasion: ''
  });

  const handleAddHoliday = () => {
    setOpenAddDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenAddDialog(false);
    setNewHoliday({ date: '', occasion: '' });
  };

  const handleSaveHoliday = () => {
    if (newHoliday.date && newHoliday.occasion) {
      setHolidays([
        ...holidays,
        {
          id: holidays.length + 1,
          date: newHoliday.date,
          occasion: newHoliday.occasion
        }
      ]);
      handleCloseDialog();
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Fade in timeout={800}>
          <Card 
            elevation={3}
            sx={{
              borderRadius: 2,
              overflow: 'hidden',
              background: `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)} 0%, ${alpha(theme.palette.background.paper, 1)} 100%)`,
            }}
          >
            <Box
              sx={{
                p: 3,
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <CalendarTodayIcon sx={{ color: 'white', fontSize: '2rem' }} />
              <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 600 }}>
                Manage Holidays
              </Typography>
            </Box>

            <CardContent sx={{ p: 4 }}>
              <Box sx={{ 
                mb: 4, 
                display: 'flex', 
                gap: 2,
                '& .MuiButton-root': {
                  borderRadius: 2,
                  px: 3,
                  py: 1.2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: theme.shadows[4],
                  }
                }
              }}>
                <Button
                  variant="contained"
                  color="secondary"
                  startIcon={<EventBusyIcon />}
                  onClick={() => setShowExceptions(!showExceptions)}
                  sx={{
                    bgcolor: theme.palette.secondary.main,
                    '&:hover': {
                      bgcolor: theme.palette.secondary.dark,
                    }
                  }}
                >
                  SHOW EXCEPTIONS
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleAddHoliday}
                  sx={{
                    bgcolor: theme.palette.primary.main,
                    '&:hover': {
                      bgcolor: theme.palette.primary.dark,
                    }
                  }}
                >
                  ADD HOLIDAYS
                </Button>
              </Box>

              <TableContainer 
                component={Paper} 
                elevation={0}
                sx={{ 
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: alpha(theme.palette.primary.main, 0.05) }}>
                      <TableCell sx={{ fontWeight: 600, py: 2 }}>ID</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 2 }}>Date</TableCell>
                      <TableCell sx={{ fontWeight: 600, py: 2 }}>Occasion</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {holidays.map((holiday) => (
                      <TableRow 
                        key={holiday.id}
                        sx={{ 
                          '&:hover': { 
                            bgcolor: alpha(theme.palette.primary.main, 0.02),
                          },
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        <TableCell>{holiday.id}</TableCell>
                        <TableCell>{holiday.date}</TableCell>
                        <TableCell>{holiday.occasion}</TableCell>
                      </TableRow>
                    ))}
                    {holidays.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={3} align="center" sx={{ py: 6 }}>
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                            <EventIcon sx={{ fontSize: '3rem', color: alpha(theme.palette.text.secondary, 0.3) }} />
                            <Typography variant="body1" color="text.secondary">
                              No holidays added yet
                            </Typography>
                          </Box>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Fade>
      </Box>

      {/* Add Holiday Dialog */}
      <Dialog 
        open={openAddDialog} 
        onClose={handleCloseDialog}
        TransitionComponent={Zoom}
        PaperProps={{
          elevation: 8,
          sx: {
            borderRadius: 2,
            minWidth: '400px',
          }
        }}
      >
        <DialogTitle sx={{ 
          pb: 1,
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          '& .MuiTypography-root': {
            fontWeight: 600,
          }
        }}>
          <AddIcon color="primary" />
          Add New Holiday
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
            <TextField
              label="Date"
              type="date"
              value={newHoliday.date}
              onChange={(e) => setNewHoliday({ ...newHoliday, date: e.target.value })}
              InputLabelProps={{ shrink: true }}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
            <TextField
              label="Occasion"
              value={newHoliday.occasion}
              onChange={(e) => setNewHoliday({ ...newHoliday, occasion: e.target.value })}
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleCloseDialog}
            sx={{ 
              borderRadius: 2,
              px: 3,
              color: theme.palette.text.secondary,
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSaveHoliday} 
            variant="contained" 
            color="primary"
            sx={{ 
              borderRadius: 2,
              px: 3,
            }}
          >
            Save Holiday
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
} 