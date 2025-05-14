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
  IconButton,
  InputAdornment,
  Chip,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
} from '@mui/material';
import {
  Search as SearchIcon,
  Save as SaveIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import DashboardLayout from '@/components/layouts/DashboardLayout';

// Mock data structure for scrip settings
interface ScripSetting {
  name: string;
  aboveLtp: number;
  belowLtp: number;
}

// Mock data - this would come from your API in production
const initialScripSettings: ScripSetting[] = [
  // Commodities
  { name: 'ALUMINI', aboveLtp: 4, belowLtp: 4 },
  { name: 'ALUMINIUM', aboveLtp: 4, belowLtp: 4 },
  { name: 'COPPER', aboveLtp: 4, belowLtp: 4 },
  { name: 'COTTON', aboveLtp: 0, belowLtp: 0 },
  { name: 'CRUDEOIL', aboveLtp: 4, belowLtp: 4 },
  { name: 'CRUDEOILM', aboveLtp: 4, belowLtp: 4 },
  { name: 'GOLD', aboveLtp: 4, belowLtp: 4 },
  { name: 'GOLDGUINEA', aboveLtp: 0, belowLtp: 0 },
  { name: 'GOLDM', aboveLtp: 4, belowLtp: 4 },
  { name: 'GOLDPETAL', aboveLtp: 0, belowLtp: 0 },
  { name: 'LEAD', aboveLtp: 0, belowLtp: 0 },
  { name: 'LEADMINI', aboveLtp: 0, belowLtp: 0 },
  { name: 'MCXBULLDEX', aboveLtp: 0, belowLtp: 0 },
  { name: 'MENTHAOIL', aboveLtp: 0, belowLtp: 0 },
  { name: 'NATGASMINI', aboveLtp: 0, belowLtp: 0 },
  { name: 'NATURALGAS', aboveLtp: 4, belowLtp: 4 },
  { name: 'NICKEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'RUBBER', aboveLtp: 0, belowLtp: 0 },
  { name: 'SILVER', aboveLtp: 4, belowLtp: 4 },
  { name: 'SILVERM', aboveLtp: 4, belowLtp: 4 },
  { name: 'SILVERMIC', aboveLtp: 0, belowLtp: 0 },
  { name: 'ZINC', aboveLtp: 4, belowLtp: 4 },
  { name: 'ZINCMINI', aboveLtp: 0, belowLtp: 0 },
  
  // Stocks
  { name: 'AARTIIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'ABB', aboveLtp: 0, belowLtp: 0 },
  { name: 'ABBOTINDIA', aboveLtp: 0, belowLtp: 0 },
  { name: 'ABCAPITAL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ABFRL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ACC', aboveLtp: 4, belowLtp: 4 },
  { name: 'ADANIENSOL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ADANIENT', aboveLtp: 1, belowLtp: 1 },
  { name: 'ADANIGREEN', aboveLtp: 4, belowLtp: 4 },
  { name: 'ADANIPORTS', aboveLtp: 4, belowLtp: 4 },
  { name: 'ALKEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'AMARAJABAT', aboveLtp: 0, belowLtp: 0 },
  { name: 'AMBUJACEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'ANGELONE', aboveLtp: 0, belowLtp: 0 },
  { name: 'APLAPOLLO', aboveLtp: 0, belowLtp: 0 },
  { name: 'APOLLOHOSP', aboveLtp: 4, belowLtp: 4 },
  { name: 'APOLLOTYRE', aboveLtp: 4, belowLtp: 4 },
  { name: 'ASHOKLEY', aboveLtp: 0, belowLtp: 0 },
  { name: 'ASIANPAINT', aboveLtp: 4, belowLtp: 4 },
  { name: 'ASTRAL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ATGL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ATUL', aboveLtp: 0, belowLtp: 0 },
  { name: 'AUBANK', aboveLtp: 0, belowLtp: 0 },
  { name: 'AUROPHARMA', aboveLtp: 0, belowLtp: 0 },
  { name: 'AXISBANK', aboveLtp: 4, belowLtp: 0 },
  { name: 'BAJAJ-AUTO', aboveLtp: 4, belowLtp: 4 },
  { name: 'BAJAJFINSV', aboveLtp: 4, belowLtp: 4 },
  { name: 'BAJFINANCE', aboveLtp: 4, belowLtp: 4 },
  { name: 'BALKRISIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'BALRAMCHIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'BANDHANBNK', aboveLtp: 0, belowLtp: 0 },
  { name: 'BANKBARODA', aboveLtp: 0, belowLtp: 0 },
  { name: 'BANKINDIA', aboveLtp: 0, belowLtp: 0 },
  { name: 'BANKNIFTY', aboveLtp: 8, belowLtp: 8 },
  { name: 'BATAINDIA', aboveLtp: 0, belowLtp: 0 },
  { name: 'BEL', aboveLtp: 4, belowLtp: 4 },
  { name: 'BERGEPAINT', aboveLtp: 0, belowLtp: 0 },
  { name: 'BHARATFORG', aboveLtp: 0, belowLtp: 0 },
  { name: 'BHARTIARTL', aboveLtp: 4, belowLtp: 4 },
  { name: 'BHEL', aboveLtp: 4, belowLtp: 4 },
  { name: 'BIOCON', aboveLtp: 0, belowLtp: 0 },
  { name: 'BOSCHLTD', aboveLtp: 0, belowLtp: 0 },
  { name: 'BPCL', aboveLtp: 4, belowLtp: 4 },
  { name: 'BRITANNIA', aboveLtp: 0, belowLtp: 0 },
  { name: 'BSE', aboveLtp: 4, belowLtp: 4 },
  { name: 'BSOFT', aboveLtp: 0, belowLtp: 0 },
  { name: 'CAMS', aboveLtp: 4, belowLtp: 4 },
  { name: 'CANBK', aboveLtp: 0, belowLtp: 0 },
  { name: 'CANFINHOME', aboveLtp: 0, belowLtp: 0 },
  { name: 'CDSL', aboveLtp: 0, belowLtp: 0 },
  { name: 'CESC', aboveLtp: 0, belowLtp: 0 },
  { name: 'CGPOWER', aboveLtp: 0, belowLtp: 0 },
  { name: 'CHAMBLFERT', aboveLtp: 0, belowLtp: 0 },
  { name: 'CHOLAFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'CIPLA', aboveLtp: 4, belowLtp: 4 },
  { name: 'COALINDIA', aboveLtp: 4, belowLtp: 4 },
  { name: 'COFORGE', aboveLtp: 0, belowLtp: 0 },
  { name: 'COLPAL', aboveLtp: 0, belowLtp: 0 },
  { name: 'CONCOR', aboveLtp: 0, belowLtp: 0 },
  { name: 'COROMANDEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'CROMPTON', aboveLtp: 0, belowLtp: 0 },
  { name: 'CUB', aboveLtp: 0, belowLtp: 0 },
  { name: 'CUMMINSIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'CYIENT', aboveLtp: 0, belowLtp: 0 },
  { name: 'DABUR', aboveLtp: 0, belowLtp: 0 },
  { name: 'DALBHARAT', aboveLtp: 0, belowLtp: 0 },
  { name: 'DEEPAKNTR', aboveLtp: 0, belowLtp: 0 },
  { name: 'DELHIVERY', aboveLtp: 0, belowLtp: 0 },
  { name: 'DELTACORP', aboveLtp: 0, belowLtp: 0 },
  { name: 'DIVISLAB', aboveLtp: 0, belowLtp: 0 },
  { name: 'DIXON', aboveLtp: 4, belowLtp: 4 },
  { name: 'DLF', aboveLtp: 0, belowLtp: 0 },
  { name: 'DMART', aboveLtp: 0, belowLtp: 0 },
  { name: 'DRREDDY', aboveLtp: 4, belowLtp: 4 },
  { name: 'EICHERMOT', aboveLtp: 4, belowLtp: 4 },
  { name: 'ESCORTS', aboveLtp: 0, belowLtp: 0 },
  { name: 'EXIDEIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'FEDERALBNK', aboveLtp: 0, belowLtp: 0 },
  { name: 'FINNIFTY', aboveLtp: 0, belowLtp: 0 },
  { name: 'FSL', aboveLtp: 0, belowLtp: 0 },
  { name: 'GAIL', aboveLtp: 0, belowLtp: 0 },
  { name: 'GLENMARK', aboveLtp: 0, belowLtp: 0 },
  { name: 'GMRAIRPORT', aboveLtp: 0, belowLtp: 0 },
  { name: 'GMRINFRA', aboveLtp: 0, belowLtp: 0 },
  { name: 'GNFC', aboveLtp: 0, belowLtp: 0 },
  { name: 'GODREJCP', aboveLtp: 0, belowLtp: 0 },
  { name: 'GODREJPROP', aboveLtp: 0, belowLtp: 0 },
  { name: 'GRANULES', aboveLtp: 0, belowLtp: 0 },
  { name: 'GRASIM', aboveLtp: 4, belowLtp: 4 },
  { name: 'GSPL', aboveLtp: 0, belowLtp: 0 },
  { name: 'GUJGASLTD', aboveLtp: 0, belowLtp: 0 },
  { name: 'HAL', aboveLtp: 0, belowLtp: 0 },
  { name: 'HAVELLS', aboveLtp: 4, belowLtp: 4 },
  { name: 'HCLTECH', aboveLtp: 4, belowLtp: 4 },
  { name: 'HDFC', aboveLtp: 0, belowLtp: 0 },
  { name: 'HDFCAMC', aboveLtp: 0, belowLtp: 0 },
  { name: 'HDFCBANK', aboveLtp: 4, belowLtp: 4 },
  { name: 'HDFCLIFE', aboveLtp: 4, belowLtp: 4 },
  { name: 'HEROMOTOCO', aboveLtp: 4, belowLtp: 4 },
  { name: 'HFCL', aboveLtp: 0, belowLtp: 0 },
  { name: 'HINDALCO', aboveLtp: 4, belowLtp: 4 },
  { name: 'HINDCOPPER', aboveLtp: 0, belowLtp: 0 },
  { name: 'HINDPETRO', aboveLtp: 0, belowLtp: 0 },
  { name: 'HINDUNILVR', aboveLtp: 4, belowLtp: 4 },
  { name: 'HONAUT', aboveLtp: 0, belowLtp: 0 },
  { name: 'HUDCO', aboveLtp: 0, belowLtp: 0 },
  { name: 'IBULHSGFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'ICICIBANK', aboveLtp: 4, belowLtp: 4 },
  { name: 'ICICIGI', aboveLtp: 0, belowLtp: 0 },
  { name: 'ICICIPRULI', aboveLtp: 0, belowLtp: 0 },
  { name: 'IDEA', aboveLtp: 0, belowLtp: 0 },
  { name: 'IDFC', aboveLtp: 0, belowLtp: 0 },
  { name: 'IDFCFIRSTB', aboveLtp: 0, belowLtp: 0 },
  { name: 'IEX', aboveLtp: 0, belowLtp: 0 },
  { name: 'IGL', aboveLtp: 0, belowLtp: 0 },
  { name: 'IIFL', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDHOTEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDIACEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDIAMART', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDIANB', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDIGO', aboveLtp: 0, belowLtp: 0 },
  { name: 'INDUSINDBK', aboveLtp: 4, belowLtp: 4 },
  { name: 'INDUSTOWER', aboveLtp: 0, belowLtp: 0 },
  { name: 'INFY', aboveLtp: 4, belowLtp: 4 },
  { name: 'INTELLECT', aboveLtp: 0, belowLtp: 0 },
  { name: 'IOC', aboveLtp: 4, belowLtp: 4 },
  { name: 'IPCALAB', aboveLtp: 0, belowLtp: 0 },
  { name: 'IRB', aboveLtp: 0, belowLtp: 0 },
  { name: 'IRCTC', aboveLtp: 0, belowLtp: 0 },
  { name: 'IREDA', aboveLtp: 0, belowLtp: 0 },
  { name: 'IRFC', aboveLtp: 0, belowLtp: 0 },
  { name: 'ITC', aboveLtp: 4, belowLtp: 4 },
  { name: 'JINDALSTEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'JIOFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'JKCEMENT', aboveLtp: 0, belowLtp: 0 },
  { name: 'JSL', aboveLtp: 0, belowLtp: 0 },
  { name: 'JSWENERGY', aboveLtp: 0, belowLtp: 0 },
  { name: 'JSWSTEEL', aboveLtp: 4, belowLtp: 4 },
  { name: 'JUBLFOOD', aboveLtp: 0, belowLtp: 0 },
  { name: 'KALYANKJIL', aboveLtp: 0, belowLtp: 0 },
  { name: 'KEI', aboveLtp: 0, belowLtp: 0 },
  { name: 'KOTAKBANK', aboveLtp: 4, belowLtp: 4 },
  { name: 'KPITTECH', aboveLtp: 0, belowLtp: 0 },
  { name: 'L&TFH', aboveLtp: 1, belowLtp: 1 },
  { name: 'LALPATHLAB', aboveLtp: 0, belowLtp: 0 },
  { name: 'LAURUSLABS', aboveLtp: 0, belowLtp: 0 },
  { name: 'LICHSGFIN', aboveLtp: 1, belowLtp: 1 },
  { name: 'LICI', aboveLtp: 0, belowLtp: 0 },
  { name: 'LODHA', aboveLtp: 0, belowLtp: 0 },
  { name: 'LT', aboveLtp: 4, belowLtp: 4 },
  { name: 'LTI', aboveLtp: 0, belowLtp: 0 },
  { name: 'LTTS', aboveLtp: 0, belowLtp: 0 },
  { name: 'LUPIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'M&M', aboveLtp: 4, belowLtp: 4 },
  { name: 'M&MFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'MANAPPURAM', aboveLtp: 0, belowLtp: 0 },
  { name: 'MARICO', aboveLtp: 0, belowLtp: 0 },
  { name: 'MARUTI', aboveLtp: 4, belowLtp: 4 },
  { name: 'MAXHEALTH', aboveLtp: 0, belowLtp: 0 },
  { name: 'MCDOWELL-N', aboveLtp: 0, belowLtp: 0 },
  { name: 'MCX', aboveLtp: 0, belowLtp: 0 },
  { name: 'METROPOLIS', aboveLtp: 0, belowLtp: 0 },
  { name: 'MFSL', aboveLtp: 0, belowLtp: 0 },
  { name: 'MGL', aboveLtp: 0, belowLtp: 0 },
  { name: 'MIDCPNIFTY', aboveLtp: 5, belowLtp: 5 },
  { name: 'MINDTREE', aboveLtp: 0, belowLtp: 0 },
  { name: 'MOTHERSON', aboveLtp: 0, belowLtp: 0 },
  { name: 'MPHASIS', aboveLtp: 0, belowLtp: 0 },
  { name: 'MRF', aboveLtp: 0, belowLtp: 0 },
  { name: 'MUTHOOTFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'NATIONALUM', aboveLtp: 0, belowLtp: 0 },
  { name: 'NAUKRI', aboveLtp: 0, belowLtp: 0 },
  { name: 'NAVINFLUOR', aboveLtp: 0, belowLtp: 0 },
  { name: 'NBCC', aboveLtp: 0, belowLtp: 0 },
  { name: 'NCC', aboveLtp: 0, belowLtp: 0 },
  { name: 'NESTLEIND', aboveLtp: 4, belowLtp: 4 },
  { name: 'NHPC', aboveLtp: 0, belowLtp: 0 },
  { name: 'NIFTY', aboveLtp: 8, belowLtp: 8 },
  { name: 'NMDC', aboveLtp: 0, belowLtp: 0 },
  { name: 'NTPC', aboveLtp: 4, belowLtp: 4 },
  { name: 'NYKAA', aboveLtp: 0, belowLtp: 0 },
  { name: 'OBEROIRLTY', aboveLtp: 0, belowLtp: 0 },
  { name: 'OFSS', aboveLtp: 0, belowLtp: 0 },
  { name: 'OIL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ONGC', aboveLtp: 4, belowLtp: 4 },
  { name: 'PAGEIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'PATANJALI', aboveLtp: 0, belowLtp: 0 },
  { name: 'PAYTM', aboveLtp: 0, belowLtp: 0 },
  { name: 'PEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'PERSISTENT', aboveLtp: 0, belowLtp: 0 },
  { name: 'PETRONET', aboveLtp: 0, belowLtp: 0 },
  { name: 'PFC', aboveLtp: 0, belowLtp: 0 },
  { name: 'PHOENIXLTD', aboveLtp: 0, belowLtp: 0 },
  { name: 'PIDILITIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'PIIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'PNB', aboveLtp: 0, belowLtp: 0 },
  { name: 'POLICYBZR', aboveLtp: 0, belowLtp: 0 },
  { name: 'POLYCAB', aboveLtp: 0, belowLtp: 0 },
  { name: 'POONAWALLA', aboveLtp: 0, belowLtp: 0 },
  { name: 'POWERGRID', aboveLtp: 4, belowLtp: 4 },
  { name: 'PRESTIGE', aboveLtp: 0, belowLtp: 0 },
  { name: 'PVR', aboveLtp: 0, belowLtp: 0 },
  { name: 'RAIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'RAMCOCEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'RBLBANK', aboveLtp: 0, belowLtp: 0 },
  { name: 'RECLTD', aboveLtp: 0, belowLtp: 0 },
  { name: 'RELIANCE', aboveLtp: 4, belowLtp: 4 },
  { name: 'SAIL', aboveLtp: 0, belowLtp: 0 },
  { name: 'SBICARD', aboveLtp: 0, belowLtp: 0 },
  { name: 'SBILIFE', aboveLtp: 4, belowLtp: 4 },
  { name: 'SBIN', aboveLtp: 4, belowLtp: 4 },
  { name: 'SHREECEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'SHRIRAMFIN', aboveLtp: 4, belowLtp: 4 },
  { name: 'SIEMENS', aboveLtp: 0, belowLtp: 0 },
  { name: 'SJVN', aboveLtp: 0, belowLtp: 0 },
  { name: 'SOLARIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'SONACOMS', aboveLtp: 0, belowLtp: 0 },
  { name: 'SRF', aboveLtp: 0, belowLtp: 0 },
  { name: 'SRTRANSFIN', aboveLtp: 0, belowLtp: 0 },
  { name: 'SUNPHARMA', aboveLtp: 4, belowLtp: 4 },
  { name: 'SUNTV', aboveLtp: 0, belowLtp: 0 },
  { name: 'SUPREMEIND', aboveLtp: 0, belowLtp: 0 },
  { name: 'SYNGENE', aboveLtp: 0, belowLtp: 0 },
  { name: 'TATACHEM', aboveLtp: 0, belowLtp: 0 },
  { name: 'TATACOMM', aboveLtp: 0, belowLtp: 0 },
  { name: 'TATACONSUM', aboveLtp: 4, belowLtp: 4 },
  { name: 'TATAELXSI', aboveLtp: 0, belowLtp: 0 },
  { name: 'TATAMOTORS', aboveLtp: 4, belowLtp: 4 },
  { name: 'TATAPOWER', aboveLtp: 0, belowLtp: 0 },
  { name: 'TATASTEEL', aboveLtp: 4, belowLtp: 4 },
  { name: 'TATATECH', aboveLtp: 0, belowLtp: 0 },
  { name: 'TCS', aboveLtp: 0, belowLtp: 0 },
  { name: 'TECHM', aboveLtp: 0, belowLtp: 0 },
  { name: 'TIINDIA', aboveLtp: 0, belowLtp: 0 },
  { name: 'TITAGARH', aboveLtp: 0, belowLtp: 0 },
  { name: 'TITAN', aboveLtp: 4, belowLtp: 4 },
  { name: 'TORNTPHARM', aboveLtp: 0, belowLtp: 0 },
  { name: 'TORNTPOWER', aboveLtp: 0, belowLtp: 0 },
  { name: 'TRENT', aboveLtp: 4, belowLtp: 4 },
  { name: 'TVSMOTOR', aboveLtp: 0, belowLtp: 0 },
  { name: 'UBL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ULTRACEMCO', aboveLtp: 4, belowLtp: 4 },
  { name: 'UNIONBANK', aboveLtp: 0, belowLtp: 0 },
  { name: 'UNITDSPR', aboveLtp: 0, belowLtp: 0 },
  { name: 'UPL', aboveLtp: 0, belowLtp: 0 },
  { name: 'VBL', aboveLtp: 0, belowLtp: 0 },
  { name: 'VEDL', aboveLtp: 0, belowLtp: 0 },
  { name: 'VOLTAS', aboveLtp: 0, belowLtp: 0 },
  { name: 'WHIRLPOOL', aboveLtp: 0, belowLtp: 0 },
  { name: 'WIPRO', aboveLtp: 4, belowLtp: 4 },
  { name: 'YESBANK', aboveLtp: 0, belowLtp: 0 },
  { name: 'ZEEL', aboveLtp: 0, belowLtp: 0 },
  { name: 'ZOMATO', aboveLtp: 4, belowLtp: 4 },
  { name: 'ZYDUSLIFE', aboveLtp: 0, belowLtp: 0 }
];

export default function AutoScripConfigPage() {
  const [scripSettings, setScripSettings] = useState<ScripSetting[]>(initialScripSettings);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleValueChange = (index: number, field: 'aboveLtp' | 'belowLtp', value: string) => {
    const newSettings = [...scripSettings];
    newSettings[index] = {
      ...newSettings[index],
      [field]: parseInt(value) || 0
    };
    setScripSettings(newSettings);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Here you would make an API call to save the settings
      // await saveScripSettings(scripSettings);
      console.log('Saving settings:', scripSettings);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const filteredSettings = scripSettings.filter(setting =>
    setting.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
            Auto Scrip Configuration
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              size="small"
              placeholder="Search scrips..."
              value={searchQuery}
              onChange={handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
              disabled={isSaving}
            >
              Save Changes
            </Button>
          </Box>
        </Box>

        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Quick Stats
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Total Scrips
                </Typography>
                <Typography variant="h4">
                  {scripSettings.length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Active Above LTP
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.aboveLtp > 0).length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Active Below LTP
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.belowLtp > 0).length}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Typography variant="body2" color="text.secondary">
                  Inactive Scrips
                </Typography>
                <Typography variant="h4">
                  {scripSettings.filter(s => s.aboveLtp === 0 && s.belowLtp === 0).length}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Scrip Name</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Above LTP</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Below LTP</TableCell>
                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSettings.map((setting, index) => (
                <TableRow key={setting.name} hover>
                  <TableCell sx={{ fontWeight: 'medium' }}>{setting.name}</TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={setting.aboveLtp}
                      onChange={(e) => handleValueChange(index, 'aboveLtp', e.target.value)}
                      inputProps={{ min: 0, max: 8 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <TextField
                      type="number"
                      size="small"
                      value={setting.belowLtp}
                      onChange={(e) => handleValueChange(index, 'belowLtp', e.target.value)}
                      inputProps={{ min: 0, max: 8 }}
                      sx={{ width: 80 }}
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={setting.aboveLtp > 0 || setting.belowLtp > 0 ? 'Active' : 'Inactive'}
                      color={setting.aboveLtp > 0 || setting.belowLtp > 0 ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </DashboardLayout>
  );
} 