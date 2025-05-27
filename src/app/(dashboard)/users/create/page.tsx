"use client";

import React from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  useTheme,
  Paper,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  username: Yup.string()
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "No symbols allowed"),
  password: Yup.string().required("Password is required"),
  transactionPassword: Yup.string().required("Transaction password is required"),
  type: Yup.string().required("Type is required"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  username: "",
  password: "",
  transactionPassword: "",
  refCode: "",
  type: "Broker",
  accountStatus: false,
  notifyLossPercent: "70",
  autoCloseLossPercent: "90",
  brokerageShare: "50",
  profitLossShare: "0",
  subBrokersLimit: "1",
  tradingClientsLimit: "10",
  subBrokersActions: "No",
  payinAllowed: "No",
  payoutAllowed: "No",
  createClientsAllowed: "No",
  clientTasksAllowed: "No",
  tradeActivityAllowed: "No",
  notificationsAllowed: "No",
  mcxTrading: false,
  mcxBrokerage: "",
  mcxBrokerageType: "Per Crore Basis",
  intradayExposureMcx: "",
  exposureMcxType: "Per Turnover Basis",
  holdingExposureMcx: "",
  equityTrading: false,
  intradayExposureEquity: "",
  equityBrokeragePerCrore: "",
  holdingExposureEquity: "",
};

