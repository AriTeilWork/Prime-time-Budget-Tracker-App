import { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

  const addTransaction = (e) => {
    e.preventDefault();
    if (!text || !amount) {
      alert('Please add a description and amount');
      return;
    }

    const newTransaction = {
      id: Math.floor(Math.random() * 100000000),
      text,
      amount: parseFloat(amount),
    };

    setTransactions([...transactions, newTransaction]);
    setText('');
    setAmount('');
  };

  const removeTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  const calculateBalance = () =>
    transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <div className="balance-box">
        <h3>Saldo</h3>
        <div id="balance">{calculateBalance()}€</div>
      </div>
      <form onSubmit={addTransaction}>
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
      <h2>Transactions</h2>
      <ul id="transaction-list">
        {transactions.map((transaction) => (
          <li
            key={transaction.id}
            className={transaction.amount < 0 ? 'expense' : 'income'}
          >
            {transaction.text}{' '}
            <span>
              {transaction.amount < 0 ? '-' : '+'}
              {Math.abs(transaction.amount)}€
            </span>
            <button onClick={() => removeTransaction(transaction.id)}>Poista</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
