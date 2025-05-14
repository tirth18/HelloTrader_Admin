import { NextResponse } from 'next/server';
import { TraderFundTransaction } from '@/types/trader-funds';
import { allTransactions, addTransaction } from './shared-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const fromDate = searchParams.get('fromDate');
  const toDate = searchParams.get('toDate');
  const amount = searchParams.get('amount');

  // Apply filters if provided
  let filteredTransactions = [...allTransactions];

  if (userId) {
    filteredTransactions = filteredTransactions.filter(t => 
      t.userId.toLowerCase().includes(userId.toLowerCase()));
  }

  if (fromDate && toDate) {
    const from = new Date(fromDate);
    const to = new Date(toDate);
    filteredTransactions = filteredTransactions.filter(t => {
      const date = new Date(t.createdAt);
      return date >= from && date <= to;
    });
  }

  if (amount) {
    const amountValue = parseFloat(amount);
    filteredTransactions = filteredTransactions.filter(t => 
      t.amount === amountValue);
  }

  return NextResponse.json({
    success: true,
    data: filteredTransactions,
    total: filteredTransactions.length
  });
}

// POST route for exporting data and creating new transactions
export async function POST(request: Request) {
  const contentType = request.headers.get('content-type');
  
  if (contentType && contentType.includes('application/json')) {
    const body = await request.json();
    
    // Handle fund transaction creation
    if (body.createTransaction) {
      const { userId, amount, txnType, notes, txnMode } = body.createTransaction;
      
      // Generate a unique ID (in a real app this would be handled by the database)
      const newId = (4318000 + allTransactions.length).toString();
      
      // Get current timestamp
      const now = new Date();
      const formattedDate = now.toISOString().replace('T', ' ').substring(0, 19);
      
      // Create transaction object
      const newTransaction: TraderFundTransaction = {
        id: newId,
        userId,
        // Default name based on userId 
        name: `User ${userId.substring(0, 4)}`,
        amount,
        txnType,
        notes: notes || (txnType === 'Added' ? 'Deposit' : 'Withdrawal'),
        txnMode,
        createdAt: formattedDate
      };
      
      // Add to our transactions array
      addTransaction(newTransaction);
      
      return NextResponse.json({
        success: true,
        data: newTransaction,
        message: 'Transaction created successfully'
      });
    }
    
    // Handle export request
    return NextResponse.json({
      success: true,
      message: 'Export successful',
      downloadUrl: '/exports/trader-funds-export.csv'
    });
  }
  
  return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
} 