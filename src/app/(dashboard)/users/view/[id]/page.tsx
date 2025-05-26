'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Button,
  FormControl,
  Select,
  MenuItem,
  IconButton,
  styled,
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ArrowDownward as ArrowDownwardIcon,
  ArrowUpward as ArrowUpwardIcon,
  Settings as SettingsIcon,
  FileCopy as FileCopyIcon,
  CurrencyRupee as CurrencyRupeeIcon,
} from '@mui/icons-material';

const PageContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#141b2d' : '#f4f6fa',
  minHeight: '100vh',
  color: theme.palette.mode === 'dark' ? 'white' : '#222',
  padding: '32px 0',
}));

const FormCard = styled(Paper)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#1a2138' : '#fff',
  borderRadius: 8,
  padding: 32,
  maxWidth: 1400,
  margin: '0 auto',
  marginBottom: 32,
  boxShadow: theme.palette.mode === 'dark' ? '0 2px 16px 0 #0002' : '0 2px 16px 0 #0001',
}));

const FormRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 32,
  marginBottom: 24,
  flexWrap: 'wrap',
  alignItems: 'center',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  minWidth: 320,
  background: theme.palette.mode === 'dark' ? '#232e48' : '#f4f6fa',
  borderRadius: 4,
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? 'white' : '#222',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 320,
  background: theme.palette.mode === 'dark' ? '#232e48' : '#f4f6fa',
  borderRadius: 4,
  '& .MuiInputBase-input': {
    color: theme.palette.mode === 'dark' ? 'white' : '#222',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const ButtonRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  marginTop: 8,
}));

const SearchButton = styled(Button)(() => ({
  backgroundColor: '#4caf50',
  color: 'white',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '10px 32px',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

const ResetButton = styled(Button)(() => ({
  backgroundColor: '#bdbdbd',
  color: '#232e48',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '10px 32px',
  borderRadius: 4,
  '&:hover': {
    backgroundColor: '#9e9e9e',
  },
}));

const ActionButtonsRow = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  gap: 16,
  margin: '0 auto 24px auto',
  maxWidth: 1400,
  width: '100%',
}));

const CreateTradingClientButton = styled(Button)(() => ({
  backgroundColor: '#4caf50',
  color: 'white',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '12px 36px',
  borderRadius: 4,
  fontSize: '1rem',
  flex: 1,
  '&:hover': {
    backgroundColor: '#388e3c',
  },
}));

const ShowActiveUsersButton = styled(Button)(() => ({
  backgroundColor: '#b041c9',
  color: 'white',
  fontWeight: 600,
  textTransform: 'uppercase',
  padding: '12px 36px',
  borderRadius: 4,
  fontSize: '1rem',
  flex: 1,
  '&:hover': {
    backgroundColor: '#8e2bbf',
  },
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#1a2138' : '#fff',
  borderRadius: 8,
  marginTop: 16,
}));

