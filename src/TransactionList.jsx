import React from 'react';
import Transaction from './Transaction.jsx';

function TransactionList({ transactions, removeTransaction }) {
  return (
    <div>
      <h3>Transaction List</h3>
      <ul id="transaction-list">
        {transactions.map((transaction) => (
          <Transaction
            key={transaction.id}
            transaction={transaction}
            removeTransaction={removeTransaction}
          />
        ))}
      </ul>
    </div>
  );
}

export default TransactionList;