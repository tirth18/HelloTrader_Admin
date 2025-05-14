'use client';

import React from 'react';
import { useTheme } from '@mui/material/styles';
import DashboardLayout from '../../../components/layouts/DashboardLayout';
import { Box, Typography, Paper, Grid, TextField, InputAdornment, Checkbox, FormControlLabel, Select, MenuItem, InputLabel, FormControl, Button } from '@mui/material';

export default function CreateTradingClientPage() {
  const theme = useTheme();
  const secondaryTextColor = theme.palette.text.secondary;
  return (
    <DashboardLayout>
      <Box sx={{ p: { xs: 1, sm: 3 } }}>
        <Paper elevation={0} sx={{ p: { xs: 2, sm: 3 }, borderRadius: 2 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Personal Details:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Name</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="Insert Real name of the trader. Will be visible in trading App"
                InputProps={{
                  style: { fontWeight: 400, fontSize: 16 },
                }}
                helperText={
                  <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                    Insert Real name of the trader. Will be visible in trading App
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Mobile</Typography>
              <TextField fullWidth size="small" placeholder="Optional" InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} helperText={<span style={{ color: secondaryTextColor, fontSize: 15 }}>Optional</span>} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Username</Typography>
              <TextField
                fullWidth
                size="small"
                placeholder="username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols."
                InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                helperText={
                  <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                    username for loggin-in with, is not case sensitive. must be unique for every trader. should not contain symbols.
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Password</Typography>
              <TextField
                fullWidth
                size="small"
                type="password"
                placeholder="password for loggin-in with, is case sensitive."
                InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                helperText={
                  <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                    password for loggin-in with, is case sensitive.
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>Initial Funds</Typography>
              <TextField
                fullWidth
                size="small"
                value={0}
                InputProps={{
                  readOnly: true,
                  style: { fontWeight: 700, fontSize: 16 },
                }}
                helperText={<span style={{ color: secondaryTextColor, fontSize: 15 }}></span>}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography sx={{ fontWeight: 500, mb: 1, mt: 2, fontSize: 18 }}>City</Typography>
              <TextField fullWidth size="small" placeholder="Optional" InputProps={{ style: { fontWeight: 400, fontSize: 16 } }} helperText={<span style={{ color: secondaryTextColor, fontSize: 15 }}>Optional</span>} />
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox />} label="demo account?" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Allow Orders between High - Low?" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Account Status" />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                  auto-Close all active trades when the losses reach % of Ledger-balance
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={90}
                  InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                  Example: 95, will close when losses reach 95% of ledger balance
                </Typography>
              </Box>
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                  Min. Time to book profit (No. of Seconds)
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={300}
                  InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                  Example: 120, will hold the trade for 2 minutes before closing a trade in profit
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Allow Fresh Entry Order above high & below low?" />
              <FormControlLabel control={<Checkbox />} label="Trade equity as units instead of lots." />
              <FormControlLabel control={<Checkbox defaultChecked />} label="Auto Close Trades if condition met" />
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 400, mb: 1, fontSize: 18 }}>
                  Notify client when the losses reach % of Ledger-balance
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={70}
                  InputProps={{ style: { fontWeight: 700, fontSize: 16 } }}
                  sx={{ mb: 0.5 }}
                />
                <Typography variant="caption" sx={{ color: secondaryTextColor, fontSize: 15 }}>
                  Example: 70, will send notification to customer every 5-minutes until losses cross 70% of ledger balance
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            MCX Futures:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="MCX Trading" />
              <TextField fullWidth size="small" label="Maximum lot size allowed per single trade of MCX" value={20} sx={{ mt: 2 }} />
              <TextField fullWidth size="small" label="Max Size All Commodity" value={100} sx={{ mt: 2 }} />
              <TextField fullWidth size="small" label="MCX brokerage" value={800} sx={{ mt: 2 }} />
              <TextField fullWidth size="small" label="Intraday Exposure/Margin MCX" value={500} sx={{ mt: 2 }} helperText={<span style={{ color: secondaryTextColor, fontSize: 15 }}>Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.</span>} />
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 18 }}>Orders to be away by points in each scrip MCX:</Typography>
                {['GOLDM', 'BULLDEX', 'SILVER', 'COPPER', 'ZINC', 'NATURALGAS', 'ALUMINIUM', 'COTTON', 'ZINCMINI', 'LEADMINI'].map(scrip => (
                  <Box key={scrip} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ width: 110, fontSize: 18 }}>{scrip}:</Typography>
                    <TextField size="small" value={0} sx={{ width: 100, fontSize: 16 }} />
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField fullWidth size="small" label="Minimum lot size required per single trade of MCX" value={0} />
              <TextField fullWidth size="small" label="Maximum lot size allowed per script of MCX to be actively open at a time" value={50} sx={{ mt: 2 }} />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Mcx Brokerage Type</InputLabel>
                <Select label="Mcx Brokerage Type" value="Per Crore Basis">
                  <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  <MenuItem value="Per Tonne Basis">Per Lot Basis</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Exposure Mcx Type</InputLabel>
                <Select label="Exposure Mcx Type" value="Per Turnover Basis">
                  <MenuItem value="Per Turnover Basis">Per Turnover Basis</MenuItem>
                  <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth size="small" label="Holding Exposure/Margin MCX" value={100} sx={{ mt: 2 }} helperText={<span style={{ color: secondaryTextColor, fontSize: 15 }}>Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.</span>} />
              <Box sx={{ mt: 2 }}>
                {['SILVERM', 'GOLD', 'CRUDEOIL', 'NICKEL', 'LEAD', 'NATURALGAS MINI', 'MENTHAOIL', 'SILVERMIC', 'ALUMINI', 'CRUDEOIL MINI'].map(scrip => (
                  <Box key={scrip} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Typography sx={{ width: 110, fontSize: 18 }}>{scrip}:</Typography>
                    <TextField size="small" value={0} sx={{ width: 100, fontSize: 16 }} />
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

          {/* Equity Futures Section */}
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Equity Futures:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Equity Trading" />
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lots size required per single trade of Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lots size required per single trade of Equity INDEX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lots size allowed per scrip of Equity to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={100}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={100}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={500}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Orders to be away by % from current price Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 0 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Equity brokerage Per Crore
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={800}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lots size allowed per single trade of Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={50}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lots size allowed per single trade of Equity INDEX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={20}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lots size allowed per scrip of Equity INDEX to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={100}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Index
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={100}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={100}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade devided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
            </Grid>
          </Grid>

          {/* Options Config Section */}
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Options Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Index Options Trading" />
              <FormControlLabel control={<Checkbox defaultChecked />} label="MCX Options Trading" sx={{ display: 'block', mt: 1 }} />
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Index brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={25}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Equity brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={40}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options MCX brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={50}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Index Short Selling Allowed (Sell First and Buy later)
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Yes">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  MCX Options Short Selling Allowed (Sell First and Buy later)
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="No">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of Equity Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of Equity INDEX Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={20}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of MCX Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={20}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of Equity INDEX Options to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={20}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Equity Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All MCX Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel control={<Checkbox defaultChecked />} label="Equity Options Trading" />
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Index Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Equity Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options MCX Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Min. Bid Price
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={2}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Equity Short Selling Allowed (Sell First and Buy later)
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="No">
                    <MenuItem value="Yes">Yes</MenuItem>
                    <MenuItem value="No">No</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of Equity Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={1}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of Equity INDEX Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={1}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of MCX Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={1}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of Equity INDEX Options to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of MCX Options to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Index Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options Index
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={7}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options MCX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options Index
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options Equity
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options MCX
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Orders to be away by % from current price in Options
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
            </Grid>
          </Grid>

          {/* Options Shortselling Config Section */}
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Options Shortselling Config:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Index Shortselling Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Equity Shortselling Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options MCX Shortselling Brokerage Type
                </Typography>
                <FormControl fullWidth size="small">
                  <Select value="Per Lot Basis">
                    <MenuItem value="Per Lot Basis">Per Lot Basis</MenuItem>
                    <MenuItem value="Per Crore Basis">Per Crore Basis</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of Equity Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of MCX Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={1}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Minimum lot size required per single trade of Equity INDEX Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={0}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of Equity Options Shortselling to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={5}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of MCX Options Shortselling to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={7}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Index Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options Index Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={2}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options Equity Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Intraday Exposure/Margin Options MCX Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={5}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Exposure auto calculates the margin money required for any new trade entry. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lotsize of 100 is trading @ 45000 and exposure is 200, (45000 X 100) / 200 = 22500 is required to initiate the trade.
                    </span>
                  }
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Index Shortselling brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={50}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options Equity Shortselling brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={25}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Options MCX Shortselling brokerage
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={20}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of Equity Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={2}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of MCX Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per single trade of Equity INDEX Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Maximum lot size allowed per scrip of Equity INDEX Options Shortselling to be actively open at a time
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All Equity Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={10}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Max Size All MCX Options Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={30}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options Index Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={1}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options Equity Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={2}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
              
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Holding Exposure/Margin Options MCX Shortselling
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  value={3}
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                  helperText={
                    <span style={{ color: secondaryTextColor, fontSize: 15 }}>
                      Holding Exposure auto calculates the margin money required to hold a position overnight for the next market working day. Calculation : turnover of a trade divided by Exposure is required margin. eg. if gold having lot size of 100 is trading @ 45000 and holding exposure is 800, (45000 X 100) / 80 = 56250 is required to hold position overnight. System automatically checks at a given time around market closure to check and close all trades if margin(M2M) insufficient.
                    </span>
                  }
                />
              </Box>
            </Grid>
          </Grid>

          {/* Other Section */}
          <Typography variant="h5" sx={{ fontWeight: 700, mt: 6, mb: 3, letterSpacing: 0.5, fontSize: 24 }}>
            Other:
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Notes
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  multiline
                  rows={4}
                  placeholder="Add notes here..."
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
              
              <Box sx={{ mt: 3 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Transaction Password
                </Typography>
                <TextField
                  fullWidth
                  size="small"
                  type="password"
                  InputProps={{ style: { fontWeight: 400, fontSize: 16 } }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: 2 }}>
                <Typography sx={{ fontWeight: 500, mb: 1, fontSize: 16 }}>
                  Broker
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    displayEmpty
                    value=""
                    renderValue={(selected) => {
                      if (!selected) {
                        return <span>Select User</span>;
                      }
                      return selected;
                    }}
                  >
                    <MenuItem value="">
                      <em>Select User</em>
                    </MenuItem>
                    <MenuItem value="broker1">Broker 1</MenuItem>
                    <MenuItem value="broker2">Broker 2</MenuItem>
                    <MenuItem value="broker3">Broker 3</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>

          {/* Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4, gap: 2 }}>
            <Button variant="outlined" color="inherit" sx={{ px: 4, py: 1 }}>Cancel</Button>
            <Button variant="contained" color="primary" sx={{ px: 4, py: 1 }}>Create Trading Client</Button>
          </Box>
        </Paper>
      </Box>
    </DashboardLayout>
  );
} 