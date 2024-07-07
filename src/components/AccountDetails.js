import React, { useState } from 'react';
import { getAccountDetails } from '../services/api';

const AccountDetails = () => {
    const [accountId, setAccountId] = useState('');
    const [account, setAccount] = useState(null);

    const handleGetAccountDetails = () => {
        getAccountDetails(accountId).then(response => {
            setAccount(response.data);
        });
    };

    return (
        <div>
            <h2>Account Details</h2>
            <input
                type="text"
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                placeholder="Account ID"
            />
            <button onClick={handleGetAccountDetails}>Get Account Details</button>
            {account && (
                <div>
                    <p>Name: {account.name}</p>
                    <p>Number: {account.number}</p>
                    <p>Balance: {account.balance}</p>
                </div>
            )}
        </div>
    );
};

export default AccountDetails;
