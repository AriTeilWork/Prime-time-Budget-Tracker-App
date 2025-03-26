import { useState, useEffect } from 'react';
import './App.css';
import TransactionList from './TransactionList.jsx';
import TransactionForm from './TransactionForm.jsx';
import Balance from './Balance.jsx'; // Ensure Balance component is imported

function App() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const storedTransactions = localStorage.getItem('transactions');
    if (storedTransactions) {
      const parsedTransactions = JSON.parse(storedTransactions);
      setTransactions(parsedTransactions);
      updateValues(parsedTransactions); // Update values on initial load
    }
  }, []);

  function removeTransaction(id) {
    const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    updateValues(updatedTransactions);
  }

  const addTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    updateValues(updatedTransactions);
  };

  function updateLocalStorage(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function updateValues(transactions) {
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    setBalance(totalBalance.toFixed(2));
  }

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <Balance balance={balance} />
      <TransactionForm addTransaction={addTransaction} />
      <TransactionList transactions={transactions} removeTransaction={removeTransaction} />
    </div>
  );
}

export default App;
