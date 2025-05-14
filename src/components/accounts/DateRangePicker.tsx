import React from 'react';
import {
  Box,
  Button,
  TextField,
  useTheme,
  alpha,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

interface DateRangePickerProps {
  fromDate: Date | null;
  toDate: Date | null;
  onFromDateChange: (date: Date | null) => void;
  onToDateChange: (date: Date | null) => void;
  onCalculate: () => void;
  mode: 'light' | 'dark';
}

export default function DateRangePicker({
  fromDate,
  toDate,
  onFromDateChange,
  onToDateChange,
  onCalculate,
  mode
}: DateRangePickerProps) {
  const theme = useTheme();
  
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        alignItems: 'center', 
        flexWrap: 'wrap',
        width: '100%',
      }}>
        <Box sx={{ 
          display: 'flex',
          gap: 2,
          flexWrap: { xs: 'wrap', sm: 'nowrap' },
          flex: 1,
        }}>
          <DatePicker
            label="From Date"
            value={fromDate}
            onChange={onFromDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  minWidth: { xs: '100%', sm: '180px' },
                  '& .MuiInputBase-root': {
                    bgcolor: mode === 'dark' ? alpha('#334155', 0.6) : alpha('#ffffff', 0.9),
                    borderRadius: 1,
                  }
                }
              }
            }}
          />
          
          <DatePicker
            label="To Date"
            value={toDate}
            onChange={onToDateChange}
            slotProps={{
              textField: {
                fullWidth: true,
                size: "small",
                sx: {
                  minWidth: { xs: '100%', sm: '180px' },
                  '& .MuiInputBase-root': {
                    bgcolor: mode === 'dark' ? alpha('#334155', 0.6) : alpha('#ffffff', 0.9),
                    borderRadius: 1,
                  }
                }
              }
            }}
          />
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          onClick={onCalculate}
          sx={{
            px: 3,
            py: 1,
            height: '40px',
            textTransform: 'uppercase',
            bgcolor: theme.palette.primary.main,
            '&:hover': {
              bgcolor: theme.palette.primary.dark,
            },
            whiteSpace: 'nowrap',
          }}
        >
          Calculate for Custom Dates
        </Button>
      </Box>
    </LocalizationProvider>
  );
} 