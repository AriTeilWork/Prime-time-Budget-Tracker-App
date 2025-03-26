import { useState } from 'react';
import './App.css';

function App() {
  
  const [transactions, setTransactions] = useState([]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');

// Function to remove a transaction
function removeTransaction(id) {
  setTransactions(transactions.filter(transaction => transaction.id !== id));
  updateLocalStorage();
  updateValues();
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

  setTransactions([...transactions, newTransaction]);
  setText('');
  setAmount('');
};

}