const StyledTableHead = styled(TableHead)(({ theme }) => ({
  background: theme.palette.mode === 'dark' ? '#232e48' : '#f4f6fa',
  '& th': {
    color: theme.palette.mode === 'dark' ? 'white' : '#222',
    fontWeight: 700,
    fontSize: 15,
    borderBottom: '1px solid rgba(255,255,255,0.08)',
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  color: theme.palette.mode === 'dark' ? 'white' : '#222',
  fontSize: 15,
  borderBottom: '1px solid rgba(255,255,255,0.08)',
  padding: '12px 8px',
}));

const ActionButton = styled(IconButton)(() => ({
  color: 'white',
  padding: '4px',
}));

const GreenIconButton = styled(IconButton)(() => ({
  backgroundColor: '#43a047',
  color: 'white',
  margin: '0 2px',
  '&:hover': { backgroundColor: '#388e3c' },
  width: 32,
  height: 32,
}));
const RedIconButton = styled(IconButton)(() => ({
  backgroundColor: '#e53935',
  color: 'white',
  margin: '0 2px',
  '&:hover': { backgroundColor: '#b71c1c' },
  width: 32,
  height: 32,
}));
const RsIconButton = styled(IconButton)(() => ({
  backgroundColor: '#1976d2',
  color: 'white',
  margin: '0 2px',
  '&:hover': { backgroundColor: '#115293' },
  width: 32,
  height: 32,
}));

// Mock data for the form and table
const initialForm = {
  username: '',
  accountStatus: 'All',
};

const mockTableData = [
  {
    id: 1234955,
    fullName: 'S. Nath',
    username: 'Helo1249',
    ledgerBalance: 668834.5,
    grossPL: 251600,
    brokerage: 3843.42,
    netPL: 247756.58,
    admin: 'jain128',
    demoAccount: 'No',
    accountStatus: 'Active',
  },
  {
    id: 1286816,
    fullName: 'Gejandra',
    username: 'HELO1256',
    ledgerBalance: 1000000,
    grossPL: 0,
    brokerage: 0,
    netPL: 0,
    admin: 'jain128',
    demoAccount: 'No',
    accountStatus: 'Active',
  },
  {
    id: 1399637,
    fullName: 'Raj',
    username: 'Helo1262',
    ledgerBalance: 1000000,
    grossPL: 0,
    brokerage: 0,
    netPL: 0,
    admin: 'jain128',
    demoAccount: 'No',
    accountStatus: 'Active',
  },
];

export default function UserDetailPage() {
  const [form, setForm] = useState(initialForm);
  const [tableData] = useState(mockTableData);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () => {
    // Implement search logic if needed
  };

  const handleReset = () => {
    setForm(initialForm);
  };

  return (
    <PageContainer>
      <FormCard>
        <FormRow>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', mb: 1 }}>Username</Typography>
            <StyledTextField
              fullWidth
              name="username"
              value={form.username}
              onChange={handleFormChange}
              size="small"
              variant="outlined"
              placeholder=""
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ color: 'white', mb: 1 }}>Account Status</Typography>
            <StyledFormControl fullWidth size="small" variant="outlined">
              <Select
                name="accountStatus"
                value={form.accountStatus}
                onChange={handleFormChange}
                displayEmpty
                inputProps={{ 'aria-label': 'Account Status' }}
                sx={{ height: '40px', color: 'white' }}
              >
                <MenuItem value="All">All</MenuItem>
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Suspended">Suspended</MenuItem>
              </Select>
            </StyledFormControl>
          </Box>
        </FormRow>
        <ButtonRow>
          <SearchButton variant="contained" onClick={handleSearch}>SEARCH</SearchButton>
          <ResetButton variant="contained" onClick={handleReset}>RESET</ResetButton>
        </ButtonRow>
      </FormCard>
      <ActionButtonsRow>
        <CreateTradingClientButton variant="contained">CREATE TRADING CLIENT</CreateTradingClientButton>
        <ShowActiveUsersButton variant="contained">SHOW ACTIVE USERS</ShowActiveUsersButton>
      </ActionButtonsRow>
      <StyledTableContainer>
        <Table>
          <StyledTableHead>
            <TableRow>
              <StyledTableCell>#</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
              <StyledTableCell>ID</StyledTableCell>
              <StyledTableCell>Full Name</StyledTableCell>
              <StyledTableCell>Username</StyledTableCell>
              <StyledTableCell>Ledger Balance</StyledTableCell>
              <StyledTableCell>Gross P/L</StyledTableCell>
              <StyledTableCell>Brokerage</StyledTableCell>
              <StyledTableCell>Net P/L</StyledTableCell>
              <StyledTableCell>Admin</StyledTableCell>
              <StyledTableCell>Demo Account?</StyledTableCell>
              <StyledTableCell>Account Status</StyledTableCell>
            </TableRow>
          </StyledTableHead>
          <TableBody>
            {tableData.map((row, idx) => (
              <TableRow key={row.id}>
                <StyledTableCell>{idx + 1}</StyledTableCell>
                <StyledTableCell>
                  <Box sx={{ display: 'flex', gap: 0.5 }}>
                    <ActionButton size="small"><VisibilityIcon fontSize="small" /></ActionButton>
                    <ActionButton size="small"><EditIcon fontSize="small" /></ActionButton>
                    <ActionButton size="small"><FileCopyIcon fontSize="small" /></ActionButton>
                    <ActionButton size="small"><SettingsIcon fontSize="small" /></ActionButton>
                    <GreenIconButton size="small"><ArrowDownwardIcon fontSize="small" /></GreenIconButton>
                    <RedIconButton size="small"><ArrowUpwardIcon fontSize="small" /></RedIconButton>
                    <RsIconButton size="small"><CurrencyRupeeIcon fontSize="small" /></RsIconButton>
                  </Box>
                </StyledTableCell>
                <StyledTableCell>{row.id}</StyledTableCell>
                <StyledTableCell>{row.fullName}</StyledTableCell>
                <StyledTableCell>{row.username}</StyledTableCell>
                <StyledTableCell>{row.ledgerBalance}</StyledTableCell>
                <StyledTableCell>{row.grossPL}</StyledTableCell>
                <StyledTableCell>{row.brokerage}</StyledTableCell>
                <StyledTableCell>{row.netPL}</StyledTableCell>
                <StyledTableCell>{row.admin}</StyledTableCell>
                <StyledTableCell>{row.demoAccount}</StyledTableCell>
                <StyledTableCell>{row.accountStatus}</StyledTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
    </PageContainer>
  );
} 