import React, { useState } from 'react';
import AdminLayout from '../../components/layout/AdminLayout';
import {
    Box,
    Container,
    Paper,
    Typography,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Card,
    CardContent,
    Divider,
    List,
    ListItem,
    ListItemText,
    FormGroup,
    FormControlLabel,
    Checkbox,
    TextField,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
} from '@mui/material';
import {
    BarChart as BarChartIcon,
    PieChart as PieChartIcon,
    Timeline as TimelineIcon,
    TableChart as TableChartIcon,
    FileDownload as FileDownloadIcon,
    CalendarToday as CalendarTodayIcon,
    DateRange as DateRangeIcon,
} from '@mui/icons-material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

// Mock report data
const tradingReports = [
    { id: 1, title: 'Daily Trading Volume', type: 'Chart', format: 'Bar', updated: '2023-06-10 14:23:45' },
    { id: 2, title: 'Monthly Revenue', type: 'Chart', format: 'Line', updated: '2023-06-10 10:15:32' },
    { id: 3, title: 'User Activity', type: 'Chart', format: 'Pie', updated: '2023-06-09 16:45:21' },
    { id: 4, title: 'Top Traders', type: 'Table', format: 'Raw', updated: '2023-06-09 12:30:18' },
    { id: 5, title: 'Platform Statistics', type: 'Summary', format: 'Card', updated: '2023-06-08 09:47:12' },
];

// Mock transaction data for the table
const transactionData = [
    { id: 1, user: 'John Doe', type: 'Deposit', amount: '₹25,000', date: '2023-06-10', status: 'Completed' },
    { id: 2, user: 'Jane Smith', type: 'Withdrawal', amount: '₹15,000', date: '2023-06-09', status: 'Completed' },
    { id: 3, user: 'Bob Johnson', type: 'Deposit', amount: '₹32,500', date: '2023-06-09', status: 'Completed' },
    { id: 4, user: 'Alice Williams', type: 'Withdrawal', amount: '₹18,000', date: '2023-06-08', status: 'Processing' },
    { id: 5, user: 'Tom Brown', type: 'Deposit', amount: '₹45,000', date: '2023-06-08', status: 'Completed' },
    { id: 6, user: 'Sarah Johnson', type: 'Withdrawal', amount: '₹22,000', date: '2023-06-07', status: 'Completed' },
    { id: 7, user: 'Mike Wilson', type: 'Deposit', amount: '₹13,500', date: '2023-06-07', status: 'Failed' },
    { id: 8, user: 'Emily Davis', type: 'Withdrawal', amount: '₹8,000', date: '2023-06-06', status: 'Completed' },
    { id: 9, user: 'David Miller', type: 'Deposit', amount: '₹65,000', date: '2023-06-06', status: 'Completed' },
    { id: 10, user: 'Laura Martin', type: 'Withdrawal', amount: '₹27,500', date: '2023-06-05', status: 'Completed' },
    { id: 11, user: 'Kevin Clark', type: 'Deposit', amount: '₹19,000', date: '2023-06-05', status: 'Processing' },
    { id: 12, user: 'Rachel White', type: 'Withdrawal', amount: '₹12,000', date: '2023-06-04', status: 'Completed' },
];

// Report formats
const reportFormats = ['PDF', 'Excel', 'CSV', 'JSON'];

// Date ranges
const dateRanges = ['Today', 'Yesterday', 'Last 7 Days', 'Last 30 Days', 'This Month', 'Last Month', 'Custom'];

