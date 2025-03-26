import React from 'react';

function Transaction({ transaction, removeTransaction }) {
  const sign = transaction.amount < 0 ? '-' : '+';

  return (
    <li className={transaction.amount < 0 ? 'expense' : 'income'}>
      {transaction.text}{' '}
      <span>
        {sign}${Math.abs(transaction.amount)}
      </span>
      <button onClick={() => removeTransaction(transaction.id)}>Delete</button>
    </li>
  );
}

export default Transaction;
