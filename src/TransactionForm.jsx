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
    <form onSubmit={handleSubmit} id="transaction-form">
      <label htmlFor="text">Description</label>
      <input
        type="text"
        id="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Example: Smarket"
      />
      <label htmlFor="amount">Sum</label>
      <input
        type="number"
        id="amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Example -50 or +100"
      />
      <button type="submit">Add Transaction</button>
    </form>
  );
}

export default TransactionForm;