const ReportsPage: React.FC = () => {
    const [tabValue, setTabValue] = useState(0);
    const [reportType, setReportType] = useState('');
    const [dateRange, setDateRange] = useState('Last 7 Days');
    const [exportFormat, setExportFormat] = useState('PDF');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    
    // Selected report options
    const [selectedReports, setSelectedReports] = useState<number[]>([1, 3, 5]);

    // Date picker state (for custom date range)
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Handle tab change
    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    // Handle report checkbox change
    const handleReportChange = (id: number) => {
        const currentIndex = selectedReports.indexOf(id);
        const newSelectedReports = [...selectedReports];

        if (currentIndex === -1) {
            newSelectedReports.push(id);
        } else {
            newSelectedReports.splice(currentIndex, 1);
        }

        setSelectedReports(newSelectedReports);
    };

    // Handle page change
    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    // Handle rows per page change
    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Handle generate report
    const handleGenerateReport = () => {
        // In a real app, this would trigger the report generation
        console.log('Generating report with options:', {
            reports: selectedReports,
            dateRange,
            startDate,
            endDate,
            format: exportFormat,
        });
    };

    return (
        <AdminLayout>
            <Container maxWidth={false}>
                <Box sx={{ pt: 3, pb: 3 }}>
                    <Paper sx={{ p: 2, mb: 3 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" component="h1">
                                    Reports & Analytics
                                </Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} sx={{ textAlign: { sm: 'right' } }}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    startIcon={<FileDownloadIcon />}
                                    onClick={handleGenerateReport}
                                >
                                    Export Report
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>

                    <Paper sx={{ width: '100%', mb: 3 }}>
                        <Tabs
                            value={tabValue}
                            onChange={handleTabChange}
                            aria-label="report tabs"
                            variant="scrollable"
                            scrollButtons="auto"
                        >
                            <Tab
                                icon={<BarChartIcon />}
                                iconPosition="start"
                                label="Trading Reports"
                            />
                            <Tab
                                icon={<TableChartIcon />}
                                iconPosition="start"
                                label="Transactions"
                            />
                            <Tab
                                icon={<PieChartIcon />}
                                iconPosition="start"
                                label="User Statistics"
                            />
                            <Tab
                                icon={<TimelineIcon />}
                                iconPosition="start"
                                label="Performance"
                            />
                        </Tabs>

                        {/* Trading Reports Tab */}
                        <TabPanel value={tabValue} index={0}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={4}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Report Options
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            
                                            <Typography variant="subtitle1" gutterBottom>
                                                Select Reports
                                            </Typography>
                                            <FormGroup>
                                                {tradingReports.map((report) => (
                                                    <FormControlLabel
                                                        key={report.id}
                                                        control={
                                                            <Checkbox
                                                                checked={selectedReports.includes(report.id)}
                                                                onChange={() => handleReportChange(report.id)}
                                                            />
                                                        }
                                                        label={report.title}
                                                    />
                                                ))}
                                            </FormGroup>
                                            
                                            <Box sx={{ mt: 3 }}>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    Date Range
                                                </Typography>
                                                <FormControl fullWidth sx={{ mb: 2 }}>
                                                    <InputLabel>Date Range</InputLabel>
                                                    <Select
                                                        value={dateRange}
                                                        label="Date Range"
                                                        onChange={(e) => setDateRange(e.target.value)}
                                                    >
                                                        {dateRanges.map((range) => (
                                                            <MenuItem key={range} value={range}>
                                                                {range}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                                
                                                {dateRange === 'Custom' && (
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                label="Start Date"
                                                                type="date"
                                                                value={startDate}
                                                                onChange={(e) => setStartDate(e.target.value)}
                                                                InputLabelProps={{ shrink: true }}
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={6}>
                                                            <TextField
                                                                label="End Date"
                                                                type="date"
                                                                value={endDate}
                                                                onChange={(e) => setEndDate(e.target.value)}
                                                                InputLabelProps={{ shrink: true }}
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                )}
                                            </Box>
                                            
                                            <Box sx={{ mt: 3 }}>
                                                <Typography variant="subtitle1" gutterBottom>
                                                    Export Format
                                                </Typography>
                                                <FormControl fullWidth>
                                                    <InputLabel>Format</InputLabel>
                                                    <Select
                                                        value={exportFormat}
                                                        label="Format"
                                                        onChange={(e) => setExportFormat(e.target.value)}
                                                    >
                                                        {reportFormats.map((format) => (
                                                            <MenuItem key={format} value={format}>
                                                                {format}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                            
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                fullWidth
                                                sx={{ mt: 3 }}
                                                onClick={handleGenerateReport}
                                                startIcon={<FileDownloadIcon />}
                                            >
                                                Generate Report
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                
                                <Grid item xs={12} md={8}>
                                    <Card sx={{ height: '100%' }}>
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom>
                                                Available Reports
                                            </Typography>
                                            <Divider sx={{ mb: 2 }} />
                                            
                                            <List>
                                                {tradingReports.map((report) => (
                                                    <React.Fragment key={report.id}>
                                                        <ListItem>
                                                            <ListItemText
                                                                primary={report.title}
                                                                secondary={`${report.type} • ${report.format} • Last updated: ${report.updated}`}
                                                            />
                                                            <Button
                                                                variant="outlined"
                                                                size="small"
                                                                startIcon={
                                                                    report.format === 'Bar' ? (
                                                                        <BarChartIcon />
                                                                    ) : report.format === 'Pie' ? (
                                                                        <PieChartIcon />
                                                                    ) : report.format === 'Line' ? (
                                                                        <TimelineIcon />
                                                                    ) : (
                                                                        <TableChartIcon />
                                                                    )
                                                                }
                                                            >
                                                                View
                                                            </Button>
                                                        </ListItem>
                                                        <Divider component="li" />
                                                    </React.Fragment>
                                                ))}
                                            </List>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* Transactions Tab */}
                        <TabPanel value={tabValue} index={1}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Box sx={{ mb: 3 }}>
                                        <Typography variant="h6" gutterBottom>
                                            Transaction History
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={4} md={3}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Transaction Type</InputLabel>
                                                    <Select
                                                        value={reportType}
                                                        label="Transaction Type"
                                                        onChange={(e) => setReportType(e.target.value)}
                                                    >
                                                        <MenuItem value="">All</MenuItem>
                                                        <MenuItem value="Deposit">Deposits</MenuItem>
                                                        <MenuItem value="Withdrawal">Withdrawals</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={5} md={4}>
                                                <FormControl fullWidth size="small">
                                                    <InputLabel>Date Range</InputLabel>
                                                    <Select
                                                        value={dateRange}
                                                        label="Date Range"
                                                        onChange={(e) => setDateRange(e.target.value)}
                                                    >
                                                        {dateRanges.map((range) => (
                                                            <MenuItem key={range} value={range}>
                                                                {range}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item xs={12} sm={3} md={2}>
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    fullWidth
                                                    startIcon={<FileDownloadIcon />}
                                                >
                                                    Export
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell>ID</TableCell>
                                                    <TableCell>User</TableCell>
                                                    <TableCell>Type</TableCell>
                                                    <TableCell>Amount</TableCell>
                                                    <TableCell>Date</TableCell>
                                                    <TableCell>Status</TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {transactionData
                                                    .filter(
                                                        (transaction) =>
                                                            !reportType || transaction.type === reportType
                                                    )
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((transaction) => (
                                                        <TableRow key={transaction.id}>
                                                            <TableCell>{transaction.id}</TableCell>
                                                            <TableCell>{transaction.user}</TableCell>
                                                            <TableCell>{transaction.type}</TableCell>
                                                            <TableCell>{transaction.amount}</TableCell>
                                                            <TableCell>{transaction.date}</TableCell>
                                                            <TableCell>
                                                                <Typography
                                                                    sx={{
                                                                        color:
                                                                            transaction.status === 'Completed'
                                                                                ? 'success.main'
                                                                                : transaction.status === 'Processing'
                                                                                ? 'warning.main'
                                                                                : 'error.main',
                                                                    }}
                                                                >
                                                                    {transaction.status}
                                                                </Typography>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        component="div"
                                        count={transactionData.filter(
                                            (transaction) => !reportType || transaction.type === reportType
                                        ).length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Grid>
                            </Grid>
                        </TabPanel>

                        {/* User Statistics Tab */}
                        <TabPanel value={tabValue} index={2}>
                            <Typography variant="h6" gutterBottom>
                                User Statistics
                            </Typography>
                            <Box sx={{ p: 5, textAlign: 'center' }}>
                                <Typography variant="body1" color="textSecondary">
                                    Charts and data visualizations will be displayed here.
                                </Typography>
                            </Box>
                        </TabPanel>

                        {/* Performance Tab */}
                        <TabPanel value={tabValue} index={3}>
                            <Typography variant="h6" gutterBottom>
                                Platform Performance
                            </Typography>
                            <Box sx={{ p: 5, textAlign: 'center' }}>
                                <Typography variant="body1" color="textSecondary">
                                    Performance metrics and analytics will be displayed here.
                                </Typography>
                            </Box>
                        </TabPanel>
                    </Paper>
                </Box>
            </Container>
        </AdminLayout>
    );
};

export default ReportsPage; 