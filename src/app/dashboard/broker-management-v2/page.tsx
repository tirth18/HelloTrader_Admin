'use client';

import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Switch,
    FormControlLabel,
    MenuItem,
    Grid,
    Paper,
    Alert,
    CircularProgress
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '@/utils/api';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

const validationSchema = yup.object({
    first_name: yup.string().required('First name is required'),
    last_name: yup.string().required('Last name is required'),
    username: yup.string().required('Username is required'),
    password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    transaction_password: yup.string().required('Transaction password is required').min(6, 'Transaction password must be at least 6 characters'),
    broker_type: yup.string().required('Broker type is required'),
    mcx_brokerage: yup.number().min(0, 'Must be positive'),
    equity_brokerage: yup.number().min(0, 'Must be positive'),
});

export default function BrokerManagementV2() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const router = useRouter();
    const { isAuthenticated, user } = useAuth();

    // Check authentication on component mount
    useEffect(() => {
        if (!isAuthenticated) {
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    const handleSubmit = async (values: any) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await api.post('/brokers/', values);
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to create broker');
            }

            const data = await response.json();
            setSuccess(true);
            formik.resetForm();
        } catch (err) {
            console.error('Error creating broker:', err);
            if (err instanceof Error) {
                if (err.message === 'Unauthorized') {
                    router.push('/login');
                    return;
                }
                setError(err.message);
            } else {
                setError('Failed to create broker. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const formik = useFormik({
        initialValues: {
            first_name: '',
            last_name: '',
            username: '',
            password: '',
            transaction_password: '',
            broker_type: 'Broker',
            ref_code: '',
            is_active: true,
            auto_close_trade_threshold: 90.0,
            notify_loss_threshold: 50.0,
            brokerage_share: 0.0,
            profit_loss_share: 0.0,
            trading_clients_limit: 10,
            sub_brokers_limit: 5,
            sub_brokers_access: false,
            payin_allowed: false,
            payout_allowed: false,
            create_clients_allowed: false,
            client_tasks_allowed: false,
            notifications_allowed: false,
            trade_activity_allowed: false,
            mcx_trading_enabled: false,
            mcx_brokerage: 800,
            mcx_brokerage_type: 'Per Crore Basis',
            intraday_exposure_mcx: 500,
            holding_exposure_mcx: 100,
            equity_trading_enabled: false,
            equity_brokerage: 800,
            equity_brokerage_type: 'Per Turnover Basis',
            intraday_exposure_equity: 500,
            holding_exposure_equity: 100,
        },
        validationSchema: validationSchema,
        onSubmit: handleSubmit,
    });

    // If not authenticated, don't render the form
    if (!isAuthenticated) {
        return null;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Create New Broker
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    Broker created successfully!
                </Alert>
            )}

            <Paper sx={{ p: 3 }}>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Personal Details */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Personal Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="first_name"
                                label="First Name"
                                value={formik.values.first_name}
                                onChange={formik.handleChange}
                                error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                                helperText={formik.touched.first_name && typeof formik.errors.first_name === 'string' ? formik.errors.first_name : ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="last_name"
                                label="Last Name"
                                value={formik.values.last_name}
                                onChange={formik.handleChange}
                                error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                                helperText={formik.touched.last_name && typeof formik.errors.last_name === 'string' ? formik.errors.last_name : ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                error={formik.touched.username && Boolean(formik.errors.username)}
                                helperText={formik.touched.username && typeof formik.errors.username === 'string' ? formik.errors.username : ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && typeof formik.errors.password === 'string' ? formik.errors.password : ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="transaction_password"
                                label="Transaction Password"
                                type="password"
                                value={formik.values.transaction_password}
                                onChange={formik.handleChange}
                                error={formik.touched.transaction_password && Boolean(formik.errors.transaction_password)}
                                helperText={formik.touched.transaction_password && typeof formik.errors.transaction_password === 'string' ? formik.errors.transaction_password : ''}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                select
                                name="broker_type"
                                label="Broker Type"
                                value={formik.values.broker_type}
                                onChange={formik.handleChange}
                                error={formik.touched.broker_type && Boolean(formik.errors.broker_type)}
                                helperText={formik.touched.broker_type && typeof formik.errors.broker_type === 'string' ? formik.errors.broker_type : ''}
                            >
                                <MenuItem value="Broker">Broker</MenuItem>
                                <MenuItem value="Sub-Broker">Sub-Broker</MenuItem>
                            </TextField>
                        </Grid>

                        {/* MCX Features */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                MCX Features
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.mcx_trading_enabled}
                                        onChange={formik.handleChange}
                                        name="mcx_trading_enabled"
                                    />
                                }
                                label="MCX Trading"
                            />
                        </Grid>
                        {formik.values.mcx_trading_enabled && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="mcx_brokerage"
                                        label="MCX Brokerage"
                                        type="number"
                                        value={formik.values.mcx_brokerage}
                                        onChange={formik.handleChange}
                                        error={formik.touched.mcx_brokerage && Boolean(formik.errors.mcx_brokerage)}
                                        helperText={formik.touched.mcx_brokerage && typeof formik.errors.mcx_brokerage === 'string' ? formik.errors.mcx_brokerage : "Exposure auto calculates the margin money required for any new trade entry. Calculation: turnover of a trade divided by Exposure is required margin."}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        name="mcx_brokerage_type"
                                        label="MCX Brokerage Type"
                                        value={formik.values.mcx_brokerage_type}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                                        <MenuItem value="Per Trade Basis">Per Trade Basis</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="intraday_exposure_mcx"
                                        label="Intraday Exposure/Margin MCX"
                                        type="number"
                                        value={formik.values.intraday_exposure_mcx}
                                        onChange={formik.handleChange}
                                        helperText="Exposure auto calculates the margin money required for any new trade entry."
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="holding_exposure_mcx"
                                        label="Holding Exposure/Margin MCX"
                                        type="number"
                                        value={formik.values.holding_exposure_mcx}
                                        onChange={formik.handleChange}
                                        helperText="Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day."
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Equity Features */}
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Equity Features
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={formik.values.equity_trading_enabled}
                                        onChange={formik.handleChange}
                                        name="equity_trading_enabled"
                                    />
                                }
                                label="Equity Trading"
                            />
                        </Grid>
                        {formik.values.equity_trading_enabled && (
                            <>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="equity_brokerage"
                                        label="Equity Brokerage"
                                        type="number"
                                        value={formik.values.equity_brokerage}
                                        onChange={formik.handleChange}
                                        error={formik.touched.equity_brokerage && Boolean(formik.errors.equity_brokerage)}
                                        helperText={formik.touched.equity_brokerage && typeof formik.errors.equity_brokerage === 'string' ? formik.errors.equity_brokerage : ''}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        name="equity_brokerage_type"
                                        label="Equity Brokerage Type"
                                        value={formik.values.equity_brokerage_type}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                                        <MenuItem value="Per Trade Basis">Per Trade Basis</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="intraday_exposure_equity"
                                        label="Intraday Exposure/Margin Equity"
                                        type="number"
                                        value={formik.values.intraday_exposure_equity}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        name="holding_exposure_equity"
                                        label="Holding Exposure/Margin Equity"
                                        type="number"
                                        value={formik.values.holding_exposure_equity}
                                        onChange={formik.handleChange}
                                    />
                                </Grid>
                            </>
                        )}

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Create Broker'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Box>
    );
} 