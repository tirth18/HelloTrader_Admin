import { NextRequest, NextResponse } from 'next/server';

// Import the transactions array from the main API file
// In a real app, this would be a database query
import { allTransactions } from '../shared-data';

// Sample transaction data as fallback
const sampleTransactionData = {
  id: '4318840',
  userId: '3277',
  username: '6291194621',
  amount: 500,
  notes: '',
  transactionFor: 'Withdrawal',
  txnType: 'Deducted',
  txnMode: 'Online',
  createdAt: '2025-04-09 18:53:37',
  modifiedAt: '2025-04-09 18:53:37'
};

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Get the transaction ID from the URL params
  const id = params.id;

  // Find the transaction in our data
  // In a real app, this would be a database query
  const foundTransaction = allTransactions.find(tx => tx.id === id);

  // If found, return it, otherwise return the sample data with the requested ID
  const transaction = foundTransaction || {
    ...sampleTransactionData,
    id: id,
  };

  // Simulate a delay for network latency
  await new Promise(resolve => setTimeout(resolve, 400));

  // Return the transaction data
  return NextResponse.json({
    success: true,
    data: transaction,
  });
} 