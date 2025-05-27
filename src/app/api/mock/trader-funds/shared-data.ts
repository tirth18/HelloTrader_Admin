import { TraderFundTransaction } from '@/types/trader-funds';

// Mock trader funds transactions data
const initialTransactions: TraderFundTransaction[] = [
  {
    id: '4317912',
    userId: 'HELO156',
    name: 'Mayur',
    amount: 9000,
    txnType: 'Deducted',
    notes: 'Withdrawal',
    txnMode: 'Online',
    createdAt: '2022-04-09 18:00:16'
  },
  {
    id: '4317868',
    userId: '9460601505',
    name: 'Arvind',
    amount: 13233.63,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:57:11'
  },
  {
    id: '4317861',
    userId: '6353917600',
    name: 'Mahendra Shah',
    amount: 28000,
    txnType: 'Deducted',
    notes: 'Withdrawal',
    txnMode: 'Online',
    createdAt: '2022-04-09 17:56:34'
  },
  {
    id: '4317859',
    userId: '7014387097',
    name: 'Ravi',
    amount: 10000,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:55:24'
  },
  {
    id: '4317866',
    userId: '6383517601',
    name: 'Prince',
    amount: 6500,
    txnType: 'Added',
    notes: 'Deposit Payment Gateway Transaction on 2022-04-09 05:53:01 pm',
    txnMode: 'Online',
    createdAt: '2022-04-09 17:53:01'
  },
  {
    id: '4317712',
    userId: 'HELO634',
    name: 'Sweta Thakare',
    amount: 50000,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:49:42'
  },
  {
    id: '4317702',
    userId: '6383517601',
    name: 'Prince',
    amount: 6500.08,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:49:02'
  },
  {
    id: '4317686',
    userId: '9609846050',
    name: 'Vikas',
    amount: 2000,
    txnType: 'Deducted',
    notes: 'Withdrawal',
    txnMode: 'Online',
    createdAt: '2022-04-09 17:48:05'
  },
  {
    id: '4317643',
    userId: 'HELO672',
    name: 'Ankit Agarwal',
    amount: 15560.75,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:45:15'
  },
  {
    id: '4317612',
    userId: '9911304647',
    name: 'Gulzar',
    amount: 9000,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:44:17'
  },
  {
    id: '4317593',
    userId: '9460601505',
    name: 'Arvind',
    amount: 11616.94,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:42:56'
  },
  {
    id: '4317544',
    userId: 'HELO543',
    name: 'Sachin Jain',
    amount: 50000,
    txnType: 'Deducted',
    notes: 'Withdrawal',
    txnMode: 'Online',
    createdAt: '2022-04-09 17:41:18'
  },
  {
    id: '4317516',
    userId: '8439366070',
    name: 'Harish Kumar',
    amount: 10000,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:39:58'
  },
  {
    id: '4317515',
    userId: '9817809888',
    name: 'Prasoon',
    amount: 50000,
    txnType: 'Deducted',
    notes: 'Withdrawal',
    txnMode: 'Online',
    createdAt: '2022-04-09 17:39:54'
  },
  {
    id: '4317502',
    userId: '9460601505',
    name: 'Arvind',
    amount: 10368.5,
    txnType: 'Added',
    notes: 'Deposit',
    txnMode: 'Offline',
    createdAt: '2022-04-09 17:39:07'
  }
];

// Store transactions in memory (will be lost on server restart)
export const allTransactions: TraderFundTransaction[] = [...initialTransactions];

// Function to add a new transaction
export const addTransaction = (transaction: TraderFundTransaction): void => {
  allTransactions.unshift(transaction);
}; 