# Trader Funds Management Module

This module provides functionality for administrators to manage trader funds, specifically deposits and withdrawals. It enables filtering, searching, and exporting trader fund transactions.

## Features

- **Search & Filter**: Filter transactions by date range, user ID, and amount
- **Data Display**: View transactions in a sortable, paginated table
- **Transaction Types**: Support both deposits (Added) and withdrawals (Deducted)
- **Transaction Modes**: Support for Online and Offline transactions
- **Export**: Export filtered data for reporting/auditing
- **Create Transactions**: Allow admins to manually create new fund transactions
- **Transaction Details**: View detailed information about individual transactions

## Components

1. **Filter Panel**: Date range pickers, User ID and Amount inputs
2. **Action Buttons**: Search, Reset, Create Fund, Download Report
3. **Transaction Table**: Displays transaction data with status indicators
4. **Create Transaction Dialog**: Form for creating new fund transactions
5. **Notification System**: Displays success/error messages for user actions
6. **Transaction Details Page**: Displays complete information for a single transaction

## API Integration

The module integrates with the following API endpoints:

- `GET /api/mock/trader-funds` - Fetch trader funds transactions with filters
- `GET /api/mock/trader-funds/[id]` - Fetch a single transaction by ID
- `POST /api/mock/trader-funds` - Export trader funds data as a report
- (Future) `POST /api/trader-funds` - Create a new fund transaction

## Data Models

The module uses the following data models defined in `types/trader-funds.ts`:

- `TraderFundTransaction`: Represents a single fund transaction
- `TraderFundFilters`: Parameters for filtering transactions
- `TraderFundResponse`: API response structure for transaction list
- `TraderFundExportResponse`: API response structure for export operation
- `CreateFundTransactionRequest`: Parameters for creating a new fund transaction

## Usage

1. Navigate to the Trader Funds page from the sidebar
2. Set filter criteria (date range, user ID, amount) as needed
3. Click SEARCH to apply filters
4. View results in the table
5. Export data by clicking DOWNLOAD FUNDS REPORT
6. Create new transactions by clicking CREATE FUNDS WD
7. Click the eye icon on any transaction to view its details

## Transaction Details View

The transaction details view provides a comprehensive overview of a single fund transaction. It displays the following information:

- Transaction ID
- User ID and username
- Transaction amount
- Transaction type (Deposit/Withdrawal)
- Transaction mode (Online/Offline)
- Notes and additional information
- Creation and modification timestamps

All of this information is presented in a clear, easy-to-read format with appropriate styling for different types of data.

## Validation

- Date range validation: From Date must not be after To Date
- Fund creation validation: User ID must be provided and amount must be positive

## Future Enhancements

- Advanced filtering options (transaction type, mode)
- Bulk actions (approve/reject multiple transactions)
- Transaction editing and status updates
- Integration with user management system for user validation
- Transaction approval workflow
- Transaction history and audit trail 