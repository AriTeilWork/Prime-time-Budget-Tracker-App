import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(0); // Add state for balance if needed

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

    const updatedTransactions = [...transactions, newTransaction];
    setTransactions(updatedTransactions);
    updateLocalStorage(updatedTransactions);
    updateValues(updatedTransactions);

    setText('');
    setAmount('');
  };

  function updateLocalStorage(transactions) {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }

  function updateValues(transactions) {
    const totalBalance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    const income = transactions
      .filter(transaction => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions
      .filter(transaction => transaction.amount < 0)
      .reduce((acc, transaction) => acc + Math.abs(transaction.amount), 0);

    setBalance(totalBalance.toFixed(2));
    setIncome(income.toFixed(2));
    setExpense(expense.toFixed(2));
    setBalance(totalBalance.toFixed(2));
  }

  const calculateBalance = () =>
    transactions.reduce((acc, transaction) => acc + transaction.amount, 0).toFixed(2);

  return (
    <div className="container">
      <h1>Budget Tracker</h1>
      <Balance balance={balance} />
      <TransactionForm
        text={text}
        amount={amount}
        setText={setText}
        setAmount={setAmount}
        addTransaction={addTransaction}
      />
      <TransactionList
        transactions={transactions}
        removeTransaction={removeTransaction}
      />
    </div>
  );
}

export default App;