const CreateUserPage = () => {
  const router = useRouter();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: isDark ? "#141b2d" : "#f4f6f8",
        py: 6,
        px: 2,
      }}
    >
      <Box maxWidth="lg" mx="auto">
        <Card 
          sx={{ 
            borderRadius: 2, 
            boxShadow: 3,
            background: isDark ? "#1a2035" : "#fff",
            overflow: "visible"
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Typography
              variant="h4"
              sx={{
                mb: 4,
                fontWeight: 700,
                color: theme.palette.primary.main,
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: -10,
                  left: 0,
                  width: 60,
                  height: 4,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 2,
                }
              }}
            >
              Create User
            </Typography>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting }) => {
                // TODO: handle user creation logic
                setSubmitting(false);
                router.push("/users");
              }}
            >
              {({ errors, touched, handleChange, values, isSubmitting }) => (
                <Form>
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          width: 4,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 1.5,
                          borderRadius: 2,
                        }
                      }}
                    >
                      Personal Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="First Name"
                          name="firstName"
                          value={values.firstName}
                          onChange={handleChange}
                          error={touched.firstName && Boolean(errors.firstName)}
                          helperText={
                            touched.firstName
                              ? errors.firstName ||
                                "Insert Real name of the broker. Will be visible in website"
                              : "Insert Real name of the broker. Will be visible in website"
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Last Name"
                          name="lastName"
                          value={values.lastName}
                          onChange={handleChange}
                          error={touched.lastName && Boolean(errors.lastName)}
                          helperText={
                            touched.lastName
                              ? errors.lastName ||
                                "Insert Real name of the broker. Will be visible in website"
                              : "Insert Real name of the broker. Will be visible in website"
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Username"
                          name="username"
                          value={values.username}
                          onChange={handleChange}
                          error={touched.username && Boolean(errors.username)}
                          helperText={
                            touched.username
                              ? errors.username ||
                                "username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols."
                              : "username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols."
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Password"
                          name="password"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          error={touched.password && Boolean(errors.password)}
                          helperText={
                            touched.password
                              ? errors.password ||
                                "password for loggin-in with, is case sensitive."
                              : "password for loggin-in with, is case sensitive."
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Ref. Code"
                          name="refCode"
                          value={values.refCode}
                          onChange={handleChange}
                          helperText={"Ref. Code"}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Type</InputLabel>
                          <Select
                            name="type"
                            value={values.type}
                            label="Type"
                            onChange={handleChange}
                          >
                            <MenuItem value="Broker">Broker</MenuItem>
                            <MenuItem value="Client">Client</MenuItem>
                            <MenuItem value="Admin">Admin</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Config Section */}
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          width: 4,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 1.5,
                          borderRadius: 2,
                        }
                      }}
                    >
                      Config
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="accountStatus"
                              checked={values.accountStatus || false}
                              onChange={handleChange}
                              color="primary"
                            />
                          }
                          label={<Typography>Account Status</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Notify client when the losses reach % of Ledger-balance"
                          name="notifyLossPercent"
                          value={values.notifyLossPercent || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.notifyLossPercent || '70'}</b>
                              <br />
                              Example: 70, will send notification to customer every 5-minutes until losses cross 70% of ledger balance
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="auto-Close all active trades when the losses reach % of Ledger-balance"
                          name="autoCloseLossPercent"
                          value={values.autoCloseLossPercent || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.autoCloseLossPercent || '90'}</b>
                              <br />
                              Example: 95, will close when losses reach 95% of ledger balance
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Brokerage Share in %"
                          name="brokerageShare"
                          value={values.brokerageShare || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.brokerageShare || '50'}</b>
                              <br />
                              Example: 30, will give broker 30% of total brokerage collected from clients
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Profit/Loss Share in %"
                          name="profitLossShare"
                          value={values.profitLossShare || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.profitLossShare || '0'}</b>
                              <br />
                              Example: 30, will give broker 30% of total brokerage collected from clients
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Sub Brokers Limit"
                          name="subBrokersLimit"
                          value={values.subBrokersLimit || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.subBrokersLimit || '1'}</b>
                              <br />
                              Max. no. of Sub-brokers
                            </>
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Trading Clients Limit"
                          name="tradingClientsLimit"
                          value={values.tradingClientsLimit || ''}
                          onChange={handleChange}
                          helperText={
                            <>
                              <b>{values.tradingClientsLimit || '10'}</b>
                              <br />
                              Max. no. of Trading Clients
                            </>
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Permissions Section */}
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          width: 4,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 1.5,
                          borderRadius: 2,
                        }
                      }}
                    >
                      Permissions
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Sub Brokers Actions (Create, Edit)</InputLabel>
                          <Select
                            name="subBrokersActions"
                            value={values.subBrokersActions || 'No'}
                            label="Sub Brokers Actions (Create, Edit)"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Payin Allowed</InputLabel>
                          <Select
                            name="payinAllowed"
                            value={values.payinAllowed || 'No'}
                            label="Payin Allowed"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Payout Allowed</InputLabel>
                          <Select
                            name="payoutAllowed"
                            value={values.payoutAllowed || 'No'}
                            label="Payout Allowed"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Create Clients Allowed (Create, Update and Reset Password)</InputLabel>
                          <Select
                            name="createClientsAllowed"
                            value={values.createClientsAllowed || 'No'}
                            label="Create Clients Allowed (Create, Update and Reset Password)"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Client Tasks Allowed (Account Reset, Recalculate brokerage etc.)</InputLabel>
                          <Select
                            name="clientTasksAllowed"
                            value={values.clientTasksAllowed || 'No'}
                            label="Client Tasks Allowed (Account Reset, Recalculate brokerage etc.)"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Trade Activity Allowed (Create, Update, Restore, Delete Trade)</InputLabel>
                          <Select
                            name="tradeActivityAllowed"
                            value={values.tradeActivityAllowed || 'No'}
                            label="Trade Activity Allowed (Create, Update, Restore, Delete Trade)"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Notifications Allowed</InputLabel>
                          <Select
                            name="notificationsAllowed"
                            value={values.notificationsAllowed || 'No'}
                            label="Notifications Allowed"
                            onChange={handleChange}
                          >
                            <MenuItem value="Yes">Yes</MenuItem>
                            <MenuItem value="No">No</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* MCX Futures Section */}
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          width: 4,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 1.5,
                          borderRadius: 2,
                        }
                      }}
                    >
                      MCX Futures
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="mcxTrading"
                              checked={values.mcxTrading || false}
                              onChange={handleChange}
                              color="primary"
                            />
                          }
                          label={<Typography>MCX Trading</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="MCX brokerage"
                          name="mcxBrokerage"
                          value={values.mcxBrokerage || ''}
                          onChange={handleChange}
                          helperText={''}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Mcx Brokerage Type</InputLabel>
                          <Select
                            name="mcxBrokerageType"
                            value={values.mcxBrokerageType || 'Per Crore Basis'}
                            label="Mcx Brokerage Type"
                            onChange={handleChange}
                          >
                            <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                            <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Intraday Exposure/Margin MCX"
                          name="intradayExposureMcx"
                          value={values.intradayExposureMcx || ''}
                          onChange={handleChange}
                          helperText={
                            'Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.'
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl fullWidth>
                          <InputLabel>Exposure Mcx Type</InputLabel>
                          <Select
                            name="exposureMcxType"
                            value={values.exposureMcxType || 'Per Turnover Basis'}
                            label="Exposure Mcx Type"
                            onChange={handleChange}
                          >
                            <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                            <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Holding Exposure/Margin MCX"
                          name="holdingExposureMcx"
                          value={values.holdingExposureMcx || ''}
                          onChange={handleChange}
                          helperText={
                            'Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.'
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Equity Futures Section */}
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <Typography 
                      variant="h6" 
                      sx={{ 
                        mb: 3, 
                        fontWeight: 600,
                        color: isDark ? theme.palette.primary.light : theme.palette.primary.dark,
                        display: "flex",
                        alignItems: "center",
                        "&:before": {
                          content: '""',
                          width: 4,
                          height: 20,
                          backgroundColor: theme.palette.primary.main,
                          marginRight: 1.5,
                          borderRadius: 2,
                        }
                      }}
                    >
                      Equity Futures
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Field
                              as={Checkbox}
                              type="checkbox"
                              name="equityTrading"
                              checked={values.equityTrading || false}
                              onChange={handleChange}
                              color="primary"
                            />
                          }
                          label={<Typography>Equity Trading</Typography>}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Intraday Exposure/Margin Equity"
                          name="intradayExposureEquity"
                          value={values.intradayExposureEquity || ''}
                          onChange={handleChange}
                          helperText={
                            'Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.'
                          }
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Equity brokerage Per Crore"
                          name="equityBrokeragePerCrore"
                          value={values.equityBrokeragePerCrore || ''}
                          onChange={handleChange}
                          helperText={''}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Holding Exposure/Margin Equity"
                          name="holdingExposureEquity"
                          value={values.holdingExposureEquity || ''}
                          onChange={handleChange}
                          helperText={
                            'Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.'
                          }
                        />
                      </Grid>
                    </Grid>
                  </Paper>

                  {/* Transaction Password */}
                  <Paper
                    sx={{
                      p: 4,
                      background: isDark ? "#232e48" : "#fff",
                      borderRadius: 2,
                      mb: 4,
                      boxShadow: isDark ? "0 4px 20px 0 rgba(0,0,0,0.12)" : "0 4px 20px 0 rgba(0,0,0,0.05)",
                    }}
                  >
                    <TextField
                      fullWidth
                      label="Transaction Password to set"
                      name="transactionPassword"
                      type="password"
                      value={values.transactionPassword}
                      onChange={handleChange}
                      error={touched.transactionPassword && Boolean(errors.transactionPassword)}
                      helperText={
                        touched.transactionPassword
                          ? errors.transactionPassword
                          : "Transaction Password to set"
                      }
                    />
                  </Paper>

                  <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 3 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => router.push("/users")}
                      disabled={isSubmitting}
                      sx={{ 
                        borderRadius: 2, 
                        px: 4,
                        py: 1.2,
                        fontWeight: 600 
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmitting}
                      sx={{ 
                        borderRadius: 2, 
                        px: 4,
                        py: 1.2,
                        fontWeight: 600 
                      }}
                    >
                      Create User
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CreateUserPage; 