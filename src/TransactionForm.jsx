import { useState } from 'react';

function TransactionForm({ addTransaction }) {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!text || !amount) {
      alert('Please fill in both fields');
      return;
    }

    const newTransaction = {
      id: Date.now(),
      text,
      amount: parseFloat(amount),
    };

    addTransaction(newTransaction);
    setText('');
    setAmount('');
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div>
        <label htmlFor="text">Transaction Name</label>
        <input
          type="text"
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter transaction name"
        />
      </div>
      <div>
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;