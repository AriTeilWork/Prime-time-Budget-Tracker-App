import React from 'react';

const TransactionList = ({ transactions }) => {
    return (
        <div>
            <h3>Transaction List</h3>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        {transaction.description} - ${transaction.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TransactionList;