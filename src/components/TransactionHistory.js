import React, { useState } from 'react';
import { getTransactionHistory } from '../services/api';

const TransactionHistory = () => {
    const [accountId, setAccountId] = useState('');
    const [transactions, setTransactions] = useState([]);

    const handleGetTransactionHistory = () => {
        getTransactionHistory(accountId).then(response => {
            setTransactions(response.data);
        });
    };

    return (
        <div>
            <h2>Transaction History</h2>
            <input
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Account ID"
            />
            <button onClick={handleGetTransactionHistory}>Get Transaction History</button>
            {transactions.length > 0 && (
                <ul>
                    {transactions.map((transaction) => (
                        <li key={transaction.id}>
                            From: {transaction.from.id}, To: {transaction.to.id}, Amount: {transaction.amount}, Status: {transaction.status}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default TransactionHistory;
